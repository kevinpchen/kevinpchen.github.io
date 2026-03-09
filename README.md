# kevinpchen.github.io

Personal portfolio site for **Kevin Chen** (`kevinpchen.github.io`).

Built with **React + Vite + TypeScript**, deployed via **GitHub Pages** using a
GitHub Actions workflow.

## Local development

```bash
git clone https://github.com/kevinpchen/kevinpchen.github.io
cd kevinpchen.github.io
npm install
npm run dev
```

Then open the printed `http://localhost:5173/` URL in your browser.

## Production build

```bash
npm run build
```

This generates a static build in the `dist/` directory. In CI, the
`.github/workflows/deploy.yml` workflow runs this command and publishes `dist`
to GitHub Pages.

