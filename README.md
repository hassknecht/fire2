# Cyber Hearth

Cyber Hearth is a local-first Chrome extension prototype: a private browser fireplace for burning stressful text, desktop file tokens, sketches, and symbolic avatars.

## Privacy posture

- No account.
- No backend.
- No analytics.
- No upload.
- No saved burn history.
- No persistent content storage.
- Dropped files are handled only after explicit user drag-and-drop.
- File burns use local metadata for animation; file contents are not uploaded or saved.
- Session ash and particles reset on refresh.

## Load locally in Chrome

1. Open `chrome://extensions`.
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select this project folder.
5. Open a new tab to enter the local fireplace.

## Develop

Run tests:

```bash
npm test
```

Preview as a normal local page:

```bash
npm run serve
```

Then open `http://localhost:4173/src/hearth.html`.
