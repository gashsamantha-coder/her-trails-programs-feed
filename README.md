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
A program appears only when all of these are true in Airtable:
- it has a customer checkout link (`hertrails.com/offers/...`)
- it has a race date, and the race has not happened yet
- it has a program start date, or a duration in weeks so one can be computed
  (start = race date minus (weeks − 1), back to the Monday)
- it has a price or a payment plan
- it is not in the Archive category

Everything else is listed in `docs/skipped.json` with the reason, so nothing disappears silently.

## What gets published to members.json
Every program that has a checkout link and is not archived, except those whose race has already run,
the "All in Member Program" variants, and anything with no distance and no duration.
Distance category, event family, duration band, terrain rating and elevation class are derived from
the Airtable name, distance, tags and tier, so the finder's filter pills keep working without a code change.
Left-out programs are listed in `docs/members-skipped.json`.

The finder block in Kajabi (`kajabi/member-finder-tail.js` shows the loader that was spliced into it)
keeps its old hard-coded list only as a fallback for when the feed cannot be reached.
