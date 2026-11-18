# Speed budget notes

[`speed-budget.json`](../speed-budget.json) is the file the mobile launch check reads. It has the three keys from Diego Salazar's Web Platform Slow 4G Mobile Check Profile, and nothing else:

```json
{
  "performance_score_min": 90,
  "size_grid_shift_px_max": 0,
  "size_button_min_px": 44
}
```

| Key | Value | What it means |
|---|---|---|
| `performance_score_min` | **90** | The Lighthouse mobile performance score (0 to 100) of the live Vercel page has to be 90 or higher. It is measured with the profile's phone settings: Slow 4G network, 4x CPU slowdown, and a 375 x 812 screen at 3x. |
| `size_grid_shift_px_max` | **0** | The size grid (`[data-testid="size-grid"]`) may not move at all. Its top edge has to stay in the same place, in CSS px, from first paint until the page is fully loaded. 0 is the only value the profile allows. |
| `size_button_min_px` | **44** | Every size button, sold-out ones included (`[data-testid="size-button"]` and `[data-testid="size-button-sold-out"]`), has to be at least 44 CSS px in both width and height. The check uses the smaller of the two. 44 x 44 px is also the design system's touch target floor. The page's buttons are 62 x 64 px. |

## They match Diego's profile exactly

All three values are the same as the profile's `required_value`s: 90, 0 and 44. None is looser, which would fail the launch check, and none is stricter. The file has exactly the three keys the profile lists, with no missing or extra keys, because either of those would also fail the check.

Under the profile's policy, a page owner could make a value stricter: a higher score (up to 100), or bigger buttons (above 44). `size_grid_shift_px_max` can't be made stricter, because 0 is already the lowest value. These values come from the profile and shouldn't be changed in this repo. Changes go through a PR on the profile, reviewed by Diego.
