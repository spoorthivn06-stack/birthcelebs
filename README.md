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

## Free deployment with Netlify

You can host both sites for free on Netlify:

1. Push this repo to GitHub.
2. Create one Netlify site for the builder app.
   - Connect your GitHub repo.
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Create a second Netlify site for the preview app using the same repo.
   - Use the same build command and publish directory.
   - You can connect the same branch again as a second site.
4. Copy the preview app URL from Netlify and use it in `VITE_SHARE_HOST` for the builder app.
   - Example: `https://happy-wish-preview.netlify.app`
5. In Netlify settings for the builder site, add an environment variable:
   - `VITE_SHARE_HOST` = `https://happy-wish-preview.netlify.app`

Netlify already supports the app routes with the included `netlify.toml` because all paths are redirected to `index.html`.

## Notes

- Add your birthday images to `public/` or `src/assets/images/`
- Add background music files to `src/assets/sounds/`
- Set `VITE_SHARE_HOST` so shared preview links open on a separate hosted preview site instead of the current app origin
