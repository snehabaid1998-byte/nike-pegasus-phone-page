Read PAGE_PLAN.md and nike_pegasus_size_stock_b2ebb9fac7f74d6a8bb3432d7642176f.json in this folder.

Build the Nike Pegasus 43 (Black/White-Volt) product page in Next.js, following PAGE_PLAN.md. Create the app in a new folder called pegasus-page, using create-next-app with the App Router, TypeScript and Tailwind. Don't add any other UI libraries.

FIXED REQUIREMENTS (do not change these or pick your own values):
- Phone first: design and check everything at exactly 375 px wide. The first screen is the top 375 x 667 px.
- Section order, top to bottom: 1. Photos, 2. Name and price, 3. Sizes, 4. Tech copy, 5. Reviews. Don't reorder, merge or add sections.
- Name and price shows once on the page: "Nike Pegasus 43", then the colorway "Black/White-Volt", then "$140.00". Read all three from the JSON. Don't repeat the price or colorway on the size buttons.
- Size grid: Option 1 from the plan. 5 buttons per row, each 62 px wide x 64 px tall, 16 px side padding, 8 px gaps. Sum: 16 + (5 x 62) + (4 x 8) + 16 = 374 px. Each button shows three lines: men's US ("M 10.5"), women's US ("W 12") and EU ("EU 44.5"), from size_us_men, size_us_women and size_eu. Sort all 26 by display_order.
- Every size button is at least 44 x 44, including sold-out ones. Don't shrink text, buttons or gaps to make anything fit. If the text doesn't fit, stop and tell me.
- Stock states come from stock_status:
  - in_stock: normal button.
  - low_stock: small orange dot in the top-right corner. The selection line shows "Only N left" from stock_quantity.
  - sold_out: greyed out (grey text, diagonal line, dashed border) in its own display_order position, same size as the others. Never hide it, move it or close up the gap. It stays tappable, and screen readers announce it as "sold out".
- Main button: Option B from the plan. It's part of Sizes, directly under the size buttons, and also sticky at the bottom of the screen while the grid is in view (56 px tall, 12 px padding above and below).
- Launch date: launch_date is 2026-12-10. Before that date, the button reads "Notify me · Launches 10 Dec" for every size. From that date, it reads "Add to bag" for in-stock and low-stock sizes, and "Notify me" for sold-out sizes.
- Photos, tech copy and reviews have no data in the JSON. Use clearly labelled placeholders (a grey 375 x 375 box, "Tech copy goes here", "No reviews yet"). Don't make up product facts or reviews.
- Add to bag and Notify me have no backend. Use the states from section 5 of the plan, with a fake success after a short delay, and mark that code with a TODO.

When you're done:
1. Run npm run build and fix any errors.
2. Start the dev server and check the page at 375 x 667. Tell me exactly what shows on the first screen.
3. Check that all 26 buttons are at least 44 x 44, that the 4 sold-out sizes (display_order 1, 14, 25, 26) are greyed out in place, and that the longest label, "EU 49.5", fits without being cut off.
4. Give me a checklist of every fixed requirement above, marked done or not done.

WHAT TO HAND BACK:
- The finished Next.js project in the pegasus-page folder, ready to run: the page in app/page.tsx, the size grid as its own component, and the stock JSON copied into the project so the page reads from it.
- A README.md in pegasus-page with the exact commands to run it (npm install, then npm run dev) and the address to open (http://localhost:3000).
- Steps to view it at phone size: open the address in Chrome or Edge, press F12, then Ctrl+Shift+M, and set the size to 375 x 667.
- Leave the dev server running at the end, and tell me the address.
- Your final message: what's on the first screen at 375 x 667, the results of checks 1 to 3, the checklist, and every TODO or placeholder you left.
