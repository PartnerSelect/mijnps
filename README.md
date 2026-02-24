# Mijn PartnerSelect

De Mijn PartnerSelect omgeving. Gebouwd met [Vue](https://vuejs.org/).

Er zijn enkele vereisten aan systeem om aanpassingen te kunnen doen. Na aanpassing kun je het build-script draaien. Dit zorgt ervoor dat alles samengevoegd en geminified wordt (en nog enkele andere zaken).

## Installatiebenodigheden op de PC

Belangrijkste vereiste om eerst op de computer te installeren:
[Node](https://nodejs.org/en/)

Dit maakt enkele command line opties mogelijk via npm (Node Package Manager).

Versie NodeJS: 14.18
Versie NPM: 8.3

## Benodigheden van de site installeren.

In terminal naar de map van MijnPS

```bash
npm install
```

Dit installeert alle modules waar de pagina van afhankelijk is. De installatie baseert zich op package.json. Dit bestand kun je volledig late zoals het is. NPM regelt alles voor je.

### Start in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run serve
```

Opent een lokale devserver zodat je alles kunt bouwen en testen. Hou de terminal in de gaten.

De bestanden die je online plaatst worden door het build script in /dist gezet. Deze bestanden pas je NIET aan. Alle wijzigingen worden daar overschreven.

Om aanpassingen aan de pagina te doen, pas je de bestanden in /src aan.

### Build script draaien.

```bash
npm run build
```

Als je de wijzigingen gedaan hebt, draai je het build script. Dit trekt alle modules bij elkaar, draait een minify script, een transpiler (zodat moderne JavaScript code ook in oudere browsers gebruikt kan worden), code-splitting, etc.

Daarna kun je de inhoud van /dist naar de server halen. De bestanden zijn voorzien van een hash zodat je geen last krijgt van caching problemen.

## Wijzigingen aanbrengen

Wijzigingen breng je aan aan de bestanden in /src

#### /src/assets

Bevat plaatjes e.d.
Dienen geimporteerd te worden, anders komen ze niet in de uitvoer map te staan.
Je kunt het importeren in het bestand waar je het plaatje nodig hebt. Dit moet in het &lt;script&gt; gedeelte gebeuren.

```
import './bestandlocatie';
```

Dit is niet nodig als het img bestand naar een volledig pad verwijst (e.g. https://www.partnerselect.net/wp-content/bestand.jpg)

#### /src/components

Bevat herbruikbare componenten die op verschillende pagina's gebruikt worden. Bijvoorbeeld het menu en de belafspraak button.

#### /src/css

Bevat alle css bestanden. Worden in [SCSS](https://sass-lang.com/) geschreven. Dit heeft extra handigheden, maar je kunt ook gewoon reguliere CSS schrijven.
App.scss is het hoofd-bestand. Als je een ander bestand maakt, moet het in app.scss geimporteerd worden, anders komt het niet in de uiteindelijke bundel.

#### /src/functions

JavaScript functions die herbruikbaar zijn en geimporteerd kunnen worden wanneer je ze nodig hebt.

#### /src/views

Dit zijn de verschillende pagina's. Afhankelijk van de URL (route) worden deze getoond. (Dit is waar &lt;router-view&gt; in het layout bestand voor dient).

#### /src/store

State management met [Vuex](https://vuex.vuejs.org). Ligt boven alle pagina's en dient als doorgeefluik voor informatie die paginabreed beschikbaar moet zijn. Mutaties aan worden van hieruit ook aangeroepen, zodat je je niet hoeft af te vragen waar een wijziging in gegevens vandaan komt.
Bevat login functionaliteit en menu items.

#### /src/router

Wordt gebruikt voor [Vue-Router](https://router.vuejs.org/).
Deze router neemt het afhandelen van URLs over zolang je op de pagina bent. Als je bijvoorbeeld naar de beschrijving wilt linken, moet hiervoor een route bestaan in routes.js

URL parameters en query strings kunnen via deze weg ook afgevangen worden.
