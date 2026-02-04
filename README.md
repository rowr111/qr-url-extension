# Baochip QR Extension

Baochip QR is a browser extension that shows the current tab's domain as a QR code. The QR payload currently uses the scheme `pwauth://pass/<domain>?time=<ISO8601-with-offset>` and refreshes once per second to embed the current time.

This is meant to work with baosec as a key for looking up passwords in the password manager via the QR code scanning feature; at the moment this is just a POC that shows it can be done.

## Structure
- `src/`: shared extension files
- `src/icons/`: app icons and logo source
- `manifests/`: per-browser manifests
- `scripts/`: build scripts
- `dist/`: build output (generated)

## Build
PowerShell:
```powershell
scripts/build.ps1
```

Bash:
```bash
scripts/build.sh
```

## Load
- Chrome/Edge:
  1. Open `chrome://extensions` (or `edge://extensions`).
  2. Enable **Developer mode**.
  3. Click **Load unpacked**.
  4. Select `dist/chrome`.
- Firefox:
  1. Open `about:debugging#/runtime/this-firefox`.
  2. Click **Load Temporary Add-on**.
  3. Select `dist/firefox/manifest.json`.

Note: `manifests/manifest.firefox.json` targets MV2 (Firefox) and includes a placeholder `browser_specific_settings.gecko.id`. Update this before publishing to AMO.

Dev shortcut: `manifest.json` in the repo root points to `src/` for quick unpacked loading in Chrome/Edge without running a build.

![example usage](./demo.png)

