# Scale - Make Numbers Human

> *When you read "5 billion" do you really understand how big that is?*

**Scale** transforms incomprehensible numbers into tangible experiences through beautiful visualizations.

---

## The Problem

Big numbers are invisible. When you read an article about:
- Government budgets ($2.1 trillion)
- Population statistics (7.9 billion people)
- Scientific measurements (5 million years)
- Tech company valuations ($100 billion)

Your brain treats them all the same: "big number." But the difference between a million and a billion is the difference between 1 month and 83 years.

**We can't make informed decisions about things we don't understand.**

## The Solution

Scale is a browser extension and web app that:

1. **Detects** large numbers as you browse
2. **Highlights** them subtly in articles
3. **Visualizes** them when you click through multiple human-scale metaphors:
   - ⏰ **Time** - "If you counted 1/second, it would take 31.7 years"
   - 📦 **Physical Space** - "Stacked cubes would reach space"
   - 📊 **Comparisons** - Visual bars against known quantities
   - 👥 **Human Scale** - "158 times the population of California"

## Features

### Browser Extension
- Automatically detects numbers > 10,000 in web pages
- Subtle, non-intrusive highlighting
- One click to visualize
- Works on any website

### Web App
- Beautiful, fast visualizations
- Multiple perspectives on every number
- Shareable URLs
- Mobile-friendly
- No accounts, no tracking, just pure utility

## Installation

### Web App (Try It Now)

1. Open `webapp/index.html` in your browser
2. Enter any number to visualize
3. Share the URL with others

For production:
```bash
# Deploy to any static host
# Netlify, Vercel, GitHub Pages, etc.
cd webapp
# Upload to your hosting service
```

### Browser Extension

#### Development Mode (Chrome/Edge)

1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension/` directory
5. Browse any website - numbers will be highlighted!

#### Development Mode (Firefox)

1. Open `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `extension/manifest.json`

#### Before Using

Update the visualization URL in:
- `extension/content-script.js` - Set `CONFIG.vizBaseURL`
- `extension/popup.js` - Set `VIZ_BASE_URL`

To your deployed webapp URL or local path.

## Project Structure

```
Scale/
├── webapp/                 # Web application
│   ├── index.html         # Landing page
│   ├── visualize.html     # Visualization page
│   ├── css/
│   │   ├── main.css       # Core styles
│   │   └── visualizations.css
│   └── js/
│       ├── landing.js     # Landing page logic
│       ├── visualize.js   # Main visualization controller
│       ├── visualizations.js  # Rendering logic
│       └── utils.js       # Helper functions
│
├── extension/             # Browser extension
│   ├── manifest.json      # Extension config
│   ├── content-script.js  # Number detection
│   ├── content-styles.css # Highlighting styles
│   ├── popup.html         # Extension popup
│   └── popup.js           # Popup logic
│
├── VISION.md              # Design philosophy & roadmap
└── README.md              # You are here
```

## Design Philosophy

Scale embodies the intersection of **technology and liberal arts**.

### Principles

1. **Invisible Design** - The tool should disappear, leaving only understanding
2. **Instant Clarity** - No cognitive load, immediate comprehension
3. **Beautiful Craft** - Every detail considered, every pixel intentional
4. **Honest Representation** - Accurate, unmanipulated visualizations
5. **Ruthless Simplicity** - Remove everything that doesn't serve the goal

### Influenced By

- **Dieter Rams** - "Less, but better"
- **Edward Tufte** - Data visualization excellence
- **Apple HIG** - Clarity, deference, depth
- **XKCD** - Making complex things accessible through visuals

## Examples

Try visualizing these numbers:

- **1,000,000** - One million (Common but still big)
- **1,000,000,000** - One billion (1000× larger!)
- **7,900,000,000** - World population
- **31,536,000** - Seconds in a year
- **400,000,000,000** - Stars in the Milky Way

## Technical Details

### Stack
- **Pure HTML/CSS/JS** - No frameworks, no dependencies
- **Vanilla ES6+** - Modern, clean, fast
- **CSS Grid & Flexbox** - Responsive layout
- **Canvas/SVG** - Visualizations (future)
- **Manifest V3** - Future-proof extension

### Browser Support
- Chrome/Edge 88+
- Firefox 89+
- Safari 14+ (webapp only, extension coming)

### Performance
- **< 50ms** initial page load
- **< 100ms** visualization render
- **< 1KB** extension content script
- **Zero dependencies**

## Roadmap

### v1.0 - MVP ✓
- [x] Web app with 4 core visualizations
- [x] Browser extension with number detection
- [x] Beautiful, minimal UI
- [x] Shareable URLs

### v1.1 - Polish
- [ ] Context-aware comparisons (money vs. time vs. people)
- [ ] Animated 3D visualizations (physical space)
- [ ] More comparison data points
- [ ] Firefox extension store submission

### v1.2 - Intelligence
- [ ] Detect context (article about money → money comparisons)
- [ ] Historical number tracking (budgets over time)
- [ ] "Trending numbers" - what people are visualizing

### v2.0 - Expansion
- [ ] Mobile app (camera → detect numbers in real world)
- [ ] API for developers
- [ ] Embeddable visualization widget
- [ ] Browser extension store release

## Contributing

This project is about **craft**. If you contribute:

1. **Read VISION.md** - Understand the philosophy
2. **Maintain the aesthetic** - Every detail matters
3. **Test thoroughly** - It must work perfectly
4. **Write clear code** - Others will read this
5. **Simplify ruthlessly** - Can it be simpler?

## License

MIT - Use it, learn from it, build upon it.

## Credits

Created with an obsession for making complex things simple.

Inspired by every person who ever said: "I didn't realize it was that big."

---

*"The people who are crazy enough to think they can change the world are the ones who do."*

**Try it now:**
Open `webapp/index.html` and visualize 5 billion.
You'll never see numbers the same way again.
