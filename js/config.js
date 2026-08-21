/* =============================================================
   VERSION 2 — Umschlag öffnet, danach die Karte als Bild
   ============================================================= */

window.WEDDING = {

  bride: 'Sina',
  groom: 'Davide',
  monogram: 'S&D',

  /* Datum nur für den Aufdruck auf dem Umschlag */
  dateDotted: '29 · 05 · 2027',

  /* Die Einladungskarte.
     Für beste Qualität beim Zoomen die hochauflösende Datei
     der Designerin hier ablegen (gleicher Dateiname genügt).   */
  card: {
    src: 'assets/einladung.jpg',
    alt: 'Einladung zur Hochzeit von Sina und Davide am 29.05.2027',
    // Dateiname beim Herunterladen
    download: 'Einladung-Sina-und-Davide.jpg'
  },

  /* Texte auf dem Umschlag */
  cover: {
    eyebrow: 'Ihr habt Post von',
    hint: 'Zum Öffnen tippen',
    cardLabel: 'Wir trauen uns'
  },

  /* Hinweise im Karten-Viewer */
  viewer: {
    zoomHint: 'Zum Vergrössern tippen',
    zoomHintMouse: 'Zum Vergrössern klicken',
    downloadLabel: 'Karte speichern'
  },

  /* Optional: Hintergrundmusik, z. B. 'assets/audio/music.mp3'. null = aus */
  music: null
};
