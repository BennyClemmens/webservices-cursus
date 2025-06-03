# [^](README.md) Software

Voor dit olod gaan we ervan uit dat je onderstaande **software installeert en configureert voor de eerste les**. Tijdens de les wordt geen tijd meer voorzien om dit te doen, dus zorg ervoor dat je dit op voorhand in orde brengt. Indien je problemen ondervindt, kan je deze melden via een issue op je eigen repository.

- Git ✅
- Node.js ✅
- Yarn ✅
- MySQL ✔️
- MySQL Workbench ✔️
- Visual Studio Code ✅
- Postman ✅

## Git

Installeer Git via een package manager:

- Windows: **winget install -e --id Git.Git**
- macOS: **brew install git**
- Linux: [distro afhankelijk](https://git-scm.com/download/linux)

### Configuratie Git

Open een terminal (of bv. Git Bash op Windows) en voer onderstaande commando's uit. Je bent natuurlijk vrij om deze instellingen aan te passen naar jouw voorkeur.

```bash
git config --global core.autocrlf true # <- enkel op Windows
git config --global core.autocrlf input # <- enkel op macOS en Linux
git config --global core.ignorecase false

git config --global init.defaultBranch main

git config --global pager.branch false
git config --global pager.log false

git config --global pull.ff only
git config --global pull.rebase true

git config --global push.default simple

git config --global user.name "Voornaam Achternaam"
git config --global user.email "Jouw e-mailadres"
```

Volg vervolgens de [GitHub Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) om een SSH-key toe te voegen aan je GitHub-account. Dit is o.a. nodig om te kunnen pushen naar je repository.

```code
Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ git --version
git version 2.42.0.windows.1

Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ ssh -T git@github.com
Hi BennyClemmens! You've successfully authenticated, but GitHub does not provide shell access.

Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ git remote -v
origin  https://github.com/BennyClemmens/webservices-cursus.git (fetch)
origin  https://github.com/BennyClemmens/webservices-cursus.git (push)

Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ git config --list --global
core.editor="C:\Users\Benny\AppData\Local\Programs\Microsoft VS Code\bin\code" --wait
core.autocrlf=true
core.ignorecase=false
user.name=Benny Clemmens
user.email=benny.clemmens@student.hogent.be
push.default=simple
pull.rebase=true
pull.ff=only
rebase.autostash=true
init.defaultbranch=main
pager.branch=false
pager.log=false
```

```code
PS C:\Windows\system32> winget install github.cli
Found GitHub CLI [GitHub.cli] Version 2.74.0
This application is licensed to you by its owner.
Microsoft is not responsible for, nor does it grant any licenses to, third-party packages.
Downloading https://github.com/cli/cli/releases/download/v2.74.0/gh_2.74.0_windows_amd64.msi
  ██████████████████████████████  13.3 MB / 13.3 MB
Successfully verified installer hash
Starting package install...
Successfully installed
```

```code
benny@FLAB2025 MINGW64 ~
$ gh --version
gh version 2.74.0 (2025-05-29)
https://github.com/cli/cli/releases/tag/v2.74.0

benny@FLAB2025 MINGW64 ~
$ gh auth login
? Where do you use GitHub? GitHub.com
? What is your preferred protocol for Git operations on this host? SSH
? Upload your SSH public key to your GitHub account? C:\Users\benny\.ssh\id_ed25519_github.pub
? Title for your SSH key: (GitHub CLI) FLAB2025github

? Title for your SSH key: FLAB2025github
? How would you like to authenticate GitHub CLI? Login with a web browser

! First copy your one-time code: 3F06-3A40
Press Enter to open https://github.com/login/device in your browser...
✓ Authentication complete.
- gh config set -h github.com git_protocol ssh
✓ Configured git protocol
✓ Uploaded the SSH key to your GitHub account: C:\Users\benny\.ssh\id_ed25519_github.pub
✓ Logged in as BennyClemmens

benny@FLAB2025 MINGW64 ~
$ gh auth refresh -h github.com -s admin:ssh_signing_key

! First copy your one-time code: 0A97-2666
Press Enter to open https://github.com/login/device in your browser...
✓ Authentication complete.

benny@FLAB2025 MINGW64 ~
$ gh ssh-key add ~/.ssh/id_ed25519_github.pub --type signing
✓ Public key added to your account

benny@FLAB2025 MINGW64 ~
$ gh ssh-key add ~/.ssh/id_ed25519_github.pub --type authentication
✓ Public key already exists on your account

benny@FLAB2025 MINGW64 /d/DATA/GIT
$ mkdir WEBSERVICES

benny@FLAB2025 MINGW64 /d/DATA/GIT
$ cd WEBSERVICES

benny@FLAB2025 MINGW64 /d/DATA/GIT/WEBSERVICES
$ git clone git@github.com:BennyClemmens/webservices-cursus.git
Cloning into 'webservices-cursus'...
remote: Enumerating objects: 23, done.
remote: Counting objects: 100% (23/23), done.
remote: Compressing objects: 100% (14/14), done.
remote: Total 23 (delta 7), reused 22 (delta 6), pack-reused 0 (from 0)
Receiving objects: 100% (23/23), 2.26 MiB | 796.00 KiB/s, done.
Resolving deltas: 100% (7/7), done.
```

## Node.js

Installeer Node.js (**minimaal versie 22.9.0**) via een package manager:

- Windows: **winget install -e --id OpenJS.NodeJS.LTS**
- macOS: **brew install node@22**
- Linux: [distro afhankelijk](https://nodejs.org/en/download/package-manager)

Of kies voor een manuele installatie door minimaal v22.9.0 te downloaden vanaf de website: [https://nodejs.org/en/](https://nodejs.org/en/).

Check na de installatie of Node.js correct geïnstalleerd is door volgend commando uit te voeren:

```bash
$ node --version
v20.6.0
```

```code
Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ node --version
v20.17.0
```

## Yarn

Installeer **yarn** als alternatieve package manager voor **npm**:

```code
Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ npm --version
10.8.2
```

```code
npm install -g yarn
```

```code
Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ npm list -g
C:\Users\Benny\AppData\Roaming\npm
├── pnpm@9.11.0
└── yarn@1.22.22

Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ yarn --version
1.22.22
```

`Volgens sommige online bronnen lukt onderstaande ook zonder eerst yarn via npm te installeren ...`

Schakel vervolgens [Corepack](https://nodejs.org/api/corepack.html) in:

```code
# Administrator rechten zijn nodig op Windows!
corepack enable
```

`Bovenstaande lukte niet als gewone user in een gewoon venster.`

```code
Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ corepack enable
Internal Error: EPERM: operation not permitted, open 'C:\Program Files\nodejs\yarn'
Error: EPERM: operation not permitted, open 'C:\Program Files\nodejs\yarn'
```

`Als admin EN in git bash wel.`

```code
Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-cursus (main)
$ corepack enable
```

Corepack is een package manager die de installatie van **yarn** en andere packages versnelt. Het kan automatisch de versie van **yarn** installeren die in het **package.json**-bestand staat. Wij werken met Yarn v4, Corepack is dus een vereiste.

Test of **yarn** correct geïnstalleerd is en kan gebruikt worden:

```code
yarn --version
```

Dit zou een versienummer moeten opleveren.

Windows-gebruikers kunnen een fout krijgen bij het uitvoeren van dit commando. De fout is in de vorm van **yarn.ps1 cannot be loaded because running scripts is disabled on this system**. Indien dit het geval is, open een PowerShell terminal in Administrator modus. Voer vervolgens het volgende commando uit en antwoord met **A** op de vraag:

```code
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

`Bovenstaande niet van toepassing wegens reeds ok via andere OLOD's. Bovendien gebruik ik yarn via git bash. Corepack zorgt ervoor dat de correcte versie van yarn wordt gebruikt indien meegegeven via de package.json zoals te zien in deze andere directory`

```code
Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-budget-2425 (main)
$ cat package.json | grep "yarn"
  "packageManager": "yarn@4.5.0",

Benny@FLAB2021 MINGW64 /C/DATA/GIT/WEBSERVICES/webservices-budget-2425 (main)
$ yarn --version
4.5.0
```

## MySQL

Installeer MySQL via een package manager:

- Windows: **winget install -e --id Oracle.MySQL**
- macOS: **brew install mysql**
- Linux: [distro afhankelijk](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/linux-installation.html)

> 🛈 Natuurlijk kan je ook MySQL draaien in een Docker container.

`Ik heb voor bovenstaande optie gekozen via een docker compose setup: /C/DATA/GIT/DOCKER/mysql/compose.yml`

## MySQL Workbench

Installeer MySQL Workbench via een package manager of download het van de website:

- Windows: [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/)
- macOS: **brew install --cask mysqlworkbench**
- Linux: [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/)

> 🛈 Je bent vrij om een andere tool te gebruiken om met MySQL te werken.

`In de Docker Compose oplossing voor MySQL is ook een client voorzien op localhost:8080`

## Visual Studio Code

Installeer Visual Studio Code via een package manager:

- Windows: winget install -e --id Microsoft.VisualStudioCode
- macOS: brew install --cask visual-studio-code
- Linux: [distro afhankelijk](https://code.visualstudio.com/docs/setup/linux)

Of kies voor een manuele installatie door de laatste versie te downloaden vanaf de website: [https://code.visualstudio.com/download](https://code.visualstudio.com/download).

### Visual Studio Code: plugins

Een aantal **verplichte** plugins voor VS Code:

- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) ✅
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) ✅
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) ✅
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) ✅

Een aantal optionele, maar toch handige plugins:

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) ✅
- [Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame) ✅
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) ✅
- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) ✅
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) ✅
- [vscode-twoslash-queries](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-twoslash-queries) ✅

