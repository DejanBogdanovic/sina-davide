# Sina & Davide — Interaktive Hochzeitseinladung

> **Es gibt zwei Versionen:**
> * **Hauptseite** (dieser Ordner) — Umschlag öffnet sich, danach wird die
>   gedruckte Einladungskarte als Bild angezeigt, genau wie sie ist.
> * **Version 2** (`v2/`, siehe [v2/README.md](v2/README.md)) — derselbe
>   Umschlag, danach der Karteninhalt als echte, scrollbare Website mit
>   Countdown, Karten-Links und Zusage-Buttons.

Beim Aufrufen sieht man einen zugeklebten Umschlag mit Wachssiegel. Ein Klick
/ Tipp irgendwo auf den Bildschirm bricht das Siegel, die vier Laschen klappen
auf, ein Schmetterling fliegt heraus — und die echte Einladungskarte gleitet
heraus und wird bildschirmfüllend angezeigt.

## Dateien

```
index.html            Umschlag + Karten-Viewer
css/style.css         Gestaltung + Animation
js/config.js          >>> HIER ANPASSEN <<<
js/app.js             Logik (Öffnen, Zoom, Musik)
assets/einladung.jpg  die Einladungskarte
assets/audio/         optional: Hintergrundmusik ablegen
v2/                   die zweite Version (Karteninhalt als Website)
```

## Die Karte austauschen

Neue Datei als `assets/einladung.jpg` ablegen — fertig. Anderer Dateiname oder
Format (PNG, WebP): Pfad in `js/config.js` unter `card.src` anpassen.

> **Empfehlung:** aktuell liegt hier der WhatsApp-Screenshot mit 1024 × 1536 px.
> Beim Hineinzoomen wird der kleine Text dadurch etwas weich. Legt die
> hochauflösende Originaldatei der Designerin ab (gleicher Dateiname genügt),
> dann bleibt alles gestochen scharf. Ideal sind ca. 2000–2500 px Breite.

## Bedienung für die Gäste

* Irgendwo tippen → Umschlag öffnet sich.
* Auf die Karte tippen → zoomt auf die angetippte Stelle, nochmal tippen →
  zurück. Pinch-to-Zoom funktioniert zusätzlich, `Esc` zoomt ebenfalls zurück.
* Button oben rechts → Karte aufs Gerät speichern.

## Anpassen

Alles in **`js/config.js`**: Namen, Monogramm, Datum auf dem Umschlag,
Bildpfad, Dateiname beim Download und die Beschriftungen.

### Farben

Palette ganz oben in `css/style.css` im `:root`-Block. Das Wachssiegel ist
salbeigrün (`--wax`); für ein dunkelbraunes Siegel wie im Referenzvideo:

```css
--wax: #6f5341; --wax-hi: #99755a; --wax-lo: #4a3527;
```

### Musik (optional)

MP3 nach `assets/audio/` legen und in `js/config.js` eintragen:

```js
music: 'assets/audio/music.mp3'
```

Dann erscheint unten rechts ein dezenter Musik-Button. Die Musik startet beim
Öffnen des Umschlags (Browser erlauben Autoplay nur nach einer Nutzeraktion —
der Klick auf den Umschlag ist genau diese Aktion).

## Lokal testen

```bash
python3 -m http.server 4321
```

* Hauptseite: http://localhost:4321
* Version 2:  http://localhost:4321/v2/

`?open=1` an die URL hängen überspringt die Umschlag-Animation — praktisch beim
Bearbeiten.

## Veröffentlichen

Reines HTML/CSS/JS ohne Build-Schritt. Der Ordner kann 1:1 hochgeladen werden —
z. B. Netlify (Ordner ins Fenster ziehen), Vercel, GitHub Pages oder
klassisches Webhosting per FTP. Version 2 liegt dann unter `/v2/`; wird sie
nicht gebraucht, kann der Ordner einfach gelöscht werden.

## Barrierefreiheit / Fallback

* `prefers-reduced-motion` wird respektiert (Animationen aus).
* Ohne JavaScript wird der Umschlag übersprungen und die Karte direkt gezeigt.
* Öffnen geht auch per Tastatur (Enter oder Leertaste).
