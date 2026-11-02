/* Frizerski salon Ivanka – progressive enhancements only.
   1. "Open now / closed" status, computed in the Europe/Zagreb time zone.
   2. Gallery lightbox.
   3. Footer year.
   The page is fully usable without this file. */
(function () {
  'use strict';

  /* ---------- 1. Opening status ---------- */
  function openingStatus() {
    var el = document.getElementById('hours-data');
    var targets = document.querySelectorAll('[data-status]');
    if (!el || !targets.length || typeof Intl === 'undefined' || !Intl.DateTimeFormat.prototype.formatToParts) return;
    var cfg; try { cfg = JSON.parse(el.textContent); } catch (e) { return; }
    var keys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    var names = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

    var parts;
    try {
      parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zagreb', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    } catch (e) { return; }
    var got = {};
    parts.forEach(function (p) { got[p.type] = p.value; });
    var today = names[got.weekday];
    if (today === undefined) return;
    var now = parseInt(got.hour, 10) * 60 + parseInt(got.minute, 10);
    var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
    var fmt = function (tpl, vars) { return tpl.replace(/\{(\w+)\}/g, function (_, k) { return vars[k]; }); };

    var h = cfg.hours[keys[today]];
    var text, open = false;
    if (h && now >= toMin(h[0]) && now < toMin(h[1])) {
      open = true;
      text = fmt(cfg.status.openNow, { t: h[1] });
    } else if (h && now < toMin(h[0])) {
      text = fmt(cfg.status.opensToday, { t: h[0] });
    } else {
      for (var d = 1; d <= 7; d++) {
        var idx = (today + d) % 7;
        var nh = cfg.hours[keys[idx]];
        if (!nh) continue;
        if (today === 6 && idx === 0) text = fmt(cfg.status.sunday, { t: nh[0] });
        else if (d === 1) text = fmt(cfg.status.opensTomorrow, { t: nh[0] });
        else text = fmt(cfg.status.opensOn, { d: cfg.status.daysOn[idx], t: nh[0] });
        break;
      }
    }
    if (!text) return;
    for (var i = 0; i < targets.length; i++) {
      targets[i].textContent = text;
      targets[i].classList.add(open ? 'is-open' : 'is-closed');
      targets[i].hidden = false;
    }
    var row = document.querySelector('.hours-table tr[data-day="' + today + '"]');
    if (row) {
      row.classList.add('today');
      var tag = row.querySelector('.today-tag');
      if (tag) tag.hidden = false;
    }
  }

  /* ---------- 2. Lightbox ---------- */
  function lightbox() {
    var dlg = document.getElementById('lightbox');
    var links = Array.prototype.slice.call(document.querySelectorAll('.gallery-link'));
    if (!dlg || !links.length || typeof dlg.showModal !== 'function') return;
    var img = dlg.querySelector('img');
    var cap = dlg.querySelector('figcaption');
    var counter = dlg.querySelector('.lightbox-counter');
    var btnClose = dlg.querySelector('[data-lb="close"]');
    var btnPrev = dlg.querySelector('[data-lb="prev"]');
    var btnNext = dlg.querySelector('[data-lb="next"]');
    var current = 0, opener = null, touchX = null;

    function show(i) {
      current = (i + links.length) % links.length;
      var a = links[current];
      img.src = a.getAttribute('data-full') || a.href;
      img.alt = a.getAttribute('data-alt') || '';
      var credit = a.getAttribute('data-credit');
      cap.textContent = img.alt + (credit ? ' · ' + credit : '');
      counter.textContent = (current + 1) + ' / ' + links.length;
      // Warm the cache for the neighbours.
      [current + 1, current - 1].forEach(function (n) {
        var b = links[(n + links.length) % links.length];
        new Image().src = b.getAttribute('data-full') || b.href;
      });
    }
    function open(i, from) {
      opener = from;
      show(i);
      dlg.showModal();
      btnClose.focus();
    }
    function close() {
      dlg.close();
    }
    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        open(i, a);
      });
    });
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });
    dlg.addEventListener('close', function () {
      img.src = 'data:,';
      if (opener) opener.focus();
    });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
      else if (e.key === 'Tab') {
        // Keep focus inside the dialog (Esc is handled natively by <dialog>).
        var f = [btnClose, btnPrev, btnNext];
        var at = f.indexOf(document.activeElement);
        var next = e.shiftKey ? (at <= 0 ? f.length - 1 : at - 1) : (at === -1 || at === f.length - 1 ? 0 : at + 1);
        e.preventDefault();
        f[next].focus();
      }
    });
    dlg.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) show(dx < 0 ? current + 1 : current - 1);
    }, { passive: true });
  }

  /* ---------- 3. Footer year ---------- */
  function year() {
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  openingStatus();
  lightbox();
  year();
})();
