/* Verrion Systems V6 · calm cut of V5 "Floor and Record".
   The engine (scrollcraft.js, unmodified) owns acts, cues and reveals. This file
   keeps the two moments that explain the product and nothing else:

   1. THE CROSSING. Each noted fact sits on the floor level with the record field
      it fills, and slides straight across the seam into it as the reader
      scrolls. No tilt, no arc.
   2. THE THREADS. In the investigation, each claim draws a thread back to its
      evidence on the floor, and the one that has no evidence stays dashed.

   Everything else is ordinary scrolling. No pointer tracking, so nothing runs
   while the reader is only moving the mouse. */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    threads.forEach(function (T) {
      var d = T.row.querySelector('.ev__dot').getBoundingClientRect();
      var p = T.pin.getBoundingClientRect();
      var x1 = d.left + d.width / 2 - s.left, y1 = d.top + d.height / 2 - s.top;
      var x2 = p.left + p.width / 2 - s.left, y2 = p.top + p.height / 2 - s.top;
      var dd;
      if (phone) {
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

  function measure() {
    phone = phoneMQ.matches;
    measureCrossings();
    measureThreads();
    frame();
  }
  var rT;
  addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(measure, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { requestAnimationFrame(measure); });
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
  var menu = $('.topbar__menu');
  var nav = $('#site-nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Close' : 'Menu';
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

  // ------------------------------------------------------------ walkthrough
  // Opens an email draft. Nothing is sent from this website.
  var EMAIL = 'hello@verrionsystems.com';
  var dlg = $('#walkthrough'), interest = $('#walk-interest'), mail = $('#walk-mail'), status = $('.walk__status');
  var opener = null;
  function setMail() {
    var subject = 'PCS walkthrough: ' + interest.value;
    var body = 'Hello Verrion Systems,\n\nI would like to arrange a walkthrough focused on the ' + interest.value + '.\n\nPlease do not include regulated or confidential material in this email.';
    mail.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
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
  $('[data-copy]', dlg).addEventListener('click', function () {
    if (!navigator.clipboard) { status.textContent = 'Copying is unavailable. Select and copy the address above.'; return; }
    navigator.clipboard.writeText(EMAIL).then(function () {
      if (dlg.open) status.textContent = 'Email address copied.';
    }, function () {
      if (dlg.open) status.textContent = 'Copying is unavailable. Select and copy the address above.';
    });
  });
  setMail();
})();
