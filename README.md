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



options popup:
functions:
    - enable run pages links scan without mouse hovering,
    - enable listen to anchors appearance dynamicaly,
    - enable link scan only by mouse hovering,
    - enable cache analyzed links, 
    - set maximize/minimize popup state,
    - enable alarm messages in case of threats.

mininized popup:
    - shows animated logo when user hover any linked element and analyze it with the security link agent if not analyzed yet or get it`s cached description.
    - shows colored indicator aside the mouse-cursor to show the security level of the link.

maximized popup:
    - shows info hover card with link analysis result.
    - throught the page serfing with the mouse or keyboard focusing see links and analyze them with the security link agent.

content script:
    - injects into every page/iframe/document-fragment if setting was enabled.
