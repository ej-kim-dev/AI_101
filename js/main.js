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
const SECTION_IDS = ["opening", "concepts", "distinction", "guide", "example", "context", "takeaway", "more"];


/* ---------- 3. Icons ----------
   The drawings come from js/icons.js (the Lucide icon set).
   They are decorative (aria-hidden): the text beside them says the same thing. */
const icon = (name, cls = "icon") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[pick(name)] || ""}</svg>`;

// Icons for the row of sections in the opening (same order as SECTION_IDS).
const SECTION_ICONS = ["s-start", "s-ideas", "s-compare", "s-choose", "s-example", "s-context", "s-takeaway", "s-more"];

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
  const cards = c.items.map((item, i) => `
    <li class="card">
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

// 3. Chat vs. project — a small diagram made of HTML (so the text translates)
function distinction(c) {
  const shared = pick(c.sharedItems).map((s) => `
    <li class="diagram__item">${icon(s.icon)}<span><strong>${esc(s.label)}</strong><small>${esc(s.sub)}</small></span></li>`).join("");
  const chats = pick(c.chats).map((ch) => `
    <li class="chatcard ${ch.current ? "is-current" : ""}">
      ${icon(c.person)}
      <span>
        ${ch.current ? `<span class="tag">${esc(c.currentTag)}</span>` : ""}
        <strong>${esc(ch.label)}</strong>
        <small>${esc(ch.sub)}</small>
      </span>
    </li>`).join("");

  return section("distinction", c.eyebrow, c.title, `
    <figure class="diagram">
      <div class="diagram__shared">
        <p class="diagram__heading">${esc(pick(c.sharedTitle))}</p>
        <ul class="diagram__list stagger">${shared}</ul>
      </div>
      <p class="diagram__flow"><span class="diagram__arrow" aria-hidden="true"></span>${esc(c.flow)}</p>
      <div class="diagram__chats">
        <p class="diagram__heading">${esc(c.chatsTitle)}</p>
        <ul class="diagram__list stagger">${chats}</ul>
      </div>
      <figcaption class="diagram__caption">${rich(c.caption)}</figcaption>
    </figure>
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
  const hint = `(${c.ingredientWord} ${part.n}: ${c.ingredients[part.n - 1].name})`;
  return `<mark class="ing"><span class="ing__lead"><span class="ing__badge" aria-hidden="true">${part.n}</span><span class="sr-only">${esc(hint)}</span>${esc(first)}</span>${esc(rest)}</mark>`;
}

// 5. Practical example — before/after, numbered ingredients, tiny sample slide
function example(c) {
  const clear = c.clear.map((part) =>
    typeof part === "string"
      ? esc(part)
      : ingredient(part, c)
  ).join("");

  const list = c.ingredients.map((g, i) => `
    <li><span class="ing__badge" aria-hidden="true">${i + 1}</span><span><strong>${esc(g.name)}</strong> — ${esc(g.detail)}</span></li>`).join("");

  const bullets = c.slideBullets.map((b) => `<li>${esc(b)}</li>`).join("");

  // Two columns on large screens, so the whole example fits on one screen.
  return section("example", c.eyebrow, c.title, `
    <div class="example-grid">
      <div class="compare">
        <div class="request request--vague">
          <p class="request__label"><span class="request__mark" aria-hidden="true">✕</span>${esc(c.vagueLabel)}</p>
          <p class="request__text">“${esc(c.vague)}”</p>
        </div>
        <div class="request request--clear">
          <p class="request__label"><span class="request__mark" aria-hidden="true">✓</span>${esc(c.clearLabel)}</p>
          <p class="request__text">${clear}</p>
        </div>
      </div>

      <div class="example-side">
        <h3 class="subhead">${esc(c.ingredientsTitle)}</h3>
        <ol class="ingredients stagger">${list}</ol>

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

// 8. Learn more — native <details>, so it works with keyboard and screen readers
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
    example(c.example) +
    context(c.context) +
    takeaway(c.takeaway) +
    more(c.more, wasOpen);

  syncControls();
  Nav.afterRender();   // rebuild the section menu and scroll animations (js/nav.js)
  if (announce) document.getElementById("status").textContent = c.ui.status[state.view];
}

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
