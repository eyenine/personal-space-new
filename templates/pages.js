"use strict";
const T = require("./site.js");
const { esc, url, u, icon, chips, typeTag, sampleTag, stars, statusPill, exhibitCard, grid, eyebrow, specList, linkList, backlink } = T;

function fmtDate(d) {
  if (!d) return "";
  const parts = String(d).split("-");
  if (parts.length === 1) return parts[0];
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

// ---------------------------------------------------------------------------
// Cover Sheet (home)
// ---------------------------------------------------------------------------
function coverSheetPage(site, ctx) {
  const { currentResearch, latestPub, currentRole, currentEdu, latestJournal } = ctx;
  const youtube = site.social.find((s) => s.label === "YouTube");
  return `
<div class="cover-band">
  <section class="cover">
    <div class="cover-profile">
      <img src="${u('/assets/img/profile.jpg')}" alt="Profile Picture" class="profile-img" />
    </div>
    <p class="cover-eyebrow mono">Cover Sheet: Filed ${fmtDate(currentEdu.meta.startDate)}</p>
    <h1 class="cover-title">${esc(site.name)}</h1>
    <p class="cover-line">${esc(site.identityLine)}</p>
    <p class="cover-status">${esc(site.status)}<span class="dot"></span>${esc(site.lab)}</p>
    <p class="cover-desc">${esc(site.coverDesc || "Full-stack engineer (Spring Boot, React.js) with national-level project experience, combining a background in healthcare AI with advanced research in cybersecurity and transportation systems at the University of Houston. Having spent years building software from the ground up, I made the leap from shipping features to security research—driven by a curiosity for how complex systems break, how adversaries exploit them, and how to build defenses that truly hold.")}</p>
    <div class="cover-cta">
      <a class="btn btn-primary" href="${u("/research/")}">${icon("folder2-open")} Open the Research Folder</a>
      <a class="btn" href="${u(site.resumeUrl)}" download>${icon("download")} Download Résumé</a>
      ${youtube ? `<a class="btn btn-youtube" href="${esc(youtube.url)}" target="_blank" rel="noopener">${icon("youtube")} Watch on YouTube</a>` : ""}
    </div>
  </section>

  <section class="bento" aria-label="Now">
  <a class="bento-card bento-lg" href="${u(`/research/${currentResearch.slug}/`)}">
    <div class="exhibit-top">${typeTag("now")}</div>
    <p class="bento-label mono">Current focus</p>
    <h2 class="bento-title">${esc(currentResearch.title)}</h2>
    <p class="exhibit-summary">${esc(currentResearch.summary)}</p>
  </a>
  <a class="bento-card" href="${u(`/publications/${latestPub.slug}/`)}">
    <div class="exhibit-top">${typeTag("publication")}</div>
    <p class="bento-label mono">Latest publication</p>
    <h3 class="bento-title-sm">${esc(latestPub.title)}</h3>
    <p class="exhibit-summary">${esc(latestPub.meta.venue)}, ${latestPub.meta.year}</p>
  </a>
  <a class="bento-card" href="${u("/experience/")}">
    <div class="exhibit-top">${typeTag("now")}</div>
    <p class="bento-label mono">Current role</p>
    <h3 class="bento-title-sm">${esc(currentRole.title)}</h3>
    <p class="exhibit-summary">${esc(currentRole.meta.org)}</p>
  </a>
  <a class="bento-card" href="${u(`/off-the-record/journal/${latestJournal.slug}/`)}">
    <div class="exhibit-top">${typeTag("journal")}</div>
    <p class="bento-label mono">From the journal</p>
    <h3 class="bento-title-sm">${esc(latestJournal.title)}</h3>
    <p class="exhibit-summary">${esc(latestJournal.summary)}</p>
  </a>
  <a class="bento-card" href="${u("/education/")}">
    <div class="exhibit-top">${typeTag("education")}</div>
    <p class="bento-label mono">Education</p>
    <h3 class="bento-title-sm">${esc(currentEdu.title)}</h3>
    <p class="exhibit-summary">${esc(currentEdu.meta.org)}</p>
  </a>
  <a class="bento-card bento-wide" href="${u("/off-the-record/")}">
    <div class="exhibit-top">${typeTag("life")}</div>
    <p class="bento-label mono">Beyond the lab</p>
    <h3 class="bento-title-sm">Off the Record: movies, books, places, and the rest of it.</h3>
  </a>
  </section>
</div>
`;
}

// ---------------------------------------------------------------------------
// The Transition (About)
// ---------------------------------------------------------------------------
function transitionPage(site) {
  return `
<section class="folder-head">
  ${eyebrow("The Transition")}
  <h1>From Mirpur to the CYBER-CARE lab</h1>
</section>
<div class="prose">
  <p>I was born in Jessore CMH, grew up between Jessore and Ghatail, and settled in Mirpur, Dhaka, where I lived for nearly two decades. Mirpur has its own charm, the lively crowd and urban energy, though I've often found myself longing for more greenery and water bodies. Some of that longing is probably why Houston's bayous already feel like a small relief.</p>
  <h2>Software engineer, first</h2>
  <p>My BSc in ICT at the Institute of Information Technology, Jahangirnagar University, pointed me toward applied AI in healthcare: a transfer-learning ensemble for lung nodule classification, an autism-detection project funded by the University Grants Commission, and eventually a published paper, LungCT-NET, layering explainable AI on top of that earlier work. Alongside that, I was building software professionally: an e-commerce platform, a mobile expense tracker, a student management system, the ordinary, useful work of a software engineer, which I still do as a Software Engineer I at Synesis IT Ltd.</p>
  <h2>Why the PhD, why cybersecurity</h2>
  <p>The thread that connects the lung-imaging work to what I'm doing now isn't the subject matter; it's the question underneath it: can a system's decision be trusted, inspected, explained? In medical imaging that question is about a radiologist trusting a model. In cybersecurity, especially in connected and automated vehicles, where a bad decision has a physical consequence on a real road, the stakes of that same question go up considerably. That's what brought me to the University of Houston's Electrical & Computer Engineering PhD program and the CYBER-CARE research environment, starting August 2026.</p>
  <h2>What doesn't change</h2>
  <p>I still walk toward 10,000 steps a day, still think restful sleep is underrated, and still try to treat people with the same simplicity and kindness I was raised on. The research changes. The rest of it, the songs I sing badly and mean every word of, the geometry I draw for no reason, the four in the morning thoughts I write down, that's all still here too, in <a href="${u("/off-the-record/")}">Off the Record</a>.</p>
</div>
`;
}

// ---------------------------------------------------------------------------
// Research
// ---------------------------------------------------------------------------
function researchLandingPage(site, items) {
  const current = items.filter((i) => i.chapter === "current");
  const prior = items.filter((i) => i.chapter === "prior");
  return `
<section class="folder-head">
  ${eyebrow("Research")}
  <h1>Case folders, current and prior</h1>
  <p class="folder-desc">Six folders opened this fall with the CYBER-CARE research environment at the University of Houston, and three earlier folders from a BSc spent on explainable AI in medical imaging, kept open, not archived.</p>
</section>
<h2 class="section-label mono">Current: Cybersecurity, AI & Transportation Security</h2>
${grid(current, (i) => exhibitCard(i, { href: `/research/${i.slug}/` }))}
<h2 class="section-label mono">Prior Chapter: Biomedical AI (BSc Era)</h2>
${grid(prior, (i) => exhibitCard(i, { href: `/research/${i.slug}/` }))}
`;
}

function researchDetailPage(site, item, relatedPubs) {
  const m = item.meta || {};
  return `
${backlink("/research/", "All research")}
<article class="detail">
  <div class="detail-head">
    ${item.chapter === "prior" ? typeTag("prior chapter") : statusPill(item.status)}
    <h1>${esc(item.title)}</h1>
    <p class="detail-summary">${esc(item.summary)}</p>
    ${chips(item.tags)}
  </div>
  ${specList([
    ["Problem", m.problem ? esc(m.problem) : ""],
    ["Motivation", m.motivation ? esc(m.motivation) : ""],
    ["Current work", m.currentWork ? esc(m.currentWork) : ""],
    ["Methods", m.methods ? esc(m.methods) : ""],
    ["Datasets", m.datasets ? esc(m.datasets) : ""],
    ["Future directions", m.futureDirections ? esc(m.futureDirections) : ""],
  ])}
  ${relatedPubs && relatedPubs.length ? `<h3 class="section-label mono">Related publication</h3>${grid(relatedPubs, (p) => exhibitCard(p, { href: `/publications/${p.slug}/` }))}` : ""}
  ${linkList(item.links)}
</article>
`;
}

// ---------------------------------------------------------------------------
// Publications
// ---------------------------------------------------------------------------
function publicationCard(p) {
  return `<a class="exhibit-card pub-card" href="${u(`/publications/${p.slug}/`)}">
    <div class="exhibit-top">${typeTag("publication")}<span class="mono pub-year">${p.meta.year}</span></div>
    <h3 class="exhibit-title">${esc(p.title)}</h3>
    <p class="exhibit-summary">${esc(p.meta.venue)} · ${esc(p.meta.quartile)}</p>
    ${chips(p.tags)}
  </a>`;
}

function publicationsLandingPage(site, items) {
  return `
<section class="folder-head">
  ${eyebrow("Publications")}
  <h1>One paper so far: built to hold many more</h1>
  <p class="folder-desc">Every publication here is filed as one exhibit card. This is the template the next one slots into.</p>
</section>
${grid(items, publicationCard)}
`;
}

function publicationDetailPage(site, item, relatedResearch) {
  const m = item.meta;
  return `
${backlink("/publications/", "All publications")}
<article class="detail">
  <div class="detail-head">
    ${typeTag("publication")}
    <h1>${esc(item.title)}</h1>
    <p class="detail-summary">${esc(m.authors.join(", "))}</p>
    ${chips(item.tags)}
  </div>
  ${specList([
    ["Venue", esc(m.venue)],
    ["Year", m.year],
    ["Impact factor", m.impactFactor],
    ["CiteScore", m.citeScore],
    ["Quartile", esc(m.quartile)],
    ["DOI", `<a href="https://doi.org/${esc(m.doi)}" target="_blank" rel="noopener">${esc(m.doi)}</a>`],
    ["Abstract", esc(m.abstract)],
  ])}
  ${relatedResearch && relatedResearch.length ? `<h3 class="section-label mono">Grew out of</h3>${grid(relatedResearch, (r) => exhibitCard(r, { href: `/research/${r.slug}/` }))}` : ""}
  ${linkList(item.links)}
</article>
`;
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
function projectsPage(site, projects) {
  return `
<section class="folder-head">
  ${eyebrow("Projects")}
  <h1>Two kinds of building</h1>
  <p class="folder-desc">Research projects now live inside their own case folders under Research. This page holds the engineering work: built to ship, not to publish.</p>
</section>
<h2 class="section-label mono">Research Projects</h2>
<p class="folder-note">Filed under <a href="${u("/research/")}">Research</a> instead of duplicated here: start with the <a href="${u("/research/lung-nodule-classification/")}">Biomedical AI prior chapter</a>.</p>
<h2 class="section-label mono">Engineering Projects</h2>
${grid(projects, (p) => exhibitCard(p, { href: p.links[0].url }))}
`;
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------
function experiencePage(site, experience, achievements, teaching) {
  const sorted = [...experience].sort((a, b) => (a.meta.startDate < b.meta.startDate ? 1 : -1));
  const items = sorted
    .map(
      (e) => `<li class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-body">
          <p class="timeline-date mono">${fmtDate(e.meta.startDate)} – ${e.meta.current ? "Present" : fmtDate(e.meta.endDate)}</p>
          <h3>${esc(e.title)}</h3>
          <p class="timeline-org">${e.links ? `<a href="${esc(e.links[0].url)}" target="_blank" rel="noopener">${esc(e.meta.org)}</a>` : esc(e.meta.org)}</p>
          <p>${esc(e.summary)}</p>
        </div>
      </li>`
    )
    .join("");
  const achievementItems = achievements
    .map(
      (a) => `<li class="timeline-item timeline-marker">
        <div class="timeline-dot timeline-dot-marker"></div>
        <div class="timeline-body">
          <p class="timeline-date mono">${esc(a.date)} · ${icon("trophy")} Recognition</p>
          <h3>${esc(a.title)}</h3>
          <p>${esc(a.summary)}</p>
          ${linkList(a.links)}
        </div>
      </li>`
    )
    .join("");
  const teachingItems = teaching
    .map(
      (t) => `<div class="teach-card">
        <div class="ratio-16x9"><iframe src="https://www.youtube.com/embed/${esc(t.videoId)}" title="${esc(t.title)}" loading="lazy" allowfullscreen></iframe></div>
        <h4>${esc(t.title)}</h4>
        <p>${esc(t.summary)}</p>
        <a class="btn" href="${esc(t.url)}" target="_blank" rel="noopener">${icon("youtube")} Watch</a>
      </div>`
    )
    .join("");
  return `
<section class="folder-head">
  ${eyebrow("Experience")}
  <h1>Software engineer to research assistant</h1>
</section>
<ul class="timeline">${items}${achievementItems}</ul>
<h2 class="section-label mono">Teaching &amp; Outreach</h2>
<div class="teach-grid">${teachingItems}</div>
`;
}

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------
function educationPage(site, education) {
  const items = education
    .map(
      (e) => `<li class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-body">
          <p class="timeline-date mono">${e.meta.startDate}${e.meta.endDate ? " – " + e.meta.endDate : e.meta.current ? " – Present" : ""}</p>
          <h3>${esc(e.title)}</h3>
          <p class="timeline-org">${esc(e.meta.org)}</p>
          ${e.meta.gpa ? `<p class="mono">CGPA: ${esc(e.meta.gpa)}</p>` : ""}
        </div>
      </li>`
    )
    .join("");
  return `
<section class="folder-head">
  ${eyebrow("Education")}
  <h1>Jahangirnagar to Houston</h1>
</section>
<ul class="timeline">${items}</ul>
`;
}

// ---------------------------------------------------------------------------
// Off the Record
// ---------------------------------------------------------------------------
function offTheRecordHubPage(site, counts) {
  const sections = [
    { href: "/off-the-record/movies/", label: "Movies", icon: "film", n: counts.movies, desc: "What I've watched, rated honestly." },
    { href: "/off-the-record/tv/", label: "TV", icon: "tv", n: counts.tv, desc: "Series in progress and finished." },
    { href: "/off-the-record/books/", label: "Books", icon: "book", n: counts.books, desc: "Reading, completed, and want-to-read." },
    { href: "/off-the-record/places/", label: "Places", icon: "geo-alt", n: counts.places, desc: "Houston and beyond, as I explore it." },
    { href: "/off-the-record/gallery/", label: "Gallery", icon: "images", n: counts.gallery, desc: "Drawings, recitation, and song covers." },
    { href: "/off-the-record/journal/", label: "Journal", icon: "journal-text", n: counts.journal, desc: "Short, unfiltered thoughts." },
  ];
  return `
<section class="folder-head">
  ${eyebrow("Off the Record")}
  <h1>The part that isn't on a résumé</h1>
  <p class="folder-desc">Everything here uses the same exhibit-card system as the research side of the site; it just files differently.</p>
</section>
<div class="otr-grid">
  ${sections
    .map(
      (s) => `<a class="otr-card" href="${u(s.href)}">
        <span class="otr-icon">${icon(s.icon)}</span>
        <h3>${esc(s.label)}</h3>
        <p>${esc(s.desc)}</p>
        <span class="mono otr-count">${s.n} filed</span>
      </a>`
    )
    .join("")}
</div>
`;
}

function otrListPage(site, { title, description, items, cardRenderer, hasSamples }) {
  return `
${backlink("/off-the-record/", "Off the Record")}
<section class="folder-head">
  ${eyebrow("Off the Record")}
  <h1>${esc(title)}</h1>
  <p class="folder-desc">${esc(description)}</p>
</section>
${hasSamples ? `<div class="callout">These are sample entries so the section isn't empty: send over your real list whenever you're ready and I'll swap them in.</div>` : ""}
${items.length ? grid(items, cardRenderer) : `<p class="empty-state">Nothing filed here yet.</p>`}
`;
}

function watchCard(item) {
  const tag = item.sample ? sampleTag() : typeTag(item.type);
  return `<div class="exhibit-card">
    <div class="exhibit-top">${tag}${stars(item.meta.rating)}</div>
    <h3 class="exhibit-title">${esc(item.title)}</h3>
    <p class="exhibit-summary">${esc(item.meta.genre || item.meta.status || "")}${item.meta.year ? " · " + item.meta.year : ""}</p>
    ${item.meta.review ? `<p class="exhibit-note">${esc(item.meta.review)}</p>` : ""}
    ${chips(item.tags)}
  </div>`;
}

function bookCard(item) {
  const tag = item.sample ? sampleTag() : typeTag(item.type);
  return `<div class="exhibit-card">
    <div class="exhibit-top">${tag}${stars(item.meta.rating)}</div>
    <h3 class="exhibit-title">${esc(item.title)}</h3>
    <p class="exhibit-summary">${esc(item.meta.author)} · ${statusPill((item.meta.readingStatus || "").toLowerCase().replace(/\s+/g, "-"))}</p>
    ${chips(item.tags)}
  </div>`;
}

function galleryCard(item) {
  const m = item.media;
  let mediaHtml = "";
  if (m.kind === "image") {
    mediaHtml = `<a class="gallery-media glightbox" href="${u(m.src)}" data-gallery="archive"><img src="${u(m.src)}" alt="${esc(item.title)}" loading="lazy"></a>`;
  } else if (m.kind === "audio") {
    mediaHtml = `<audio controls preload="none" src="${u(m.src)}"></audio>`;
  } else if (m.kind === "video") {
    mediaHtml = `<video controls preload="none" src="${u(m.src)}"></video>`;
  }
  return `<div class="exhibit-card gallery-card">
    <div class="exhibit-top">${typeTag(m.kind)}</div>
    ${mediaHtml}
    <h3 class="exhibit-title">${esc(item.title)}</h3>
    <p class="exhibit-summary">${esc(item.summary)}</p>
    ${chips(item.tags)}
  </div>`;
}

function journalCard(item) {
  return `<a class="exhibit-card" href="${u(`/off-the-record/journal/${item.slug}/`)}">
    <div class="exhibit-top">${typeTag("journal")}<span class="mono">${fmtDate(item.date)}</span></div>
    <h3 class="exhibit-title">${esc(item.title)}</h3>
    <p class="exhibit-summary">${esc(item.summary)}</p>
    ${chips(item.tags)}
  </a>`;
}

function journalDetailPage(site, item) {
  return `
${backlink("/off-the-record/journal/", "Journal")}
<article class="detail">
  <div class="detail-head">
    ${typeTag("journal")}
    <h1>${esc(item.title)}</h1>
    <p class="detail-summary mono">${fmtDate(item.date)}</p>
    ${chips(item.tags)}
  </div>
  <div class="prose"><p>${esc(item.meta.content)}</p></div>
  ${linkList(item.links)}
</article>
`;
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
function contactPage(site) {
  const socials = site.social
    .map((s) => `<a class="contact-social" href="${esc(s.url)}" target="_blank" rel="noopener">${icon(s.icon)} ${esc(s.label)}</a>`)
    .join("");
  return `
<section class="folder-head">
  ${eyebrow("Contact")}
  <h1>Open a line, not a case</h1>
  <p class="folder-desc">Based in ${esc(site.location)} (${esc(site.coordinates)}). Best reached by email.</p>
</section>
<div class="contact-block">
  <a class="btn btn-primary" href="mailto:${esc(site.email)}">${icon("envelope")} ${esc(site.email)}</a>
  <div class="contact-socials">${socials}</div>
</div>
`;
}

module.exports = {
  coverSheetPage, transitionPage, researchLandingPage, researchDetailPage,
  publicationsLandingPage, publicationDetailPage, projectsPage, experiencePage,
  educationPage, offTheRecordHubPage, otrListPage, watchCard, bookCard, galleryCard,
  journalCard, journalDetailPage, contactPage,
};
