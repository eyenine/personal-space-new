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
  const profileImg = site.profileImage || "/assets/img/profile.jpg";
  return `
<div class="cover-band">
  <section class="cover">
    <div class="cover-grid">
      <div class="cover-main">
        <p class="cover-eyebrow mono">Cover Sheet: Filed ${fmtDate(currentEdu.meta.startDate)}</p>
        <h1 class="cover-title">${esc(site.name)}</h1>
        <p class="cover-line">${esc(site.identityLine)}</p>
        <p class="cover-status">${esc(site.status)}<span class="dot"></span>${esc(site.lab)}</p>
        <p class="cover-desc">${esc(site.coverDesc || "Former full-stack engineer (Spring Boot, React.js) on national-scale and had research experience healthcare AI systems, now transitioned into full-time research in cybersecurity, AI, and transportation security at the University of Houston. I leverage my production development background to understand how complex systems break and design stronger defenses against adversaries.")}</p>
        <div class="cover-cta">
          <a class="btn btn-primary" href="${u("/research/")}">${icon("folder2-open")} Open the Research Folder</a>
          <a class="btn" href="${u(site.resumeUrl)}" download>${icon("download")} Download CV</a>
          ${youtube ? `<a class="btn btn-youtube" href="${esc(youtube.url)}" target="_blank" rel="noopener">${icon("youtube")} Watch my YouTube channel</a>` : ""}
        </div>
      </div>
      <div class="cover-portrait-area">
        <div class="cover-portrait-card">
          <div class="cover-portrait-frame">
            <img src="${u(profileImg)}" alt="${esc(site.name)}" class="cover-portrait-img" width="250" height="250">
          </div>
          <div class="cover-portrait-caption mono">
            <span class="status-indicator"></span> Active Researcher · UH
          </div>
        </div>
      </div>
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
<section class="folder-head about-folder-head">
  <div class="folder-head-inner">
    ${eyebrow("University of Houston · PhD Researcher Dossier")}
    <h1 class="about-hero-title">About Me</h1>
    <p class="folder-desc about-hero-subtitle">From Mirpur to Houston: The engineering foundation, the turn to security research, and the principles that stay constant.</p>
    <div class="about-meta-strip mono">
      <span class="about-meta-item"><i class="bi bi-geo-alt"></i> Houston, TX (ex-Dhaka)</span>
      <span class="about-meta-item"><i class="bi bi-mortarboard"></i> University of Houston · ECE PhD</span>
      <span class="about-meta-item"><i class="bi bi-shield-check"></i> CYBER-CARE Lab</span>
      <span class="about-meta-item"><i class="bi bi-terminal"></i> Ex-Synesis IT SWE</span>
    </div>
  </div>
</section>

<div class="about-body">
  <!-- Roots & Geography -->
  <article class="about-chapter">
    <div class="chapter-header">
      <span class="chapter-num mono">01 / ROOTS &amp; GEOGRAPHY</span>
      <h2>Between two worlds: Mirpur's energy to Houston's bayous</h2>
    </div>
    <div class="chapter-content">
      <p>I was born in Jessore CMH and spent my childhood between Jessore and Ghatail before my family eventually settled in Mirpur, Dhaka. Mirpur was home for nearly two decades. It is busy, crowded, energetic, and unmistakably urban. I grew up loving parts of that energy while also constantly wishing there were a few more trees, open spaces, and places to sit beside the water.</p>
      <p>Maybe that is why, after moving to Houston, I quickly found myself drawn to its parks, trails, and bayous. I still enjoy cities, but I have learned that I am happiest when there is some greenery and water nearby.</p>
    </div>
  </article>

  <!-- From curiosity to research -->
  <article class="about-chapter">
    <div class="chapter-header">
      <span class="chapter-num mono">02 / UNDERGRADUATE FOUNDATIONS</span>
      <h2>From curiosity to research</h2>
    </div>
    <div class="chapter-content">
      <p>My path into research did not begin with cybersecurity.</p>
      <p>I studied Information and Communication Technology at the Institute of Information Technology, Jahangirnagar University. During my undergraduate years, I became increasingly interested in machine learning, computer vision, and the broader question of how we can build intelligent systems that people can actually trust.</p>
      <p>That curiosity eventually became my undergraduate thesis on explainable deep learning for lung cancer diagnosis using CT images. I spent about a year working with the LIDC-IDRI dataset, experimenting with transfer learning, ensemble models, preprocessing pipelines, and explainability techniques such as Grad-CAM.</p>

      <div class="about-feature-box">
        <div class="feature-box-top mono">
          <span class="feature-tag tag mono">Featured First-Author Paper</span>
          <span class="feature-venue">Knowledge-Based Systems (Elsevier)</span>
        </div>
        <h3 class="feature-box-title">LungCT-NET: An Explainable Transfer Learning-Based Robust Ensemble Model for Lung Cancer Diagnosis</h3>
        <p class="feature-box-desc">Developed an explainable deep ensemble framework combining transfer learning architectures with Grad-CAM visualization on the LIDC-IDRI dataset for verifiable pulmonary nodule diagnosis.</p>
        <div class="feature-box-cta">
          <a class="btn btn-sm" href="${u("/publications/lungct-net/")}"><i class="bi bi-file-earmark-text"></i> Read Publication Case File</a>
        </div>
      </div>

      <p>The publication mattered to me, but the process mattered more. Research taught me that progress is rarely a straight line. Experiments fail. Code breaks. Results contradict what you expected. Sometimes an idea that looked brilliant on paper simply does not work.</p>
      <p class="about-highlight-p">And then, occasionally, something does.</p>
      <p>I discovered that I genuinely enjoyed that process.</p>
    </div>
  </article>

  <!-- Software engineer, first -->
  <article class="about-chapter">
    <div class="chapter-header">
      <span class="chapter-num mono">03 / INDUSTRY &amp; SCALE</span>
      <h2>Software engineer, first</h2>
    </div>
    <div class="chapter-content">
      <p>After completing my bachelor's degree, I joined <strong>Synesis IT</strong> as a software engineer.</p>
      <p>That experience changed the way I thought about computing.</p>
      <p>I was no longer building something primarily for an assignment or an experiment. I was working with large databases and nationally significant digital systems involving identity, subscriber, and device information. Systems such as <strong>CBVMP</strong> and <strong>NEIR</strong> made security feel much less theoretical.</p>
      
      <div class="about-quote-card">
        <p class="quote-text">&ldquo;When a system operates at national scale, a seemingly small engineering decision can have consequences for a very large number of people.&rdquo;</p>
      </div>

      <p>That experience pushed me toward questions that increasingly interested me:</p>
      <ul class="about-questions-list">
        <li><strong>System Resilience:</strong> How do we design systems that remain trustworthy under attack?</li>
        <li><strong>Anomaly Detection:</strong> How do we detect when something has gone wrong before disaster strikes?</li>
        <li><strong>Data Protection:</strong> How do we protect sensitive information without making systems unusable?</li>
        <li><strong>AI Trustworthiness:</strong> And, as AI becomes embedded into critical infrastructure, how do we know when an intelligent system itself can be trusted?</li>
      </ul>
      <p>Those questions eventually brought me back to research.</p>
    </div>
  </article>

  <!-- Why cybersecurity -->
  <article class="about-chapter">
    <div class="chapter-header">
      <span class="chapter-num mono">04 / THE TRANSITION &amp; THE UH CHAPTER</span>
      <h2>Why cybersecurity</h2>
    </div>
    <div class="chapter-content">
      <p>At first glance, lung CT images and cybersecurity do not have much in common.</p>
      <p>For me, however, there is a thread connecting them.</p>

      <div class="about-central-thesis">
        <span class="thesis-label mono">The Central Question</span>
        <h3 class="thesis-statement">Can we trust the system making the decision?</h3>
      </div>

      <p>In medical imaging, that might mean understanding why a neural network classified a CT scan in a particular way and whether a doctor should trust that prediction.</p>
      <p>In cybersecurity, the same fundamental question appears in a much more adversarial environment. The system may be operating while someone is deliberately trying to deceive, manipulate, poison, or compromise it.</p>
      <p>And when those systems control connected vehicles, transportation infrastructure, communication networks, or other cyber-physical systems, a wrong decision does not necessarily remain inside a computer. It can have consequences in the physical world.</p>
      <p>That is the direction that ultimately brought me to the <strong>University of Houston</strong>, where I began my PhD in Electrical and Computer Engineering in 2026.</p>

      <p>My research interests now sit broadly at the intersection of <strong>cybersecurity and intelligent systems</strong>:</p>
      <div class="about-research-pills">
        <span class="uh-pill">AI/ML Security</span>
        <span class="uh-pill">Federated Learning Security</span>
        <span class="uh-pill">Cyber-Physical &amp; Transportation Security</span>
        <span class="uh-pill">Privacy-Preserving Systems</span>
        <span class="uh-pill">Post-Quantum &amp; Quantum Cybersecurity</span>
      </div>

      <p>I am especially interested in research that connects theory with systems that can actually be built, attacked, tested, measured, and improved.</p>
    </div>
  </article>

  <!-- The kind of researcher I want to become -->
  <article class="about-chapter">
    <div class="chapter-header">
      <span class="chapter-num mono">05 / PHILOSOPHY &amp; VISION</span>
      <h2>The kind of researcher I want to become</h2>
    </div>
    <div class="chapter-content">
      <p>I do not want my understanding of cybersecurity to exist only in papers.</p>
      <p>Alongside my PhD research, I am deliberately developing practical security skills: networking, operating-system security, SOC and detection engineering, penetration testing, web security, incident response, cloud security, and offensive and defensive security techniques.</p>

      <div class="about-triad-grid">
        <div class="triad-card">
          <div class="triad-icon"><i class="bi bi-search"></i></div>
          <div class="triad-tag mono">Research</div>
          <p class="triad-desc">Tells me <strong>why</strong> a problem matters.</p>
        </div>
        <div class="triad-card">
          <div class="triad-icon"><i class="bi bi-code-slash"></i></div>
          <div class="triad-tag mono">Engineering</div>
          <p class="triad-desc">Teaches me <strong>how</strong> systems are actually built.</p>
        </div>
        <div class="triad-card triad-card-accent">
          <div class="triad-icon"><i class="bi bi-shield-slash"></i></div>
          <div class="triad-tag mono">Security</div>
          <p class="triad-desc">Teaches me <strong>how they fail</strong>.</p>
        </div>
      </div>

      <p class="triad-summary">I want my work to exist somewhere in the intersection of all three.</p>

      <p>In the long run, I hope to work as a researcher and educator, contributing to security problems where artificial intelligence, distributed systems, critical infrastructure, and emerging technologies meet. Whatever particular research problems I end up pursuing, I want the work to remain grounded in one principle: <strong>technology becomes valuable only when people can depend on it.</strong></p>
    </div>
  </article>

  <!-- Outside the lab -->
  <article class="about-chapter">
    <div class="chapter-header">
      <span class="chapter-num mono">06 / LIFE &amp; BALANCE</span>
      <h2>Outside the lab</h2>
    </div>
    <div class="chapter-content">
      <p>Research occupies a large part of my life, but I try not to let it become all of it.</p>
      <p>I read a lot, particularly thrillers, fiction, and fantasy. I love movies and television, especially stories involving action, history, science fiction, and the occasional romance. Football has been part of my life for years, and I am a Barcelona supporter.</p>
      <p>I also enjoy drawing geometric patterns. There is something strangely satisfying about starting with a few lines and watching symmetry emerge from them.</p>
      <p>Cooking is another small pleasure, particularly experimenting with vegetarian dishes. My music is usually on the quieter side: soft, relaxing songs that work equally well during a late-night thought or a long walk.</p>
      <p>And I walk a lot. Ten thousand steps is less of a fitness target now and more of a daily ritual.</p>
      
      <div class="about-interests-grid">
        <div class="interest-chip"><i class="bi bi-book"></i> Thrillers, fiction &amp; fantasy reading</div>
        <div class="interest-chip"><i class="bi bi-film"></i> Action, history &amp; sci-fi cinema</div>
        <div class="interest-chip"><i class="bi bi-trophy"></i> Passionate FC Barcelona supporter</div>
        <div class="interest-chip"><i class="bi bi-bezier2"></i> Geometric pattern drawing &amp; symmetry</div>
        <div class="interest-chip"><i class="bi bi-egg-fried"></i> Experimenting with vegetarian cooking</div>
        <div class="interest-chip"><i class="bi bi-music-note-beamed"></i> Soft, relaxing ambient songs</div>
        <div class="interest-chip"><i class="bi bi-activity"></i> Daily 10,000 steps walking ritual</div>
      </div>
    </div>
  </article>

  <!-- What doesn't change -->
  <article class="about-chapter">
    <div class="chapter-header">
      <span class="chapter-num mono">07 / CONSTANTS</span>
      <h2>What doesn't change</h2>
    </div>
    <div class="chapter-content">
      <p>I am fairly disciplined about the ordinary things.</p>
      <p>I prefer waking up early and sleeping early. I like walking and running more than complicated workout routines. I have gone without added sugar for almost two years, including in my coffee, although I still enjoy good food far too much to pretend I am a nutritionist.</p>
      <p>I value sleep more than I used to. I like greenery, quiet spaces, and being near water. Given a choice between a packed venue and a peaceful walk, I will probably choose the walk. I do not smoke or drink, and I try to maintain a life where health, work, curiosity, and rest can coexist rather than compete with one another.</p>
      <p>Moving from Bangladesh to the United States changed a great deal around me. The research changed. The problems became harder. The ambitions became larger.</p>
      
      <div class="about-unmoved-block">
        <p class="unmoved-lead">Some things did not change.</p>
        <p>I still draw geometric patterns for no particular reason. I still sing songs badly but mean every word. I still stop to photograph places that feel peaceful. And I still occasionally find myself awake with an idea that seems important enough to write down before morning.</p>
      </div>

      <div class="about-otr-invitation">
        <div class="otr-invitation-body">
          <p class="mono otr-badge">ARCHIVE // BEYOND THE CV</p>
          <h3>Those parts do not belong on my research CV.</h3>
          <p class="otr-sub">So I keep them <strong>Off the Record</strong>.</p>
          <a class="btn btn-primary" href="${u("/off-the-record/")}"><i class="bi bi-arrow-right-circle"></i> Explore Off the Record</a>
        </div>
      </div>
    </div>
  </article>
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

  const achievementCards = achievements
    .map(
      (a) => `<div class="achieve-card">
        <div class="achieve-card-header">
          <div class="achieve-badge-wrap">
            <span class="achieve-badge mono">${icon("trophy")} ${esc(a.recognition || a.date + " · Recognition")}</span>
            ${a.rank ? `<span class="achieve-rank-pill mono">${esc(a.rank)}</span>` : ""}
          </div>
          <span class="achieve-year mono">${esc(a.date)}</span>
        </div>
        <h3 class="achieve-title">${esc(a.title)}</h3>
        <p class="achieve-summary">${esc(a.summary)}</p>
        ${a.meta && a.meta.teammate ? `<p class="achieve-meta mono"><span>Team:</span> ${esc(a.team || "Team_IIT_JU")} (with ${esc(a.meta.teammate)})</p>` : ""}
        ${chips(a.tags)}
        <div class="achieve-links">
          ${(a.links || []).map(l => `<a class="btn btn-primary" href="${esc(l.url)}" target="_blank" rel="noopener">${icon("box-arrow-up-right")} ${esc(l.label)}</a>`).join("")}
        </div>
      </div>`
    )
    .join("");

  const youtube = site.social.find((s) => s.label === "YouTube");

  const teachingItems = teaching
    .map(
      (t) => `<div class="teach-card">
        <div class="ratio-16x9"><iframe src="https://www.youtube.com/embed/${esc(t.videoId)}" title="${esc(t.title)}" loading="lazy" allowfullscreen></iframe></div>
        <div class="teach-content">
          <h4>${esc(t.title)}</h4>
          <p>${esc(t.summary)}</p>
          <div class="teach-footer">
            <a class="btn btn-youtube" href="${esc(t.url)}" target="_blank" rel="noopener">${icon("youtube")} Watch Lecture</a>
          </div>
        </div>
      </div>`
    )
    .join("");

  return `
