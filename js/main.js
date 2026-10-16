/* =========================================================
   Draws the presentation from CONTENT (js/content.js).

   1. State      — which version and language are selected
   2. Helpers    — pick the right variant, escape text
   3. Drawings   — small line icons (inline SVG)
   4. Sections   — one function per part of the presentation
   5. Controls   — the two sliders

   The section menu, scroll tracking and scroll animations
   live in js/nav.js.
   ========================================================= */

/* ---------- 1. Settings and state ---------- */

// The Company version is switched off for now: everyone sees School.
// Change this to true to bring back the School ↔ Company switch.
// (All the Company text is still in js/content.js.)
const SHOW_COMPANY = false;

// Defaults: School + English. A link like ?lang=ko opens the Korean
// version (and ?view=company the Company one, when it's switched on).
const params = new URLSearchParams(location.search);
const state = {
  view: SHOW_COMPANY && params.get("view") === "company" ? "company" : "school",
  lang: params.get("lang") === "ko" ? "ko" : "en",
};

// Hide the Comparison switch while the Company version is off.
document.getElementById("view-school").closest(".toggle").hidden = !SHOW_COMPANY;

/* ---------- 2. Helpers ---------- */

// A value may be { school, company } — return the one for the current view.
const pick = (value) =>
  value && typeof value === "object" && "school" in value ? value[state.view] : value;

// Make text safe to put inside HTML.
const esc = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Like esc, but ==key phrases== become highlighted <strong> text.
const rich = (text) => esc(text).replace(/==(.+?)==/g, '<strong class="hl">$1</strong>');

// The order of the sections. nav.js uses the same list.
const SECTION_IDS = ["opening", "concepts", "distinction", "guide", "rice", "example", "context", "takeaway", "try", "more"];


/* ---------- 3. Icons ----------
   The drawings come from js/icons.js (the Lucide icon set).
   They are decorative (aria-hidden): the text beside them says the same thing. */
