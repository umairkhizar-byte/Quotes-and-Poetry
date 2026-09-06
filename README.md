# اقوال و اشعار — Urdu Quotes & Poetry App

A small Android app (built with Capacitor) that shows:

- **10 Urdu quotes**, picked automatically each day from a pool of 40 (`quotes.json`). The set changes at midnight, and is the same for everyone that day.
- **10 famous Urdu poetry verses** (`poetry.json`) — public-domain couplets from Ghalib, Iqbal, Mir Taqi Mir, and Bahadur Shah Zafar.

Everything renders in Noto Nastaliq Urdu, right-to-left, styled like an old manuscript page.

## File layout

Every file lives flat in the repo root — no folders to create yourself, except one that GitHub itself requires:

```
index.html
manifest.json
quotes.json
poetry.json
sw.js
icon-192.png
apple-touch-icon.png
icon-512.png
icon-1024.png
icon-background-1024.png
icon-foreground-1024.png
package.json
capacitor.config.json
.gitignore
README.md
.github/workflows/build-apk.yml   <- the one unavoidable folder (GitHub requires this exact path for automated builds)
```

The GitHub Actions workflow (`.github/workflows/build-apk.yml`) automatically arranges the web files into a `www/` folder and the icon sources into a `resources/` folder *during the build in the cloud* — you never have to create those folders yourself.

## 1. Upload to GitHub

1. Create a new repository (e.g. `urdu-quotes-app`).
2. Upload all the flat files (`index.html`, `manifest.json`, `quotes.json`, `poetry.json`, `sw.js`, the five icon PNGs, `package.json`, `capacitor.config.json`, `.gitignore`, `README.md`) using **Add file → Upload files** on the repo's main page.
3. For the one required folder, go to this URL in your browser (replace `<you>` with your GitHub username):
   `https://github.com/<you>/urdu-quotes-app/upload/main/.github/workflows`
   and upload `build-apk.yml` there. GitHub creates the `.github/workflows` folder automatically.

## 2. Let GitHub build the APK

Pushing to `main` automatically triggers the **Build Android APK** workflow (check the **Actions** tab). It arranges the files, builds a debug `.apk` with Gradle, and attaches it to a new entry under your repo's **Releases** tab.

First build takes a few minutes. You can also trigger it manually from **Actions → Build Android APK → Run workflow**.

## 3. Install the APK on your phone

1. Open your repo's **Releases** page on your phone (`https://github.com/<you>/<repo>/releases`).
2. Tap the latest release and download `app-debug.apk`.
3. Open the downloaded file, allow "install from this source" the first time, then tap **Install**.
4. The app icon (a gold quill on a maroon seal) appears on your home screen and opens full-screen.

This is a debug-signed APK — fine for installing on your own device, just not signed for the Play Store.

## Editing content

- **Quotes**: edit `quotes.json` — each entry needs a unique `id` and `text`.
- **Poetry**: edit `poetry.json` the same way. Use `\n` inside `verse` to break a couplet onto two lines.
- Push the change to `main` and a new APK with the updated content builds automatically.

## Notes

- The 40 starter quotes are original, general wisdom sayings, free for you to keep, edit, or replace.
- The 10 poetry verses are long-public-domain classics (all four poets died more than 70 years ago).
- Want an iPhone version too? That needs an Apple Developer account and TestFlight — let me know if you'd like help with that separately.
