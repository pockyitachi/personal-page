/* ============================================================
   SIVERT HØYEM — Cinematic Artist Site interactions
   Slow, smooth, minimal. Parallax + reveal + lazy video embed.
   ============================================================ */
(function () {
  "use strict";

  /* --------------------------------------------------------
     1. HERO PARALLAX
     The background sits slightly taller than the viewport and
     drifts at a fraction of the scroll speed for a slow,
     cinematic feel. rAF-throttled for smoothness.
     -------------------------------------------------------- */
  var bg = document.getElementById("heroBg");
  var ticking = false;

  function parallax() {
    if (bg) {
      var y = window.scrollY * 0.35; // drift factor
      bg.style.transform = "translate3d(0," + y + "px,0)";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(parallax); ticking = true; }
  }, { passive: true });
  parallax();

  /* --------------------------------------------------------
     2. MOBILE NAV
     -------------------------------------------------------- */
  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* --------------------------------------------------------
     3. LAZY VIDEO EMBED
     Keeps the page light: the real iframe is only injected
     when the poster is clicked.
     -------------------------------------------------------- */
  var frame = document.getElementById("videoFrame");
  if (frame) {
    frame.addEventListener("click", function () {
      var src = frame.getAttribute("data-embed");
      if (!src) return;
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", src);
      iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("title", "Music video");
      frame.innerHTML = "";
      frame.appendChild(iframe);
    });
  }

  /* --------------------------------------------------------
     4. SLOW SCROLL REVEAL
     -------------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* --------------------------------------------------------
     5. FOOTER YEAR
     -------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