#### Configuratie VS Code

Voeg onderstaande configuratie toe aan de instellingen van Visual Studio Code. De eenvoudigste manier is om dit via de JSON-interface te doen:

- Open de zoekfunctie via de toets **F1**
- Zoek op "settings" en kies voor **Preferences: Open User Settings (JSON)**
- Kopieer onderstaande JSON-code en voeg toe aan het JSON-bestand dat geopend werd. Zorg ervoor dat je een geldig JSON-object maakt!

> Merk op: de laatste setting schakelt de "Trusted workspaces" uit. Indien je dit niet wenst, verwijder deze setting.

```code
{
  "editor.codeActionsOnSave": {
    "source.fixAll": "always"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "editor.linkedEditing": true,
  "errorLens.delay": 500,
  "errorLens.enabledDiagnosticLevels": ["error", "warning", "info"],
  "errorLens.messageTemplate": "$severity $message $count ($source - $code)",
  "errorLens.severityText": ["❗️ ", "⚠️ ", "ℹ️ ", "💡 "],
  "editor.guides.bracketPairs": "active",
  "editor.bracketPairColorization.enabled": true,
  "security.workspace.trust.enabled": false
}
```

`In plaats van User Settings nu Workspace settings genomen maar dan zonder de laatste regel`

Een thema kan je uiteraard zelf kiezen, maar [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) is wel een overzichtelijk thema.

