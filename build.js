#!/usr/bin/env node
"use strict";
/**
 * Zero-dependency static site generator for eyenine.dev.
 * Reads /content/*.json, renders it through /templates, writes static
 * HTML into /dist. Run with: node build.js
 */
const fs = require("fs");
const path = require("path");
const T = require("./templates/site.js");
const P = require("./templates/pages.js");

const ROOT = __dirname;
const OUT = path.join(ROOT, "dist");
const CONTENT = path.join(ROOT, "content");

function readJSON(name) {
  return JSON.parse(fs.readFileSync(path.join(CONTENT, name), "utf8"));
}

function writePage(relPath, html) {
  const full = path.join(OUT, relPath, "index.html");
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}

function copyIfExists(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
}

function byId(arr) {
  return Object.fromEntries(arr.map((i) => [i.id, i]));
}

function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const site = readJSON("site.json");
  // Local preview: `node build.js --local` builds the site as if it were
  // served from the domain root, so a plain static server (e.g.
  // `python3 -m http.server` from inside dist/) works without needing to
  // fake the /Eyenine/ GitHub Pages path. Works the same on Windows, macOS
  // and Linux since it's a CLI flag, not a shell-specific env var.
  const isLocal = process.argv.includes("--local");
  T.setBasePath(isLocal ? "" : site.basePath);
  const research = readJSON("research.json");
  const publications = readJSON("publications.json");
  const projects = readJSON("projects.json");
  const experience = readJSON("experience.json");
  const education = readJSON("education.json");
  const achievements = readJSON("achievements.json");
  const teaching = readJSON("teaching.json");
  const journal = readJSON("journal.json");
  const gallery = readJSON("gallery.json");
  const movies = readJSON("movies.json");
  const tv = readJSON("tv.json");
  const books = readJSON("books.json");
  const places = readJSON("places.json");

  const researchById = byId(research);
  const pubById = byId(publications);

  // ---- Cover Sheet ----
  const currentResearch = research.find((r) => r.chapter === "current") || research[0];
  const latestPub = [...publications].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  const currentRole = experience.find((e) => e.id === "ra-uh") || experience[0];
  const currentEdu = education.find((e) => e.id === "phd-uh") || education[0];
  const latestJournal = [...journal].sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  writePage(
    "",
    T.layout(site, {
      title: "",
      activeId: "home",
      bodyClass: "page-home",
      description: site.tagline,
      body: P.coverSheetPage(site, { currentResearch, latestPub, currentRole, currentEdu, latestJournal }),
    })
  );

  const aboutHtml = T.layout(site, {
    title: "About Me",
    activeId: "transition",
    description: "About MD Zuleyenine Ibne Noman: From software engineering to cybersecurity and AI systems research at the University of Houston.",
    body: P.transitionPage(site),
  });
  writePage("transition", aboutHtml);
  writePage("about", aboutHtml);

  writePage(
    "research",
    T.layout(site, {
      title: "Research",
      activeId: "research",
      description: "Cybersecurity, AI, and transportation-security research at the University of Houston, plus a prior chapter in biomedical AI.",
      body: P.researchLandingPage(site, research),
    })
  );
  research.forEach((item) => {
    const related = (item.meta.relatedPublications || []).map((id) => pubById[id]).filter(Boolean);
    writePage(
      `research/${item.slug}`,
      T.layout(site, {
        title: item.title,
        activeId: "research",
        description: item.summary,
        body: P.researchDetailPage(site, item, related),
      })
    );
  });

  writePage(
    "publications",
    T.layout(site, {
      title: "Publications",
      activeId: "publications",
      description: "Peer-reviewed publications.",
      body: P.publicationsLandingPage(site, publications),
    })
  );
  publications.forEach((item) => {
    const related = (item.meta.relatedResearch || []).map((id) => researchById[id]).filter(Boolean);
    writePage(
      `publications/${item.slug}`,
      T.layout(site, {
        title: item.title,
        activeId: "publications",
        description: item.summary,
        body: P.publicationDetailPage(site, item, related),
      })
    );
  });

  writePage(
    "projects",
    T.layout(site, {
      title: "Projects",
      activeId: "projects",
      description: "Engineering and research projects.",
      body: P.projectsPage(site, projects),
    })
  );

  writePage(
    "experience",
    T.layout(site, {
      title: "Experience",
      activeId: "experience",
      description: "Professional experience, from software engineering to research.",
      body: P.experiencePage(site, experience, achievements, teaching),
    })
  );

  writePage(
    "achievements",
    T.layout(site, {
      title: "Achievements",
      activeId: "achievements",
      description: "Achievements and competitive machine learning recognitions.",
      body: P.achievementsPage(site, achievements),
    })
  );

  const contentCreationHtml = T.layout(site, {
    title: "Educational Content Creation",
    activeId: "content-creation",
    description: "Educational video lectures, computer science fundamentals, and academic research paper writing guides.",
    body: P.contentCreationPage(site, teaching),
  });
  writePage("educational-content", contentCreationHtml);
  writePage("content-creation", contentCreationHtml);

  writePage(
    "education",
    T.layout(site, {
      title: "Education",
      activeId: "education",
      description: "Education, from Jahangirnagar University to the University of Houston.",
      body: P.educationPage(site, education),
    })
  );

  writePage(
    "off-the-record",
    T.layout(site, {
      title: "Off the Record",
      activeId: "otr",
      description: "Movies, books, places, gallery, and journal: life beyond the lab.",
      body: P.offTheRecordHubPage(site, {
        movies: movies.length,
        tv: tv.length,
        books: books.length,
        places: places.length,
        gallery: gallery.length,
        journal: journal.length,
      }),
    })
  );

  writePage(
    "off-the-record/movies",
    T.layout(site, {
      title: "Movies",
      activeId: "otr",
      description: "Movies watched.",
      body: P.otrListPage(site, {
        title: "Movies",
        description: "What I've watched, rated honestly.",
        items: movies,
        cardRenderer: P.watchCard,
        hasSamples: movies.some((m) => m.sample),
      }),
    })
  );

  writePage(
    "off-the-record/tv",
    T.layout(site, {
      title: "TV",
      activeId: "otr",
      description: "TV series watched.",
      body: P.otrListPage(site, {
        title: "TV",
        description: "Series in progress and finished.",
        items: tv,
        cardRenderer: P.watchCard,
        hasSamples: tv.some((t) => t.sample),
      }),
    })
  );

  writePage(
    "off-the-record/books",
    T.layout(site, {
      title: "Books",
      activeId: "otr",
      description: "Reading list.",
      body: P.otrListPage(site, {
        title: "Books",
        description: "Reading, completed, and want-to-read.",
        items: books,
        cardRenderer: P.bookCard,
        hasSamples: books.some((b) => b.sample),
      }),
    })
  );

  writePage(
    "off-the-record/places",
    T.layout(site, {
      title: "Places",
      activeId: "otr",
      description: "Places visited.",
      body: P.otrListPage(site, {
        title: "Places",
        description: "Houston and beyond, as I explore it.",
        items: places,
        cardRenderer: P.placeCard,
        hasSamples: false,
        gridClass: "places-stream",
      }),
    })
  );

  writePage(
    "off-the-record/gallery",
    T.layout(site, {
      title: "Gallery",
      activeId: "otr",
      description: "Drawings, recitation, and song covers.",
      body: P.otrListPage(site, {
        title: "Gallery",
        description: "Drawings, recitation, and song covers.",
        items: gallery,
        cardRenderer: P.galleryCard,
        hasSamples: false,
      }),
    })
  );

  writePage(
    "off-the-record/journal",
    T.layout(site, {
      title: "Journal",
      activeId: "otr",
      description: "Short, unfiltered thoughts.",
      body: P.otrListPage(site, {
        title: "Journal",
        description: "Short, unfiltered thoughts.",
        items: journal,
        cardRenderer: P.journalCard,
        hasSamples: false,
      }),
    })
  );
  journal.forEach((item) => {
    writePage(
      `off-the-record/journal/${item.slug}`,
      T.layout(site, {
        title: item.title,
        activeId: "otr",
        description: item.summary,
        body: P.journalDetailPage(site, item),
      })
    );
  });

  writePage(
    "contact",
    T.layout(site, {
      title: "Contact",
      activeId: "contact",
      description: "Get in touch.",
      body: P.contactPage(site),
    })
  );

  // ---- Static assets (copied as-is; safe no-ops if a folder doesn't exist) ----
  const assetDirs = [
    "assets/img",
    "assets/audio",
    "assets/pdf",
    "assets/Pictures",
    "assets/vendor/bootstrap-icons",
    "assets/vendor/glightbox",
  ];
  assetDirs.forEach((rel) => copyIfExists(path.join(ROOT, rel), path.join(OUT, rel)));
  copyIfExists(path.join(ROOT, "assets/css/main.css"), path.join(OUT, "assets/css/main.css"));
  copyIfExists(path.join(ROOT, "assets/js/main.js"), path.join(OUT, "assets/js/main.js"));

  // ---- robots.txt / sitemap.xml ----
  fs.writeFileSync(path.join(OUT, "robots.txt"), "User-agent: *\nAllow: /\n");

  const pageCount = countHtmlFiles(OUT);
  console.log(`Built ${pageCount} pages to ${OUT}`);

  if (!isLocal) {
    const rootIndex = path.join(ROOT, "index.html");
    const distIndex = path.join(OUT, "index.html");
    if (fs.existsSync(distIndex)) {
      fs.copyFileSync(distIndex, rootIndex);
      console.log(`Synced ${rootIndex} for GitHub Pages root deployment.`);
    }

    const sections = [
      "transition",
      "about",
      "research",
      "publications",
      "projects",
      "experience",
      "achievements",
      "educational-content",
      "content-creation",
      "education",
      "off-the-record",
      "contact"
    ];
    for (const sec of sections) {
      const srcDir = path.join(OUT, sec);
      const destDir = path.join(ROOT, sec);
      if (fs.existsSync(srcDir)) {
        copyIfExists(srcDir, destDir);
        console.log(`Synced ${sec}/ for GitHub Pages root deployment.`);
      }
    }
  }
}

function countHtmlFiles(dir) {
  let n = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) n += countHtmlFiles(full);
    else if (entry.name === "index.html") n += 1;
  }
  return n;
}

main();
