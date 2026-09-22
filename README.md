# MD Zuleyenine Ibne Noman · Personal Academic & Research Space

[![Node.js](https://img.shields.io/badge/Node.js-16+-6DA55F?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Personal portfolio and academic space of **MD Zuleyenine Ibne Noman**, PhD Researcher & Research Assistant at the **CYBER-CARE Research Environment**, Department of Electrical & Computer Engineering, University of Houston.

Focus areas: **Cybersecurity**, **Artificial Intelligence**, **Adversarial Robustness**, and **Connected & Autonomous Vehicle (CAV) Security**.

---

## 🚀 How to Run the Project

This project uses a **zero-dependency** static site generator and development server written in standard Node.js. No `npm install` or third-party packages are required.

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)

### 1. Start the Local Development Server
To start the local development server with automatic file watching and rebuilds:

```bash
npm start
# or
npm run dev
# or
node serve.js
```

Once started, open your browser and navigate to:
```
http://localhost:3000/
```

> **Feature**: The server watches the `content/`, `templates/`, and `assets/` directories for changes. Whenever you edit content or templates, it automatically rebuilds the site in the background.

---

### 2. Build Static Site
To compile the static pages into the `dist/` directory:

```bash
npm run build
```

This compiles all JSON data in `content/` through the templates in `templates/` and outputs static HTML files ready for hosting.

---

### 3. Preview Production Build
To build and preview locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
├── content/              # Structured JSON data files
│   ├── site.json         # Global site metadata, navigation, base path & social links
│   ├── research.json     # Research topics and focus areas
│   ├── publications.json # Peer-reviewed publications and preprints
│   ├── projects.json     # Engineering and research projects
│   ├── experience.json   # Professional and academic experience
│   ├── education.json    # Degrees and academic background
│   ├── achievements.json # Awards, grants, and recognitions
│   ├── teaching.json     # Teaching and mentoring records
│   ├── journal.json      # Reflections and notes
│   ├── books.json        # Reading list
│   ├── movies.json       # Film reviews & ratings
│   ├── tv.json           # Series tracked
│   ├── places.json       # Places visited
│   └── gallery.json      # Creative works and media
├── templates/            # Plain JavaScript template rendering modules
│   ├── site.js           # Site-wide layout shell, header, footer, card components
│   └── pages.js          # Individual page generators
├── assets/               # Static assets
│   ├── css/              # University of Houston theme stylesheets
│   ├── js/               # Frontend interactivity
│   ├── img/              # Images, profile photos, covers
│   ├── pdf/              # Résumé / CV documents
│   └── vendor/           # Icons and UI utilities (Bootstrap Icons, GLightbox)
├── build.js              # Zero-dependency static site generator
├── serve.js              # Zero-dependency local dev server with auto-rebuild watcher
├── dist/                 # Generated static website (git-ignored)
└── package.json          # Project scripts and metadata
```

---

## ⚙️ Configuration & Deployment

### Configuring Base Path for GitHub Pages
The site base path is controlled in `content/site.json`:

```json
{
  "basePath": "/personal-space-new"
}
```

- If deploying to `https://<username>.github.io/<repo>/`, set `"basePath": "/<repo>"`.
- If deploying to a custom domain (or user page root `https://<username>.github.io/`), set `"basePath": ""`.
- When running locally via `node serve.js` or `node build.js --local`, the base path automatically resolves to root (`""`).

### Deployment via GitHub Actions
A GitHub Actions workflow is located at `.github/workflows/static.yml` for automatic deployment to GitHub Pages.

---

## 📝 License
MIT © 2026 MD Zuleyenine Ibne Noman
