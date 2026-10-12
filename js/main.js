/* =========================================================
   AI 101 — behaviour
   1. CONTENT  — edit this to match your scenario
   2. Render cards from the content
   3. Scroll reveal
   4. Active nav link
   5. Draggable sheet (spring + momentum + rubber-band)
   ========================================================= */

/* ---------- 1. CONTENT ----------
   Replace these with the steps from your scenario. */
const STEPS = [
  { title: "Step one",   text: "What the person does, and what AI does for them." },
  { title: "Step two",   text: "The next stage of the workflow." },
  { title: "Step three", text: "The result, and why it matters." },
];

/* ---------- 2. Render cards ---------- */
const cards = document.getElementById("cards");
cards.innerHTML = STEPS.map((s, i) => `
  <article class="card reveal">
    <span class="card__num">0${i + 1}</span>
    <h3>${s.title}</h3>
    <p>${s.text}</p>
  </article>`).join("");

/* ---------- 3. Scroll reveal ----------
   IntersectionObserver tells us when an element enters the viewport. */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- 4. Active nav link ---------- */
const links = [...document.querySelectorAll(".nav__links a")];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

/* ---------- 5. Draggable sheet ----------
   Ideas from apple-design:
   - Pointer Events + capture: 1:1 tracking, keeps working outside the element (§2)
   - Velocity at release, handed to a spring (§5)
   - Momentum projection decides where it lands (§6)
   - Rubber-band at the edges (§9)
   - A new grab cancels the running animation and starts from the CURRENT position (§3) */
const sheet = document.getElementById("sheet");
const stage = document.getElementById("stage");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let pos = { x: 0, y: 0 };      // current offset from centre
let vel = { x: 0, y: 0 };      // px/second
let raf = null;                // running animation frame id
let history = [];              // recent pointer samples for velocity

const render = () => { sheet.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`; };

// How far the sheet may travel from centre before resistance kicks in.
const bounds = () => ({
  x: (stage.clientWidth  - sheet.offsetWidth)  / 2,
  y: (stage.clientHeight - sheet.offsetHeight) / 2,
});

// Resistance grows the further you pull past the edge (§9).
function rubberband(over, dim, c = 0.55) {
  return (over * dim * c) / (dim + c * Math.abs(over));
}
function limit(value, max, dim) {
  if (value > max)  return  max + rubberband(value - max, dim);
  if (value < -max) return -max - rubberband(-max - value, dim);
  return value;
}

// Where would the sheet stop if it just coasted? (§6)
const project = (v, d = 0.998) => (v / 1000) * d / (1 - d);

// Critically damped spring (§4). `response` ≈ settle speed in seconds.
function springTo(target, velocity, response = 0.4) {
  cancelAnimationFrame(raf);
  if (reduceMotion) { pos = { ...target }; vel = { x: 0, y: 0 }; render(); return; }

  const w = (2 * Math.PI) / response;       // natural frequency
  vel = { ...velocity };                    // carry in the finger's velocity
  let last = performance.now();

  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, 1 / 30); last = now;
    for (const k of ["x", "y"]) {           // X and Y are independent springs (§3)
      const accel = w * w * (target[k] - pos[k]) - 2 * w * vel[k];
      vel[k] += accel * dt;
      pos[k] += vel[k] * dt;
    }
    render();
    const done = Math.hypot(vel.x, vel.y) < 1 && Math.hypot(target.x - pos.x, target.y - pos.y) < 0.5;
    if (done) { pos = { ...target }; render(); } else { raf = requestAnimationFrame(tick); }
  };
  raf = requestAnimationFrame(tick);
}

let grab = null;
sheet.addEventListener("pointerdown", (e) => {
  cancelAnimationFrame(raf);                // interrupt any motion instantly
  sheet.setPointerCapture(e.pointerId);
  sheet.classList.add("is-dragging");
  grab = { px: e.clientX - pos.x, py: e.clientY - pos.y };  // remember where we grabbed
  history = [{ x: e.clientX, y: e.clientY, t: e.timeStamp }];
});

sheet.addEventListener("pointermove", (e) => {
  if (!grab) return;
  const b = bounds();
  pos.x = limit(e.clientX - grab.px, b.x, stage.clientWidth);
  pos.y = limit(e.clientY - grab.py, b.y, stage.clientHeight);
  render();
  history.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
  history = history.filter((h) => e.timeStamp - h.t < 100);  // keep last ~100ms
});

function release() {
  if (!grab) return;
  grab = null;
  sheet.classList.remove("is-dragging");

  // Velocity from the oldest to newest recent sample.
  const a = history[0], z = history[history.length - 1];
  const dt = Math.max((z.t - a.t) / 1000, 0.001);
  const v = { x: (z.x - a.x) / dt, y: (z.y - a.y) / dt };

  // Project where it would coast to, then clamp inside the stage.
  const b = bounds();
  const clamp = (n, m) => Math.max(-m, Math.min(m, n));
  const target = {
    x: clamp(pos.x + project(v.x), b.x),
    y: clamp(pos.y + project(v.y), b.y),
  };
  springTo(target, v);
}
sheet.addEventListener("pointerup", release);
sheet.addEventListener("pointercancel", release);

// Keep it inside the stage if the window is resized.
addEventListener("resize", () => springTo({ x: 0, y: 0 }, { x: 0, y: 0 }));
