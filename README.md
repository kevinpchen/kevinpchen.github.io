# Kevin Chen's Portfolio

Personal portfolio site for myself.

Built with React, Vite, and TypeScript. The site is designed as a clean,
editorial-style portfolio centered on backend engineering, applied machine
learning, research, and music.

The site uses hash-based routes so project pages work cleanly on GitHub Pages:

- `#/projects/alphadomi`
- `#/projects/community-programs`
- `#/projects/music-map-of-china`

## Local development

```bash
git clone https://github.com/kevinpchen/kevinpchen.github.io
cd kevinpchen.github.io
npm install
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173/`.

## Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment

This repository is deployed with GitHub Pages through the workflow in
`.github/workflows/deploy.yml`.

## Assets

Images and media used by the portfolio live in:

```txt
public/media
```
