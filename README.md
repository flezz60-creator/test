# Nordlicht IT Solutions – Unternehmenswebsite

Diese statische Website präsentiert das Leistungsportfolio einer fiktiven IT-Beratung. Sie ist vollständig in HTML, CSS und JavaScript umgesetzt und kann ohne Build-Prozess direkt im Browser geöffnet werden.

## Projektstruktur

```
.
├── index.html          # Startseite mit allen Inhaltssektionen
├── assets
│   ├── css
│   │   └── style.css   # Globale Styles und responsive Layouts
│   └── js
│       └── main.js     # Navigation, Formular-Feedback und Interaktionen
```

## Nutzung

1. Repository klonen oder herunterladen.
2. `index.html` im Browser öffnen.
3. Optional: Dateien in einem lokalen Webserver (z.B. `python -m http.server`) bereitstellen, um Funktionen wie das Scroll-Verhalten identisch zur Produktionsumgebung zu testen.

## Anpassung

- Farben, Schriften und Abstände lassen sich zentral über die CSS-Variablen in `assets/css/style.css` steuern.
- Inhalte wie Leistungen, Branchen oder Testimonials können direkt in `index.html` angepasst werden.
- Das Kontaktformular beinhaltet clientseitige Validierung und zeigt einen Bestätigungs- bzw. Fehlermeldungstext an. Für den produktiven Einsatz ist eine serverseitige Weiterleitung oder API-Anbindung erforderlich.

## Lizenz

Dieses Projekt dient als Beispiel und kann frei angepasst oder erweitert werden.
