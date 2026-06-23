/* ============================================================
   Linqiang Guo — Editorial homepage interactions
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;

  /* --------------------------------------------------------
     1. CURSOR-FOLLOWING IRIDESCENT COLOUR (跟随鼠标的炫彩)
     - --mx/--my drive the radial colour fill of the big name
       and contact title (in % of viewport, used by CSS).
     - --gx/--gy move the blurred colour orb in the hero.
     rAF-throttled for smoothness.
     -------------------------------------------------------- */
  var glow = document.getElementById("heroGlow");
  var pending = false;
  var lastX = window.innerWidth / 2, lastY = window.innerHeight * 0.4;

  function paint() {
    pending = false;
    root.style.setProperty("--mx", lastX + "px");
    root.style.setProperty("--my", lastY + "px");
    if (glow) {
      root.style.setProperty("--gx", lastX + "px");
      root.style.setProperty("--gy", lastY + "px");
    }
  }
  window.addEventListener("pointermove", function (e) {
    lastX = e.clientX; lastY = e.clientY;
    if (!pending) { pending = true; requestAnimationFrame(paint); }
  }, { passive: true });
  paint();

  /* --------------------------------------------------------
     2. PORTRAIT BRUSH REVEAL (grayscale -> colour)
     -------------------------------------------------------- */
  var frame = document.getElementById("revealFrame");
  var colorLayer = document.getElementById("revealColor");
  if (frame && colorLayer) {
    var R = 130;
    function maskAt(x, y) {
      var g = "radial-gradient(circle " + R + "px at " + x + "px " + y + "px," +
              " rgba(0,0,0,1) 18%, rgba(0,0,0,0.8) 42%, rgba(0,0,0,0.4) 62%, rgba(0,0,0,0) 80%)";
      colorLayer.style.webkitMaskImage = g; colorLayer.style.maskImage = g;
    }
    function hide() {
      var g = "radial-gradient(circle 0px at 50% 50%, #000 0%, transparent 100%)";
      colorLayer.style.webkitMaskImage = g; colorLayer.style.maskImage = g;
    }
    function move(e) {
      var rect = frame.getBoundingClientRect();
      var p = e.touches ? e.touches[0] : e;
      maskAt(p.clientX - rect.left, p.clientY - rect.top);
    }
    frame.addEventListener("mousemove", move);
    frame.addEventListener("mouseleave", hide);
    frame.addEventListener("touchmove", function (e) { move(e); }, { passive: true });
    frame.addEventListener("touchend", hide);
    hide();
  }

  /* --------------------------------------------------------
     3. MOBILE NAV
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
     4. NAV BORDER ON SCROLL
     -------------------------------------------------------- */
  var nav = document.getElementById("nav");
  function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --------------------------------------------------------
     5. SCROLL REVEAL
     -------------------------------------------------------- */
  var reveals = document.querySelectorAll("[data-reveal]");
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
     6. FOOTER YEAR
     -------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
