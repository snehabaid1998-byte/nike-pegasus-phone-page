# Trace prompt

The prompt used in Claude Code to record the Slow 4G phone trace. The results are in [`trace-findings.md`](trace-findings.md), and the raw trace is [`traces/slow-4g-live.json`](../traces/slow-4g-live.json).

```text
RUN THE TRACE
Record a phone performance trace of https://pegasus-43-page.vercel.app using the Chrome DevTools MCP, with the settings from Diego's Slow 4G mobile check profile:
- Viewport 375 x 812 CSS px, device pixel ratio 3, mobile and touch on
- Network: 562.5 ms latency, 1474.56 Kbps down, 675 Kbps up
- CPU: 4x slowdown
- Cache disabled
Reload with the trace running and stop once the page is fully loaded. Save the raw trace as traces/slow-4g-live.json.
If the Chrome DevTools MCP isn't available, stop and tell me to run: claude mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
```

## Note on the network setting

The Chrome DevTools MCP can only pick a named network preset, so the trace used its "Slow 4G" preset. That preset has the same 562.5 ms latency. Its speeds are about 4.6% slower down and 2.3% slower up than the profile's values as Lighthouse applies them. See "What was traced" in `trace-findings.md` for the numbers.
