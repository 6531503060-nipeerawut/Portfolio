/* =====================================================================
   Peerawut Nipakornpan — Portfolio interactions
   No framework, no CDN. Every effect degrades gracefully and every
   animation yields to prefers-reduced-motion.
   ---------------------------------------------------------------------
   1.  Helpers
   2.  Scroll bus (one listener, cached metrics)
   3.  Toast
   4.  Theme
   5.  Navigation and smooth scrolling
   6.  Progress bar
   7.  Reveal, typewriter, counters
   8.  Pointer flourishes
   9.  Copy email
   10. Animation budget & boot
   ===================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  var THEME_KEY = "portfolio-theme";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /*
   * URL helpers.
   *
   * Now that the site is more than one document a nav href can be "/",
   * "/about" or "/#skills", and only the last kind describes somewhere on
   * the page currently being viewed. Trailing slashes are stripped so "/"
   * and "" compare equal.
   */
  function currentPath() {
    return (location.pathname || "/").replace(/\/+$/, "") || "/";
  }

  function routeOf(link) {
    var href = link.getAttribute("href") || "";
    var cut = href.indexOf("#");
    return (cut < 0 ? href : href.slice(0, cut)).replace(/\/+$/, "") || "/";
  }

  function hashOf(link) {
    var href = link.getAttribute("href") || "";
    var cut = href.indexOf("#");
    return cut < 0 ? "" : href.slice(cut + 1);
  }

  /* Run a callback at most once per animation frame. */
  function rafThrottle(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        fn();
      });
    };
  }

  /* Cross-browser matchMedia listener (Safari < 14 only has addListener). */
  function onMediaChange(media, handler) {
    if (media.addEventListener) media.addEventListener("change", handler);
    else if (media.addListener) media.addListener(handler);
  }

  /*
   * How far below the top of the viewport an anchor should land.
   *
   * Read back off scroll-padding-top rather than from --nav-offset, which is
   * where that padding comes from: the property carries a calc and an env(),
   * and parseInt would choke on both, while the resolved padding is a plain
   * pixel length. Taking it from the declaration the browser itself uses is
   * also what keeps an eased jump from being corrected afterwards — the page
   * snaps, and a jump aimed anywhere but its own snap point lands and then
   * twitches into place.
   */
  function navOffset() {
    return parseFloat(getComputedStyle(root).scrollPaddingTop) || 88;
  }

  /* ── 2. Scroll bus ─────────────────────────────────────────────── */

  /*
   * One scroll listener for the whole page. Document metrics are measured
   * on resize rather than per frame: reading scrollHeight inside a scroll
   * handler forces a synchronous layout, and doing it after a class write
   * forces two.
   */
  var metrics = { y: 0, vh: 0, docH: 0, max: 0 };
  var scrollSubscribers = [];
  var resizeSubscribers = [];

  function remeasure() {
    metrics.vh = window.innerHeight;
    metrics.docH = root.scrollHeight;
    metrics.max = Math.max(metrics.docH - metrics.vh, 0);
  }

  /* Bumped whenever cached element geometry could have moved. */
  var geometryEpoch = 0;

  var dispatchScroll = rafThrottle(function () {
    metrics.y = window.scrollY;
    for (var i = 0; i < scrollSubscribers.length; i++) scrollSubscribers[i](metrics);
  });

  var dispatchResize = rafThrottle(function () {
    remeasure();
    geometryEpoch++;
    for (var i = 0; i < resizeSubscribers.length; i++) resizeSubscribers[i](metrics);
    metrics.y = window.scrollY;
    for (var j = 0; j < scrollSubscribers.length; j++) scrollSubscribers[j](metrics);
  });

  function onScroll(fn) { scrollSubscribers.push(fn); }
  function onResize(fn) { resizeSubscribers.push(fn); }

  function startScrollBus() {
    remeasure();
    metrics.y = window.scrollY;

    window.addEventListener("scroll", function () {
      // Anything cached in viewport coordinates is stale once the page moves.
      geometryEpoch++;
      dispatchScroll();
    }, { passive: true });

    window.addEventListener("resize", dispatchResize, { passive: true });

    /* An eased jump has to yield the moment the visitor scrolls for
       themselves, or the page pulls against the wheel or the flick. These
       are registered once rather than per jump, so nothing accumulates. */
    window.addEventListener("wheel", cancelGlide, { passive: true });
    window.addEventListener("touchstart", cancelGlide, { passive: true });

    // Late webfonts and images change the document height.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(dispatchResize);
    window.addEventListener("load", dispatchResize);

    dispatchResize();
  }

  /* ── 3. Toast ──────────────────────────────────────────────────── */

  var toastStack = $("#toastStack");

  function toast(message, variant) {
    if (!toastStack) return;

    var el = document.createElement("div");
    el.className =
      "toast flex items-center gap-[.7rem] rounded-full border border-line-strong bg-glass-strong " +
      "px-5 py-[.8rem] text-[.89rem] font-medium text-ink shadow-lg animate-toast-in";

    var icon = variant === "error" ? "M12 8v5m0 3.5v.01" : "M20 6L9 17l-5-5";
    var tone = variant === "error"
      ? "bg-brand-4"
      : "bg-[image:var(--gradient-brand)]";
    el.innerHTML =
      '<span class="grid size-[22px] flex-none place-items-center rounded-full text-white ' + tone +
      '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="size-[13px]" ' +
      'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="' + icon + '"/></svg></span>' +
      "<span></span>";
    el.lastChild.textContent = message;

    toastStack.appendChild(el);

    setTimeout(function () {
      el.classList.remove("animate-toast-in");
      el.classList.add("animate-toast-out");
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 380);
    }, 2600);
  }

  /* ── 4. Theme ──────────────────────────────────────────────────── */

  function setupTheme() {
    var toggle = $("#themeToggle");
    var meta = $("#themeColor");
    var osLight = window.matchMedia("(prefers-color-scheme: light)");
    var animToken = 0;

    function storedTheme() {
      try {
        var v = localStorage.getItem(THEME_KEY);
        return v === "light" || v === "dark" ? v : null;
      } catch (e) {
        return null; // Private mode or blocked storage.
      }
    }

    /* Paint only. Persisting here would make every visitor look like they
       had made an explicit choice, permanently disabling the OS follow. */
    function paint(theme) {
      root.setAttribute("data-theme", theme);

      // The browser chrome colour is driven by the same value as the page,
      // so an explicit override cannot desync the address bar from the body.
      if (meta) meta.setAttribute("content", theme === "dark" ? "#05070f" : "#eceff8");

      if (toggle) {
        toggle.setAttribute("aria-label",
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
        toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      }
    }

    function persist(theme) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
    }

    paint(storedTheme() || (osLight.matches ? "light" : "dark"));

    // Track the OS for as long as the visitor has not chosen for themselves.
    onMediaChange(osLight, function (e) {
      if (!storedTheme()) paint(e.matches ? "light" : "dark");
    });

    if (!toggle) return;

    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      persist(next);

      // Instant swap where View Transitions are unavailable or unwanted.
      if (!document.startViewTransition || reduceMotion.matches) {
        paint(next);
        return;
      }

      // Expand the new palette out of the button the visitor just pressed.
      var rect = toggle.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      var radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      root.style.setProperty("--wx", x + "px");
      root.style.setProperty("--wy", y + "px");
      root.style.setProperty("--wr", radius + "px");
      root.classList.add("theme-anim");

      // Rapid clicks overlap: only the newest transition may clear the class,
      // or a superseded one strips the wipe from the transition still running.
      var token = ++animToken;
      document.startViewTransition(function () { paint(next); })
        .finished.finally(function () {
          if (token === animToken) root.classList.remove("theme-anim");
        });
    });
  }

  /* ── 5. Navigation ─────────────────────────────────────────────── */

  function setupNav() {
    var nav = $("#nav");
    var here = currentPath();

    /*
     * One rail per navigation surface. There is one of them now — the pill
     * row in the header — where there used to be two: a bottom tab bar
     * appeared below 981px and was kept in step with this one. That bar has
     * moved out of this document entirely, into the phone app under
     * src/app/(mobile), where its entries navigate instead of scrolling and
     * React owns the active state. The list stays a list because the spy,
     * the pill and the measurement below are written against it, and a
     * second surface would cost one line rather than a rewrite.
     */
    function makeRail(root, pill, selector) {
      if (!root) return null;
      return { root: root, pill: pill, links: $$(selector, root), geom: [] };
    }

    var rails = [
      makeRail($("#navLinks"), $("#navPill"), ".nav__link")
    ].filter(Boolean);

    if (!rails.length) return;

    // Index-aligned with the first rail's links; a null marks an entry the
    // spy skips. Every rail carries the same hrefs, so one pass covers them.
    var lead = rails[0].links;
    var targets = lead.map(function (link) {
      if (routeOf(link) !== here) return null;
      var id = hashOf(link) || link.getAttribute("data-section");
      return id ? document.getElementById(id) : null;
    });
    var sections = targets.filter(Boolean);

    /*
     * A route with no anchors of its own — About, Contact, Profile — has
     * nothing to spy on, so its entry is simply active for as long as we
     * are on it. Resolved once here rather than re-derived every scroll.
     */
    var staticId = null;
    if (!sections.length) {
      for (var s = 0; s < lead.length; s++) {
        if (routeOf(lead[s]) === here) {
          staticId = lead[s].getAttribute("data-section");
          break;
        }
      }
    }

    /* The entries the rail actually carries, so an eased jump aimed at
       something that is not one of them — the skip link — leaves the spy
       alone rather than emptying the rail for the length of the flight. */
    var railIds = {};
    for (var k = 0; k < lead.length; k++) {
      var railId = lead[k].getAttribute("data-section");
      if (railId) railIds[railId] = true;
    }

    var tops = [];
    var lastActive = null;
    var stuck = null;

    function measure() {
      for (var r = 0; r < rails.length; r++) {
        var rail = rails[r];
        var railLeft = rail.root.getBoundingClientRect().left;
        rail.geom = rail.links.map(function (link) {
          var box = link.getBoundingClientRect();
          return { width: box.width, offset: box.left - railLeft };
        });
      }
      tops = sections.map(function (section) { return section.offsetTop; });
    }

    function movePill(rail, index) {
      if (!rail.pill) return;

      var g = index >= 0 ? rail.geom[index] : null;

      // A rail that is display:none measures zero. Nothing to point at.
      if (!g || !g.width) {
        rail.pill.style.opacity = "0";
        return;
      }

      rail.pill.style.width = g.width + "px";
      rail.pill.style.transform = "translateX(" + g.offset + "px)";
      rail.pill.style.opacity = "1";

      /* The transition is gated on this class, so the first placement is a
         cut rather than a slide out of the left-hand corner. Opening
         /#work would otherwise start with the pill travelling four tabs. */
      if (!rail.ready) {
        rail.ready = true;
        requestAnimationFrame(function () { rail.pill.classList.add("is-ready"); });
      }
    }

    function setActive(id) {
      if (id === lastActive) return;
      lastActive = id;

      for (var r = 0; r < rails.length; r++) {
        var rail = rails[r];
        var index = -1;

        for (var i = 0; i < rail.links.length; i++) {
          var link = rail.links[i];
          var on = link.getAttribute("data-section") === id;

          link.classList.toggle("is-active", on);
          // The colour change is the only cue otherwise, and a screen reader
          // cannot see it.
          if (on) {
            link.setAttribute("aria-current", "true");
            index = i;
          } else {
            link.removeAttribute("aria-current");
          }
        }

        movePill(rail, index);
      }
    }

    // Reads only cached values; the scroll bus supplies the metrics.
    onScroll(function (m) {
      var scrolled = m.y > 24;
      if (nav && scrolled !== stuck) {
        stuck = scrolled;
        nav.classList.toggle("is-stuck", scrolled);
      }

      if (staticId) { setActive(staticId); return; }

      /* A jump owns the rail until it lands. Without this the spy walks the
         pill through every section the page passes on the way, so clicking
         Contact reads as four hops rather than one move. */
      if (glideTargetId && railIds[glideTargetId]) { setActive(glideTargetId); return; }

      // The section occupying the viewport's upper third wins.
      var line = m.y + m.vh * 0.32;
      var current = sections.length ? sections[0].id : "";

      for (var i = 0; i < tops.length; i++) {
        if (tops[i] <= line) current = sections[i].id;
      }

      // Anything scrolled to the very bottom lights up the last link.
      if (sections.length && m.max > 0 && m.y >= m.max - 4) {
        current = sections[sections.length - 1].id;
      }

      setActive(current);
    });

    onResize(function () {
      measure();
      lastActive = null;
    });

    measure();
  }

  /* ── Smooth scrolling ──────────────────────────────────────────── */

  /*
   * `behavior: "smooth"` hands the curve to the browser, and the browser
   * uses one duration for every distance — on Chrome that is around 150ms,
   * which reads as a cut rather than a move once the jump is a few sections
   * long. This runs the same move on a fixed ease over a duration that
   * grows with the distance, and gets out of the way the instant the
   * visitor touches the page themselves.
   */
  var glideToken = 0;

  /* Which nav entry a jump is heading for, where the caller knows. Read by
     the scroll spy in setupNav so the rail holds the entry that was clicked
     instead of chasing every section the page flies past. */
  var glideTargetId = null;

  /*
   * Two of the browser's own scroll behaviours have to stand down for the
   * length of a jump, because each of them drives the same property from
   * the other side and what the visitor sees is the two pulling against
   * each other.
   *
   *   scroll-behavior: smooth — every per-frame write below would be put
   *   through the browser's own ease as well: two curves, one property.
   *
   *   scroll-snap-type: y proximity — this is the one that shows. The snap
   *   engine re-runs after every *programmatic* scroll, not only at the end
   *   of a gesture, so for as long as a jump is still inside the hero's
   *   proximity range — Chrome counts roughly a third of the viewport —
   *   each frame is dragged back towards the top before the next one is
   *   written. That is the stutter the wheel never produces: a wheel
   *   gesture is snapped once, when the visitor stops.
   *
   * Holding is idempotent and only the last owner hands the values back, so
   * a jump that supersedes another cannot capture the suspended values as
   * the ones to restore, and cannot have the jump it replaced restore them
   * out from under it.
   */
  var glideHeld = false;
  var heldBehavior = "";
  var heldSnap = "";

  function holdScrollEffects() {
    if (glideHeld) return;
    glideHeld = true;
    heldBehavior = root.style.scrollBehavior;
    heldSnap = root.style.scrollSnapType;
    root.style.scrollBehavior = "auto";
    root.style.scrollSnapType = "none";
  }

  function releaseScrollEffects() {
    if (!glideHeld) return;
    glideHeld = false;
    glideTargetId = null;
    root.style.scrollBehavior = heldBehavior;

    /* Snapping comes back a frame after the last write rather than beside
       it: restored in the same frame, the engine still sees a scroll that
       has only just landed and re-snaps it, which is the twitch navOffset()
       exists to avoid. Skipped if another jump has claimed the page since. */
    requestAnimationFrame(function () {
      if (!glideHeld) root.style.scrollSnapType = heldSnap;
    });
  }

  function cancelGlide() {
    if (!glideHeld) return;
    glideToken++;
    releaseScrollEffects();
  }

  function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
  }

  /* `activeId` is the section the jump is aimed at, where the caller knows
     which one it is — the nav rail holds that entry for the whole flight. */
  function glideTo(top, activeId) {
    var to = Math.max(top, 0);
    var from = window.scrollY;
    var delta = to - from;

    if (reduceMotion.matches || Math.abs(delta) < 2) {
      glideToken++; // Stop anything still in flight before overruling it.
      window.scrollTo(0, to);
      releaseScrollEffects();
      return;
    }

    holdScrollEffects();
    glideTargetId = activeId || null;

    // Long jumps must not take proportionally longer or crossing the page
    // becomes a wait; short ones must not be instant.
    var duration = Math.min(1150, Math.max(430, Math.abs(delta) * 0.62));
    var began = null;
    var token = ++glideToken;

    requestAnimationFrame(function step(now) {
      // Superseded, or the visitor has taken the page over. Whoever did
      // that owns the restore; this frame simply stops writing.
      if (token !== glideToken) return;

      if (began === null) began = now;

      var t = Math.min((now - began) / duration, 1);
      window.scrollTo(0, from + delta * easeInOutQuint(t));

      if (t < 1) requestAnimationFrame(step);
      else releaseScrollEffects();
    });
  }

  function setupSmoothScroll() {
    /* In-page navigation must move focus as well as the viewport, or the
       skip link only scrolls and the next Tab lands back in the navbar. */
    function focusTarget(el) {
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    }

    $$('a[href*="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        if (routeOf(this) !== currentPath()) return;

        var id = hashOf(this);
        if (!id) return;

        var target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();

        // The id doubles as the rail entry to hold: every nav href is
        // "/#<section id>", and the spy ignores an id the rail does not carry.
        glideTo(target.getBoundingClientRect().top + window.pageYOffset - navOffset(), id);
        focusTarget(target);

        // Keep the URL shareable without letting the browser jump the page.
        if (history.replaceState) history.replaceState(null, "", "#" + id);
      });
    });
  }

  /* ── 6. Progress bar ───────────────────────────────────────────── */

  function setupProgress() {
    var bar = $("#progress");
    var toTop = $("#toTop");
    var visible = null;

    onScroll(function (m) {
      if (bar) bar.style.transform = "scaleX(" + (m.max > 0 ? Math.min(m.y / m.max, 1) : 0) + ")";

      if (toTop) {
        var show = m.y > m.vh * 0.6;
        if (show !== visible) {
          visible = show;
          toTop.classList.toggle("is-visible", show);
        }
      }
    });

    if (toTop) {
      toTop.addEventListener("click", function () { glideTo(0, "home"); });
    }
  }

  /* ── 7. Scroll reveal ──────────────────────────────────────────── */

  function setupReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    // Stands down the stylesheet's failsafe, which reveals everything on a
    // timer in case this file never arrives. From here the observer owns it.
    root.setAttribute("data-reveal-ready", "");

    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ── Rotating role line ────────────────────────────────────────── */

  function setupTypewriter() {
    var el = $("#roleText");
    var noop = { start: function () {}, stop: function () {} };
    if (!el) return noop;

    // The list lives in the markup so the no-JS render and this loop cannot
    // disagree about the first role.
    var roles = (el.getAttribute("data-roles") || "").split("|")
      .map(function (r) { return r.trim(); })
      .filter(Boolean);

    if (roles.length < 2 || reduceMotion.matches) return noop;

    var index = 0;
    var chars = roles[0].length; // The first role is already on screen.
    var deleting = true;
    var timer = null;

    function tick() {
      timer = null;

      var word = roles[index];
      chars += deleting ? -1 : 1;
      el.textContent = word.slice(0, chars);

      var delay = deleting ? 38 : 68;

      if (!deleting && chars === word.length) {
        deleting = true;
        delay = 1700;
      } else if (deleting && chars === 0) {
        deleting = false;
        index = (index + 1) % roles.length;
        delay = 320;
      }

      timer = setTimeout(tick, delay);
    }

    return {
      // Idle while the hero is off screen: an unbounded timer chain would keep
      // rewriting text nobody can see for the life of the page.
      start: function () { if (!timer) timer = setTimeout(tick, 1700); },
      stop: function () {
        if (timer) { clearTimeout(timer); timer = null; }
      }
    };
  }

  /* ── Count-up statistics ───────────────────────────────────────── */

  function setupCounters() {
    var nums = $$("[data-count]");
    if (!nums.length) return;

    function run(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";

      // The real figure ships in the markup; only animate when motion is welcome.
      if (reduceMotion.matches) {
        el.textContent = target + suffix;
        return;
      }

      var duration = 1400;
      var start = null;

      requestAnimationFrame(function step(now) {
        if (start === null) start = now;
        var t = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
      });
    }

    if (!("IntersectionObserver" in window)) {
      nums.forEach(run);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    nums.forEach(function (el) { observer.observe(el); });
  }

  /* ── 8. Pointer flourishes (fine pointers only) ────────────────── */

  /*
   * Every effect here writes CSS custom properties rather than
   * element.style.transform. The transform itself is composed in the
   * stylesheet, so :hover and :active keep working instead of being
   * outranked by an inline style.
   */
  function setupPointerEffects() {
    if (!finePointer.matches || reduceMotion.matches) return;

    setupSpotlight();
    setupMagnetic();
    setupTilt();
  }

  function setupSpotlight() {
    var spot = $(".spotlight");
    if (!spot) return;

    var tx = window.innerWidth / 2;
    var ty = window.innerHeight / 2;
    var cx = tx;
    var cy = ty;
    var running = false;

    function place() {
      spot.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
    }

    function step() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      place();

      // Park the loop once the glow has caught up; an idle page runs no frames.
      if (Math.abs(tx - cx) < 0.5 && Math.abs(ty - cy) < 0.5) {
        running = false;
        return;
      }
      requestAnimationFrame(step);
    }

    // Position it before it can ever be seen, then reveal on first movement —
    // otherwise it renders parked over the top-left corner until the mouse moves.
    place();

    window.addEventListener("pointermove", function (e) {
      tx = e.clientX;
      ty = e.clientY;

      if (!document.body.classList.contains("has-pointer")) {
        cx = tx;
        cy = ty;
        place();
        document.body.classList.add("has-pointer");
      }

      if (!running) {
        running = true;
        requestAnimationFrame(step);
      }
    }, { passive: true });
  }

  /*
   * Shared hover-geometry cache. Measuring inside pointermove forces a layout
   * on every event; measuring once on enter goes stale the moment the page
   * scrolls under a stationary cursor, so the cache is keyed on the scroll bus
   * epoch and re-read only when that changes.
   */
  function trackHover(el, onMove, onLeave) {
    var box = null;
    var epoch = -1;
    var queued = false;
    var px = 0;
    var py = 0;

    function refresh() {
      if (epoch !== geometryEpoch || !box) {
        box = el.getBoundingClientRect();
        epoch = geometryEpoch;
      }
      return box;
    }

    el.addEventListener("pointerenter", function () {
      refresh();
      el.classList.add("is-tracking");
    });

    el.addEventListener("pointermove", function (e) {
      px = e.clientX;
      py = e.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        onMove(refresh(), px, py);
      });
    }, { passive: true });

    el.addEventListener("pointerleave", function () {
      box = null;
      epoch = -1;
      el.classList.remove("is-tracking");
      onLeave();
    });
  }

  function setupMagnetic() {
    $$(".magnetic").forEach(function (el) {
      trackHover(el, function (box, px, py) {
        el.style.setProperty("--mag-x", ((px - (box.left + box.width / 2)) * 0.22).toFixed(1) + "px");
        el.style.setProperty("--mag-y", ((py - (box.top + box.height / 2)) * 0.3).toFixed(1) + "px");
      }, function () {
        el.style.removeProperty("--mag-x");
        el.style.removeProperty("--mag-y");
      });
    });
  }

  function setupTilt() {
    $$(".tilt").forEach(function (card) {
      trackHover(card, function (box, px, py) {
        var rx = (px - box.left) / box.width;
        var ry = (py - box.top) / box.height;

        card.style.setProperty("--mx", (rx * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (ry * 100).toFixed(1) + "%");
        card.style.setProperty("--tilt-x", ((0.5 - ry) * 3.2).toFixed(2) + "deg");
        card.style.setProperty("--tilt-y", ((rx - 0.5) * 3.2).toFixed(2) + "deg");
      }, function () {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    });
  }

  /* ── 9. Copy email ─────────────────────────────────────────────── */

  function setupCopyEmail() {
    var wrap = $("#copyMail");
    var button = $("#copyBtn");
    var value = $("#emailValue");
    var label = $("#copyLabel");
    if (!wrap || !button || !value) return;

    var resetTimer = null;

    function fallbackCopy(text) {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.cssText = "position:fixed;top:-9999px;opacity:0";
      document.body.appendChild(field);
      field.select();

      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }

      document.body.removeChild(field);
      return ok;
    }

    function succeeded() {
      // Without clearing, an earlier click's timer resets the state of a later one.
      if (resetTimer) clearTimeout(resetTimer);

      wrap.classList.add("is-copied");
      if (label) label.textContent = "Copied";
      toast("Email address copied to clipboard");

      resetTimer = setTimeout(function () {
        resetTimer = null;
        wrap.classList.remove("is-copied");
        if (label) label.textContent = "Copy";
      }, 2200);
    }

    // The address comes from the DOM, so the template stays the only source.
    function failed(text) {
      toast("Could not copy — the address is " + text, "error");
    }

    button.addEventListener("click", function () {
      var text = value.textContent.trim();

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(succeeded, function () {
          if (fallbackCopy(text)) succeeded(); else failed(text);
        });
      } else if (fallbackCopy(text)) {
        succeeded();
      } else {
        failed(text);
      }
    });
  }

  /* ── 10. Animation budget ──────────────────────────────────────── */

  /*
   * Infinite decorative loops keep the compositor working even when they are
   * scrolled well out of view. Park them — CSS animations via a class, the
   * typewriter via its own handle — whenever their section leaves the viewport.
   */
  function setupAnimationBudget(typewriter) {
    var hero = $("#home");
    var zones = [hero, $("[data-marquee]")].filter(Boolean);

    if (!zones.length || !("IntersectionObserver" in window)) {
      typewriter.start();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("anim-paused", !entry.isIntersecting);
        if (entry.target !== hero) return;
        if (entry.isIntersecting) typewriter.start(); else typewriter.stop();
      });
    }, { rootMargin: "120px 0px" });

    zones.forEach(function (zone) { observer.observe(zone); });

    // A background tab should not be burning timers either.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) typewriter.stop();
      else if (hero && !hero.classList.contains("anim-paused")) typewriter.start();
    });
  }

  /* ── Boot ──────────────────────────────────────────────────────── */

  function init() {
    startScrollBus();
    setupTheme();
    setupNav();
    setupSmoothScroll();
    setupProgress();
    setupReveal();
    setupCounters();
    setupPointerEffects();
    setupCopyEmail();
    setupAnimationBudget(setupTypewriter());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
