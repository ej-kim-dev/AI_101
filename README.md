# AI-101: Work with AI like you work with a teacher

A short, bilingual (English / 한국어) presentation website for beginners. It explains how to use AI tools through familiar metaphors, with Claude as the main example.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no sign-in, no backend.

## The switches

The **language switch** (English ↔ 한국어) sits at the top right. The School ↔ Company switch sits next to it when it's turned on (see above).

- Each switch changes only its own setting. The other one stays as it is.
- Content stays in the same order in every version, so it's easy to compare them.
- The page language (`<html lang>`) and title update with the switch.
- The switches have no visible label, since the options speak for themselves. Screen readers still announce "Language" and "Comparison".
- Keyboard: press **Tab** to reach a switch, then use the **arrow keys** to change it.
- To open a specific version, add it to the link, for example `index.html?lang=ko`.

## Design

The look follows apple.com: black, white and greys, big left-aligned headings, full-width bands that alternate white and light grey, borderless rounded cards, and a black band for the main takeaway. Dark mode is supported. The opening has a row of icons with labels, like apple.com's product pages, for jumping to any section.

Icons come from [Lucide](https://lucide.dev), an open-source icon set (ISC license). Apple's own SF Symbols can't be used on other websites. The icons are copied into `js/icons.js`, so the site has no outside dependencies.

## Pictures and the example

The whole page uses one example: a high-school teacher making a slide that introduces **IB Computer Science SL**, using the IB Computer Science guide.

- **Opening picture:** a chat where the teacher attaches the IB guide, asks for one slide, gets it back, and gives feedback.
- **"Chat vs. project" picture:** the same task done two ways. With a project, the guide is saved once and every chat can use it. With normal chats, each new chat needs the guide attached again.

The pictures are drawn with HTML and CSS (`chatPicture` and `scenarioPicture` in `js/main.js`), not image files. They switch language, follow dark mode and animate in. They show a generic chat app with the AI-101 spark, not Claude's real screen. Screen readers get a single description of each picture. Their words are in `js/content.js` (`opening.picture` and `distinction.scenarios`).

The Connector cards explain that connecting Google Slides or Canva lets Claude make slides in that app, and connecting Google Drive lets it look through your folders, checked against the official help pages in October 2026.

## Sharing the link

When the link is shared in KakaoTalk, Slack, iMessage, email or social media, it shows a preview card with the title, a one-line description and the image `assets/og-image.png`. The card comes from the `og:` tags at the top of `index.html`. If the repository or its address changes, update the `og:url` and `og:image` addresses there.

## Navigating the page

The page is one continuous scroll, with each section filling one screen. It was checked at 1280×800, 1366×768, 1440×900, 1536×864 and 1920×1080.

- **Section menu** in the top bar: click a section to glide down to it. An underline slides to the section you're reading. On phones, this is a single button that opens the list.
- **Scroll animations**: each section rises in as it scrolls into view, and cards and steps appear one after another. Key phrases turn from grey to black. In browsers that support scroll-linked animation, the opening also shrinks and fades as you scroll past it.
- **Phones**: the header slides away while you scroll down and comes back when you scroll up.
- **Links to a section**: for example `index.html?lang=ko#example`.
- **Reduced motion**: if the viewer's device asks for reduced motion, everything simply appears without movement.

Key phrases are written as `==like this==` in `js/content.js`. They appear bold and darken as the section comes into view.

A **RICE** section (before the example) teaches the four parts of a clear prompt, each with a piece of the IB example. The example's clear request then follows **RICE**, the prompt format EJ recommends: **R**ole, **I**nstruction, **C**ontext, **E**xample. Each part is marked with its letter, and the list under it explains the four parts. The **Copy prompt** button copies the whole request, so people can paste it into Claude and try it.

The page ends with **Try it yourself**: three steps (copy the example, open Claude, give feedback), with a copy button and a link that opens Claude in a new tab.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | The page shell and the two switches |
| `js/content.js` | **All the words**, in English and Korean. Edit the text here. |
| `js/main.js` | Builds the sections from the content and runs the switches |
| `js/icons.js` | The icons (Lucide) |
| `assets/og-image.png` | The picture shown in link previews |
| `js/nav.js` | Section menu, scroll tracking and scroll animations |
| `css/styles.css` | Colours (light and dark), layout, motion and accessibility rules |

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