`'"workbench.colorTheme": "One Dark Pro",' toegevoegd in de settings van daarnet`

### Fira Code lettertype

Fira Code is een gratis monospace lettertype met speciale karakters voor developers. Uiteraard is de keuze aan jou om dit te installeren.

Installeer het lettertype via een package manager:

- Windows: **choco install firacode**
  - Winget is nog niet beschikbaar voor Fira Code, manuele installatie is ook mogelijk: <https://github.com/tonsky/FiraCode/wiki/Installing#windows>
- macOS: **brew install firacode**
- Linux: [distro afhankelijk](https://github.com/tonsky/FiraCode/wiki/Linux-instructions#installing-with-a-package-manager)

Of volg de instructies op de [GitHub van Fira Code](https://github.com/tonsky/FiraCode/wiki/Installing).

Voeg nadien volgende JSON-configuratie toe aan de settings van VS Code (zie hierboven hoe je daar komt):

```code
{
  "editor.fontFamily": "'Fira Code', Menlo, Monaco, 'Courier New', monospace",
  "editor.fontSize": 16,
  "editor.fontLigatures": true,
  "editor.tabSize": 2
}
```

`Toegevoegd aan de workspace settings`

## Postman

Installeer Postman via een package manager:

- Windows: winget install -e --id Postman.Postman
- macOS: brew install --cask postman
- Linux: [distro afhankelijk](https://www.postman.com/downloads/)

Open Postman en maak een account aan. Je kan er natuurlijk ook voor kiezen om eenvoudigweg met Google aan te melden.

Laatste aanpassing op 09/12/2024 14:16
