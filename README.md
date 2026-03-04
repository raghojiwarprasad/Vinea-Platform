# Vinea Platform — Deployment Guide

## Option 1: Vercel (Fastest — 5 minutes, free)

### Prerequisites
- A GitHub account (github.com)
- A Vercel account (vercel.com — sign up with GitHub)

### Steps

1. **Create a GitHub repo**
   - Go to github.com → New Repository
   - Name it `vinea-platform`
   - Set to Private
   - Click "Create repository"

2. **Upload the files**
   - In the repo, click "uploading an existing file"
   - Drag the entire contents of this folder into the upload area
   - Make sure the structure looks like:
     ```
     vinea-platform/
     ├── index.html
     ├── package.json
     ├── vite.config.js
     └── src/
         ├── main.jsx
         └── App.jsx
     ```
   - Click "Commit changes"

3. **Deploy on Vercel**
   - Go to vercel.com/new
   - Click "Import" next to your `vinea-platform` repo
   - Framework Preset: **Vite** (it should auto-detect)
   - Click **Deploy**
   - Wait ~60 seconds

4. **Done!**
   - Vercel gives you a URL like: `vinea-platform.vercel.app`
   - You can add a custom domain (e.g. vinea.com) in Settings → Domains
   - Share the URL with anyone


## Option 2: Netlify (Also free, ~5 minutes)

1. Same GitHub setup as above
2. Go to app.netlify.com → "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click Deploy


## Option 3: Run locally first (to preview before deploying)

```bash
# Make sure you have Node.js installed (nodejs.org)
cd vinea-platform
npm install
npm run dev
```

Opens at http://localhost:5173 — you can preview everything locally.


## Custom Domain Setup (Optional)

Once deployed on Vercel:
1. Go to your project → Settings → Domains
2. Add your domain (e.g. vinea-ventures.com)
3. Update your DNS records as instructed
4. SSL certificate is automatic


## Notes

- The site is a single-page React application
- No backend required — all forms are frontend-only for now
- To connect forms to a real backend later, integrate with:
  - Formspree.io (quickest, no code)
  - Supabase (if you want a database)
  - Your own API
