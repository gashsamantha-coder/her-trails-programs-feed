import fs from "node:fs/promises";

const readJson = async (path) => JSON.parse(await fs.readFile(path, "utf8"));
const [publicFeed, memberFeed, finderFeed] = await Promise.all([
  readJson("docs/programs.json"),
  readJson("docs/members.json"),
  readJson("docs/finder.json"),
]);

const offers = new Map();

function addOffer(url, item) {
  if (!url) return;
  const canonicalUrl = String(url).trim();
  if (!canonicalUrl) return;
  if (!offers.has(canonicalUrl)) {
    offers.set(canonicalUrl, {
      url: canonicalUrl,
      programs: new Set(),
      sourceRecordIds: new Set(),
      expectedPrices: new Set(),
      expectedWeeks: new Set(),
      surfaces: new Set(),
    });
  }
  const offer = offers.get(canonicalUrl);
  if (item.name) offer.programs.add(item.name);
  if (item.sourceRecordId) offer.sourceRecordIds.add(item.sourceRecordId);
  if (Number.isFinite(item.price)) offer.expectedPrices.add(item.price);
  if (Number.isFinite(item.weeks)) offer.expectedWeeks.add(item.weeks);
  if (item.surface) offer.surfaces.add(item.surface);
}

for (const program of publicFeed.programs || []) {
  addOffer(program.checkoutUrl, {
    name: program.name,
    sourceRecordId: program.id,
    price: program.price,
    weeks: program.weeks,
    surface: "public catalogue",
  });
}

for (const program of memberFeed.programs || []) {
  addOffer(program.checkoutUrl, {
    name: program.name,
    sourceRecordId: program.id,
    price: program.price,
    weeks: program.weeks,
    surface: "member feed",
  });
}

for (const program of finderFeed.programs || []) {
  if (!program.sale?.available) continue;
  addOffer(program.sale.checkoutUrl, {
    name: program.name,
    sourceRecordId: program.sale.sourceRecordId || program.sourceRecordId,
    price: program.sale.price,
    weeks: program.sale.weeks || program.weeks,
    surface: "program finder",
  });
}

const decode = (value = "") => value
  .replace(/&amp;/gi, "&")
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&ndash;/gi, "–")
  .replace(/&mdash;/gi, "—")
  .replace(/&nbsp;/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const tagText = (html, tag) => {
  const match = html.match(new RegExp("<" + tag + "\\b[^>]*>([\\s\\S]*?)<\\/" + tag + ">", "i"));
  return decode(match?.[1] || "");
};

const unavailablePattern = /offer\s+(?:is|has been)\s+(?:closed|expired|no longer available)|this\s+offer\s+isn['’]t\s+available|page\s+not\s+found|404\s+(?:error|not found)/i;

const stopWords = new Set([
  "her", "trails", "trail", "running", "run", "program", "programme", "women",
  "for", "the", "and", "ultra", "event", "specific", "training", "km", "k",
  "mile", "miler", "marathon", "half", "race", "road", "based", "distance",
]);

const tokens = (value) => decode(value).toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .split(/\s+/)
  .filter((token) => token.length > 2 && !stopWords.has(token));

const identityReview = (heading, names) => {
  const headingTokens = new Set(tokens(heading));
  if (!headingTokens.size) return true;
  return !names.some((name) => {
    const expected = [...new Set(tokens(name))];
    if (!expected.length) return false;
    const overlap = expected.filter((token) => headingTokens.has(token)).length;
    return overlap >= Math.min(2, expected.length);
  });
};

async function inspect(offer) {
  let lastError = null;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(offer.url, {
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
        headers: {
          "user-agent": "Her-Trails-Catalogue-Audit/1.0 (+https://www.hertrails.com)",
          accept: "text/html,application/xhtml+xml",
        },
      });
      const html = await response.text();
      const title = tagText(html, "title");
      const heading = tagText(html, "h1");
      const unavailable = unavailablePattern.test(decode(html));
      const finalUrl = response.url;
      const redirectedAway = !/^https:\/\/(?:www\.)?hertrails\.com\/offers\//i.test(finalUrl);
      const broken = !response.ok || unavailable || redirectedAway;
      const names = [...offer.programs];
      return {
        url: offer.url,
        finalUrl,
        status: response.status,
        ok: response.ok,
        broken,
        unavailable,
        redirectedAway,
        title,
        heading,
        bytes: Buffer.byteLength(html),
        identityNeedsReview: !broken && identityReview(heading || title, names),
        programs: names.sort(),
        sourceRecordIds: [...offer.sourceRecordIds].sort(),
        expectedPrices: [...offer.expectedPrices].sort((a, b) => a - b),
        expectedWeeks: [...offer.expectedWeeks].sort((a, b) => a - b),
        surfaces: [...offer.surfaces].sort(),
        sharedByPrograms: names.length,
      };
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 750));
    }
  }

  return {
    url: offer.url,
    finalUrl: null,
    status: null,
    ok: false,
    broken: true,
    unavailable: false,
    redirectedAway: false,
    title: "",
    heading: "",
    bytes: 0,
    identityNeedsReview: true,
    programs: [...offer.programs].sort(),
    sourceRecordIds: [...offer.sourceRecordIds].sort(),
    expectedPrices: [...offer.expectedPrices].sort((a, b) => a - b),
    expectedWeeks: [...offer.expectedWeeks].sort((a, b) => a - b),
    surfaces: [...offer.surfaces].sort(),
    sharedByPrograms: offer.programs.size,
    error: String(lastError?.message || lastError || "Unknown fetch error"),
  };
}