<section class="folder-head">
  ${eyebrow("Experience & Milestones")}
  <h1>Engineering, Research &amp; Outreach</h1>
  <p class="folder-desc">From national-scale software engineering to cybersecurity research at the University of Houston, competitive machine learning recognitions, and educational technical outreach.</p>
  <div class="subnav-pills">
    <a href="#experience" class="subnav-pill">${icon("briefcase")} Experience</a>
    <a href="#achievements" class="subnav-pill">${icon("trophy")} Achievements</a>
    <a href="#content-creation" class="subnav-pill">${icon("camera-video")} Educational Content Creation</a>
  </div>
</section>

<section id="experience" class="exp-section">
  <div class="section-title-bar">
    <div>
      <h2 class="section-label mono">${icon("briefcase")} Work &amp; Research Experience</h2>
    </div>
    <span class="section-counter mono">${experience.length} positions</span>
  </div>
  <ul class="timeline">${items}</ul>
</section>

<section id="achievements" class="exp-section">
  <div class="section-title-bar">
    <div>
      <h2 class="section-label mono">${icon("trophy")} Achievements &amp; Recognition</h2>
      <p class="section-subtext">Competitive AI/ML challenges, national benchmarks, and optimization challenges.</p>
    </div>
    <span class="section-counter mono">${achievements.length} filed</span>
  </div>
  <div class="achieve-grid">${achievementCards}</div>
