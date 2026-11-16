# ⚡ The Hogwarts Book of Memories — Birthday Edition

An interactive 3D Harry Potter-style grimoire with realistic page-turning animations, tea-stained parchment, wax seals, and Hedwig's Theme music box.

---

## 🪄 Magical Features
- **📖 Realistic 3D Page Turning**: Turn pages forward and backward page-by-page by clicking the pages, using the bottom arrow buttons, or pressing your keyboard `Left` / `Right` arrow keys.
- **✨ Authentic Vintage Aesthetic**: Embossed leather cover, golden filigree corners, aged parchment texture, and literary typography (*Cinzel Decorative*, *IM Fell English*).
- **🎶 Built-in Hedwig's Theme Synthesizer**: Plays the iconic melody with a celesta/music-box chime (completely self-contained, no external audio files needed).
- **📜 Chapter by Chapter Journey**:
  - **Cover**: Vintage embossed leather with wax seal.
  - **Chapter I (Owl Post)**: Hogwarts acceptance birthday letter.
  - **Chapter II (Marauder's Map)**: Parchment photo frames for your favorite shared memories.
  - **Chapter III (Charms & Spells)**: Spells reflecting her personality (*Lumos*, *Expecto Patronum*, *Felix Felicis*).
  - **Chapter IV (Heartfelt Scroll)**: A sincere personal letter celebrating your friendship.
  - **Chapter V (Great Hall Candle)**: An interactive floating candle she can tap to extinguish and make a birthday wish!
  - **Back Cover (Mischief Managed)**: The classic Harry Potter send-off.

---

## 🎨 How to Personalize for Her

1. **Change Her Name**:
   - In `index.html`, replace `ANANYA` on the cover (`<h1 class="cover-title">`) and inside the letters with her name.

2. **Add Real Photos**:
   - Place your photos inside the project folder (e.g. `memory1.jpg`, `memory2.jpg`).
   - In `style.css`, update `.photo-1` and `.photo-2`:
     ```css
     .photo-1 {
         background-image: url('memory1.jpg');
     }
     .photo-2 {
         background-image: url('memory2.jpg');
     }
     ```
   - In `index.html`, adjust the caption text under each frame.

3. **Edit the Personal Letters & Spells**:
   - All letter and spell texts are neatly labeled inside `index.html` under their respective `<div class="page-inner">` sections.

---

## 🚀 View in Browser
Open `http://localhost:8080` in your browser!
