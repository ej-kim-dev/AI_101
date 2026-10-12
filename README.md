# AI 101

A small static website that explains AI utilization through a scenario.
Plain HTML, CSS and JavaScript — no build step.

## Run it

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure: nav, hero, scenario, steps, interactive demo, takeaways |
| `css/styles.css` | Design tokens, typography, components, accessibility rules |
| `js/main.js` | Your scenario content (`STEPS`), scroll reveal, draggable spring demo |

## Customising

1. Edit the text in `index.html` (hero, scenario, takeaways).
2. Edit the `STEPS` array at the top of `js/main.js` — the cards render from it.
3. Change colours in the `:root` block of `css/styles.css`.

Design principles follow the `apple-design` skill: instant feedback, interruptible motion,
translucent materials, size-aware typography, and reduced-motion support.
