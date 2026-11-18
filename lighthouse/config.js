// Lighthouse config for the mobile launch check.
// Every value below is copied exactly from Diego Salazar's
// Web Platform Slow 4G Mobile Check Profile (lighthouse_settings).
// Don't change these values in this repo: changes go through a PR on the profile.
//
// Run (from the repo root):
//   npx lighthouse@13.6.0 https://pegasus-43-page.vercel.app --config-path=./lighthouse/config.js \
//     --output=json --output=html --output-path=./lighthouse/run-1 \
//     --chrome-path="C:\Program Files\Google\Chrome\Application\chrome.exe"

module.exports = {
  extends: "lighthouse:default",
  settings: {
    // Scores the page as a phone, using the mobile scoring rules.
    formFactor: "mobile",

    // Loads at full speed, then simulates the slow network and CPU below.
    throttlingMethod: "simulate",

    throttling: {
      // Lighthouse's "Slow 4G" preset (used by the simulator).
      rttMs: 150,
      throughputKbps: 1638.4,
      // Used when the real browser is slowed (devtools throttling).
      requestLatencyMs: 562.5,
      downloadThroughputKbps: 1474.56,
      uploadThroughputKbps: 675,
      // 4x CPU slowdown.
      cpuSlowdownMultiplier: 4,
    },

    screenEmulation: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      mobile: true,
      disabled: false,
    },

    // Only the performance category.
    onlyCategories: ["performance"],
  },
};
