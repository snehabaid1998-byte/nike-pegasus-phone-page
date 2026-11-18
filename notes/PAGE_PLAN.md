# Page plan: Nike Pegasus 43 (Black/White-Volt)

Plan only. No code. All layouts are planned at **375 px wide** (CSS pixels).

## Section order, copied from prompt.md

1. Photos
2. Name and price
3. Sizes (the Add to bag / Notify me button sits directly under the size buttons, as part of this section)
4. Tech copy
5. Reviews

This plan uses that order exactly. No sections are reordered, merged or added.

### Differences between prompt.md and order.md

I compared the two files. **They give the same five sections, in the same order, with the same names.** The only difference in wording is that order.md puts the note about the button inside section 3: "Sizes (with the Add to bag / Notify me button directly under the size buttons)". prompt.md says the same thing in a separate sentence. It's not a conflict.

Compared with the previous version of order.md (used in the last plan), the **Launch date** and **Delivery and returns** sections are gone, **Reviews** is new, and "Name, colour and price" is now "Name and price". This matters for pre-launch messaging and the colour name (see section 7 of this plan).

> ⚠️ **Problems found while planning** (details below):
> - **Problem 1: the full size labels don't fit on a 44 x 44 button.** Nothing is shrunk; the options are in section 2.
> - **Problem 2: the main button is below the first screen** whichever grid option is used, and so are most of the size buttons. I have **not** moved anything; the options are in "First screen".
> - **Problem 3: there's no section for the launch date**, but the page has to behave differently before 10 Dec 2026. I haven't added a section; see section 4 of this plan.

---

## 1. Every section, top to bottom

The spacing, type sizes and image size are values I proposed, not ones you gave. They're listed under "Questions", and every height below depends on them. Side padding is 16 px.

| # | Section | What it does | Height | Position on page (Option 1 grid) |
|---|---|---|---|---|
| 1 | Photos | Full-width 375 x 375 square photo. Swipe between photos, with dot indicators overlaid on the photo (no extra height). | 375 | 0 – 375 |
| 2 | Name and price | 16 px top padding, then "Nike Pegasus 43" (22 px type, 28 px line), 4 px gap, "Black/White-Volt" (20 px line, **see question 4**), 8 px gap, "$140.00" (24 px line). | 100 | 375 – 475 |
| 3 | Sizes | 24 px top margin, then the heading "Select size" (24 px line), a 12 px gap, the 26-button grid, an 8 px gap, a 20 px selection line, a 16 px gap, then the main button (343 x 56 px). The selection line shows the selected size and stock note. The button's label and action change with launch state and the selected size's stock (sections 3–5 of this plan). Errors and confirmation appear directly under the button. | 584 | 475 – 1059 |
| 4 | Tech copy | Product description and tech specs. **The only data for this in the JSON is `style_code`** (see section 7). | TBD | 1059 – … |
| 5 | Reviews | Ratings and reviews. **No data for this in the JSON** (see section 7). | TBD | after 4 |

### First screen (top 375 x 667 px)

Sections 1 and 2 and the size heading are the same for every grid option:

| Part | Position | Inside the first screen? |
|---|---|---|
| 1 Photos | 0 – 375 | **Inside**, all of it |
| 2 Name and price | 375 – 475 | **Inside**, all of it |
| 3 Sizes: "Select size" heading | 499 – 523 | **Inside** |

The rest of section 3 depends on the grid option (section 2 of this plan):

| Grid option | Size buttons inside the first screen | Selection line | Main button |
|---|---|---|---|
| **1** (5 per row, 64 tall) | Row 1, sizes 1–5 (535–599), all of it. Row 2, sizes 6–10 (607–671), all but its bottom 4 px. Sizes 11–26 are **below**. | 967 – 987, **below** | 1003 – 1059, **below** |
| **2** (5 per row, 52 tall) | Rows 1–2, sizes 1–10 (535–647), all of them. Row 3 (655–707) shows only its top 12 px. Sizes 11–26 are effectively **below**. | 895 – 915, **below** | 931 – 987, **below** |
| **3** (switch + 6 per row, 44 tall) | Switch (535–579), all of it. Row 1, sizes 1–6 (587–631), all of it. Row 2 (639–683) shows only its top 28 px. Sizes 7–26 are effectively **below**. | 847 – 867, **below** | 883 – 939, **below** |
| **4** (4 per row, 64 tall) | Row 1, sizes 1–4 (535–599), all of it. Row 2, sizes 5–8 (607–671), all but its bottom 4 px. Sizes 9–26 are **below**. | 1039 – 1059, **below** | 1075 – 1131, **below** |

Sections 4 and 5 are below the first screen in every option.

