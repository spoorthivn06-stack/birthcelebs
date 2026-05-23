# Birthday Wish App

A React + Vite birthday surprise website built with Tailwind CSS.

## Features

- Home page with hero banner, animated birthday card, and message section
- Surprise page with gallery, countdown, and fireworks section
- React Router navigation
- Dark / light theme toggle
- Tailwind CSS styling

## Getting started

1. `cd birthday-wish-app`
2. `npm install`
3. Copy `.env.example` to `.env` and update `VITE_SHARE_HOST` to your own deployed preview site domain. Do not leave the example placeholder host from `.env.example`, because `example.com` is not a real site.
   ```env
   VITE_SHARE_HOST=https://your-preview-site.netlify.app
   ```
4. `npm run dev`

## Free deployment with Netlify (Preview-Only on Separate Site)

Your app now builds two separate sites:
- **Builder site** (main): shows home, create, and share pages
- **Preview site** (separate): shows ONLY the preview result

### Setup

1. Push this repo to GitHub with the new changes.
2. Create the **Preview site** on Netlify:
   - Go to `https://app.netlify.com/`
   - Click **"Add new site"** → **"Import from Git"**
   - Select your `birthcelebs` repo
   - Build command: `npm run build`
   - Publish directory: `dist`
   - After deploy, copy the preview site URL (e.g., `https://preview-12345.netlify.app`)
   - In this site's **Build & deploy** settings, add environment variable:
     - `VITE_SHARE_HOST_PREVIEW_ONLY=true`
   - Go to **Redirects** and add:
     - From: `/*`
     - To: `/preview.html`
     - Status: 200 (rewrite)
   
3. Create the **Builder site** on Netlify:
   - Click **"Add new site"** → **"Import from Git"** again
   - Select the same repo
   - Same build settings
   - After deploy, copy the builder site URL
   - In this site's **Build & deploy** settings, add environment variable:
     - `VITE_SHARE_HOST=https://<your-preview-site>.netlify.app`

### Result

- Builder app: shows full experience, generates share links to preview site
- Preview app: shows ONLY the preview result for recipients

Netlify already supports the app routes with the included `netlify.toml` and multiple entry points.

## Notes

- Add your birthday images to `public/` or `src/assets/images/`
- Add background music files to `src/assets/sounds/`
- Set `VITE_SHARE_HOST` so shared preview links open on a separate hosted preview site instead of the current app origin
