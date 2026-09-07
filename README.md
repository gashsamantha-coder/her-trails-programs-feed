# Her Trails programs feed

Airtable is the single source of truth. This repo turns it into a public `programs.json`
that the Kajabi `/programs` page reads, so adding or changing a program in Airtable
updates the website on the next run. No new subscriptions: GitHub Actions and Pages are free.

## One-time setup
1. Airtable → Developer hub → Personal access tokens → create one with scope `data.records:read`
   and access limited to the "HT Operations + Programs + Innovations" base only.
2. GitHub repo → Settings → Secrets and variables → Actions → New repository secret
   Name: `AIRTABLE_TOKEN`  Value: the token from step 1.
3. GitHub repo → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/docs`.
4. Actions tab → "Publish programs feed" → Run workflow. After it finishes, `docs/programs.json` exists
   and is live at `https://<owner>.github.io/<repo>/programs.json`.
5. Paste `kajabi/programs-embed.html` into the Kajabi programs page (custom code block), replacing the
   old hand-written cards. Set `FEED_URL` at the top of the script to the URL from step 4.

Two files are published:
- `programs.json` for the public `/programs` page (upcoming race-specific programs with a price).
- `members.json` for the Member Program Library finder (every live program, generic ones included).

## What gets published to programs.json
Eligibility is decided in Airtable itself, by the **"Public Feed Status"** formula field on
each program record — it evaluates to `Publishing` or a specific reason (e.g. "No race date",
"Race already run", "No price"). `build.mjs` just reads that field and skips anything that
isn't `Publishing`. Open that field's formula in Airtable any time to see or change the exact rule:
- it has a customer checkout link (`hertrails.com/offers/...`) in **Program offer url** — the same
  field is used for every category, including Recommended programs; there's no separate link field
- it has a race date, and the race has not happened yet
- it has a program start date, or a duration in weeks so one can be computed
  (start = race date minus (weeks − 1), back to the Monday)
- it has a price or a payment plan
- it is not in the Archive category

Everything else is listed in `docs/skipped.json` with the reason (copied straight from the
Airtable field), so nothing disappears silently.

## What gets published to members.json
Eligibility here is decided by the companion **"Member Feed Status"** formula field: `Publishing`
unless the program is archived, is an "All in Member Program" variant, has no checkout link, its
race already ran, or it has neither a distance nor a duration.
Distance category, event family, duration band, terrain rating and elevation class are derived from
the Airtable name, distance, tags and tier, so the finder's filter pills keep working without a code change.
Left-out programs are listed in `docs/members-skipped.json`.

The finder block in Kajabi (`kajabi/member-finder-tail.js` shows the loader that was spliced into it)
keeps its old hard-coded list only as a fallback for when the feed cannot be reached.

## Refresh schedule
The feed refreshes automatically **Monday and Thursday, ~6am Melbourne time** (GitHub Actions cron
runs in UTC, so it drifts an hour with daylight saving — see the comment in
`.github/workflows/publish.yml`). Two ways to run it on demand instead of waiting:
- GitHub → Actions tab → "Publish programs feed" → "Run workflow"
- Ask Claude to fire the matching Cowork scheduled task, which also alerts if a run fails or if
  programs unexpectedly disappear from the feed between runs.

## A note on "Recommended programs"
Recommended programs use the same **Program offer url** field as every other category — being
"Recommended" is just a Section Header tag that decides which programs surface as recommended,
not a different checkout link. Airtable still has a handful of older fields from an earlier attempt
at this (Recommended Program offer url, Recommended Offer Link, Program offer (from Recommended
Program offer), Recommended Program, Recommended Program Name) — none of these are read by this
repo, and they're candidates for cleanup if nothing else in Airtable depends on them.