const icon = (name, cls = "icon") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[pick(name)] || ""}</svg>`;

// The AI-101 spark, used as the AI's avatar in the chat pictures.
const SPARK = `<svg class="pic__spark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M18.10 16.00L16.00 3.80L13.90 16.00ZM17.20 17.20L21.80 10.20L14.80 14.80ZM16.00 18.10L28.20 16.00L16.00 13.90ZM14.80 17.20L21.80 21.80L17.20 14.80ZM13.90 16.00L16.00 28.20L18.10 16.00ZM14.80 14.80L10.20 21.80L17.20 17.20ZM16.00 13.90L3.80 16.00L16.00 18.10ZM17.20 14.80L10.20 10.20L14.80 17.20Z" fill="currentColor" stroke="currentColor" stroke-width="0.9" stroke-linejoin="round"/><circle cx="16" cy="16" r="2.4" fill="currentColor"/></svg>`;

/* ---------- Pictures ----------
   The chat "screenshots" are drawn with HTML, so they stay sharp, follow the
   language switch and dark mode, and can animate. They are a generic chat app,
   not a copy of Claude's real screen. Screen readers get one description
   (role="img" + aria-label) instead of reading every bubble. */
const picBar = (title) =>
  `<div class="pic__bar"><span class="pic__dots"><i></i><i></i><i></i></span><span class="pic__title">${esc(title)}</span></div>`;
const picFile = (name) => `<span class="pic__file">${icon("file", "pic__icon")}${esc(name)}</span>`;
const picInput = (text) =>
  `<div class="pic__input"><span>${esc(text)}</span><span class="pic__send">${icon("arrow-up", "pic__icon")}</span></div>`;

// Picture A: the teacher attaches the IB guide and asks for one slide.
function chatPicture(p) {
  const points = p.slidePoints.map((x) => `<li>${esc(x)}</li>`).join("");
  return `
    <figure class="pic pic--chat" role="img" aria-label="${esc(p.label)}">
      ${picBar(p.window)}
      <div class="pic__body stagger">
        <div class="pic__me"><div class="pic__files">${picFile(p.file)}</div><p class="pic__bubble">${esc(p.ask)}</p></div>
        <div class="pic__ai"><span class="pic__avatar">${SPARK}</span>
          <div class="pic__reply"><p>${esc(p.reply)}</p>
            <div class="pic__slide"><p class="pic__slide-title">${esc(p.slideTitle)}</p><ul>${points}</ul></div>
          </div>
        </div>
        <div class="pic__me"><p class="pic__bubble">${esc(p.feedback)}</p></div>
      </div>
      ${picInput(p.input)}
    </figure>`;
}

// Picture B: the same IB task with a project, and with normal chats.
function scenarioPicture(s) {
  const p = s.project, n = s.normal;
  return `
    <figure class="scen" role="img" aria-label="${esc(s.label)}">
      <div class="scen__col">
        <p class="scen__head">${icon("classroom", "pic__icon pic__icon--big")}${esc(p.title)}</p>
        <p class="scen__sub">${esc(p.sub)}</p>
        <div class="pic pic--project">
          ${picBar(p.window)}
          <div class="pic__split">
            <div class="pic__side">
              <p class="pic__group">${esc(p.files)}</p><p class="pic__row is-key">${icon("file", "pic__icon")}<span>${esc(s.file)}</span></p>
              <p class="pic__group">${esc(p.instructions)}</p><p class="pic__note">${esc(p.instructionsText)}</p>
              <p class="pic__group">${esc(p.chats)}</p>
              <p class="pic__row is-key">${icon("chat", "pic__icon")}<span>${esc(p.chat1)}</span><span class="pic__tag">${esc(p.now)}</span></p>
              <p class="pic__row">${icon("chat", "pic__icon")}<span>${esc(p.chat2)}</span></p>
            </div>
            <div class="pic__body stagger">
              <div class="pic__me"><p class="pic__bubble">${esc(p.ask)}</p></div>
              <p class="pic__hint">${icon("check", "pic__icon")}${esc(p.hint)}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="scen__col">
        <p class="scen__head">${icon("chat", "pic__icon pic__icon--big")}${esc(n.title)}</p>
        <p class="scen__sub">${esc(n.sub)}</p>
        <div class="pic">
          ${picBar(n.window1)}
          <div class="pic__body"><div class="pic__me"><div class="pic__files">${picFile(s.file)}</div><p class="pic__bubble">${esc(n.ask1)}</p></div></div>
        </div>
        <div class="pic">
          ${picBar(n.window2)}
          <div class="pic__body stagger">
            <div class="pic__me"><div class="pic__files">${picFile(s.file)}</div><p class="pic__bubble">${esc(n.ask2)}</p></div>
            <p class="pic__hint">${icon("again", "pic__icon")}${esc(n.hint)}</p>
          </div>
        </div>
      </div>
    </figure>`;
}

// Icons for the row of sections in the opening (same order as SECTION_IDS).
const SECTION_ICONS = ["s-start", "s-ideas", "s-compare", "s-choose", "s-rice", "s-example", "s-context", "s-takeaway", "s-try", "s-more"];

// Section wrapper: every part of the presentation is a card with a heading.
const section = (id, eyebrow, title, inner, extraClass = "") => `
  <section class="slide ${extraClass}" id="${id}" aria-labelledby="${id}-title" tabindex="-1">
    <p class="eyebrow">${esc(eyebrow)}</p>
    ${title ? `<h2 class="slide__title" id="${id}-title">${esc(title)}</h2>` : ""}
    ${inner}
  </section>`;

/* ---------- 4. Sections ---------- */

// 1. Opening — big title, a row of section icons (like apple.com), then the idea
function opening(c, nav) {
  const chapters = nav.sections.map((name, i) => `
    <li><a href="#${SECTION_IDS[i]}" data-index="${i}">${icon(SECTION_ICONS[i], "chapters__icon")}<span>${esc(name)}</span></a></li>`).join("");
  return `
  <section class="slide slide--hero" id="opening" aria-labelledby="opening-title" tabindex="-1">
    <p class="eyebrow">${esc(c.eyebrow)}</p>
    <h1 class="hero__title" id="opening-title">${esc(c.title)}</h1>
    ${chatPicture(c.picture)}
    <nav class="chapters" aria-label="${esc(nav.jump)}"><ol class="stagger">${chapters}</ol></nav>
    <div class="hero__body">
      <div>
        <p class="lead">${rich(c.body)}</p>
        <p class="tool-note">${esc(c.toolNote)}</p>
      </div>
      <div class="metaphor">
        ${icon(c.icon, "icon icon--xl")}
        <div>
          <p class="metaphor__text">${esc(pick(c.metaphor))}</p>
          <p class="metaphor__note">${esc(c.metaphorNote)}</p>
        </div>
      </div>
    </div>
  </section>`;
}

// 2. Main concepts — a numbered sequence of cards
function concepts(c) {
  // The first card ("Chat") spans two columns, so seven cards fill the grid evenly.
  const cards = c.items.map((item, i) => `
    <li class="card${i === 0 ? " card--wide" : ""}">
      <div class="card__top">
        ${icon(item.icon)}
        <span class="card__num" aria-hidden="true">${i + 1}</span>
      </div>
      <h3 class="card__title">
        <span class="card__term">${esc(item.term)}<span class="sr-only">:</span></span>
        ${esc(pick(item.title))}
      </h3>
      <p class="card__body">${rich(pick(item.body))}</p>
      ${item.note ? `<p class="card__note">${rich(item.note)}</p>` : ""}
    </li>`).join("");
  return section("concepts", c.eyebrow, c.title, `<ol class="cards stagger">${cards}</ol>`);
}

// 3. Chat vs. project — picture B: the same IB task with a project, and with normal chats
function distinction(c) {
  return section("distinction", c.eyebrow, c.title, `
    ${scenarioPicture(c.scenarios)}
    <p class="scen__caption">${rich(c.caption)}</p>
    <p class="note">${esc(c.note)}</p>`);
}

// 4. "What should I use?" guide
function guide(c) {
  const options = c.options.map((o) => `
    <li class="option">
      ${icon(o.icon)}
      <h3 class="option__name">${esc(o.name)}</h3>
      <p class="option__when"><span class="label">${esc(c.useWhen)}</span>${esc(o.when)}</p>
      <p class="option__like"><span class="label">${esc(c.likeLabel)}</span>${esc(pick(o.like))}</p>
    </li>`).join("");
  return section("guide", c.eyebrow, c.title, `
    <ul class="options stagger">${options}</ul>
    <p class="note note--plain">${rich(c.together)}</p>`);
}

// One highlighted ingredient. The number badge is kept on the same line
// as the first word, so it never ends up alone at the end of a line.
function ingredient(part, c) {
  const space = part.text.indexOf(" ");
  const first = space === -1 ? part.text : part.text.slice(0, space);
  const rest = space === -1 ? "" : part.text.slice(space);
  const g = c.ingredients[part.n - 1];        // the RICE part: R, I, C or E
  const hint = `(${g.key}: ${g.name})`;
  return `<mark class="ing"><span class="ing__lead"><span class="ing__badge" aria-hidden="true">${g.key}</span><span class="sr-only">${esc(hint)}</span>${esc(first)}</span>${esc(rest)}</mark>`;
}

// 5. RICE — the four parts of a clear prompt, each with a piece of the IB example
function rice(c) {
  const cards = c.parts.map((p) => `
    <li class="rice__card">
      <span class="rice__key" aria-hidden="true">${esc(p.key)}</span>
      <h3 class="rice__name"><span class="sr-only">${esc(p.key)}: </span>${esc(p.name)}</h3>
      <p class="rice__what">${esc(p.what)}</p>
      <p class="rice__example"><span class="label">${esc(c.exampleLabel)}</span>${esc(p.example)}</p>
    </li>`).join("");
  return section("rice", c.eyebrow, c.title, `
    <p class="lead lead--left">${rich(c.body)}</p>
    <ol class="rice stagger">${cards}</ol>
    <p class="tool-note">${esc(c.note)}</p>`);
}

// 6. Practical example — before/after, the four RICE parts, tiny sample slide
function example(c) {
  const clear = c.clear.map((part) =>
    typeof part === "string"
      ? esc(part)
      : ingredient(part, c)
  ).join("");

  const list = c.ingredients.map((g, i) => `
    <li><span class="ing__badge" aria-hidden="true">${g.key}</span><span><strong>${esc(g.name)}</strong> — ${esc(g.detail)}</span></li>`).join("");

  const bullets = c.slideBullets.map((b) => `<li>${esc(b)}</li>`).join("");

  // Two balanced rows on large screens: unclear | clear on top,
  // the five parts | the sample slide below. Fits on one screen.
  return section("example", c.eyebrow, c.title, `
    <div class="example-grid">
      <div class="compare">
        <div class="request request--vague">
          <p class="request__label"><span class="request__mark" aria-hidden="true">✕</span>${esc(c.vagueLabel)}</p>
          <p class="request__text">“${esc(c.vague)}”</p>
        </div>
        <div class="request request--clear">
          <div class="request__head">
            <p class="request__label"><span class="request__mark" aria-hidden="true">✓</span>${esc(c.clearLabel)}</p>
            <button class="copy" type="button" data-copy>${icon("copy", "copy__icon")}<span class="copy__text">${esc(c.copy)}</span></button>
          </div>
          <p class="request__text">${clear}</p>
        </div>
      </div>

      <div class="example-parts">
        <h3 class="subhead">${esc(c.ingredientsTitle)}</h3>
        <ol class="ingredients stagger">${list}</ol>
      </div>

      <div class="sample">
          <div class="sample__text">
            <p class="sample__metaphor">${esc(pick(c.sampleMetaphor))}</p>
            <p class="sample__why">${esc(c.sampleWhy)}</p>
          </div>
          <figure class="slidemock" aria-label="${esc(c.slideLabel)}">
            <span class="slidemock__tag">${esc(c.slideTag)}</span>
            <div class="slidemock__page">
              <p class="slidemock__title">${esc(c.slideTitle)}</p>
              <ul class="slidemock__bullets">${bullets}</ul>
            </div>
            <figcaption class="slidemock__caption">${esc(c.slideCaption)}</figcaption>
          </figure>
      </div>
    </div>`);
}

// 6. Choose useful context
function context(c) {
  const checks = c.checks.map((x) => `<li><span aria-hidden="true">✓</span>${esc(x)}</li>`).join("");
  return section("context", c.eyebrow, c.title, `
    <p class="lead lead--left">${rich(c.body)}</p>
    <ul class="checks stagger">${checks}</ul>
    <div class="metaphor metaphor--small">
      ${icon(c.icon, "icon icon--lg")}
      <p class="metaphor__text">${esc(pick(c.metaphor))}</p>
    </div>`);
}

// 7. Main takeaway
function takeaway(c) {
  const steps = c.steps.map((s, i) => `
    <li class="flow__step"><span class="flow__num" aria-hidden="true">${i + 1}</span><span class="flow__text">${esc(s)}</span>${i < c.steps.length - 1 ? '<span class="flow__arrow" aria-hidden="true">→</span>' : ""}</li>`).join("");
  return `
  <section class="slide slide--takeaway" id="takeaway" aria-labelledby="takeaway-title" tabindex="-1">
    <p class="eyebrow">${esc(c.eyebrow)}</p>
    <h2 class="sr-only" id="takeaway-title">${esc(c.eyebrow)}</h2>
    <ol class="flow stagger">${steps}</ol>
    <p class="lead lead--left">${rich(c.body)}</p>
    <div class="examples">
      <div class="example-box"><p class="label">${esc(c.followLabel)}</p><p>${esc(c.follow)}</p></div>
      <div class="example-box"><p class="label">${esc(c.reviewLabel)}</p><p>${esc(c.review)}</p></div>
    </div>
  </section>`;
}

// 8. Try it yourself — the closing step: copy the example, open Claude, give feedback
function tryIt(c, newTab) {
  return section("try", c.eyebrow, c.title, `
    <p class="lead lead--left">${rich(c.body)}</p>
    <ol class="try stagger">
      <li class="try__step">
        <span class="try__num" aria-hidden="true">1</span>
        <h3 class="try__title">${esc(c.copyTitle)}</h3>
        <p class="try__text">${esc(c.copyText)}</p>
        <button class="copy copy--big" type="button" data-copy>${icon("copy", "copy__icon")}<span class="copy__text">${esc(c.copyButton)}</span></button>
      </li>
      <li class="try__step">
        <span class="try__num" aria-hidden="true">2</span>
        <h3 class="try__title">${esc(c.openTitle)}</h3>
        <p class="try__text">${esc(c.openText)}</p>
        <a class="try__link" href="https://claude.ai/new" target="_blank" rel="noopener noreferrer">${esc(c.openButton)}<span class="sr-only"> ${esc(newTab)}</span><span aria-hidden="true"> ↗</span></a>
      </li>
      <li class="try__step">
        <span class="try__num" aria-hidden="true">3</span>
        <h3 class="try__title">${esc(c.feedbackTitle)}</h3>
        <p class="try__text">${esc(c.feedbackText)}</p>
        <p class="try__quote">${esc(c.feedbackExample)}</p>
      </li>
    </ol>
    <p class="tool-note">${esc(c.note)}</p>`);
}

// 9. Learn more — native <details>, so it works with keyboard and screen readers
function more(c, wasOpen) {
  const notes = c.notes.map((n) => `<li>${esc(n)}</li>`).join("");
  const sources = c.sources.map((s) => `
    <li>
      <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" lang="en">${esc(s.title)}<span class="sr-only"> ${esc(c.newTab)}</span><span aria-hidden="true"> ↗</span></a>
      <span class="source__why">${esc(s.why)}</span>
    </li>`).join("");
  return `
  <section class="slide slide--more" id="more" aria-label="${esc(c.summary)}" tabindex="-1">
    <details class="more" ${wasOpen ? "open" : ""}>
      <summary><span class="more__title">${esc(c.summary)}</span><span class="more__hint">${esc(c.hint)}</span><span class="more__chev" aria-hidden="true"></span></summary>
      <div class="more__body">
        <h3 class="subhead">${esc(c.notesTitle)}</h3>
        <ul class="notes">${notes}</ul>
        <h3 class="subhead">${esc(c.sourcesTitle)}</h3>
        <p class="sources__intro">${esc(c.sourcesIntro)}</p>
        <ul class="sources">${sources}</ul>
      </div>
    </details>
  </section>`;
}

/* ---------- Draw everything ---------- */
const app = document.getElementById("app");

function render({ announce = false } = {}) {
  const c = CONTENT[state.lang];

  // Page-level settings
  document.documentElement.lang = state.lang;
  document.documentElement.dataset.view = state.view;
  document.title = c.ui.docTitle;
  document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = c.ui[el.dataset.t]; });

  // Keep "Learn more" open if it was open before the switch
  const wasOpen = app.querySelector("details.more")?.open ?? false;

  app.innerHTML =
    opening(c.opening, c.ui.nav) +
    concepts(c.concepts) +
    distinction(c.distinction) +
    guide(c.guide) +
    rice(c.rice) +
    example(c.example) +
    context(c.context) +
    takeaway(c.takeaway) +
    tryIt(c.tryIt, c.more.newTab) +
    more(c.more, wasOpen);

  syncControls();
  Nav.afterRender();   // rebuild the section menu and scroll animations (js/nav.js)
  if (announce) document.getElementById("status").textContent = c.ui.status[state.view];
}

/* ---------- "Copy prompt" button ----------
   Copies the clear request from the example, so people can paste it
   straight into Claude and try it. */

// The example request as plain text, in the current language.
const promptText = () =>
  CONTENT[state.lang].example.clear.map((part) => (typeof part === "string" ? part : part.text)).join("");

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers, or pages opened straight from a file: copy through a hidden text box.
    const box = Object.assign(document.createElement("textarea"), { value: text });
    box.setAttribute("readonly", "");
    box.style.cssText = "position:fixed;opacity:0";
    document.body.append(box);
    box.select();
    const ok = document.execCommand("copy");
    box.remove();
    return ok;
  }
}

app.addEventListener("click", async (e) => {
  const button = e.target.closest("[data-copy]");
  if (!button) return;
  const c = CONTENT[state.lang].example;
  const ok = await copyText(promptText());
  const status = document.getElementById("status");
  status.textContent = "";                              // so the same message is read again
  status.textContent = ok ? c.copiedNote : c.copyFailed;
  if (!ok) return;
  // Show "Copied" with a check mark for two seconds, then go back.
  button.classList.add("is-done");
  const label = button.querySelector(".copy__text");
  button.dataset.label ??= label.textContent;          // remember this button's own label
  label.textContent = c.copied;
  button.querySelector("svg").innerHTML = ICONS.check;
  clearTimeout(button.resetTimer);
  button.resetTimer = setTimeout(() => {
    button.classList.remove("is-done");
    label.textContent = button.dataset.label;
    button.querySelector("svg").innerHTML = ICONS.copy;
  }, 2000);
});

/* ---------- 5. Controls ---------- */
function syncControls() {
  document.querySelectorAll(".toggle").forEach((group) => {
    const inputs = [...group.querySelectorAll("input")];
    inputs.forEach((input) => { input.checked = state[input.name] === input.value; });
    // data-pos moves the sliding thumb (0 = left, 1 = right)
    group.querySelector(".toggle__track").dataset.pos = inputs.findIndex((i) => i.checked);
  });
}

document.querySelectorAll(".toggle input").forEach((input) => {
  input.addEventListener("change", () => {
    state[input.name] = input.value;   // only this setting changes; the other is kept
    const url = new URL(location.href);
    if (SHOW_COMPANY) url.searchParams.set("view", state.view);
    else url.searchParams.delete("view");
    url.searchParams.set("lang", state.lang);
    history.replaceState(null, "", url);
    render({ announce: true });
  });
});

render();
