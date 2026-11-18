# Mobile Lighthouse results: live page

- **URL:** https://pegasus-43-page.vercel.app
- **Deployed code:** latest `main` (`d389849`). Vercel's GitHub status for that commit is "success", and the live HTML has `data-testid="price"` and `data-testid="main-photo"` and loads no web font files.
- **Run:** 18 November 2026 (UTC), Lighthouse 13.6.0 (`npx lighthouse@13.6.0`), Google Chrome on this Windows machine, headless
- **Reports:** [`lighthouse/`](../lighthouse): `run-1`, `run-2` and `run-3`, each as `.report.json` and `.report.html`
- **Config:** [`lighthouse/config.js`](../lighthouse/config.js)

## Settings used

All copied exactly from Diego Salazar's Web Platform Slow 4G Mobile Check Profile (`lighthouse_settings`). Each report's `configSettings` confirms these values were applied.

| Setting | Value |
|---|---|
| `formFactor` | `mobile` |
| `throttlingMethod` | `simulate` |
| `throttling.rttMs` | 150 |
| `throttling.throughputKbps` | 1638.4 |
| `throttling.requestLatencyMs` | 562.5 |
| `throttling.downloadThroughputKbps` | 1474.56 |
| `throttling.uploadThroughputKbps` | 675 |
| `throttling.cpuSlowdownMultiplier` | 4 |
| `screenEmulation` | width 375, height 812, deviceScaleFactor 3, mobile true, disabled false |
| Categories | performance only |

## Scores

| Run | Performance score | FCP | LCP | TBT | Speed Index | CLS |
|---|---|---|---|---|---|---|
| run-1 | 86 | 1.3 s | 1.3 s | 540 ms | 1.7 s | 0 |
| run-2 | **75** | 1.0 s | 1.0 s | 1,360 ms | 1.6 s | 0 |
| run-3 | 74 | 0.9 s | 0.9 s | 1,530 ms | 1.8 s | 0 |

**Median performance score: 75** (run-2). The metrics below come from the median run.

## Against speed-budget.json

| Budget key | Required | Result | Pass / fail |
|---|---|---|---|
| `performance_score_min` | 90 or higher | median 75 (86, 75, 74) | **FAIL** |
| `size_grid_shift_px_max` | 0 px | 0 px. CLS 0 in all 3 runs, and 0 layout shifts | **PASS** |
| `size_button_min_px` | 44 px or more | 62 px. All 26 buttons are 62 x 64 | **PASS** |

### Watched test IDs

All five were found on the live page (checked in Chrome at 375 x 812, 3x, mobile, with Slow 4G and 4x CPU):

| Test ID | Found |
|---|---|
| `size-grid` | 1 |
| `size-button` | 22 |
| `size-button-sold-out` | 4 |
| `main-photo` | 1 |
| `price` | 1 |

### How the grid and buttons were checked

- **Size grid:** Lighthouse's CLS was 0 in all three runs, and its layout-shifts audit listed no shifts. A separate load of the live page with the same phone settings tracked the grid's top edge on every frame. It was at 535 px from first paint until fully loaded (load event at 2,261 ms), with 0 layout-shift entries.
- **Size buttons:** every `size-button` and `size-button-sold-out` measured 62 x 64 CSS px, so the smaller side is 62 px.
- **Fonts:** none of the runs requested a font file. Each run made 9 requests: the HTML, 1 CSS file, 6 JS files and the favicon.

## Metrics (median run, run-2)

| Metric | Value |
|---|---|
| First Contentful Paint | 1.0 s |
| Largest Contentful Paint | 1.0 s. The element is the `<h1>` "Nike Pegasus 43" (`main > section.px-4 > h1`), in all 3 runs |
| Total Blocking Time | 1,360 ms |
| Speed Index | 1.6 s |
| Cumulative Layout Shift | 0 |

The LCP element is the heading, not `main-photo`, because the photo slot is still a grey box with a text label, which doesn't count as an image.

## What fails and why

**`performance_score_min` fails: the median score is 75, below 90.**

- **The cause is Total Blocking Time.** FCP, LCP, Speed Index and CLS are all good (about 1 s, and 0). TBT is 540 to 1,530 ms, and TBT carries the most weight in the mobile score.
- **TBT comes from JavaScript running on the main thread.**
  - Lighthouse measured 3.0 s of main-thread work, 1.5 s of it script evaluation. JavaScript execution took 1.6 s.
  - Most of it is one Next.js/React framework chunk (`3a-7_kdo1ce-i.js`). In run-2 it caused a single long task of 1,038 ms while the page hydrated.
  - The page is tiny (155 KB, 9 requests), so the blocking time is from running JavaScript, not from downloading it.
- **The score moved a lot between runs (86, 75, 74).**
  - Every run warned that this machine's CPU is slower than Lighthouse expects. Its CPU benchmark index was 612, 626 and 220 across the three runs. The 220 in run-3 means the machine was busy.
  - Lighthouse multiplies the measured CPU time by 4, so a slow or busy test machine inflates TBT.
  - The score on Diego's Lighthouse CI machine could be different, but none of the three runs here reached 90.

Not fixed yet, as asked.

## Top 3 Lighthouse suggestions

1. **Reduce JavaScript execution time / minimize main-thread work** (estimated TBT savings: about 1,100 to 1,350 ms). The framework chunk `3a-7_kdo1ce-i.js` accounts for 1.4 s of CPU time. The size picker is the only interactive part, so less client-side JavaScript (or less work during hydration) is where the score will come from.
2. **Reduce unused JavaScript** (estimated 23 KiB). It's in the same chunk, `3a-7_kdo1ce-i.js`.
3. **Avoid serving legacy JavaScript to modern browsers** (estimated 14 KiB). This is polyfills and transforms in the same chunk.

Lighthouse also flags the one render-blocking CSS file and the request chain, but it estimates 0 ms savings for both.
