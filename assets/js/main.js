/**
 * eyenine.dev: light client-side behavior only.
 * All content is already static HTML by build time; this file never
 * fetches or renders content, it only adds interaction on top of it.
 */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("nav-toggle");
  var tabs = document.getElementById("tabs");
  if (toggle && tabs) {
    toggle.addEventListener("click", function () {
      var open = tabs.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    tabs.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        tabs.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Gallery lightbox (GLightbox is vendored separately)
  if (window.GLightbox) {
    GLightbox({ selector: ".glightbox" });
  }

  // Gentle reveal-on-scroll, fully skipped under reduced-motion
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".exhibit-card, .bento-card, .bento-lg, .otr-card, .timeline-item");
    targets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
      el.style.transition = "opacity .45s ease, transform .45s ease";
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach(function (el) { io.observe(el); });
  }
})();
