# [^](README.md) Web Services Opdracht 2024 - 2025

## Lesopname

- [hogent](https://chamilo.hogent.be/index.php?go=CourseViewer&application=Chamilo%5CApplication%5CWeblcms&course=61464&tool=LectureCapture&browser=Hogent%5CApplication%5CWeblcms%5CTool%5CImplementation%5CLectureCapture%5CRenderer%5CVideoPublicationListRenderer&tool_action=viewer&publication=2410884)
- [panopto](https://hogent.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=174ed677-dea0-4f16-bd21-b1f700f6a6f1&start=0)
- `D:/DATA/Videos/WEBSERVICES/H0_Algemene_info_en_examenopdracht.mp4`

## De opdracht

Gedurende het semester maak je een API in Node.js. Als je ook het olod Front-end Web Development volgt, zal de API dienen als back-end voor de applicatie die je daar maakt. Indien je het olod Front-end Web Development niet volgt, maak je gewoon een API.

Je bent volledig vrij om te kiezen welke API je ontwikkelt. Indien je twijfelt over jouw idee, mag je altijd eerst met je lector overleggen tijdens de les of een GitHub issue aanmaken.

Alle code moet in een GitHub classroom repository terecht komen (zie Chamilo voor een link naar de classroom). Enkel de **main** branch van deze repository zal geëvalueerd worden. Er wordt automatisch een template van de **README.md** aangemaakt als je de opdracht accepteert, vul deze correct in. Je gebruikt dezelfde repository voor zowel Web Services als Front-end Web Development.

> [link](https://github.com/HOGENT-frontendweb/frontendweb-2425-BennyClemmens.git) naar de aangemaakte repo

```code
Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/frontendweb-2425-BennyClemmens (main)
$ git remote -v
origin  https://github.com/HOGENT-frontendweb/frontendweb-2425-BennyClemmens.git (fetch)
origin  https://github.com/HOGENT-frontendweb/frontendweb-2425-BennyClemmens.git (push)
```

Het is belangrijk dat de applicatie significant verschilt van de voorbeeldapplicatie die tijdens de les gemaakt wordt.

Daarnaast verwachten we dat je een dossier met uitleg over je app indient op Chamilo. Een template voor dit dossier (**dossier.md**) wordt ook aangeleverd als je de opdracht accepteert en dien je te gebruiken. **Je dient het dossier in als pdf!**

## Minimumvereisten

### Datalaag

- voldoende complex en correct (meer dan één tabel (naast de user tabel), tabellen bevatten meerdere kolommen, 2 een-op-veel of veel-op-veel relaties)
- één module beheert de connectie + connectie wordt gesloten bij sluiten server
- heeft migraties - indien van toepassing
- heeft seeds

### Repositorylaag

- definieert één repository per entiteit - indien van toepassing
- mapt OO-rijke data naar relationele tabellen en vice versa - indien van toepassing
- er worden kindrelaties opgevraagd (m.b.v. JOINs) - indien van toepassing

### Servicelaag met een zekere complexiteit

- bevat alle domeinlogica
- er wordt gerelateerde data uit meerdere tabellen opgevraagd
- bevat geen services voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- bevat geen SQL-queries of databank-gerelateerde code

### REST-laag

- meerdere routes met invoervalidatie
- meerdere entiteiten met alle CRUD-operaties
- degelijke foutboodschappen
- volgt de conventies van een RESTful API
- bevat geen domeinlogica
- geen API calls voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- degelijke autorisatie/authenticatie op alle routes

### Algemeen

- er is een minimum aan logging en configuratie voorzien
- een aantal niet-triviale én werkende integratietesten (min. 1 entiteit in REST-laag >= 90% coverage, naast de testen voor user)
- node_modules, .env, productiecredentials... werden niet gepushed op GitHub
- minstens één extra technologie die we niet gezien hebben in de les (zie verderop voor voorbeelden)
- maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
- de applicatie start zonder problemen op gebruik makend van de instructies in de README
- de API draait online
- duidelijke en volledige README.md
- er werden voldoende (kleine) commits gemaakt
- volledig en tijdig ingediend dossier (zie verderop voor de vereisten)

> ⚠️ Gebruik een degelijke opmaak in Markdown voor de README en het dossier! Zie [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) voor meer uitleg.

### Demo

- de student toont een werkende REST API in NodeJS
- de student overloopt de projectstructuur
- de applicatie wijkt voldoende af van de voorbeeldapplicatie
- de student kan de API calls (CRUD operaties) voor 1 of meerdere entiteiten demonstreren
- de student toont de implementatie/werking van de extra technologie
- alle testen slagen
- de student toont een stukje code waar die fier op is

## Dossier vereisten

Zorg dat de **dossier.md** van je repository aangevuld is, alle vereisten staan in het document.

In dit document staan lijnen die starten met een >, dit zijn instructies. Verwijder deze lijnen voor je het dossier indient!

Dien enkel een pdf in op Chamilo, er zijn genoeg plugins voor VS Code om Markdown naar pdf om te zetten, zoals bv. <https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf>.

## Voorbeelden van extra’s

Je vindt misschien wel een interessante extra technologie in de [Node.js Toolbox](https://nodejstoolbox.com/). Een aantal veelgebruikte extra's zijn:

- Ander ORM voor de databank
- Ander type databank (document based, column oriented...)
  - Let op: niet elk project is hiervoor geschikt!
- Ander web framework (Express, Fastify, NestJS...)
  - Let op: nog steeds met het toepassen van de nodige best practices, aangepast aan het framework! We merken vaak dat studenten die afwijken op dit punt, ook de best practices vergeten (door online tutorials) waardoor het project niet voldoet aan meerdere minimumvereisten.
  - Check bij jouw lector of het framework dat je wil gebruiken toegelaten is.
- Ander package voor API documentation
- Package voor invoervalidatie
- Real time toepassing (sockets...)
-... (eigen inbreng, verras ons)

## Vragen

Als je vragen of hulp nodig hebt: maak altijd een GitHub issue aan en tag je lector. Gebruik het voorziene template voor het GitHub issue. Uiteraard kan je dit ook gewoon na de les vragen.

Mails worden niet beantwoord.

## Evaluatie

Je wordt beoordeeld op basis van een portfolio dat je samenstelt gedurende het semester. Dit portfolio bestaat uit:

- De code van je applicatie
  - Moet te vinden zijn in de GitHub classroom repository op de main branch
- Het ingevulde dossier, als pdf ingediend op Chamilo
- Een demo van je applicatie via een Panopto-opname
  - De demo mag maximaal 15 minuten duren (incl. demo Front-end Web Development)
  - De webcam moet aanstaan tijdens de demo
  - Je deelt de demo via Panopto met jouw lector(en)
  - Dit is geen commerciële presentatie, maar een technische demo
  - De demo moet minstens de volgende zaken bevatten/tonen:
    - Context van de applicatie (= wat doet de applicatie? wat is het doel?)
    - Projectstructuur overlopen (mappenstructuur, speciale ontwerpkeuzes...)
    - Demo van de applicatie (gebruik de online versie)
      - Toon dat jouw front-end responsive is (indien van toepassing)
      - De webservice kan je demonstreren in Postman
    - Demo van de extra technologie + werking/implementatie
    - Testen laten lopen
    - Toon een stukje code waar je fier op bent en leg uit (voor beide olods)

Zorg ervoor dat jouw applicatie aan alle minimumvereisten voldoet op het moment van de deadline. We staan toe dat maximaal één minimumvereiste met een gewicht van 2, of twee minimumvereisten met een gewicht van 1, niet worden nageleefd. In alle andere gevallen wordt een score van 0 toegekend. Indien je op Chamilo geen dossier indient, dan krijg je de score AFW.

**De deadline voor het portfolio is het einde van week 13 (vrijdag 20 december 2024, 23u59).**

Alle code zal voor de start van het volgend academiejaar verwijderd worden uit de GitHub classroom. Als je je applicatie wenst te behouden, zorg dan dat je deze tijdig naar een privé repository pusht.

Veel succes!

Laatste aanpassing op 09/12/2024 14:16
