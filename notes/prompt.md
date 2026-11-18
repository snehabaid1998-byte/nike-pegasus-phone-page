Read order.md and nike_pegasus_size_stock_b2ebb9fac7f74d6a8bb3432d7642176f.json in this folder.

Write a page plan for the Nike Pegasus 43 (Black/White-Volt) product page and save it as PAGE_PLAN.md. Don't write any code yet. I want to review the plan first.

FIXED REQUIREMENTS (do not change these or pick your own values):
- The page is designed for a phone screen exactly 375 px wide (CSS pixels). Plan every layout at that width first.
- Every size button is at least 44 px wide and 44 px tall. That includes sold-out buttons: they look disabled but keep the full 44 x 44 tap area.
- If something doesn't fit at 375 px with 44 x 44 buttons, don't shrink anything. Tell me what doesn't fit and give me options.
- Section order: the page goes in exactly this order, top to bottom: 1. Photos, 2. Name and price, 3. Sizes, 4. Tech copy, 5. Reviews. Use this order even if order.md says something different, and list every difference you find. Don't reorder, merge or add sections. The Add to bag / Notify me button sits directly under the size buttons, as part of Sizes. Start the plan by copying this order back as a numbered list so I can check it.
- Sold-out sizes: every sold-out size stays greyed out in its own display_order position, at the same size as the other buttons (at least 44 x 44). Never hide them, move them to the end of the grid, or close up the gap they leave.
- First screen: the first screen is the top 375 x 667 px of the page, before any scrolling. Say exactly which sections, or parts of sections, fall inside it and which fall below. If this order pushes the size picker or the main button below 667 px, tell me. Don't move them yourself.

The plan should cover:
1. Every section of the page, top to bottom, and what each one does
2. The size picker: how all 26 sizes show, in display_order, with men's and women's US sizes and EU sizes. Give the side padding, the gap between buttons, the button width and height, and how many buttons fit per row. Show the sum so I can check it adds up to 375 px or less.
3. How each stock state looks and behaves: in_stock, low_stock (show the count?) and sold_out (disabled, plus a "notify me" option?)
4. Pre-launch behaviour, since launch_date is 2026-12-10. What does the page do before and after that date?
5. Add to bag, error and empty states
6. Where each piece of data comes from in the JSON file
7. Anything in order.md that the stock data doesn't support, or that conflicts with it

End with a checklist that confirms all the fixed requirements are met, then ask me about anything you had to guess.
