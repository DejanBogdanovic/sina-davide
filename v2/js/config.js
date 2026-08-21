/* =============================================================
   HOCHZEITSEINLADUNG SINA & DAVIDE — ZENTRALE KONFIGURATION
   Inhalte 1:1 von der gedruckten Einladungskarte.
   In <em>…</em> gesetzte Stellen werden in Schreibschrift/Salbei
   hervorgehoben, <strong>…</strong> wird betont.
   ============================================================= */

window.WEDDING = {

  /* ---------- Brautpaar ---------- */
  bride: 'Sina',
  groom: 'Davide',
  monogram: 'S&D',
  headline: 'Wir trauen uns!',

  /* ---------- Datum ----------
     date  = technisch, steuert den Countdown (lokale Zeit)     */
  date:      '2027-05-29T14:00:00',
  dateLabel: '29.05.2027',
  dateLong:  'Samstag, 29. Mai 2027',
  dateIntro: 'Wir heiraten am',

  /* ---------- Orte ---------- */
  venues: [
    {
      icon: 'church',
      name: 'Kathedrale in Chur',
      lines: ['um 14:00 Uhr'],
      maps: 'https://www.google.com/maps/search/?api=1&query=Kathedrale+Chur'
    },
    {
      icon: 'kurhaus',
      name: 'Kurhaus Lenzerheide',
      lines: ['Apero & Feier', 'im Anschluss'],
      maps: 'https://www.google.com/maps/search/?api=1&query=Kurhaus+Lenzerheide'
    }
  ],

  /* ---------- Zitat ---------- */
  quote: 'Ein Tag voller <em>Liebe, Freude</em><br>und unvergesslicher Momente.',

  /* ---------- Die beiden Hinweise ---------- */
  notes: [
    {
      icon: 'heart',
      text: 'Wir lieben es, unseren grossen Tag mit kleinen und grossen <em>Herzensmenschen</em> zu beginnen.'
    },
    {
      icon: 'glasses',
      text: 'Nach der Trauung möchten wir den Abend ganz den Grossen widmen – zum Anstossen, Geniessen, Tanzen und Feiern.'
    }
  ],

  /* ---------- Geschenke ---------- */
  gift: {
    icon: 'gift',
    text: 'Unser Zuhause ist eingerichtet, unsere Herzen sind voll – jetzt darf nur noch <em>die Zukunftskasse wachsen</em>.'
  },

  /* ---------- Übernachtung ---------- */
  stay: {
    icon: 'bed',
    title: 'Feiern, tanzen, geniessen – und einfach bleiben.',
    text: 'Für alle, die die Nacht gerne noch ein wenig länger geniessen möchten, ' +
          'gibt es direkt am Kurhaus Übernachtungsmöglichkeiten. ' +
          'Bei Interesse lasst es uns bitte frühzeitig wissen, damit wir euch die ' +
          'entsprechenden Informationen zur Buchung zukommen lassen können.'
  },

  /* ---------- Zusage (RSVP) ----------
     TODO: whatsapp & email eintragen — aktuell Platzhalter!      */
  rsvp: {
    icon: 'calendar',
    deadline: 'Ende Dezember 2026',
    text: 'Bitte gebt uns bis <strong>Ende Dezember 2026</strong> Bescheid, ' +
          'ob ihr kommen könnt oder nicht.',
    // Nummer international, OHNE + und ohne Leerzeichen, z. B. '41791234567'
    whatsapp: '41791234567',
    email: 'sina.und.davide@example.com',
    message: 'Hallo ihr Zwei! Wir kommen sehr gerne an eure Hochzeit am 29.05.2027. Wir sind zu ___ Personen.'
  },

  /* ---------- Abschluss ---------- */
  closing:   'Wir können es kaum erwarten,<br>diesen besonderen Tag mit euch zu verbringen!',
  signature: 'In Liebe,',

  /* ---------- Optional: Hintergrundmusik ----------
     Datei nach assets/audio/ legen, z. B. 'assets/audio/music.mp3'
     null = kein Musik-Button.                                    */
  music: null,

  /* ---------- Texte auf dem Umschlag ---------- */
  cover: {
    eyebrow: 'Ihr habt Post von',
    hint: 'Zum Öffnen tippen'
  }
};
