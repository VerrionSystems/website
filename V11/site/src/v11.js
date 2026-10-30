/* Verrion Systems V7 · polish of V6, the calm cut of V5 "Floor and Record".
   The engine (scrollcraft.js, unmodified) owns acts, cues and reveals. This file
   keeps the two moments that explain the product and nothing else:

   1. THE CROSSING. Each noted fact sits on the floor level with the record field
      it fills, and slides straight across the seam into it as the reader
      scrolls. No tilt, no arc.
   2. THE THREADS. In the investigation, each claim draws a thread back to its
      evidence on the floor, and the one that has no evidence stays dashed.

   Everything else is ordinary scrolling. No pointer tracking, so nothing runs
   while the reader is only moving the mouse.

   V7 adds: the reduced-motion preference is followed live, the phone menu
   holds focus and scroll while open, the walkthrough dialog can copy the
   whole message (for webmail and locked-down machines), printing opens
   every module and answer first, and the investigation's missing record can
   be marked as provided. */
(function () {
  'use strict';

  var reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  var reduce = reduceMQ.matches;
  var phoneMQ = matchMedia('(max-width: 860px)');
  var sc = ScrollCraft.mount(document.body);

  var clamp = function (x, a, b) { return x < a ? a : x > b ? b : x; };
  var c01 = function (x) { return clamp(x, 0, 1); };
  var smooth = function (x) { x = c01(x); return x * x * (3 - 2 * x); };
  var inOut = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var actFor = function (el) { return sc.acts.filter(function (a) { return a.el.contains(el); })[0]; };
  var phone = phoneMQ.matches;

  var heroStage = $('#facts .stage');
  var heroAct = actFor(heroStage);
  var peakStage = $('#investigation .stage');
  var peakAct = actFor(peakStage);
  var gate = $('.seam-line__gate');

  // ---------------------------------------------------------------- crossing
  var crossings = $$('[data-cross]').map(function (slip) {
    var at = slip.getAttribute('data-cross-at').split(/\s+/).map(parseFloat);
    var field = $(slip.getAttribute('data-cross'));
    return { slip: slip, field: field, landOn: field.querySelector('.field__val'), from: at[0], to: at[1] };
  });

  // Notes never touch: each keeps at least this much clear space from the one
  // above, even where the record's fields sit closer than a note is tall.
  var NOTE_GAP = 16;
  function placeNotes(s, gap) {
    // Level with its field where there is room, just short of the seam, with
    // at least `gap` between notes. Returns how far the stack overruns the
    // bottom of the screen.
    var lastBottom = -Infinity;
    crossings.forEach(function (C) {
      var t = C.landOn.getBoundingClientRect();
      var top = Math.max(Math.round(t.top - s.top - 24), Math.round(lastBottom + gap));
      C.slip.style.left = Math.round(s.width / 2 - 28 - C.slip.offsetWidth) + 'px';
      C.slip.style.top = top + 'px';
      lastBottom = top + C.slip.offsetHeight;
    });
    return lastBottom - (s.height - 12);
  }
  function measureCrossings() {
    var s = heroStage.getBoundingClientRect();
    crossings.forEach(function (C) { C.slip.style.transform = 'none'; });
    if (!phone) {
      // Every note must be readable on the first screen. If the stack would run
      // off the bottom, lift it as one (never above the headline), then close
      // the gaps a little if it still does not fit.
      var title = $('.hero-title__floor').getBoundingClientRect();
      var minTop = title.bottom - s.top + 14;
      var gap = NOTE_GAP, over = placeNotes(s, gap);
      while (over > 0 && gap > 8) { gap -= 2; over = placeNotes(s, gap); }
      if (over > 0) {
        var first = crossings[0].slip, room = first.offsetTop - minTop;
        var lift = Math.min(over, Math.max(room, 0));
        crossings.forEach(function (C) { C.slip.style.top = (C.slip.offsetTop - lift) + 'px'; });
      }
    } else {
      crossings.forEach(function (C) { C.slip.style.left = ''; C.slip.style.top = ''; });
    }
    crossings.forEach(function (C) {
      var t = C.landOn.getBoundingClientRect();
      var b = C.slip.getBoundingClientRect();
      C.w = b.width; C.h = b.height;
      C.bx = b.left - s.left; C.by = b.top - s.top;
      C.ex = (t.left - s.left - 12) - C.bx;
      C.ey = (t.top - s.top - (phone ? 18 : 24)) - C.by;
    });
  }

  function drawCrossings() {
    var p = heroAct.p, gateO = 0, gateY = 0, sig = [];
    crossings.forEach(function (C) {
      var t = c01((p - C.from) / (C.to - C.from));
      var land = smooth((t - 0.82) / 0.18);
      if (reduce) {
        // No travel: the note stays put and the field fills.
        var v = smooth((t - 0.35) / 0.3);
        C.slip.style.transform = 'none';
        C.slip.style.opacity = (1 - v).toFixed(3);
        C.field.style.setProperty('--v', v.toFixed(3));
      } else {
        var e = inOut(t);
        var x = lerp(0, C.ex, e), y = lerp(0, C.ey, e);
        C.slip.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
        C.slip.style.opacity = (1 - land).toFixed(3);
        C.field.style.setProperty('--v', land.toFixed(3));
        // The seam glows where a note passes through it.
        if (!phone && t > 0 && t < 1) {
          var cx = C.bx + x + C.w / 2;
          var o = c01(1 - Math.abs(cx - heroStage.clientWidth / 2) / 170);
          if (o > gateO) { gateO = o; gateY = C.by + y + C.h / 2; }
        }
      }
      sig.push(t.toFixed(2));
    });
    if (gate) {
      gate.style.opacity = gateO.toFixed(3);
      if (gateO > 0) gate.style.transform = 'translate3d(0,' + (gateY - gate.parentNode.offsetTop - 80).toFixed(1) + 'px,0)';
    }
    return sig;
  }

  // ------------------------------------------------------------ hero planes
  // A little depth as the hero scrolls: the photograph (and the operator with
  // it, as one) rises slightly against the frame and the headline. The two
  // layers always move together, so no edge of the cutout is ever uncovered.
  // On phones it holds still: the headline sits close above her.
  var plate = $('.hero-plate'), subject = $('.hero-subject');
  function drawHero() {
    var e = reduce ? 0 : smooth(heroAct.p / 0.6);
    if (!reduce) {
      var lift = phone ? 'none' : 'translate3d(0,' + (-16 * e).toFixed(2) + 'px,0)';
      plate.style.transform = lift; subject.style.transform = lift;
    }
    var sig = drawCrossings();
    heroStage.setAttribute('data-sc-verify-state', 'e' + e.toFixed(2) + ' ' + sig.join(' '));
  }

  // ---------------------------------------------------------------- threads
  var svg = $('.threads');
  var lit = $('.evidence-photo__lit');
  var dark = $('.evidence-photo__dark');
  var photoBox = $('.evidence-photo');
  var gapMask = $('.thread-mask');
  var litVars = { 'pin-a': '--ra', 'pin-b': '--rb', 'pin-c': '--rc' };
  var threads = $$('.thread').map(function (path) {
    var at = path.getAttribute('data-at').split(/\s+/).map(parseFloat);
    return {
      path: path, row: $(path.getAttribute('data-from')), pin: $(path.getAttribute('data-to')),
      from: at[0], to: at[1], gap: path.classList.contains('thread--gap'), len: 1
    };
  });

  function measureThreads() {
    var s = peakStage.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + s.width.toFixed(0) + ' ' + s.height.toFixed(0));
    var maxR = photoBox.getBoundingClientRect().width * 0.17;
    // Where v11.css lays the resolved investigation out in two columns (a
    // sideways phone), the photograph sits beside the record, as on desktop.
    // Read from the layout itself, so the breakpoint lives only in the CSS.
    var beside = getComputedStyle(peakStage).gridTemplateColumns.split(' ').length > 1;
    threads.forEach(function (T) {
      var d = T.row.querySelector('.ev__dot').getBoundingClientRect();
      var p = T.pin.getBoundingClientRect();
      var x1 = d.left + d.width / 2 - s.left, y1 = d.top + d.height / 2 - s.top;
      var x2 = p.left + p.width / 2 - s.left, y2 = p.top + p.height / 2 - s.top;
      var dd;
      // Threads climb to a photograph above the record (phones), or run
      // sideways to one beside it (desktop, and a sideways phone).
      if (phone && !beside) {
        var dy = Math.abs(y1 - y2);
        dd = 'M' + x1 + ' ' + y1 + ' C' + (x1 - 4) + ' ' + (y1 - dy * 0.62) + ' ' + x2 + ' ' + (y2 + dy * 0.3) + ' ' + x2 + ' ' + y2;
      } else {
        var kx = Math.abs(x1 - x2) * 0.42;
        dd = 'M' + x1 + ' ' + y1 + ' C' + (x1 - kx) + ' ' + y1 + ' ' + (x2 + kx) + ' ' + y2 + ' ' + x2 + ' ' + y2;
      }
      T.path.setAttribute('d', dd);
      T.len = T.path.getTotalLength();
      if (T.gap) { gapMask.setAttribute('d', dd); gapMask.style.strokeDasharray = T.len; }
      else T.path.style.strokeDasharray = T.len;
      T.maxR = maxR;
    });
  }

  function drawThreads() {
    var p = peakAct.p, sig = [];
    threads.forEach(function (T) {
      var t = smooth((p - T.from) / (T.to - T.from));
      if (reduce) t = p > T.from ? 1 : 0;
      var off = (T.len * (1 - t)).toFixed(1);
      if (T.gap) gapMask.style.strokeDashoffset = off; else T.path.style.strokeDashoffset = off;
      var po = smooth((t - 0.7) / 0.3);
      T.pin.style.setProperty('--po', po.toFixed(3));
      T.pin.style.setProperty('--ps', (0.6 + 0.4 * po).toFixed(3));
      var v = litVars[T.pin.id];
      if (v) lit.style.setProperty(v, (T.maxR * smooth((t - 0.8) / 0.2) + 0.1).toFixed(1) + 'px');
      sig.push(t.toFixed(2));
    });
    var fb = 0.24 + 0.18 * smooth((p - 0.1) / 0.5);
    dark.style.setProperty('--fb', fb.toFixed(3));
    peakStage.setAttribute('data-sc-verify-state', sig.join(' ') + ' b' + fb.toFixed(2));
  }

  // ---------------------------------------------------------------- top nav
  var navLinks = $$('[data-nav]').map(function (a) {
    return { a: a, sec: document.getElementById(a.getAttribute('data-nav')) };
  });
  var current = null;
  function drawNav() {
    var y = innerHeight * 0.4, cur = null;
    navLinks.forEach(function (o) { var r = o.sec.getBoundingClientRect(); if (r.top <= y && r.bottom > y) cur = o; });
    if (cur !== current) {
      if (current) current.a.removeAttribute('aria-current');
      if (cur) cur.a.setAttribute('aria-current', 'location');
      current = cur;
    }
  }

  // ------------------------------------------------------------------- loop
  var queued = false;
  function frame() {
    queued = false;
    if (heroAct.live || heroAct.raw < 1) drawHero();
    if (peakAct.live) drawThreads();
    drawNav();
  }
  function kick() { if (!queued) { queued = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', kick, { passive: true });

  // ------------------------------------------------------------------ close
  // The close photo takes the height the copy and footer leave on the last
  // screen (.close-photo in v6.css), so it needs their measured heights.
  var closeAct = $('.act--close'), closeCopy = $('.close-copy'), foot = $('.site-foot');
  function measureClose() {
    closeAct.style.setProperty('--copy-h', closeCopy.getBoundingClientRect().height + 'px');
    closeAct.style.setProperty('--foot-h', foot.getBoundingClientRect().height + 'px');
  }
  if (window.ResizeObserver) { var closeRO = new ResizeObserver(measureClose); closeRO.observe(closeCopy); closeRO.observe(foot); }

  function measure() {
    phone = phoneMQ.matches;
    reduce = reduceMQ.matches;
    measureCrossings();
    measureThreads();
    measureClose();
    frame();
  }
  var rT;
  addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(measure, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { requestAnimationFrame(measure); });
  // Someone who turns on reduced motion mid-visit gets it at once.
  reduceMQ.addEventListener && reduceMQ.addEventListener('change', measure);
  addEventListener('load', measure);
  measure();

  // Keyboard focus can park a control inside the reveal observer's bottom
  // margin, where its one-shot fade never fires. Reveal its group on focus.
  document.addEventListener('focusin', function (e) {
    var group = e.target.closest && e.target.closest('[data-sc-in]');
    if (!group || group.classList.contains('sc-in')) return;
    group.classList.add('sc-in');
    Array.prototype.forEach.call(group.children, function (kid) { kid.classList.add('sc-in'); });
  });

  // ------------------------------------------------------------ phone menu
  // While the sheet is open it covers the page, so the page behind is inert
  // (Tab cannot reach links hidden under it) and does not scroll.
  var menu = $('.topbar__menu');
  var nav = $('#site-nav');
  var behind = [$('#main'), $('.site-foot')];
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Close' : 'Menu';
    behind.forEach(function (el) { el.inert = open; });
    document.documentElement.classList.toggle('is-menu-open', open);
  }
  menu.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  $$('#site-nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menu.focus(); }
  });
  phoneMQ.addEventListener && phoneMQ.addEventListener('change', function () { setMenu(false); });

  // ---------------------------------------------------------- SOP findings
  $$('.finding').forEach(function (btn) {
    var clauses = btn.getAttribute('data-clauses').split(/\s+/).map(function (s) { return $(s); });
    btn.setAttribute('aria-pressed', 'false');
    var light = function (on) { clauses.forEach(function (c) { c.classList.toggle('is-lit', on); }); };
    var rest = function () { light(btn.getAttribute('aria-pressed') === 'true'); };
    btn.addEventListener('mouseenter', function () { light(true); });
    btn.addEventListener('mouseleave', rest);
    btn.addEventListener('focus', function () { light(true); });
    btn.addEventListener('blur', rest);
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      light(on);
    });
  });

  // ------------------------------------------------------ a record to test
  // The reader can mark the missing adjustment record as provided. In PCS a
  // new record changes the evidence, so the proposed cause goes back for
  // review; nothing here concludes anything. Both wordings are in the markup;
  // this sets the state and tells screen readers what else changed.
  var provided = $('#ev-d-provided'), evStatus = $('#ev-status'), peakSection = $('#investigation');
  function setProvided(announce) {
    var on = provided.checked;
    peakSection.classList.toggle('is-provided', on);
    if (announce) evStatus.textContent = on
      ? 'Proposed cause: review again. The investigator records the conclusion.'
      : 'Proposed cause: open to challenge.';
  }
  provided.addEventListener('change', function () { setProvided(true); });
  // A page restored from the back-forward cache keeps the box as it was.
  addEventListener('pageshow', function () { setProvided(false); });
  setProvided(false);

  // ------------------------------------------------------------ walkthrough
  // Opens an email draft. Nothing is sent from this website.
  var EMAIL = 'hello@verrionsystems.com';
  var dlg = $('#walkthrough'), interest = $('#walk-interest'), mail = $('#walk-mail'), status = $('.walk__status');
  var opener = null;
  function draft() {
    return {
      subject: 'PCS walkthrough: ' + interest.value,
      body: 'Hello Verrion Systems,\n\nI would like to arrange a walkthrough focused on the ' + interest.value + '.\n\nPlease do not include regulated or confidential material in this email.'
    };
  }
  function setMail() {
    var d = draft();
    mail.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(d.subject) + '&body=' + encodeURIComponent(d.body);
  }
  interest.addEventListener('change', setMail);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-walkthrough]');
    if (!b) return;
    opener = b;
    if (b.getAttribute('data-interest')) interest.value = b.getAttribute('data-interest');
    setMail();
    status.textContent = '';
    setMenu(false);
    dlg.showModal();
  });
  $('[data-close]', dlg).addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', function () {
    var target = opener && opener.getClientRects().length ? opener : menu;
    requestAnimationFrame(function () { target && target.focus(); });
  });
  // Where no email app opens (webmail, a remote desktop), the reader can copy
  // the address, or the whole message with its subject, and paste it.
  $$('[data-copy]', dlg).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var whole = btn.getAttribute('data-copy') === 'message';
      var d = draft();
      var text = whole ? 'To: ' + EMAIL + '\nSubject: ' + d.subject + '\n\n' + d.body : EMAIL;
      var failed = 'Copying is unavailable. Select and copy the address above.';
      if (!navigator.clipboard) { status.textContent = failed; return; }
      navigator.clipboard.writeText(text).then(function () {
        if (dlg.open) status.textContent = whole ? 'Message copied. Paste it into a new email.' : 'Email address copied.';
      }, function () {
        if (dlg.open) status.textContent = failed;
      });
    });
  });
  setMail();

  // ---------------------------------------------------------- photo motion
  // V10: the floor photographs in the flowing sections come alive for a
  // moment. A clip loads while its photo is still half a screen away and
  // takes the photo's place on its first frame, out of sight. It plays once
  // when the photo is mostly in view and slows to rest on its last frame,
  // which stays: the clip never hands back to the photograph in view, so
  // there is no cut or cross-fade to notice. Once the photo has left the
  // screen the clip rewinds, unseen, and can play again. Nothing loads or
  // plays with reduced motion or Save-Data, and the clips carry nothing the
  // photographs do not.
  var saveData = navigator.connection && navigator.connection.saveData;
  var clips = $$('video[data-motion]').map(function (v) { return { v: v, armed: true }; });
  function clipFor(el) { return clips.filter(function (c) { return c.v === el; })[0]; }
  function load(C) {
    if (C.v.getAttribute('src')) return;
    C.v.preload = 'auto'; C.v.src = C.v.getAttribute('data-motion');
  }
  function show(C) { if (!reduceMQ.matches) C.v.classList.add('is-on'); }
  function rest(C) { C.v.pause(); C.v.classList.remove('is-on'); }
  if (clips.length && window.IntersectionObserver && !saveData) {
    clips.forEach(function (C) {
      C.v.muted = true;
      C.v.addEventListener('loadeddata', function () { show(C); });
      C.v.addEventListener('playing', function () { show(C); });
    });
    var nearIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !reduceMQ.matches) load(clipFor(e.target));
      });
    }, { rootMargin: '50% 0px' });
    var playIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var C = clipFor(e.target);
        if (!e.isIntersecting) {
          C.v.pause();
          if (C.v.readyState && C.v.currentTime) C.v.currentTime = 0;
          C.armed = true;
          return;
        }
        if (reduceMQ.matches || e.intersectionRatio < 0.6 || !C.armed) return;
        load(C);
        C.armed = false;
        var p = C.v.play();
        if (p && p.catch) p.catch(function () { C.armed = true; });
      });
    }, { threshold: [0, 0.6] });
    clips.forEach(function (C) { nearIO.observe(C.v); playIO.observe(C.v); });
    reduceMQ.addEventListener && reduceMQ.addEventListener('change', function () {
      if (reduceMQ.matches) clips.forEach(rest);
    });
  }

  // ----------------------------------------------------------------- print
  // On paper nothing can be opened, so every module and answer prints open,
  // and the reader's own choices come back afterwards.
  var shut = [];
  addEventListener('beforeprint', function () {
    document.documentElement.setAttribute('data-instant', '');
    shut = $$('details:not([open])');
    shut.forEach(function (d) { d.open = true; });
  });
  addEventListener('afterprint', function () {
    shut.forEach(function (d) { d.open = false; });
    shut = [];
    requestAnimationFrame(function () { document.documentElement.removeAttribute('data-instant'); });
  });
})();
