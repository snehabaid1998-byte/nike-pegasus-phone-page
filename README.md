# Nike Pegasus 43 phone product page

Planning notes for a phone-first product page for the Nike Pegasus 43 (Black/White-Volt), built from a size and stock list of 26 sizes.

The page is planned at **375 px wide**, with a first screen of 375 x 667 px. Every size button is at least 44 x 44 px, and sold-out sizes stay greyed out in their own place.

## Section order

1. Photos
2. Name and price (Nike Pegasus 43, Black/White-Volt, $140.00, shown once)
3. Sizes (26 buttons, with a sticky Add to bag / Notify me button underneath)
4. Tech copy
5. Reviews

## Decisions

- **Size grid:** Option 1. 5 buttons per row, 62 x 64 px, each showing men's US, women's US and EU sizes. 16 + (5 x 62) + (4 x 8) + 16 = 374 px.
- **Main button:** sticky at the bottom of the screen, so it shows on the first screen.
- **Launch date:** shown on the button, "Notify me · Launches 10 Dec", until 10 December 2026.

## What's in `notes/`

| File | What it is |
|---|---|
| `page-plan-final.md` | The final plan document: the page plan, the final prompt, what I checked, and my decisions |
| `PAGE_PLAN.md` | The page plan Claude Code wrote from `prompt.md` |
| `prompt.md` | The prompt that produced the plan, with the fixed requirements |
| `order.md` | The section order |
| `build.md` | The prompt for building the page in Next.js |
| `push.md` | The prompt for putting the built page on GitHub |
| `nike_pegasus_size_stock_….json` | The Pegasus 43 size and stock list |

The Google Doc version of the plan: https://docs.google.com/document/d/1SteBFWYTyxsNt_9q5JAWZO4FAHlm-3FFer97I9C3E9U/edit?usp=sharing

## Next step

The Next.js page itself is built by running `build.md` in Claude Code, and will be added to this repo.
