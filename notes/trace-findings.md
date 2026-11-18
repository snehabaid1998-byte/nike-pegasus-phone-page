# Slow 4G phone trace findings

Raw traces (Chrome trace JSON; open them in Chrome DevTools > Performance > Load profile):

- Before the fixes: [`traces/slow-4g-live.json`](../traces/slow-4g-live.json) (about 20 MB)
- After the fixes: [`traces/slow-4g-live-after-fixes.json`](../traces/slow-4g-live-after-fixes.json) (about 8 MB). See [After the fixes](#after-the-fixes).

The sections up to "Late elements and fixes" describe the first trace, taken before the fixes.

## What was traced

- **URL:** https://pegasus-43-page.vercel.app (live Vercel page)
- **Recorded:** 18 November 2026, with the Chrome DevTools MCP (chrome-devtools-mcp 1.13.0)
- **Settings** (from Diego Salazar's Web Platform Slow 4G Mobile Check Profile):

| Setting | Profile value | Used in the trace |
|---|---|---|
| Viewport | 375 x 812 CSS px | 375 x 812 CSS px |
| Device pixel ratio | 3 | 3 |
| Mobile / touch | on / on | on / on |
| Request latency | 562.5 ms | 562.5 ms |
| Download | 1474.56 Kbps | MCP "Slow 4G" preset: 180,000 bytes/s (1,440 Kbps) |
| Upload | 675 Kbps | MCP "Slow 4G" preset: 84,375 bytes/s (675 Kbps) |
| CPU | 4x slowdown | 4x slowdown |
| Cache | disabled | the reload ignored the cache (cold load) |

**Difference from the profile:** the MCP's `emulate` tool only takes network presets, not custom values. Its "Slow 4G" preset uses the same 562.5 ms latency. Its speeds are worked out with 1 Kbps = 1,000 bits, while Lighthouse uses 1 Kbps = 1,024 bits. That makes the trace's download about 4.6% slower than the profile's 1474.56 Kbps as Lighthouse applies it (180,000 vs 188,744 bytes/s), and its upload about 2.3% slower (84,375 vs 86,400 bytes/s). The trace network was a little harsher than the profile, never faster. The cache was bypassed with a cache-ignoring reload, not with DevTools' "Disable cache" switch.

**How the trace was run:** open the page with the settings above, start the trace, reload while ignoring the cache, wait until the page is fully loaded, then stop the trace. A small script added at page start also recorded layout-shift entries and polled the positions of the size grid, photo, name, colourway and price on every frame for 30 s.

## Timeline

| Event | Time from navigation start |
|---|---|
| Server response (TTFB) | 573 ms |
| DOMContentLoaded | 2,888 ms |
| Geist web font finished loading | 2,889 ms |
| First paint / first contentful paint | 2,928 ms |
| LCP | 2,926 ms (trace) |
| Fully loaded (load event) | 7,539 ms |

## Layout shifts

**None.** The trace has 0 `LayoutShift` events, the in-page layout-shift observer recorded 0 entries, and CLS is 0.00. Nothing moved, so there is no shift time, size or element to report.

## Size grid top edge

| | Top edge (CSS px from the top of the page) |
|---|---|
| At first paint (2,928 ms) | 535 px |
| When fully loaded (7,539 ms) | 535 px |
| **Total movement** | **0 px** |

The position was checked on every frame from before first paint to 30 s, and it never changed. This meets `size_grid_shift_px_max: 0`. The 535 px is 375 (photo box) + 16 (padding) + 28 (name) + 4 + 20 (colourway) + 8 + 24 (price) + 24 (sizes padding) + 24 (heading row) + 12 (gap).

## Photo, name, colourway and price

| Element | First drawn | Box when first drawn (w x h) | Changed size? |
|---|---|---|---|
| Photo (placeholder box, there is no real photo yet) | 2,928 ms (first paint) | 375 x 375, at top 0 | No |
| Name "Nike Pegasus 43" | 2,928 ms (first paint) | 343 x 28, at top 391 | No |
| Colourway "Black/White-Volt" | 2,928 ms (first paint) | 343 x 20, at top 423 | No |
| Price "$140.00" | 2,928 ms (first paint) | 343 x 24, at top 451 | No |

All four were already in the server HTML, so they were drawn in the first frame and kept the same size until the page was fully loaded.

**Web font swap:** none was seen, and nothing moved. The Geist font is preloaded and finished loading at 2,889 ms, 39 ms before first paint, so the text was drawn in Geist from the start. The page sets Geist with `font-display: swap` (the next/font default). On a slower run the font could arrive after first paint and swap in. The fixed line heights (28, 20 and 24 px) are what stop a swap from changing the text box heights.

## LCP

- **Element:** the `<h1>` "Nike Pegasus 43" (5,045 px² drawn), **not** the photo.
- **Time:** 2,926 ms (trace). That is 573 ms TTFB plus 2,353 ms render delay.

This is different from what Diego's profile expects: it says `main-photo` should be the largest-content element. Here the "photo" is a grey `<div>` with a small text label, which doesn't count as an image for LCP, so the heading wins. Once a real photo goes in, LCP should move to the photo and its time will depend on how fast the photo loads.

## Watched test IDs (before the fixes)

| Test ID | On the page? |
|---|---|
| `size-grid` | **Yes** (1 element) |
| `size-button` | **No.** The 26 size buttons render (62 x 64 px each) but have no `data-testid` |
| `size-button-sold-out` | **No.** Same buttons, no `data-testid` |
| `main-photo` | **No.** The photo box uses `data-testid="photo-placeholder"` |
| `price` | **No.** The price `<p>` has no `data-testid` |

1 of the 5 was present. The profile fails the launch check when any watched element is missing, so the check couldn't pass. All five are present after the fixes.

## Late elements and fixes

The first trace found nothing late and no movement, because the page has no real photo yet and the font arrived before first paint. These fixes cover the risks that come up once the real content is in, plus the missing test IDs. All three are now done (see [After the fixes](#after-the-fixes)).

### Main photo: done (photo space reserved)

- **Risk:** a late photo with no reserved space would push the size grid down by 375 px. The trace doesn't show this today, because the placeholder `<div>` has a fixed 375 x 375 box. The risk comes back as soon as the placeholder is swapped for a real image.
- **Done:** the placeholder is now the real photo slot: a box that is always exactly 375 x 375 CSS px (`h-[375px] w-[375px] aspect-square shrink-0`), with `data-testid="main-photo"`, `role="img"`, an `aria-label` and a short visible label. A TODO in `app/page.tsx` says to put `next/image` inside this same box when a photo exists.
- **Still to do when there's a photo:** put `next/image` inside the same 375 x 375 box, with `width={375}` and `height={375}`, so the space stays reserved before the image arrives. Give it a source at least 1125 px wide for 3x screens, use `priority` loading (it is the first-screen image and should be the LCP), and keep `data-testid="main-photo"`.

### Price and name text (Geist web font): done (no late font swap)

- **Risk:** a late font swap can change the line height and move the grid. In this trace the font loaded before first paint, so no swap happened. Under `font-display: swap` a slower connection could still swap it after first paint.
- **Done:** the Geist and Geist Mono web fonts were removed and the page now uses the system font stack, so there is no font file to arrive late. The fixed line heights (28, 20 and 24 px) are kept, and `data-testid="price"` is on the price.
- **Fix as listed:** keep the fixed line heights (`leading-7`, `leading-5`, `leading-6`), and set the font to `display: "optional"` in `next/font` or use the system font stack, so a late font is never swapped in. Add `data-testid="price"` to the price.

### "Select size" heading

- **No fix needed.** The "Select a size" error message sits inside a fixed 24 px row (`h-6`) next to the heading, so showing it doesn't move the grid. The trace confirms the grid sits at 535 px, which counts that row as 24 px.

### The four missing test IDs: done

The check needs all four before it can pass. All four are now on the page:

- `data-testid="size-button"` on every in-stock and low-stock size button
- `data-testid="size-button-sold-out"` on every sold-out size button
- `data-testid="main-photo"` on the photo (in place of `photo-placeholder`)
- `data-testid="price"` on the price

## After the fixes

The live page was traced again after the fixes were deployed (commit `74860fa`), with the same settings as the first trace: 375 x 812 at 3x, mobile and touch on, the MCP's Slow 4G preset (562.5 ms latency), 4x CPU slowdown, and a cache-ignoring reload. Raw trace: [`traces/slow-4g-live-after-fixes.json`](../traces/slow-4g-live-after-fixes.json).

### New numbers

| | Before the fixes | After the fixes |
|---|---|---|
| TTFB | 573 ms | 568 ms |
| First paint / FCP | 2,928 ms | 1,792 ms |
| LCP | 2,926 ms, `<h1>` "Nike Pegasus 43" | 1,790 ms, `<h1>` "Nike Pegasus 43" |
| Fully loaded (load event) | 7,539 ms | 2,790 ms |
| Layout shifts | 0 | **0** (0 `LayoutShift` events in the trace, 0 from the in-page observer) |
| CLS | 0.00 | **0.00** |
| Size grid top at first paint | 535 px | **535 px** |
| Size grid top when fully loaded | 535 px | **535 px** |
| Size grid movement | 0 px | **0 px** |
| Web font files downloaded | 2 Geist `.woff2` files | **None** (the 9 requests were the HTML, 1 CSS file, 6 JS files and the favicon) |
| Watched test IDs found | 1 of 5 | **5 of 5** |

Test IDs found on the live page after the fixes:

| Test ID | Found |
|---|---|
| `size-grid` | 1 |
| `size-button` | 22 (all 62 x 64 px) |
| `size-button-sold-out` | 4 (all 62 x 64 px, in their own grid places) |
| `main-photo` | 1 (375 x 375 px at top 0) |
| `price` | 1 ("$140.00", 343 x 24 px) |

The photo, name, colourway and price were all drawn at first paint (1,792 ms) and kept the same boxes as before: 375 x 375, 343 x 28, 343 x 20 and 343 x 24. Nothing changed size.

**LCP is still the heading, not `main-photo`.** The photo slot is a grey box with a short text label, which doesn't count as an image for LCP. It will become the LCP once a real photo is put in the slot with `next/image` and `priority`.

### What changed in the code

| File | Change |
|---|---|
| `pegasus-page/app/components/SizeGrid.tsx` | Each size button gets `data-testid="size-button"`, or `data-testid="size-button-sold-out"` when it is sold out. The grid layout is unchanged: 5 per row, 62 x 64 buttons, 8 px gaps. `data-testid="size-grid"` is kept. |
| `pegasus-page/app/page.tsx` | The photo box is now the photo slot. It is always exactly 375 x 375 (`h-[375px] w-[375px] aspect-square shrink-0`), has `data-testid="main-photo"` in place of `photo-placeholder`, `role="img"` with an `aria-label`, and a short visible label. It also has a TODO to put `next/image` (`width={375}`, `height={375}`, `priority`, a source at least 1125 px wide) inside the same box. The price `<p>` gets `data-testid="price"`. |
| `pegasus-page/app/layout.tsx` | Removed the Geist and Geist Mono `next/font/google` imports and their CSS variables. |
| `pegasus-page/app/globals.css` | `--font-sans` is now the system font stack: `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`. The Geist font variables were removed. |

### Fixes

- [x] **Test IDs:** all five watched test IDs are on the page.
- [x] **Reserved photo space:** a fixed 375 x 375 slot with a 1 / 1 aspect ratio.
- [x] **No late font swap:** no web fonts, so nothing can swap in after first paint.

Not changed: `speed-budget.json` and the size grid's layout.