**Problem 2, flagged as you asked: with this order, the main button is below 667 px in every option, and so are most of the size buttons.** I haven't moved anything. Your options:

- **A. Keep it as is.** People scroll through the sizes, and the button follows them. This matches the order literally.
- **B. Make the main button sticky.** It stays in its place in section 3, but it's also pinned to the bottom of the screen while the size grid is above it (56 px button + 12 px padding above and below = 80 px). On the first screen it covers 587 – 667, which hides part of the size grid until you scroll.
- **C. Make the photo shorter.** For example, 375 x 300 instead of 375 x 375. This moves everything up 75 px, but the button still doesn't reach the first screen (Option 1: 928 – 984; Option 3: 808 – 864).
- **D. Use a more compact grid.** Option 3 puts the button at 883 px, or 808 px with C as well. Still below the fold. **The only way to get the main button onto the first screen is B**, combined with any grid option.

---

## 2. Size picker

### Problem 1: the full label doesn't fit in 44 x 44

Each size has three values: men's US, women's US and EU (for example "M 10.5 / W 12 / EU 44.5"). That doesn't fit in a 44 x 44 button at a readable size. As you asked, I haven't shrunk anything. Every option below keeps every button **at least 44 x 44**, and some are larger.

For reference, the content width is 375 − 16 left − 16 right = **343 px**. The most 44 px buttons that fit in a row with an 8 px gap is **6**: 16 + (6 x 44) + (5 x 8) + 16 = 336 px. Seven would need 16 + (7 x 44) + (6 x 8) + 16 = 388 px, which is more than 375.

#### Option 1 (my working assumption for this plan): 5 per row, three lines per button

- Button: **62 px wide x 64 px tall**. Three lines: "M 10.5", "W 12", "EU 44.5" (13 px / 13 px / 12 px type), with 6 px padding inside.
- Side padding 16 px, gap 8 px (both across and down).
- **Sum: 16 + (5 x 62) + (4 x 8) + 16 = 16 + 310 + 32 + 16 = 374 px ≤ 375** ✓
- Rows: 26 ÷ 5 = 5 full rows + 1 button (size 26) in row 6, so 6 rows.
- Grid height: (6 x 64) + (5 x 8) = 384 + 40 = **424 px**.
- Shows all three sizes on every button. Tight: the longest line, "EU 49.5", is about 43 px wide in a 50 px space. I've estimated this from font widths and need to check it in a browser before building.

#### Option 2: 5 per row, two lines (men's and women's), EU in the selection line

- Button: **62 x 52 px**. "M 10.5" and "W 12" on the button. The EU size shows in the selection line once a size is picked.
- **Sum: 16 + (5 x 62) + (4 x 8) + 16 = 374 px ≤ 375** ✓
- 6 rows. Height: (6 x 52) + (5 x 8) = 312 + 40 = **352 px**.
- Roomier text, but you can't see EU sizes without tapping.

#### Option 3: one size system at a time, with a switch

- A three-way switch above the grid: "US Men | US Women | EU" (343 x 44 px, each part about 114 px wide, 8 px gap below). Each button shows one number, like "10.5".
- Button: **50 x 44 px**, 6 per row.
- **Sum: 16 + (6 x 50) + (5 x 8) + 16 = 16 + 300 + 40 + 16 = 372 px ≤ 375** ✓
- Rows: 26 ÷ 6 = 4 full rows + 2 in row 5, so 5 rows. Height: (5 x 44) + (4 x 8) = 220 + 32 = **252 px**, plus 52 px for the switch, so 304 px.
- The most compact option, and every size system is still available. It does add a control inside the section, and you need to say which system it starts on.

#### Option 4: 4 per row, three lines, roomy

- Button: **79 x 64 px**.
- **Sum: 16 + (4 x 79) + (3 x 8) + 16 = 16 + 316 + 24 + 16 = 372 px ≤ 375** ✓
- Rows: 26 ÷ 4 = 6 full rows + 2 in row 7, so 7 rows. Height: (7 x 64) + (6 x 8) = 448 + 48 = **496 px**.
- The easiest to read, and the tallest.

### Rules that apply to every option

- **Order:** all 26 buttons are sorted by `display_order` (1 → 26), left to right, then top to bottom. The last row is left-aligned.
- **Sold-out sizes stay in place:** the 4 sold-out sizes (display_order 1, 14, 25 and 26) are greyed out in their own position, at the same size as every other button. They're never hidden, never moved to the end, and the grid never closes up around them. For example, with Option 1, M 3.5 is always the first button in row 1, and M 10 is always the 4th button in row 3.
- **Tap area:** every button's tap area is its full drawn size, at least 44 x 44, including sold-out buttons. Gaps don't overlap.
- **Selection:** only one size can be selected at a time. The selected button gets a 2 px dark border, drawn inside the button so the size doesn't change. The selection line then reads, for example: "M 9 / W 10.5 · EU 42.5 · Only 3 left".

