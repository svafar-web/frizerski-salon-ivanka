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
    var text, open = false, nextOpen = null; // nextOpen: { daysAhead, time: 'HH:MM' }
    if (h && now >= toMin(h[0]) && now < toMin(h[1])) {
      open = true;
      text = fmt(cfg.status.openNow, { t: h[1] });
    } else if (h && now < toMin(h[0])) {
      text = fmt(cfg.status.opensToday, { t: h[0] });
      nextOpen = { daysAhead: 0, time: h[0] };
    } else {
      for (var d = 1; d <= 7; d++) {
        var idx = (today + d) % 7;
        var nh = cfg.hours[keys[idx]];
        if (!nh) continue;
        if (today === 6 && idx === 0) text = fmt(cfg.status.sunday, { t: nh[0] });
        else if (d === 1) text = fmt(cfg.status.opensTomorrow, { t: nh[0] });
        else text = fmt(cfg.status.opensOn, { d: cfg.status.daysOn[idx], t: nh[0] });
        nextOpen = { daysAhead: d, time: nh[0] };
        break;
      }
    }
    if (!text) return;
    for (var i = 0; i < targets.length; i++) {
      targets[i].textContent = text;
      targets[i].classList.add(open ? 'is-open' : 'is-closed');
      targets[i].hidden = false;
    }
    if (nextOpen && cfg.remind) callReminder(cfg.remind, nextOpen, got);
    var row = document.querySelector('.hours-table tr[data-day="' + today + '"]');
    if (row) {
      row.classList.add('today');
      var tag = row.querySelector('.today-tag');
      if (tag) tag.hidden = false;
    }
  }

  /* ---------- 1b. "Remind me when you open": a calendar file (.ics) built in the browser ----------
     Shown only while the salon is closed. The event is set to the next opening time in
     Europe/Zagreb and carries the phone number, so the visitor calls at the right moment. */
  function callReminder(R, nextOpen, zagrebNow) {
    var wrap = document.querySelector('[data-remind-wrap]');
    var btn = document.querySelector('[data-remind]');
    if (!wrap || !btn || typeof Blob === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL) return;

    // Today's calendar date in Zagreb, then add the days until the next opening.
    var dp = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zagreb', year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(new Date()).forEach(function (p) { dp[p.type] = p.value; });
    var target = new Date(Date.UTC(+dp.year, +dp.month - 1, +dp.day + nextOpen.daysAhead));
    var hm = nextOpen.time.split(':');
    var y = target.getUTCFullYear(), mo = target.getUTCMonth(), d = target.getUTCDate(), hh = +hm[0], mi = +hm[1];

    // Convert that Zagreb wall-clock time to a UTC instant (two passes handle DST edges).
    function zagrebToUtc(y, mo, d, hh, mi) {
      var guess = Date.UTC(y, mo, d, hh, mi);
      for (var k = 0; k < 2; k++) {
        var q = {};
        new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zagreb', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
          .formatToParts(new Date(guess)).forEach(function (p) { q[p.type] = p.value; });
        var seen = Date.UTC(+q.year, +q.month - 1, +q.day, +q.hour, +q.minute);
        guess += Date.UTC(y, mo, d, hh, mi) - seen;
      }
      return guess;
    }
    var start = zagrebToUtc(y, mo, d, hh, mi);
    var stamp = function (ms) { return new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
    var escIcs = function (s) { return String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, function (c) { return '\\' + c; }); };
    var ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Frizerski salon Ivanka//Podsjetnik//HR', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + stamp(start) + '-ivanka@svafar.github.io',
      'DTSTAMP:' + stamp(Date.now()),
      'DTSTART:' + stamp(start),
      'DTEND:' + stamp(start + 15 * 60000),
      'SUMMARY:' + escIcs(R.title),
      'DESCRIPTION:' + escIcs(R.desc + '\ntel:' + R.tel),
      'LOCATION:' + escIcs(R.location),
      'URL:tel:' + R.tel,
      'BEGIN:VALARM', 'TRIGGER:-PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:' + escIcs(R.title), 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR', ''
    ].join('\r\n');
    var url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    btn.href = url;
    btn.setAttribute('download', R.file);
    wrap.hidden = false;
  }

  /* ---------- 2. Lightbox ---------- */
  function lightbox() {
    var dlg = document.getElementById('lightbox');
    var all = Array.prototype.slice.call(document.querySelectorAll('a.gallery-link'));
    if (!dlg || !all.length || typeof dlg.showModal !== 'function') return;
    var links = all;
    var visibleLinks = function () { return all.filter(function (a) { var li = a.closest('li'); return !(li && li.hidden); }); };
    var img = dlg.querySelector('img');
    var cap = dlg.querySelector('.lightbox-caption') || dlg.querySelector('figcaption');
    var mention = dlg.querySelector('.lightbox-mention');
    var numberTpl = dlg.getAttribute('data-number') || '';
    if (mention) mention.textContent = dlg.getAttribute('data-mention') || '';
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
      var n = a.getAttribute('data-n');
      cap.textContent = (n && numberTpl ? numberTpl.replace('{n}', n) + ' · ' : '') + img.alt + (credit ? ' · ' + credit : '');
      counter.textContent = (current + 1) + ' / ' + links.length;
      // Warm the cache for the neighbours.
      [current + 1, current - 1].forEach(function (n) {
        var b = links[(n + links.length) % links.length];
        new Image().src = b.getAttribute('data-full') || b.href;
      });
    }
    function open(i, from) {
      opener = from;
      links = visibleLinks(); // respect the active gallery filter
      i = links.indexOf(from);
      if (i < 0) i = 0;
      show(i);
      dlg.showModal();
      btnClose.focus();
    }
    function close() {
      dlg.close();
    }
    all.forEach(function (a, i) {
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

  /* ---------- 2b. Gallery filter by colour family ---------- */
  function galleryFilter() {
    var box = document.querySelector('[data-filters]');
    if (!box) return;
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-grid > li'));
    var chips = Array.prototype.slice.call(box.querySelectorAll('[data-filter]'));
    var empty = document.querySelector('[data-empty]');
    box.hidden = false;
    function apply(tag) {
      var visible = [];
      items.forEach(function (li) {
        var on = !tag || (' ' + (li.getAttribute('data-tags') || '') + ' ').indexOf(' ' + tag + ' ') !== -1;
        li.hidden = !on;
        li.classList.remove('tall');
        if (on) visible.push(li);
      });
      // Two tall tiles for rhythm: the first and the eighth visible item.
      if (visible[0]) visible[0].classList.add('tall');
      if (visible[7]) visible[7].classList.add('tall');
      if (empty) empty.hidden = visible.length > 0;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String((c.getAttribute('data-filter') || '') === tag)); });
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () { apply(c.getAttribute('data-filter') || ''); });
    });
  }

  /* ---------- 2c. Request an appointment by text ----------
     The section is one button. It opens a dialog with three questions, one at a time; the
     answers compose the message, which the visitor sends from their own phone (sms: link)
     or scans as a QR code on desktop. Nothing leaves the browser otherwise. */
  function requestForm() {
    var dlg = document.querySelector('[data-request-dialog]');
    var form = document.querySelector('[data-request]');
    var dataEl = document.getElementById('request-data');
    var openBtn = document.querySelector('[data-request-open]');
    if (!dlg || !form || !dataEl || !openBtn || typeof dlg.showModal !== 'function') return;
    var cfg; try { cfg = JSON.parse(dataEl.textContent); } catch (e) { return; }
    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
    var progress = form.querySelector('[data-progress]');
    var backBtn = form.querySelector('[data-back]');
    var nextBtn = form.querySelector('[data-next]');
    var doneBtn = form.querySelector('[data-done]');
    var closeBtn = form.querySelector('[data-request-close]');
    var preview = form.querySelector('[data-preview]');
    var smsLink = form.querySelector('[data-sms]');
    var copyBtn = form.querySelector('[data-copy]');
    var qrWrap = form.querySelector('[data-qr]');
    var qrBox = form.querySelector('[data-qr-box]');
    var errorEl = form.querySelector('[data-error]');
    var fmt = function (tpl, vars) { return tpl.replace(/\{(\w+)\}/g, function (_, k) { return vars[k] == null ? '' : vars[k]; }); };
    var checked = function (name) { return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]:checked')).map(function (i) { return i.value; }); };
    var join = function (arr, word) { return arr.length > 1 ? arr.slice(0, -1).join(', ') + word + arr[arr.length - 1] : (arr[0] || ''); };
    var current = 1, last = steps.length, smsUrl = '';
    var desktop = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function compose() {
      var M = cfg.msg;
      var nameEl = form.querySelector('input[name="name"]');
      var name = nameEl ? nameEl.value.replace(/\s+/g, ' ').trim().slice(0, 40) : '';
      var services = checked('service');
      var days = checked('day').map(function (v) { return cfg.dayPhrase[v]; });
      var part = checked('part')[0] || '';
      var parts = [M.hi];
      if (name) parts.push(fmt(M.iam, { name: name }));
      if (services.length) parts.push(fmt(M.want, { services: join(services, cfg.and) }));
      if (days.length) parts.push(fmt(M.when, { days: join(days, cfg.or), part: part ? cfg.partPhrase[part] : '' }));
      parts.push(M.ask);
      var text = parts.join(' ');
      preview.textContent = text;
      smsUrl = 'sms:' + cfg.phone + '?&body=' + encodeURIComponent(text); // "?&body=" works on iOS and Android
      smsLink.href = smsUrl;
      if (desktop) drawQr();
      return text;
    }

    var qrLib = null, qrLoading = false;
    function drawQr() {
      if (!qrWrap || !qrBox) return;
      if (!qrLib) {
        if (typeof window.qrcode === 'function') qrLib = window.qrcode;
        else if (!qrLoading) {
          qrLoading = true;
          var sc = document.createElement('script');
          sc.src = cfg.qrSrc;
          sc.onload = function () { qrLib = window.qrcode; drawQr(); };
          document.head.appendChild(sc);
        }
        return;
      }
      try {
        var q = qrLib(0, 'M');
        q.addData(smsUrl);
        q.make();
        qrBox.innerHTML = q.createSvgTag({ cellSize: 4, margin: 16, scalable: true }); // 4-module quiet zone
        var svg = qrBox.querySelector('svg');
        if (svg) { svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'QR'); }
        qrWrap.hidden = false;
      } catch (e) { qrWrap.hidden = true; }
    }

    function show(n) {
      current = n;
      steps.forEach(function (st) { st.hidden = Number(st.getAttribute('data-step')) !== n; });
      var isFinal = n === last;
      progress.textContent = isFinal ? '' : fmt(cfg.stepOf, { i: n, n: last - 1 });
      backBtn.hidden = n === 1;
      nextBtn.hidden = isFinal;
      doneBtn.hidden = !isFinal;
      nextBtn.textContent = n === last - 1 ? cfg.finish : cfg.next;
      if (errorEl) errorEl.hidden = true;
      if (isFinal) compose();
      var heading = steps[n - 1].querySelector('legend, .request-label, .field > span');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
      form.scrollTop = 0;
    }

    openBtn.addEventListener('click', function (e) {
      e.preventDefault();
      show(1);
      dlg.showModal();
    });
    nextBtn.addEventListener('click', function () {
      if (current === 1 && !checked('service').length) { if (errorEl) errorEl.hidden = false; return; }
      show(Math.min(current + 1, last));
    });
    backBtn.addEventListener('click', function () { show(Math.max(current - 1, 1)); });
    doneBtn.addEventListener('click', function () { dlg.close(); });
    closeBtn.addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { openBtn.focus(); });
    form.addEventListener('change', function () { if (errorEl && checked('service').length) errorEl.hidden = true; });
    form.addEventListener('submit', function (e) { e.preventDefault(); if (current < last) nextBtn.click(); });
    copyBtn.addEventListener('click', function () {
      var text = compose();
      var done = function () { var old = copyBtn.textContent; copyBtn.textContent = cfg.copied; setTimeout(function () { copyBtn.textContent = old; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
      else { var r = document.createRange(); r.selectNodeContents(preview); var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); try { document.execCommand('copy'); done(); } catch (e) {} }
    });
    if (desktop) smsLink.hidden = true; // no messaging app on a desktop: scan the code or copy the text instead
  }

  /* ---------- 3. Footer year ---------- */
  function year() {
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  openingStatus();
  lightbox();
  galleryFilter();
  requestForm();
  year();
})();
