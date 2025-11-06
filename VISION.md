# Scale - Make Numbers Human

## The Problem

When you read "5 billion" in an article, your brain can't comprehend it. It's just... a word. A big word. But is it bigger than a million? How much bigger? You know intellectually it's 5,000x larger, but you don't *feel* it.

This is why:
- Budget numbers feel abstract
- Population statistics don't register
- Scientific measurements seem arbitrary
- We can't evaluate proposals based on scale

**Big numbers are invisible.**

## The Solution

A browser extension that detects large numbers and visualizes them through multiple human-scale metaphors.

### The Experience

1. **Browse normally** - You're reading any article online
2. **Numbers are highlighted** - Large numbers (>10,000) get a subtle underline
3. **Hover for quick context** - See basic comparison in a tooltip
4. **Click for deep visualization** - Open a beautiful page with multiple visual models
5. **Share understanding** - URLs are shareable, visualizations are embeddable

### The Visual Models

Different numbers need different metaphors. Our system adapts:

#### 1. Time Scale
*"If you counted 1 number per second..."*
- **10,000** = 2.8 hours
- **1 million** = 11.6 days
- **1 billion** = 31.7 years
- **1 trillion** = 31,710 years

**Visualization:** Animated counter with clock showing time passage

#### 2. Physical Space
*"If each unit was a 1cm cube..."*
- Volume visualization
- Height if stacked
- Area if laid flat
- Comparison to familiar objects (rooms, buildings, cities)

**Visualization:** 3D rendered cube with rotation, comparison overlays

#### 3. Pixel Grid
*"If each unit was 1 pixel..."*
- Show on screen how many pixels that is
- Demonstrate fill patterns
- Reveal impossibility of large numbers

**Visualization:** Animated grid fill, overflow indication

#### 4. Human Scale
*"If each unit was a person..."*
- Stadium comparisons (capacity ~50k)
- City populations
- Country populations
- "X times the population of [place]"

**Visualization:** Animated dots filling stadiums/maps

#### 5. Money
*"If each unit was $1..."*
- What could you buy?
- Stacked bills (height)
- Laid out bills (area)
- Comparison to salaries, budgets, GDPs

**Visualization:** Money stack with comparison purchases

#### 6. Distance
*"If each unit was 1 step (2.5 feet)..."*
- Walking distance
- Comparison to known distances
- Earth circumference, moon distance, etc.

**Visualization:** Path on map with milestones

#### 7. Comparative
*"This number vs other known numbers"*
- Logarithmic scale showing orders of magnitude
- Side-by-side bar charts
- Context-aware (if it's money, compare to other money values)

**Visualization:** Beautiful log scale with labeled reference points

## Design Philosophy

### Dieter Rams' 10 Principles Applied:

1. **Innovative** - No one has made numbers tangible like this
2. **Useful** - Solves real comprehension problem
3. **Aesthetic** - Every visualization is beautiful
4. **Understandable** - Instant clarity, no learning curve
5. **Unobtrusive** - Enhances reading, doesn't interrupt
6. **Honest** - Accurate representations, no manipulation
7. **Long-lasting** - Timeless design, not trendy
8. **Thorough** - Every detail considered
9. **Environmentally friendly** - Minimal code, fast performance
10. **As little design as possible** - Pure, simple, essential

### Visual Design Language

**Colors:**
- Primary: Deep blue (#0A1E3D) - trust, depth
- Accent: Bright cyan (#00D9FF) - highlight, energy
- Background: Off-white (#F8F9FA) - ease, clarity
- Text: Near-black (#1A1A1A) - readability

**Typography:**
- Headers: SF Pro Display / -apple-system
- Numbers: SF Mono / monospace (precision)
- Body: SF Pro Text / system-ui (familiarity)

**Motion:**
- Ease: cubic-bezier(0.4, 0.0, 0.2, 1) - Apple's curve
- Duration: 300-400ms - feels instant but visible
- Purpose: Every animation reveals information

**Spacing:**
- 8px base unit
- Generous whitespace
- Content breathes

## Technical Architecture

### Browser Extension
- Manifest V3 (future-proof)
- Content script detects numbers via regex
- Minimal DOM manipulation
- No external dependencies in extension

### Web App
- Static HTML/CSS/JS (no build complexity)
- Progressive enhancement
- Canvas/SVG for visualizations
- Shareable URLs with number encoded
- No backend needed (initially)

### File Structure
```
/extension
  manifest.json
  content-script.js
  popup.html
  popup.js
  styles.css

/webapp
  index.html
  visualize.html
  /js
    visualizations.js
    number-detector.js
    utils.js
  /css
    main.css
    visualizations.css
  /assets
    (minimal icons/images)

/docs
  README.md
  CONTRIBUTING.md
  examples/
```

## Success Criteria

We'll know this works when:
1. People say "I never realized how big that was"
2. Journalists embed our visualizations in articles
3. Teachers use it to explain scale
4. It changes how people evaluate proposals
5. Someone says "How did we read numbers before this?"

## The First Release

**MVP Features:**
1. Browser extension detects numbers > 10,000
2. Click opens visualization page
3. 3 core visualizations: Time, Physical Space, Comparative
4. Beautiful, minimal design
5. Shareable URLs

**What we cut (for now):**
- Context-aware suggestions
- Custom comparison builders
- Social features
- Mobile app
- API for developers

**Why:** Do one thing insanely well first.

---

*"Simplicity is the ultimate sophistication." - Leonardo da Vinci*