</section>

<section id="content-creation" class="exp-section">
  <div class="section-title-bar">
    <div>
      <h2 class="section-label mono">${icon("camera-video")} Educational Content Creation</h2>
      <p class="section-subtext">Technical lectures, operating system fundamentals, and research paper writing guides created for students and developers.</p>
    </div>
    ${youtube ? `<a class="btn btn-youtube" href="${esc(youtube.url)}" target="_blank" rel="noopener">${icon("youtube")} Watch on YouTube Channel</a>` : ""}
  </div>
  <div class="teach-grid">${teachingItems}</div>
</section>
`;
}

function achievementsPage(site, achievements) {
  const achievementCards = achievements
    .map(
      (a) => `<div class="achieve-card">
        <div class="achieve-card-header">
          <div class="achieve-badge-wrap">
            <span class="achieve-badge mono">${icon("trophy")} ${esc(a.recognition || a.date + " · Recognition")}</span>
            ${a.rank ? `<span class="achieve-rank-pill mono">${esc(a.rank)}</span>` : ""}
          </div>
          <span class="achieve-year mono">${esc(a.date)}</span>
        </div>
        <h3 class="achieve-title">${esc(a.title)}</h3>
        <p class="achieve-summary">${esc(a.summary)}</p>
        ${a.meta && a.meta.teammate ? `<p class="achieve-meta mono"><span>Team:</span> ${esc(a.team || "Team_IIT_JU")} (with ${esc(a.meta.teammate)})</p>` : ""}
        ${chips(a.tags)}
        <div class="achieve-links">
          ${(a.links || []).map(l => `<a class="btn btn-primary" href="${esc(l.url)}" target="_blank" rel="noopener">${icon("box-arrow-up-right")} ${esc(l.label)}</a>`).join("")}
        </div>
      </div>`
    )
    .join("");

  return `
