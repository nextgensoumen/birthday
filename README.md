# 🎂 A Birthday Book for Ananya

An interactive 3D Harry Potter-style book of memories, made as a birthday gift. It opens with stage curtains, then a leather-bound book with real page-turning, a photo album and a floating candle to make a wish on.

**Live site:** hosted on Vercel.

---

## Features
- **🎭 Entry curtains**: tap the red stage curtains to open the show. A **Close Book** button closes the book and brings the curtains back.
- **📖 3D page turning**: click a page, use the Previous / Turn Leaf buttons, or press the Left / Right arrow keys.
- **🎶 Happy Birthday music**: a music-box melody, played with the browser's built-in audio (no audio files). It starts when the curtains open, loops, and can be paused from the top bar. It also plays when the wish candle is blown out.
- **🖼️ Memory album**: two photos, each on its own page in a different frame.
- **🎨 Every page has its own design**: different colours, borders and layouts for each page, and the room background changes with each spread.
- **🕯️ Make a wish**: tap the floating candle on the Great Hall page.
- **📱 Works on phones and desktops**, with floating balloons, confetti and golden lights in the background.

## Pages
1. Cover
2. Owl post letter
3. Marauder's map
4. Charms
5. Photo album (two pages)
6. Potion recipe, awards, prophecies and wishes
7. Heartfelt letter
8. The floating flame (make a wish)
9. Words from my heart (two pages)
10. Mischief Managed and the back cover

## Files
| File | What it does |
|---|---|
| `index.html` | All the pages and the entry curtain |
| `style.css` | Page themes, layouts, curtain, animations |
| `script.js` | Page turning, music, candle, curtain and Close Book |
| `assets/` | The two photos |

## Run it locally
Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy
It is a static site with no build step. On Vercel, import this repo, set the framework preset to **Other**, leave the build command and output directory empty, and deploy. Every push to `main` republishes it.

A GitHub Pages workflow is included in `.github/workflows/deploy.yml`. It only runs once Pages is switched on under Settings → Pages (Source: GitHub Actions).

## Privacy
The repository contains personal photos. If you want to keep them private, make the repository private.
