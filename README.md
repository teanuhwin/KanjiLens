# 漢字レンズ — Kanji Lens

A fully offline PWA that translates kanji from photos into hiragana and romaji.

## Features
- 📷 Capture via camera or upload a photo
- 🔍 Auto-OCR on capture (Tesseract.js, Japanese trained data)
- ✏️ Editable OCR text field to correct recognition errors
- 🈳 Kanji → hiragana via kuromoji.js (full IPAdic dictionary, ~400k entries)
- 🔤 Hiragana → romaji via wanakana.js
- 📋 Word-by-word breakdown chips
- 🕒 Local history with swipe-to-delete
- 📴 Fully offline after first load (service worker caches all assets)

## Tech Stack
| Library | Purpose |
|---|---|
| Tesseract.js v5 | In-browser OCR for Japanese |
| kuromoji.js | Japanese morphological analysis (kanji → kana) |
| wanakana.js | Kana/romaji conversion |
| Service Worker | Offline caching of all assets |

## Deploy to GitHub Pages

1. **Create a new repo** on GitHub (e.g. `kanji-lens`)

2. **Add these files** to the repo root:
   - `index.html`
   - `sw.js`
   - `manifest.json`
   - `icon-192.png` *(optional — add your own or generate one)*
   - `icon-512.png` *(optional)*

3. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: Deploy from branch → `main` → `/ (root)`
   - Save

4. Your app will be live at `https://yourusername.github.io/kanji-lens/`

5. **Custom domain** (optional):
   - Add a `CNAME` file with your domain
   - Configure DNS per GitHub's instructions

## First Load
On first load, the browser downloads and caches:
- Tesseract.js + Japanese trained data (~15MB)
- kuromoji.js + IPAdic dictionary (~7MB)
- Fonts, wanakana.js

After that, the app works **completely offline**.

## Icons
You need `icon-192.png` and `icon-512.png` for the PWA install prompt.
A quick way to generate them: use any image editor to create a 512×512 PNG
with the 漢字 character on your app background color (`#0f1117`), then
downscale a copy to 192×192.

Or use a free PWA icon generator like https://maskable.app/editor

## Notes
- OCR accuracy depends on image quality, lighting, and font style
- Printed text (menus, signs, books) works best
- Handwritten kanji has lower accuracy
- The editable text field lets you fix any misread characters before converting
