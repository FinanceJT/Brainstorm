# Installation & Setup Guide

## Quick Start (5 minutes)

### 1. Test the Web App Locally

```bash
# Navigate to the webapp directory
cd webapp

# Open index.html in your browser
# On macOS:
open index.html

# On Linux:
xdg-open index.html

# On Windows:
start index.html
```

**Try it:**
- Enter any large number (e.g., 5000000000)
- Click "Visualize It"
- See the beautiful visualizations!

---

### 2. Install the Browser Extension (Development)

#### For Chrome/Edge:

1. Open your browser and navigate to:
   ```
   chrome://extensions/
   ```

2. Enable **Developer mode** (toggle in top-right corner)

3. Click **"Load unpacked"**

4. Navigate to and select the `extension/` directory

5. The Scale extension should now appear in your extensions list!

#### For Firefox:

1. Navigate to:
   ```
   about:debugging#/runtime/this-firefox
   ```

2. Click **"Load Temporary Add-on..."**

3. Navigate to the `extension/` directory

4. Select the `manifest.json` file

5. The extension is now active!

---

### 3. Configure the Extension

**IMPORTANT:** Before using the extension, you need to update the visualization URL.

#### Option A: Use Local Files (Testing)

Edit these files:

**`extension/content-script.js`** (line 7):
```javascript
vizBaseURL: 'file:///absolute/path/to/webapp/visualize.html',
```

**`extension/popup.js`** (line 5):
```javascript
const VIZ_BASE_URL = 'file:///absolute/path/to/webapp/visualize.html';
```

Replace `/absolute/path/to/` with the actual path on your system.

Example:
- macOS/Linux: `file:///Users/yourname/Brainstorm/webapp/visualize.html`
- Windows: `file:///C:/Users/yourname/Brainstorm/webapp/visualize.html`

#### Option B: Deploy and Use Remote URL (Production)

1. Deploy the `webapp/` directory to any static hosting service:
   - [Netlify](https://netlify.com) (Recommended - drag & drop)
   - [Vercel](https://vercel.com)
   - [GitHub Pages](https://pages.github.com)
   - Any web host

2. Update the URLs in the extension files (same as Option A) with your deployed URL:
   ```javascript
   vizBaseURL: 'https://your-domain.com/visualize.html',
   ```

3. Reload the extension in your browser

---

### 4. Test the Extension

1. Open the demo page:
   ```bash
   # From the project root
   open demo.html
   ```

2. You should see numbers highlighted throughout the article

3. Click any highlighted number to open the visualization

4. If numbers aren't highlighting:
   - Check browser console for errors
   - Verify the extension is enabled
   - Make sure you updated the visualization URL
   - Try reloading the page

---

## Deployment

### Deploy Web App

#### Netlify (Easiest):

1. Sign up at [netlify.com](https://netlify.com)
2. Drag the `webapp/` folder into Netlify
3. Done! You'll get a URL like `https://your-app.netlify.app`

#### Vercel:

```bash
cd webapp
npm install -g vercel
vercel
```

#### GitHub Pages:

```bash
# Create a gh-pages branch
git checkout -b gh-pages

# Copy webapp contents to root
cp -r webapp/* .

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Enable GitHub Pages in repository settings
# Your site will be at: https://username.github.io/Brainstorm/
```

### Publish Extension

#### Chrome Web Store:

1. Create a [Chrome Web Developer account](https://chrome.google.com/webstore/devconsole/) ($5 one-time fee)
2. Zip the `extension/` directory
3. Upload to Chrome Web Store
4. Fill in store listing details
5. Submit for review (typically 1-3 days)

#### Firefox Add-ons:

1. Create a [Firefox Add-ons account](https://addons.mozilla.org/developers/) (free)
2. Zip the `extension/` directory
3. Upload to Firefox Add-ons
4. Submit for review

---

## Troubleshooting

### Extension not detecting numbers

**Problem:** Numbers on pages aren't being highlighted.

**Solutions:**
1. Check that the extension is enabled (`chrome://extensions/`)
2. Reload the page after installing/updating the extension
3. Check browser console for JavaScript errors
4. Verify the page isn't in a restricted domain (chrome://, about://, etc.)

### Clicking numbers doesn't work

**Problem:** Clicking highlighted numbers does nothing.

**Solutions:**
1. Check that you updated the `vizBaseURL` in the extension files
2. For local files, ensure you have the correct absolute path
3. Check browser console for errors
4. Try opening the visualization URL manually to test it works

### Visualizations not rendering

**Problem:** Visualization page opens but shows errors or blank content.

**Solutions:**
1. Check browser console for JavaScript errors
2. Ensure all files in `webapp/js/` are present
3. Try opening `webapp/index.html` directly to test
4. Clear browser cache and reload

### Extension icons missing

**Problem:** Extension shows generic icon or broken image.

**Solutions:**
1. This is normal for development! See `extension/ICONS_README.txt`
2. Create placeholder PNGs (16x16, 48x48, 128x128)
3. Or temporarily remove icon references from `manifest.json`
4. Icons are only required for production release

---

## Development Tips

### Hot Reload

After making changes to the extension:

**Chrome/Edge:**
1. Go to `chrome://extensions/`
2. Click the reload icon on the Scale extension card
3. Reload any open pages to see changes

**Firefox:**
1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Reload" next to the extension
3. Reload any open pages

### Testing on Real Sites

Good sites to test the extension:

- **News:** [https://www.nytimes.com](https://www.nytimes.com)
- **Economics:** [https://www.economist.com](https://www.economist.com)
- **Science:** [https://www.nature.com](https://www.nature.com)
- **Tech:** [https://techcrunch.com](https://techcrunch.com)

These typically have many large numbers in articles.

### Debugging

**Extension Console:**
- Right-click the extension icon → "Inspect popup"
- Or check the background page in `chrome://extensions/`

**Content Script Console:**
- Open any page with the extension active
- Open browser DevTools (F12)
- Look for `[Scale]` log messages

---

## Next Steps

Once you have everything working:

1. **Customize visualizations** - Edit `webapp/js/visualizations.js`
2. **Add more comparisons** - Update `webapp/js/utils.js`
3. **Improve detection** - Refine regex in `extension/content-script.js`
4. **Create icons** - Design proper icons for the extension
5. **Deploy to production** - Follow deployment guide above

---

## Need Help?

- Check the [README.md](README.md) for project overview
- Read the [VISION.md](VISION.md) for design philosophy
- Open an issue on GitHub
- Review browser console for error messages

**Remember:** This is about craft. Take your time, test thoroughly, and make it beautiful.
