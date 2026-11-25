# Automated Responsive Testing with BackstopJS

## Overview

BackstopJS is set up to automatically test your portfolio across **9 different viewports** (320px to 1920px) and catch any layout issues or regressions.

## Quick Start

### 1. Create Baseline (Reference) Screenshots

First time setup - capture the current "good" state of your site:

```bash
# Make sure dev server is running first!
npm run dev

# In a new terminal:
npm run test:reference
```

This creates reference screenshots for all 9 viewports.

### 2. Test for Regressions

After making CSS/layout changes, run:

```bash
npm run test:responsive
```

BackstopJS will:
- ✅ Capture new screenshots
- ✅ Compare them to reference screenshots
- ✅ Highlight any visual differences
- ✅ Open an HTML report showing pass/fail for each viewport

### 3. Review Results

If tests fail (expected when you make intentional changes):

```bash
npm run test:report
```

This opens the visual report in your browser showing:
- Side-by-side before/after comparisons
- Difference highlights
- Pass/fail status for each viewport

### 4. Approve Changes

If the changes look good and you want to update the baseline:

```bash
npm run test:approve
```

This replaces the old reference screenshots with the new ones.

---

## Tested Viewports

BackstopJS tests these 9 viewports automatically:

| Viewport | Width | Height | Device Type |
|----------|-------|--------|-------------|
| **phone_se** | 320px | 568px | iPhone SE (smallest) |
| **phone_small** | 375px | 667px | iPhone 6/7/8 |
| **phone_medium** | 390px | 844px | iPhone 12/13/14 |
| **phone_large** | 425px | 844px | Large mobile |
| **tablet_portrait** | 768px | 1024px | iPad portrait |
| **tablet_landscape** | 1024px | 768px | iPad landscape |
| **desktop_small** | 1280px | 720px | Small desktop |
| **desktop_medium** | 1440px | 900px | Standard desktop |
| **desktop_large** | 1920px | 1080px | Large desktop |

---

## Typical Workflow

```bash
# 1. Make CSS changes
# Edit globals.css or component styles

# 2. Test for issues
npm run test:responsive

# 3. Review the report (opens automatically)
# Check if layout broke on any viewport

# 4. If changes look good, approve them
npm run test:approve

# 5. If there are issues, fix the CSS and repeat from step 2
```

---

## What BackstopJS Catches

✅ **Horizontal overflow** at any viewport  
✅ **Layout shifts** when resizing  
✅ **Text wrapping issues**  
✅ **Element positioning problems**  
✅ **Margin/padding inconsistencies**  
✅ **Responsive breakpoint bugs**  
✅ **Visual regressions** from code changes

---

## Troubleshooting

### "Navigation timeout" error

The dev server might not be running. Ensure:
```bash
npm run dev
# Wait for "Ready on http://localhost:3000"
# Then in another terminal:
npm run test:reference
```

### Tests failing after intentional changes

This is normal! Review the report:
```bash
npm run test:report
```

If changes look correct, approve them:
```bash
npm run test:approve
```

### "Connection refused" error

Make sure Next.js dev server is running at `http://localhost:3000`

---

## Configuration

Edit `backstop.json` to:
- Add/remove viewports
- Change test delay times
- Adjust mismatch threshold
- Add more test scenarios

---

## Files Created

```
backstop.json                           # Main configuration
backstop_data/
  ├── bitmaps_reference/  # "Good" baseline screenshots
  ├── bitmaps_test/       # New test screenshots
  └── html_report/        # Visual comparison reports
```

---

## Best Practices

1. **Run tests before committing** - Catch issues early
2. **Update reference after approved changes** - Keep baseline current
3. **Check all viewports in report** - Don't assume all pass/fail
4. **Use with responsive-test.js** - Complement automated with manual testing
5. **Commit reference screenshots** - Share baseline with team (if applicable)

---

## Advanced Usage

### Test specific viewports only

Edit `backstop.json` and comment out unwanted viewports.

### Increase test coverage

Add more scenarios to test specific sections:

```json
{
  "label": "Contact_Section",
  "url": "http://localhost:3000",
  "selectors": ["#contact"],
  "delay": 1500
}
```

### Change mismatch tolerance

In `backstop.json`:
```json
{
  "misMatchThreshold": 0.2  // 0.2% difference allowed
}
```

---

## Summary

BackstopJS gives you **automated visual regression testing** so you never have to manually check every viewport size again. It's like having a QA team that tests all 9 breakpoints in seconds!

**Key Commands:**
- `npm run test:reference` - Create baseline
- `npm run test:responsive` - Run tests
- `npm run test:approve` - Accept changes
- `npm run test:report` - View results
