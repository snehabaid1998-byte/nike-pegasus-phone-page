Make sure the Pegasus page is live with the latest code, then run a mobile Lighthouse check on the live URL using Diego's settings. Work in the pegasus-43-page folder (the GitHub repo is nike-pegasus-phone-page). Don't change the page code or speed-budget.json.

1. CONFIRM THE LIVE PAGE IS UP TO DATE
- The page is deployed on Vercel at https://pegasus-43-page.vercel.app through the GitHub integration, from the pegasus-page folder.
- Check that the live page is serving the latest commit on main: open it and confirm it has data-testid="price" and data-testid="main-photo", and that it loads no web font files.
- If it's out of date, or Vercel lost the link after the repo rename, stop and tell me what you see. Don't create a second Vercel project.

2. SET UP LIGHTHOUSE WITH DIEGO'S SETTINGS
Create lighthouse/config.js with these exact settings from the Web Platform Slow 4G Mobile Check Profile:
- formFactor: mobile
- throttlingMethod: simulate
- throttling: rttMs 150, throughputKbps 1638.4, requestLatencyMs 562.5, downloadThroughputKbps 1474.56, uploadThroughputKbps 675, cpuSlowdownMultiplier 4
- screenEmulation: width 375, height 812, deviceScaleFactor 3, mobile true, disabled false
- Only the performance category
Use Google Chrome, which is installed on this machine.

3. RUN IT ON THE LIVE URL
Run Lighthouse 3 times on https://pegasus-43-page.vercel.app with that config (npx lighthouse, the config path, JSON and HTML output). Save the reports in lighthouse/ as run-1, run-2 and run-3. Use the median performance score as the result.

4. CHECK IT AGAINST speed-budget.json
- performance_score_min 90: is the median score 90 or higher?
- size_grid_shift_px_max 0: does the size grid move at all? Report CLS and any layout shifts.
- size_button_min_px 44: is the smaller side of every size-button and size-button-sold-out at least 44 px?
- Are all five watched test IDs found: size-grid, size-button, size-button-sold-out, main-photo, price?
Also report FCP, LCP (and which element), Total Blocking Time and Speed Index.

5. WRITE IT UP
Create notes/lighthouse-results.md with the settings used, the 3 scores and the median, the pass or fail for each of the three budget keys, the metrics from step 4, and the top 3 Lighthouse suggestions, if any. If anything fails, say exactly what and why. Don't fix it yet.
Add lighthouse/ and notes/lighthouse-results.md to the README file list.

6. PUSH AND REPORT
Commit with the message "Add mobile Lighthouse results for the live page" and push. Don't force-push. Then tell me the median score, pass or fail for each budget key, and the repo link.
