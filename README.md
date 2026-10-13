# AI 101: Give AI a clear assignment

A short, bilingual (English / 한국어) presentation website for beginners. It explains how to use AI tools through familiar metaphors, with Claude as the main example.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no sign-in, no backend.

## Preview it

From the repository folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

You can also open `index.html` directly in a browser.

## The two sliders

At the top of the page there are two switches with two positions each:

| Slider | Left | Right | Default |
| --- | --- | --- | --- |
| Comparison | School (AI as a teacher) | Company (AI as an employee) | School |
| Language | English | 한국어 | English |

- Each switch changes only its own setting. The other one stays as it is.
- Content stays in the same order in every version, so it's easy to compare them.
- The page language (`<html lang>`), title and colour theme update with the switches.
- Keyboard: press **Tab** to reach a switch, then use the **arrow keys** to change it.
- Each switch is a pair of radio buttons, so screen readers announce the label and which option is selected.
- To open a specific version, add it to the link, for example `index.html?view=company&lang=ko`.

## Moving through the presentation

| Control | What it does |
| --- | --- |
| **‹ ›** buttons in the bottom dock | Previous / next section |
| **3 / 8 · section name** in the dock | Opens the numbered contents list |
| Numbered dots on the left (wide screens) | Jump to any section; hover to see its name |
| **Present** | One section at a time, full screen when the browser allows |
| **← →** keys | Previous / next section (also **PageUp / PageDown**, so presentation clickers work) |
| **Home / End** (present mode) | First / last section |
| **Esc** | Leave present mode |
| Swipe left / right (phones, present mode) | Previous / next section |

The thin bar under the sliders shows how far through you are. Links can point to a section, for example `index.html?lang=ko#example`.

Key phrases are written as `==like this==` in `js/content.js`. They appear bold with a marker highlight that draws in when the section comes into view. If the viewer's device asks for reduced motion, the page skips the movement and simply shows everything.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | The page shell and the two switches |
| `js/content.js` | **All the words**, in English and Korean. Edit the text here. |
| `js/main.js` | Builds the slides from the content, draws the icons and runs the switches |
| `js/present.js` | Contents list, previous/next, present mode, keyboard and swipe, motion |
| `css/styles.css` | Colours for each theme (school and company, light and dark), layout and accessibility rules |

In `js/content.js`, a value written as `{ school: "...", company: "..." }` changes with the Comparison switch. Any other value is the same in both versions.

## Publish with GitHub Pages

1. Push this repository to GitHub.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the branch (for example `main`) and the **/ (root)** folder, then click **Save**.
5. After a minute or two, the site is live at `https://<your-username>.github.io/<repository-name>/`.

All paths are relative, so the site works under the `/<repository-name>/` subpath. The `.nojekyll` file tells GitHub Pages to serve the files as they are.

## Accuracy

Claude feature details are in the **Learn more** section at the bottom of the page, with links to the official help pages. They were checked in October 2026. Features change, so check them again before relying on specific details.