<section class="folder-head">
  ${eyebrow("Honors & Awards")}
  <h1>Achievements &amp; Recognition</h1>
  <p class="folder-desc">Competitive machine learning challenges, optimization contests, and academic benchmarks.</p>
</section>
<div class="achieve-grid">${achievementCards}</div>
`;
}

// ---------------------------------------------------------------------------
// Educational Content Creation
// ---------------------------------------------------------------------------
function contentCreationPage(site, teaching) {
  const youtube = site.social.find((s) => s.label === "YouTube");
  const teachingItems = teaching
    .map(
      (t) => `<div class="teach-card">
        <div class="ratio-16x9"><iframe src="https://www.youtube.com/embed/${esc(t.videoId)}" title="${esc(t.title)}" loading="lazy" allowfullscreen></iframe></div>
        <div class="teach-content">
          <h4>${esc(t.title)}</h4>
          <p>${esc(t.summary)}</p>
          <div class="teach-footer">
            <a class="btn btn-youtube" href="${esc(t.url)}" target="_blank" rel="noopener">${icon("youtube")} Watch Lecture</a>
          </div>
        </div>
      </div>`
    )
    .join("");

  return `
<section class="folder-head">
  ${eyebrow("Outreach & Technical Mentorship")}
  <h1>Educational Content Creation</h1>
  <p class="folder-desc">Structured video tutorials, computer science fundamentals, and academic research writing guides to support students and developers.</p>
  ${youtube ? `<div style="margin-top: 16px;"><a class="btn btn-youtube" href="${esc(youtube.url)}" target="_blank" rel="noopener">${icon("youtube")} Visit YouTube Channel</a></div>` : ""}
