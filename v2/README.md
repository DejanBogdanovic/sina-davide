# Version 2 — Karteninhalt als scrollbare Website

> Die **Hauptseite** (ein Verzeichnis höher, siehe [../README.md](../README.md))
> zeigt nach dem Umschlag die gedruckte Karte als Bild.
> Diese Version hier baut denselben Inhalt stattdessen als echte Website nach —
> mit Countdown, Karten-Links und Zusage-Buttons.

Statische Website. Beim Aufrufen sieht man einen zugeklebten Umschlag mit
Wachssiegel. Ein Klick / Tipp irgendwo auf den Bildschirm bricht das Siegel,
die vier Laschen klappen auf, ein Schmetterling fliegt heraus und die Karte
gleitet nach oben — danach erscheint die Einladung zum Scrollen.

Die Inhalte entsprechen 1:1 der gedruckten Einladungskarte.

## Struktur

```
v2/index.html          Seitenaufbau + gezeichnete Icons (SVG-Sprite)
v2/css/style.css       Gestaltung + komplette Animation
v2/js/config.js        >>> HIER ALLES ANPASSEN <<<
v2/js/app.js           Logik (Öffnen, Countdown, RSVP-Links, Scroll-Effekte)
v2/assets/audio/       optional: Hintergrundmusik ablegen
```

## Anpassen

Alle Inhalte stehen in **`v2/js/config.js`**. Sonst muss nichts angefasst werden.

* `<em>…</em>` im Text wird in Schreibschrift/Salbei hervorgehoben
  (wie „Herzensmenschen" oder „die Zukunftskasse wachsen" auf der Karte).
* `<strong>…</strong>` wird in Rosé betont (z. B. „Ende Dezember 2026").

### Noch offen

| Feld | To-do |
|------|-------|
| `rsvp.whatsapp` | echte Nummer eintragen, international **ohne** `+`, z. B. `41791234567` |
| `rsvp.email`    | echte E-Mail-Adresse eintragen |

Beides steht aktuell auf Platzhaltern. Wird ein Feld leer gelassen (`''`),
verschwindet der entsprechende Button automatisch.

### Icons

Die Illustrationen (Kathedrale, Kurhaus mit Bergen und Tannen, Herz,
Sektgläser, Geschenk, Bett, Kalender, Zweig) sind handgezeichnete SVG-Linien
und stehen als `<symbol>` am Anfang von `v2/index.html`. Zugeordnet werden sie in
`v2/js/config.js` über `icon: 'church' | 'kurhaus' | 'heart' | 'glasses' |
'gift' | 'bed' | 'calendar'`.

### Farben

Palette ganz oben in `v2/css/style.css` im `:root`-Block — Salbei (`--sage`),
Rosé-Taupe (`--rose`), Greige (`--paper`). Das Wachssiegel ist salbeigrün
(`--wax`); für ein dunkelbraunes Siegel wie im Referenzvideo genügt:

```css
--wax: #6f5341; --wax-hi: #99755a; --wax-lo: #4a3527;
```

### Musik (optional)

MP3 nach `v2/assets/audio/` legen und in `v2/js/config.js` eintragen:

```js
music: 'assets/audio/music.mp3'
```

Dann erscheint unten rechts ein dezenter Musik-Button. Die Musik startet beim
Öffnen des Umschlags (Browser erlauben Autoplay nur nach einer Nutzeraktion —
der Klick auf den Umschlag ist genau diese Aktion).

## Lokal testen

Aus dem Projekt-Hauptordner:

```bash
python3 -m http.server 4321
```

Danach http://localhost:4321/v2/ öffnen.
`http://localhost:4321/v2/?open=1` überspringt die Umschlag-Animation —
praktisch beim Bearbeiten der Inhalte.

## Veröffentlichen

Reines HTML/CSS/JS ohne Build-Schritt. Der Ordner `v2/` ist eigenständig — er
kann alleine hochgeladen werden (dann als Hauptseite) oder zusammen mit der
Hauptseite, dann liegt er unter `/v2/`.

## Barrierefreiheit / Fallback

* `prefers-reduced-motion` wird respektiert (Animationen aus).
* Ohne JavaScript wird der Umschlag übersprungen und die Einladung direkt gezeigt.
* Öffnen geht auch per Tastatur (Enter oder Leertaste).