---

## 3. Stock states

All three states come from `stock_status`. I don't recalculate them from `stock_quantity` (section 6).

| State | Sizes in the data | How it looks | What tapping does |
|---|---|---|---|
| `in_stock` | 17 sizes | Normal button: white background, dark text, light grey border. | Selects the size. After launch, the main button becomes "Add to bag". |
| `low_stock` | 5 sizes: M 4 (4 left), M 9 (3), M 9.5 (2), M 11 (5), M 15 (1) | Same as in stock, plus a small orange dot in the top-right corner. | Selects the size. The selection line shows **"Only N left"** from `stock_quantity`. **Question: show the exact count, or just "Low stock"?** |
| `sold_out` | 4 sizes: M 3.5, M 10, M 15.5, M 16 (display_order 1, 14, 25, 26) | Greyed out: grey text, a diagonal line through it, a dashed border. Same size and position as every other button, with the full tap area. | Selects the size (I'm assuming it's still tappable, see below). The main button becomes **"Notify me"**, and the selection line shows "Sold out". |

**Conflict to confirm:** "Greyed out / looks disabled" and "Notify me" pull against each other. If a sold-out button is truly disabled, you can't tap it, so there's no way to ask for a "notify me" on that size. My plan is that it looks disabled but is still tappable, and screen readers announce it as "sold out" rather than skipping it.

---

## 4. Before and after launch (`launch_date` = 2026-12-10)

Today is 18 Nov 2026, so the page starts out in pre-launch.

**Problem 3:** the order no longer has a Launch date section, and I can't add one. So the plan shows the launch date only inside the main button in section 3, which already exists and changes height for nothing.

| | Before 10 Dec 2026 | From 10 Dec 2026 |
|---|---|---|
| 3 Sizes: grid | Fully visible and selectable, showing the same stock states. | Same. |
| 3 Sizes: main button | **"Notify me · Launches 10 Dec"** for every size. Add to bag is not available. | "Add to bag" for in-stock and low-stock sizes, and "Notify me" for sold-out sizes. |
| Everything else | No change. | No change. |

**Question:** is the button label enough to show the launch date, or do you want it somewhere else? A line under "Name and price", or under the "Select size" heading, would add about 20–28 px and push everything below it down by that much.

**Guess:** the JSON has a date but no time or time zone. I'm assuming launch is at 00:00 in the shopper's local time. **Question: what time and time zone?** Should the switch happen on the server, so changing the device clock can't get around it?

**Also a guess:** before launch, should the size grid show stock levels at all? "Only 2 left" before anyone can buy may confuse people.

---

## 5. Add to bag, errors and empty states

| Situation | What happens |
|---|---|
| Nothing selected, button tapped | Nothing is added. Red text "Select a size" appears next to the "Select size" heading, and the page scrolls so the heading is at the top. The grid gets a red outline until a size is picked. Nothing changes size or moves. |
| In-stock or low-stock size, Add to bag (after launch) | The button shows a spinner and stays the same size. On success it shows "Added to bag ✓" for about 2 s, with a "View bag" link under it. Each tap adds one shoe; there's no quantity picker in the order, so I've left one out. |
| Size sold out between page load and tap | Error under the button: "Sorry, that size just sold out." The size button turns greyed out **in the same position**, and the main button becomes "Notify me". |
| Add to bag fails (network or server) | Error under the button: "Couldn't add to bag. Try again." The size stays selected and the button works again. |
| Notify me tapped | **Question:** how are people notified (email form, sign-in, app push)? The JSON doesn't say. My plan: an email field and a "Notify me" button appear inline under the main button, then "We'll email you" after submitting. |
| Stock data fails to load | Section 3 shows "Sizes couldn't load" with a "Retry" button (at least 44 px tall). The main button is disabled. |
| Stock list is empty | Section 3 shows "No sizes available". The main button is disabled. |
| Every size sold out | All 26 buttons are greyed out, each in its own position, and the main button is "Notify me". |
| Photo fails to load | A grey 375 x 375 placeholder, so nothing below it jumps. |
| No reviews yet | Section 5 shows "No reviews yet". |

---

## 6. Where each piece of data comes from