</section>
<div class="teach-grid" style="margin-top: 24px;">${teachingItems}</div>
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
          <p class="timeline-desc">${esc(e.summary)}</p>
          ${e.meta.gpa ? `<p class="mono timeline-gpa">CGPA: ${esc(e.meta.gpa)}</p>` : ""}
        </div>
      </li>`
    )
    .join("");
  return `
<section class="folder-head">
  ${eyebrow("Academic Background")}
  <h1>Education</h1>
  <p class="folder-desc">Academic training from Jahangirnagar University to the University of Houston.</p>
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

function otrListPage(site, { title, description, items, cardRenderer, hasSamples, gridClass = "exhibit-grid" }) {
  return `
${backlink("/off-the-record/", "Off the Record")}
<section class="folder-head">
  ${eyebrow("Off the Record")}
  <h1>${esc(title)}</h1>
  <p class="folder-desc">${esc(description)}</p>
</section>
${hasSamples ? `<div class="callout">These are sample entries so the section isn't empty: send over your real list whenever you're ready and I'll swap them in.</div>` : ""}
${items.length ? grid(items, cardRenderer, gridClass) : `<p class="empty-state">Nothing filed here yet.</p>`}
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

function placeCard(item) {
  const videos = (item.media || []).filter((m) => m.kind === "video");
  const photos = (item.media || []).filter((m) => m.kind === "image");

  const videoSection = videos.length
    ? `<div class="place-media-section">
        <div class="place-media-head">
          <h4 class="mono">${icon("camera-video")} Video Highlights</h4>
          <span class="mono place-media-count">${videos.length} clips</span>
        </div>
        <div class="place-video-grid">
          ${videos
            .map(
              (v, idx) => `
            <div class="place-video-item">
              <div class="place-video-frame">
                <video controls preload="none" playsinline src="${u(v.src)}"></video>
              </div>
              <div class="place-video-caption mono">
                <span class="place-clip-tag">Clip ${idx + 1}</span>
                <span class="place-clip-name">${esc(v.src.split("/").pop().replace(/\.[^.]+$/, ""))}</span>
              </div>
            </div>`
            )
            .join("")}
        </div>
      </div>`
    : "";

  const photoSection = photos.length
    ? `<div class="place-media-section">
        <div class="place-media-head">
          <h4 class="mono">${icon("images")} Photo Gallery</h4>
          <span class="mono place-media-count">${photos.length} photos · click any to expand</span>
        </div>
        <div class="place-photo-grid">
          ${photos
            .map(
              (img, idx) => `
            <a class="place-photo-item glightbox" href="${u(img.src)}" data-gallery="place-${esc(item.id)}" data-title="${esc(item.title)} (${idx + 1}/${photos.length})">
              <img src="${u(img.src)}" alt="${esc(item.title)} photo ${idx + 1}" loading="lazy">
              <span class="place-photo-overlay" aria-hidden="true">${icon("arrows-fullscreen")}</span>
            </a>`
            )
            .join("")}
        </div>
      </div>`
    : "";

  return `
  <article class="place-card exhibit-card">
    <div class="place-card-top">
      <div class="place-badges">
        ${typeTag("place")}
        ${item.location ? `<span class="place-location mono">${icon("geo-alt-fill")} ${esc(item.location)}</span>` : ""}
        ${item.date ? `<span class="place-date mono">${icon("calendar3")} ${fmtDate(item.date)}</span>` : ""}
      </div>
      <div class="place-stats-chips mono">
        <span class="stat-chip">${icon("camera")} ${photos.length}</span>
        ${videos.length ? `<span class="stat-chip">${icon("camera-video")} ${videos.length}</span>` : ""}
      </div>
    </div>
    <div class="place-card-body">
      <h3 class="place-title">${esc(item.title)}</h3>
      <p class="place-summary">${esc(item.summary || "")}</p>
      ${chips(item.tags)}
    </div>
    ${videoSection}
    ${photoSection}
  </article>
  `;
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
  const usMail = site.usEmail || "mmibneno@cougarNet.uh.edu";
  const juMails = site.juEmails || [
    "eyenine11@gmail.com",
    "zuleyenine.noman.iit@gmail.com",
    "zuleyenine.stu2018@juniv.edu"
  ];
  const socials = site.social
    .map((s) => `<a class="contact-social" href="${esc(s.url)}" target="_blank" rel="noopener">${icon(s.icon)} <span>${esc(s.label)}</span></a>`)
    .join("");

  return `
<section class="folder-head contact-folder-head">
  ${eyebrow("Communications · UH & IIT-JU")}
  <h1>Contact</h1>
  <p class="folder-desc">Open for research collaborations, academic discourse, and systems security discussions. Based in ${esc(site.location)} (${esc(site.coordinates)}).</p>
</section>

<div class="contact-layout">
  <div class="contact-cards-grid">
    <!-- US Academic Mail -->
    <div class="contact-card contact-card-featured">
      <div class="contact-card-badge mono">
        <span class="badge-dot"></span> US Academic Mail · UH
      </div>
      <div class="contact-card-header">
        <h3 class="contact-card-title">${icon("mortarboard")} University of Houston</h3>
        <p class="contact-card-subtitle">PhD Researcher &amp; Research Assistant · Electrical &amp; Computer Engineering</p>
      </div>
      <div class="contact-mail-highlight">
        <a class="btn btn-primary contact-main-btn" href="mailto:${esc(usMail)}">
          ${icon("envelope-at")} ${esc(usMail)}
        </a>
      </div>
      <p class="contact-card-hint">Official inbox for academic collaborations, lab affairs, conference communications, and research inquiries.</p>
    </div>

    <!-- JU & Personal Mail -->
    <div class="contact-card">
      <div class="contact-card-badge mono">
        ${icon("envelope-paper")} JU &amp; Personal Mail
      </div>
      <div class="contact-card-header">
        <h3 class="contact-card-title">Jahangirnagar University &amp; Personal</h3>
        <p class="contact-card-subtitle">Institute of Information Technology (IIT-JU)</p>
      </div>
      <div class="contact-ju-list">
        ${juMails
          .map(
            (m) => `<a class="contact-ju-item" href="mailto:${esc(m)}">
              <span class="contact-ju-icon">${icon("envelope")}</span>
              <span class="contact-ju-addr mono">${esc(m)}</span>
              <span class="contact-ju-arrow">${icon("arrow-up-right")}</span>
            </a>`
          )
          .join("")}
      </div>
      <p class="contact-card-hint">Direct personal contact, alumni network, and communications regarding prior work.</p>
    </div>
  </div>

  <div class="contact-social-pane">
    <div class="contact-social-head">
      <h3 class="section-label mono">${icon("share")} Online Profiles &amp; Networks</h3>
      <p class="section-subtext">Find code repositories, academic profiles, video lectures, and writings.</p>
    </div>
    <div class="contact-socials">${socials}</div>
  </div>
</div>
`;
}

module.exports = {
  coverSheetPage, transitionPage, researchLandingPage, researchDetailPage,
  publicationsLandingPage, publicationDetailPage, projectsPage, experiencePage,
  achievementsPage, contentCreationPage, educationPage, offTheRecordHubPage, otrListPage, watchCard,
  bookCard, galleryCard, placeCard, journalCard, journalDetailPage, contactPage,
};
