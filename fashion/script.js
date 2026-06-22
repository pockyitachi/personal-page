/* ============================================================
   ATELIER — Fashion Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  /* --------------------------------------------------------
     1. HERO BRUSH REVEAL
     The colour portrait is stacked over the grayscale one and
     hidden behind a radial-gradient mask of radius 0. As the
     cursor moves we recentre a soft, feathered gradient on the
     pointer so colour appears "painted" under the brush.
     -------------------------------------------------------- */
  var hero = document.getElementById("heroImage");
  var colorImg = document.getElementById("heroColor");

  if (hero && colorImg) {
    var RADIUS = 150; // brush size in px

    function maskAt(x, y) {
      // Soft, feathered stops so the edge looks like paint, not a spotlight.
      var g =
        "radial-gradient(circle " + RADIUS + "px at " + x + "px " + y + "px," +
        " rgba(0,0,0,1) 18%," +
        " rgba(0,0,0,0.85) 38%," +
        " rgba(0,0,0,0.45) 60%," +
        " rgba(0,0,0,0) 80%)";
      colorImg.style.webkitMaskImage = g;
      colorImg.style.maskImage = g;
    }

    function hide() {
      var g = "radial-gradient(circle 0px at 50% 50%, #000 0%, transparent 100%)";
      colorImg.style.webkitMaskImage = g;
      colorImg.style.maskImage = g;
    }

    function move(e) {
      var rect = hero.getBoundingClientRect();
      var point = e.touches ? e.touches[0] : e;
      // The two <img> layers are centred in .hero-image, so measuring
      // against the same box keeps the brush exactly under the cursor.
      maskAt(point.clientX - rect.left, point.clientY - rect.top);
    }

    hero.addEventListener("mousemove", move);
    hero.addEventListener("mouseleave", hide);
    // Touch: let a drag paint colour too.
    hero.addEventListener("touchmove", function (e) { move(e); }, { passive: true });
    hero.addEventListener("touchend", hide);
    hide();
  }

  /* --------------------------------------------------------
     2. CREATIONS CAROUSEL
     Translates the track by whole "pages" of visible slides.
     -------------------------------------------------------- */
  var track = document.getElementById("carouselTrack");
  var prev = document.getElementById("prevBtn");
  var next = document.getElementById("nextBtn");

  if (track && prev && next) {
    var index = 0;

    function perView() {
      if (window.innerWidth <= 560) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }
    function maxIndex() {
      return Math.max(0, track.children.length - perView());
    }
    function update() {
      index = Math.min(index, maxIndex());
      var slide = track.children[0];
      var gap = parseFloat(getComputedStyle(track).gap) || 24;
      var step = slide.getBoundingClientRect().width + gap;
      track.style.transform = "translateX(" + -(step * index) + "px)";
    }

    next.addEventListener("click", function () {
      index = index >= maxIndex() ? 0 : index + 1; // wrap to start
      update();
    });
    prev.addEventListener("click", function () {
      index = index <= 0 ? maxIndex() : index - 1; // wrap to end
      update();
    });

    /* Touch / swipe support */
    var startX = 0, dragging = false;
    track.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX; dragging = true;
    }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (!dragging) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev).click();
      dragging = false;
    });

    window.addEventListener("resize", update);
    update();
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
     4. SCROLL REVEAL
     -------------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14 });
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
