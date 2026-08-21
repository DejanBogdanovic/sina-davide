/* =============================================================
   Sina & Davide — Ablaufsteuerung
   ============================================================= */
(function () {
  'use strict';

  var C = window.WEDDING || {};
  var body = document.body;

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var weddingDate = new Date(C.date);

  /* Seitenverhältnisse der gezeichneten Icons */
  var ICON_BOX = {
    church:   '0 0 64 84',
    kurhaus:  '0 0 96 66',
    heart:    '0 0 24 22',
    glasses:  '0 0 48 40',
    gift:     '0 0 24 24',
    bed:      '0 0 28 24',
    calendar: '0 0 24 24',
    sprig:    '0 0 64 22'
  };

  function icon(name, cls) {
    if (!name || !ICON_BOX[name]) return '';
    return '<svg class="icon ' + (cls || '') + ' i-' + name + '" viewBox="' + ICON_BOX[name] +
           '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------------------------------------------------------
     Texte aus config.js einsetzen
     --------------------------------------------------------- */
  function fill() {
    var dotted = pad(weddingDate.getDate()) + ' · ' +
                 pad(weddingDate.getMonth() + 1) + ' · ' +
                 weddingDate.getFullYear();

    var text = {
      '[data-bride]':         C.bride,
      '[data-groom]':         C.groom,
      '[data-monogram]':      C.monogram,
      '[data-headline]':      C.headline,
      '[data-date-label]':    C.dateLabel,
      '[data-date-long]':     C.dateLong,
      '[data-date-intro]':    C.dateIntro,
      '[data-date-dotted]':   dotted,
      '[data-signature]':     C.signature,
      '[data-cover-eyebrow]': C.cover && C.cover.eyebrow,
      '[data-cover-hint]':    C.cover && C.cover.hint
    };
    Object.keys(text).forEach(function (sel) {
      if (text[sel] == null) return;
      $$(sel).forEach(function (el) { el.textContent = text[sel]; });
    });

    var html = {
      '[data-quote]':   C.quote,
      '[data-closing]': C.closing
    };
    Object.keys(html).forEach(function (sel) {
      if (html[sel] == null) return;
      $$(sel).forEach(function (el) { el.innerHTML = html[sel]; });
    });

    document.title = C.bride + ' & ' + C.groom + ' — ' + (C.headline || 'Wir heiraten');
  }

  /* ---------------------------------------------------------
     Orte, Hinweise, Blöcke rendern
     --------------------------------------------------------- */
  function render() {
    /* Orte */
    var venues = $('#venues');
    if (venues && C.venues) {
      venues.innerHTML = C.venues.map(function (v) {
        return '<div class="venue">' +
                 icon(v.icon, 'icon--' + v.icon) +
                 '<p class="venue__name">' + v.name + '</p>' +
                 (v.lines || []).map(function (l) {
                   return '<p class="venue__line">' + l + '</p>';
                 }).join('') +
                 (v.maps ? '<a class="link-map" href="' + v.maps + '" target="_blank" rel="noopener">Route öffnen</a>' : '') +
               '</div>';
      }).join('<div class="venue-sep" aria-hidden="true">' + icon('heart', 'icon--heart-sm') + '</div>');
    }

    /* Die beiden Hinweise */
    var notes = $('#notes');
    if (notes && C.notes) {
      notes.innerHTML = C.notes.map(function (n) {
        return '<div class="note">' + icon(n.icon, 'icon--note') + '<p>' + n.text + '</p></div>';
      }).join('<div class="note-sep" aria-hidden="true"></div>');
    }

    /* Geschenke */
    var gift = $('#gift');
    if (gift && C.gift) {
      gift.innerHTML = icon(C.gift.icon, 'icon--block') +
                       '<div class="block__body"><p>' + C.gift.text + '</p></div>';
    }

    /* Übernachtung */
    var stay = $('#stay');
    if (stay && C.stay) {
      stay.innerHTML = icon(C.stay.icon, 'icon--block') +
                       '<div class="block__body">' +
                         (C.stay.title ? '<p class="block__title">' + C.stay.title + '</p>' : '') +
                         '<p>' + C.stay.text + '</p>' +
                       '</div>';
    }

    /* Zusage-Text */
    var rt = $('#rsvpText');
    if (rt && C.rsvp) {
      rt.innerHTML = icon(C.rsvp.icon, 'icon--block') +
                     '<div class="block__body"><p>' + C.rsvp.text + '</p></div>';
    }
  }

  /* ---------------------------------------------------------
     RSVP-Links
     --------------------------------------------------------- */
  function rsvp() {
    if (!C.rsvp) return;
    var msg = encodeURIComponent(C.rsvp.message || '');

    var wa = $('#rsvpWa');
    if (wa) {
      if (C.rsvp.whatsapp) {
        wa.href = 'https://wa.me/' + String(C.rsvp.whatsapp).replace(/\D/g, '') + '?text=' + msg;
      } else { wa.remove(); }
    }

    var mail = $('#rsvpMail');
    if (mail) {
      if (C.rsvp.email) {
        mail.href = 'mailto:' + C.rsvp.email +
                    '?subject=' + encodeURIComponent('Zusage Hochzeit ' + C.bride + ' & ' + C.groom) +
                    '&body=' + msg;
      } else { mail.remove(); }
    }
  }

  /* ---------------------------------------------------------
     Countdown
     --------------------------------------------------------- */
  function countdown() {
    var out = {
      d: $('[data-cd="d"]'), h: $('[data-cd="h"]'),
      m: $('[data-cd="m"]'), s: $('[data-cd="s"]')
    };
    if (!out.d) return;

    function tick() {
      var diff = weddingDate - new Date();
      if (diff <= 0) {
        var box = $('#countdown');
        if (box) box.outerHTML = '<p class="quote">Heute ist der Tag. Wir sagen Ja.</p>';
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      out.d.textContent = Math.floor(s / 86400);
      out.h.textContent = pad(Math.floor(s / 3600) % 24);
      out.m.textContent = pad(Math.floor(s / 60) % 60);
      out.s.textContent = pad(s % 60);
    }
    tick();
    var timer = setInterval(tick, 1000);
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
      window.scrollTo(0, 0);
      revealInit();
      var cover = $('#cover');
      setTimeout(function () { if (cover) cover.remove(); }, 1200);
    }, 2600);
  }

  /* ---------------------------------------------------------
     Scroll-Reveal
     --------------------------------------------------------- */
  function revealInit() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

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
  render();
  rsvp();
  countdown();
  sizeEnvelope();
  initMusic();

  window.addEventListener('resize', sizeEnvelope);
  window.addEventListener('orientationchange', function () { setTimeout(sizeEnvelope, 250); });

  var cover = $('#cover');
  if (cover) {
    cover.addEventListener('click', open);
    cover.addEventListener('touchstart', function (e) { e.preventDefault(); open(); }, { passive: false });
  }

  document.addEventListener('keydown', function (e) {
    if (!opened && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(); }
  });

  // ?open=1 überspringt die Umschlag-Animation
  if (/[?&]open=1/.test(location.search)) {
    body.classList.add('is-open');
    body.classList.remove('is-sealed');
    opened = true;
    var c = $('#cover');
    if (c) c.remove();
    revealInit();
  }
})();