| Page element | JSON field | Notes |
|---|---|---|
| Product name | `product_name` | "Nike Pegasus 43", the same on all 26 entries. |
| Colour name (if kept, question 4) | `colorway` | "Black/White-Volt". |
| Price | `price` | 140.00 → "$140.00". **There's no currency field**, so I'm guessing USD. |
| Launch date (in the button) | `launch_date` | "2026-12-10", date only. |
| Button order | `display_order` | 1–26. |
| Button, men's | `size_us_men` | A number, e.g. 10.5 → "M 10.5". |
| Button, women's | `size_us_women` | A number, e.g. 12 → "W 12". |
| Button, EU | `size_eu` | A **string**, e.g. "44.5" → "EU 44.5". |
| Full label (screen readers, selection line) | `size_label` + `size_eu` | e.g. "M 10.5 / W 12" + "EU 44.5". |
| Stock state | `stock_status` | in_stock / low_stock / sold_out. |
| "Only N left" | `stock_quantity` | Only shown for low_stock. |
| Can it be bought? | `in_stock` | Matches `stock_status` on all 26 entries (false only on sold_out). I use `stock_status`. If the two ever disagree, I treat the size as sold out. |
| Item added to bag | `sku` | e.g. "HV7521-001-105". |
| Style code (tech copy) | `style_code` | "HV7521-001". This is the only tech-copy field in the JSON. |

---

## 7. What order.md needs that the stock data doesn't support, or conflicts with

1. **Photos (section 1):** the JSON has no image URLs or alt text. Where do the photos come from?
2. **Tech copy (section 4):** the only field available is `style_code`. There's no description, materials, weight or drop.
3. **Reviews (section 5):** the JSON has no ratings, review count or review text.
4. **Launch date:** the JSON has a `launch_date`, but the order has no section for it (Problem 3). There's also no launch time or time zone.
5. **Colour:** the JSON has a `colorway`, and the product is "Black/White-Volt", but the section is "Name and price", with no colour. The plan shows the colour name as a line in section 2; see question 4.
6. **"Notify me":** there's no data or endpoint for sign-ups, and it conflicts with the sold-out buttons being greyed out (section 3 above).
7. **Price:** there's no currency.
8. **No header or navigation:** the order has no site header, so the plan has none, and the photos start at 0 px. If a header is expected, that's a change to the order, and it pushes everything about 56 px further down.
9. **Sizes vs. the first screen:** with this order, the main button and most of the size buttons fall below 667 px (Problem 2).

---

## Checklist: fixed requirements

- [x] Every layout is planned at 375 px wide first. All four grid options add up to 375 px or less (374, 374, 372, 372).
- [x] Every size button is at least 44 px wide and 44 px tall. The smallest is 50 x 44 (Option 3).
- [x] Sold-out buttons look greyed out but keep the full button size and tap area.
- [x] Nothing has been shrunk to fit. What doesn't fit (the full size label in 44 x 44) is flagged, with four options.
- [x] The order is copied from prompt.md as a numbered list and used exactly: Photos, Name and price, Sizes, Tech copy, Reviews. Nothing is reordered, merged or added.
- [x] Differences with order.md are listed. There are none in the order or the section names.
- [x] The Add to bag / Notify me button sits directly under the size buttons, inside Sizes (only the selection line sits between them, see question 6).
- [x] All 4 sold-out sizes stay greyed out in their own display_order positions, at the same size as the other buttons. None are hidden or moved, and no gaps are closed up.
- [x] The first screen (375 x 667) is listed part by part, for every grid option, saying which parts are inside it and which are below.
- [x] It's flagged that this order pushes the main button, and most of the size buttons, below 667 px. Nothing was moved; options A–D are given.
- [x] No code written.

---

## Questions: things I had to guess

1. **Size grid:** which option, 1, 2, 3 or 4? The plan assumes Option 1. If you pick Option 3, which size system should it start on?
2. **Main button below the fold:** which option, A, B, C or D?
3. **Spacing and type:** are 16 px side padding, 8 px gaps, a 375 x 375 photo and the type sizes I used OK? Every height above depends on them.
4. **Colour:** should "Black/White-Volt" show in "Name and price", even though the section name doesn't mention colour? If not, everything below moves up 24 px.
5. **Launch date:** is "Notify me · Launches 10 Dec" on the button enough, since there's no launch section? What time and time zone does it launch?
6. **Selection line:** is it OK for the 20 px selection line ("M 9 / W 10.5 · EU 42.5 · Only 3 left") to sit between the size buttons and the main button? If "directly under" means nothing in between, I'd move it above the grid, next to the heading.
7. **Low stock:** show "Only N left", or just "Low stock"? And should stock show at all before launch?
8. **Sold out:** can sold-out buttons stay tappable so people can use "Notify me", while still looking greyed out?
9. **Before launch:** is "Notify me" the right button for every size, or do you want pre-orders?
10. **Notify me:** how do people sign up (email field, account, push)?
11. **Currency:** is it USD ($)?
12. **Content:** where do the photos, tech copy and reviews come from?
13. **Header:** should the page have no site header, as the order implies?
14. **Quantity:** is one pair per tap OK, with no quantity picker?
