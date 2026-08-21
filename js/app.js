/* =============================================================
   Sina & Davide — Version 2
   Umschlag öffnen, danach die Einladungskarte als Bild zeigen
   ============================================================= */
(function () {
  'use strict';

  var C = window.WEDDING || {};
  var body = document.body;

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------
     Texte und Bild einsetzen
     --------------------------------------------------------- */
  function fill() {
    var text = {
      '[data-bride]':         C.bride,
      '[data-groom]':         C.groom,
      '[data-monogram]':      C.monogram,
      '[data-date-dotted]':   C.dateDotted,
      '[data-cover-eyebrow]': C.cover && C.cover.eyebrow,
      '[data-cover-hint]':    C.cover && C.cover.hint,
      '[data-card-label]':    C.cover && C.cover.cardLabel,
      '[data-save-label]':    C.viewer && C.viewer.downloadLabel
    };
    Object.keys(text).forEach(function (sel) {
      if (text[sel] == null) return;
      $$(sel).forEach(function (el) { el.textContent = text[sel]; });
    });

    var hint = $('#zoomHint');
    if (hint && C.viewer) {
      var touch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      var label = (!touch && C.viewer.zoomHintMouse) || C.viewer.zoomHint;
      if (label) hint.textContent = label;
    }

    document.title = C.bride + ' & ' + C.groom + ' — Wir trauen uns!';

    if (C.card && C.card.src) {
      var big = $('#cardImg');
      big.src = C.card.src;
      big.alt = C.card.alt || '';

      var small = $('#envCardImg');
      small.src = C.card.src;

      var save = $('#saveBtn');
      if (save) {
        save.href = C.card.src;
        if (C.card.download) save.setAttribute('download', C.card.download);
      }
    }
  }

  /* ---------------------------------------------------------
     Umschlaggröße an den Viewport anpassen
     --------------------------------------------------------- */
  function sizeEnvelope() {
    var vh = window.innerHeight, vw = window.innerWidth;
    var w = Math.min(vw * 0.74, vh * 0.34, 330);
    w = Math.max(w, 190);
    document.documentElement.style.setProperty('--env-w', Math.round(w) + 'px');
    document.documentElement.style.setProperty('--env-h', Math.round(w * 1.33) + 'px');
  }

  /* ---------------------------------------------------------
     Funkeln beim Aufbrechen des Siegels
     --------------------------------------------------------- */
  function sparkle() {
    var host = $('#sparks');
    if (!host) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 26; i++) {
      var s = document.createElement('span');
      var a = Math.random() * Math.PI * 2;
      var r = 70 + Math.random() * 170;
      s.className = 'spark';
      s.style.left = '50%';
      s.style.top = '50%';
      s.style.setProperty('--dx', Math.cos(a) * r + 'px');
      s.style.setProperty('--dy', (Math.sin(a) * r - 60) + 'px');
      s.style.animation = 'sparkFly ' + (1.1 + Math.random() * 1.2) + 's ' +
                          'cubic-bezier(.16,1,.3,1) ' + (Math.random() * .35) + 's forwards';
      frag.appendChild(s);
    }
    host.appendChild(frag);
    setTimeout(function () { host.innerHTML = ''; }, 3200);
  }

  /* ---------------------------------------------------------
     Öffnen
     --------------------------------------------------------- */
  var opened = false;

  function open() {
    if (opened) return;
    opened = true;

    body.classList.add('is-opening');
    setTimeout(sparkle, 260);
    if (audio && !musicOn) toggleMusic();

    setTimeout(function () {
      body.classList.add('is-open');
      body.classList.remove('is-sealed');
      var cover = $('#cover');
      setTimeout(function () { if (cover) cover.remove(); }, 1200);
    }, 2600);
  }

  /* ---------------------------------------------------------
     Zoom im Karten-Viewer
     Tippen zoomt auf den angetippten Punkt, nochmal tippen zurück.
     Pinch-to-Zoom des Browsers funktioniert zusätzlich.
     --------------------------------------------------------- */
  var img    = $('#cardImg');
  var scroll = $('#viewerScroll');
  var zoomed = false;

  function zoomFactor() {
    // so weit zoomen, dass die Karte mindestens Bildschirmbreite x2 hat,
    // aber nie über die native Auflösung des Bildes hinaus
    var natural = img.naturalWidth || 1024;
    var target  = Math.min(natural, window.innerWidth * 2.2);
    return Math.max(1.6, target / Math.max(img.clientWidth, 1));
  }

  function toggleZoom(e) {
    if (!img || !scroll) return;

    if (zoomed) {
      zoomed = false;
      body.classList.remove('is-zoomed');
      scroll.scrollTo(0, 0);
      return;
    }

    var rect = img.getBoundingClientRect();
    // relative Position des Klicks auf dem Bild (0…1)
    var rx = rect.width  ? (e.clientX - rect.left) / rect.width  : .5;
    var ry = rect.height ? (e.clientY - rect.top)  / rect.height : .5;
    rx = Math.min(1, Math.max(0, rx));
    ry = Math.min(1, Math.max(0, ry));

    var f = zoomFactor();
    document.documentElement.style.setProperty('--zoom-w', Math.round(rect.width * f) + 'px');

    zoomed = true;
    body.classList.add('is-zoomed');

    // auf den angetippten Punkt zentrieren
    function center() {
      scroll.scrollLeft = rx * img.offsetWidth  - scroll.clientWidth  / 2;
      scroll.scrollTop  = ry * img.offsetHeight - scroll.clientHeight / 2;
    }
    center();
    requestAnimationFrame(center);
  }

  if (img) {
    img.addEventListener('click', toggleZoom);
    img.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

  window.addEventListener('resize', function () {
    if (zoomed) {
      zoomed = false;
      body.classList.remove('is-zoomed');
    }
    sizeEnvelope();
  });

  document.addEventListener('keydown', function (e) {
    if (!opened && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(); return; }
    if (opened && zoomed && e.key === 'Escape') {
      zoomed = false;
      body.classList.remove('is-zoomed');
    }
  });

  /* ---------------------------------------------------------
     Musik (optional)
     --------------------------------------------------------- */
  var audio = null, musicOn = false;
  var musicBtn = $('#musicBtn');

  function initMusic() {
    if (!C.music || !musicBtn) return;
    audio = new Audio(C.music);
    audio.loop = true;
    audio.volume = 0;
    audio.addEventListener('error', function () { musicBtn.hidden = true; audio = null; });
    musicBtn.hidden = false;
    musicBtn.addEventListener('click', toggleMusic);
  }

  function fade(to, done) {
    var step = (to - audio.volume) / 24;
    var iv = setInterval(function () {
      audio.volume = Math.min(1, Math.max(0, audio.volume + step));
      if (Math.abs(audio.volume - to) < 0.02) {
        audio.volume = to; clearInterval(iv); if (done) done();
      }
    }, 40);
  }

  function toggleMusic() {
    if (!audio) return;
    if (musicOn) {
      fade(0, function () { audio.pause(); });
      musicBtn.classList.remove('playing');
      musicOn = false;
    } else {
      var p = audio.play();
      if (p && p.catch) p.catch(function () {});
      fade(0.45);
      musicBtn.classList.add('playing');
      musicOn = true;
    }
  }

  /* ---------------------------------------------------------
     Start
     --------------------------------------------------------- */
  fill();
  sizeEnvelope();
  initMusic();

  window.addEventListener('orientationchange', function () { setTimeout(sizeEnvelope, 250); });

  var cover = $('#cover');
  if (cover) {
    cover.addEventListener('click', open);
    cover.addEventListener('touchstart', function (e) { e.preventDefault(); open(); }, { passive: false });
  }

  // ?open=1 überspringt die Umschlag-Animation
  if (/[?&]open=1/.test(location.search)) {
    body.classList.add('is-open');
    body.classList.remove('is-sealed');
    opened = true;
    var c = $('#cover');
    if (c) c.remove();
  }
})();
