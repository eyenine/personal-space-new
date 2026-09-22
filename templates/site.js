"use strict";
/**
 * Shared render functions for the eyenine.dev static site.
 * Plain template-literal HTML generation, no framework, no dependencies.
 * Every dynamic string goes through esc() before it lands in markup.
 */

function esc(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function url(p) {
  if (!p) return "";
  return String(p)
    .split("/")
    .map((seg) => (seg === "" ? "" : encodeURIComponent(seg)))
    .join("/");
}

// GitHub Pages project-site base path (e.g. "/Eyenine"): see setBasePath().
// Empty string means the site is served from the domain root (a user/org
// page, or a custom domain via CNAME).
let BASE_PATH = "";
function setBasePath(p) {
  BASE_PATH = p || "";
}
// Prefix an app-internal, root-relative path ("/research/", "/assets/x.png")
// with the site's base path. External URLs (http/https/mailto) pass through
// untouched so this is safe to wrap around any href or src.
function u(p) {
  if (!p) return p;
  if (/^(https?:)?\/\//i.test(p) || /^mailto:/i.test(p) || /^#/.test(p)) return p;
  return BASE_PATH + url(p);
}

function icon(name) {
  return `<i class="bi bi-${esc(name)}" aria-hidden="true"></i>`;
}

// ---------------------------------------------------------------------------
// Layout shell
// ---------------------------------------------------------------------------

function layout(site, { title, description, activeId = "", bodyClass = "", canonical = "", body }) {
  const fullTitle = title ? `${title} | ${site.name}` : site.name;
  const desc = esc(description || site.tagline);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#8C1D2B">
<link rel="icon" href="${u("/assets/img/favicon.png")}">
<link rel="apple-touch-icon" href="${u("/assets/img/apple-touch-icon.png")}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${u(site.profileImage)}">
<meta name="twitter:card" content="summary">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link href="${u("/assets/vendor/bootstrap-icons/bootstrap-icons.min.css")}" rel="stylesheet">
<link href="${u("/assets/vendor/glightbox/css/glightbox.min.css")}" rel="stylesheet">
<link href="${u("/assets/css/main.css")}" rel="stylesheet">
</head>
<body class="${esc(bodyClass)}">
${skipLink()}
${header(site, activeId)}
<main id="main">
${body}
</main>
${footer(site)}
<script src="${u("/assets/vendor/glightbox/js/glightbox.min.js")}"></script>
<script src="${u("/assets/js/main.js")}"></script>
</body>
</html>
`;
}

function skipLink() {
  return `<a class="skip-link" href="#main">Skip to content</a>`;
}

function header(site, activeId) {
  const tabs = site.nav
    .map(
      (item) =>
        `<a class="tab${item.id === activeId ? " is-active" : ""}" href="${u(item.href)}"${item.id === activeId ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`
    )
    .join("");
  return `<header class="site-header">
  <div class="site-header-row">
    <a class="brand" href="${u("/")}">
      <span class="brand-mark">${esc(site.handle)}</span>
      <span class="brand-tag">PhD Era · University of Houston</span>
    </a>
    <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="tabs">
      ${icon("list")}<span class="visually-hidden">Menu</span>
    </button>
  </div>
  <nav class="tabs" id="tabs" aria-label="Primary">${tabs}</nav>
</header>`;
}

function footer(site) {
  const socials = site.social
    .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" title="${esc(s.label)}">${icon(s.icon)}</a>`)
    .join("");
  return `<footer class="site-footer">
  <div class="footer-row">
    <div class="footer-id">
      <div class="footer-name">${esc(site.name)}</div>
      <div class="footer-coords mono">${esc(site.coordinates)} · ${esc(site.location)}</div>
    </div>
    <div class="footer-social">${socials}</div>
  </div>
  <div class="footer-legal mono">© ${new Date().getFullYear()} ${esc(site.name)} · Filed from the ${esc(site.lab)}</div>
</footer>`;
}

// ---------------------------------------------------------------------------
// Small components
// ---------------------------------------------------------------------------

function chips(tags = []) {
  return `<div class="chips">${tags.map((t) => `<span class="chip mono">${esc(t)}</span>`).join("")}</div>`;
}

function typeTag(type) {
  return `<span class="tag tag-${esc(type)} mono">${esc(type)}</span>`;
}

function sampleTag() {
  return `<span class="tag tag-sample mono">sample</span>`;
}

function stars(n) {
  if (n === null || n === undefined) return "";
  const full = Math.round(n);
  return `<span class="stars" aria-label="${full} out of 5">${"★".repeat(full)}${"☆".repeat(5 - full)}</span>`;
}

function statusPill(status) {
  const label = { emerging: "Emerging", completed: "Completed", reading: "Reading", "want-to-read": "Want to Read" }[status] || status;
  return `<span class="pill pill-${esc(status)} mono">${esc(label)}</span>`;
}

// exhibit card: the one reusable unit behind every content type
function exhibitCard(item, { href, size = "" } = {}) {
  const tag = item.sample ? sampleTag() : typeTag(item.type);
  const inner = `
    <div class="exhibit-top">${tag}${item.meta && item.meta.rating ? stars(item.meta.rating) : ""}</div>
    <h3 class="exhibit-title">${esc(item.title)}</h3>
    <p class="exhibit-summary">${esc(item.summary || "")}</p>
    ${item.tags && item.tags.length ? chips(item.tags.slice(0, 3)) : ""}
  `;
  const cls = `exhibit-card${size ? " " + size : ""}`;
  return href
    ? `<a class="${cls}" href="${u(href)}">${inner}</a>`
    : `<div class="${cls}">${inner}</div>`;
}

function grid(items, renderer, cls = "exhibit-grid") {
  return `<div class="${cls}">${items.map(renderer).join("")}</div>`;
}

function eyebrow(text) {
  return `<p class="eyebrow mono">${esc(text)}</p>`;
}

function specList(rows) {
  return `<dl class="spec">${rows
    .filter((r) => r[1] !== undefined && r[1] !== null && r[1] !== "")
    .map((r) => `<dt>${esc(r[0])}</dt><dd>${r[1]}</dd>`)
    .join("")}</dl>`;
}

function linkList(links = []) {
  if (!links.length) return "";
  return `<div class="detail-links">${links
    .map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${icon("arrow-up-right")}</a>`)
    .join("")}</div>`;
}

function backlink(href, label) {
  return `<a class="backlink mono" href="${u(href)}">${icon("arrow-left")} ${esc(label)}</a>`;
}

module.exports = {
  esc, url, u, setBasePath, icon, layout, header, footer, chips, typeTag, sampleTag, stars, statusPill,
  exhibitCard, grid, eyebrow, specList, linkList, backlink,
};
