# sokol-security-link
Security Link agent helper was designed in memoriam of my teacher => `SOKOL`

## Installation

```bash
npm install
```

## Usage

```bash
npm run build
```

teckStack:
    - typescript
    - chromium API
    - tailwindcss
    - ReactJS
    - Vite

options popup:
available options:
    - enable/disable run pages links scan without mouse hovering,
    - enable/disable listen to anchors appearance dynamicaly,
    - enable/disable link scan only by mouse hovering,
    - enable/disable cache analyzed links, 
    - enable/disable alarm messages in case of threats.
    - enable/disable intercept/analize/allow/disallow redirections from the page (in case of any background process).
    - set maximize/minimize popup state,

mininized popup:
    - shows animated logo when user hover any linked element and analyze it with the security link agent if not analyzed yet or get it`s cached description.
    - shows colored indicator aside the mouse-cursor to show the security level of the link.

maximized popup:
    - shows info hover card with link analysis result.
    - throught the page serfing with the mouse or keyboard focusing see links and analyze them with the security link agent.

content script:
    - injects into every page/iframe/document-fragment if setting was enabled.