const queue = [...offers.values()];
const results = new Array(queue.length);
let nextIndex = 0;

async function worker() {
  while (true) {
    const index = nextIndex;
    nextIndex += 1;
    if (index >= queue.length) return;
    results[index] = await inspect(queue[index]);
  }
}

await Promise.all(Array.from({ length: 6 }, () => worker()));
results.sort((a, b) => a.url.localeCompare(b.url));

const broken = results.filter((item) => item.broken);
const identityReviewItems = results.filter((item) => item.identityNeedsReview);
const shared = results.filter((item) => item.sharedByPrograms > 1);

const report = {
  generatedAt: new Date().toISOString(),
  sourceFeedGeneratedAt: publicFeed.generatedAt,
  summary: {
    uniqueCheckoutUrls: results.length,
    live: results.length - broken.length,
    broken: broken.length,
    identityNeedsReview: identityReviewItems.length,
    sharedCheckoutUrls: shared.length,
  },
  results,
};

await fs.writeFile("docs/checkout-audit.json", JSON.stringify(report, null, 2) + "\n");

const esc = (value) => String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const rows = results.map((item) => [
  item.broken ? "BROKEN" : item.identityNeedsReview ? "REVIEW" : "LIVE",
  item.status ?? "—",
  item.programs.join("; "),
  item.heading || item.title || "—",
  item.url,
].map(esc).join(" | "));

const markdown = [
  "# Checkout audit",
  "",
  "Generated: " + report.generatedAt,
  "",
  "- Unique checkout URLs: " + report.summary.uniqueCheckoutUrls,
  "- Live: " + report.summary.live,
  "- Broken: " + report.summary.broken,
  "- Identity review: " + report.summary.identityNeedsReview,
  "- Shared by multiple catalogue programmes: " + report.summary.sharedCheckoutUrls,
  "",
  "A LIVE result means the URL returned successfully and remained on a Her Trails offer path.",
  "REVIEW means the URL is live but the visible heading did not confidently match any linked catalogue programme.",
  "",
  "Status | HTTP | Catalogue programme(s) | Visible checkout heading | URL",
  "--- | ---: | --- | --- | ---",
  ...rows,
  "",
].join("\n");

await fs.writeFile("docs/checkout-audit.md", markdown);
console.log(JSON.stringify(report.summary));
