# Nike Pegasus 43 product page

A phone-first product page for the Nike Pegasus 43 (Black/White-Volt), built in Next.js from `../notes/PAGE_PLAN.md` and `../notes/build.md`. It's designed at 375 px wide.

## Run it

In this `pegasus-page` folder:

```
npm install
npm run dev
```

Then open **http://localhost:3000**.

## View it at phone size

1. Open http://localhost:3000 in Chrome or Edge.
2. Press **F12** to open the developer tools.
3. Press **Ctrl+Shift+M** to turn on the device toolbar.
4. Set the size to **375 x 667**.

To see the page as it will look after launch (10 Dec 2026), open http://localhost:3000/?preview=after-launch. This is for checking only.

## Where things are

| File | What it is |
|---|---|
| `app/page.tsx` | The page: Photos, Name and price, Sizes, Tech copy, Reviews |
| `app/components/SizeGrid.tsx` | The 26-button size grid (5 per row, 62 x 64 px) |
| `app/components/SizePicker.tsx` | The Sizes section: the grid, the selection line and the sticky Add to bag / Notify me button |
| `lib/stock.ts` | Reads the stock JSON, sorts it by `display_order`, and works out the launch date |
| `data/nike_pegasus_size_stock_b2ebb9fac7f74d6a8bb3432d7642176f.json` | The size and stock list the page reads from |

## Placeholders and TODOs

- Photos, tech copy and reviews are placeholders. The JSON has no data for them.
- Add to bag and Notify me have no backend. They wait a short time, then always succeed (`fakeAddToBag` and `fakeNotifyMe` in `SizePicker.tsx`).
- "View bag" links to `#`, because there's no bag page yet.
- The price is shown in USD, and launch is at 00:00 on 10 Dec in the shopper's local time. Both are guesses, because the JSON has no currency, launch time or time zone.
