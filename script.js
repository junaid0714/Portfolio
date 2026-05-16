const root = document.documentElement;
const modeToggle = document.getElementById("modeToggle");
const savedTheme = localStorage.getItem("theme");
const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
if (savedTheme) {
  if (savedTheme === "light") root.setAttribute("data-theme", "light");
} else {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    root.setAttribute("data-theme", "light");
  }
}
modeToggle.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  root.setAttribute("data-theme", isLight ? "" : "light");
  localStorage.setItem("theme", isLight ? "dark" : "light");
});

const roles = [
  "Full Stack Java Developer",
  "Java • Springboot • SQL ",
  "HTML • CSS • JavaScript ",
  "Turning Coffee Into Code.",
];
const tw = document.getElementById("typewriter");
let r = 0,
  c = 0,
  deleting = false;
function tick() {
  const txt = roles[r];
  tw.textContent = txt.slice(0, c);
  if (!deleting) {
    if (c < txt.length) {
      c++;
    } else {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }
  } else {
    if (c > 0) {
      c--;
    } else {
      deleting = false;
      r = (r + 1) % roles.length;
    }
  }
  const speed = deleting ? 32 : 48;
  setTimeout(tick, speed);
}
tick();

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let W = 0,
  H = 0;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();
function makeParticles() {
  particles = Array.from(
    { length: Math.min(120, Math.floor((W * H) / 18000)) },
    () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 0.6,
    })
  );
}
makeParticles();
function animate() {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i],
        b = particles[j];
      const dx = a.x - b.x,
        dy = a.y - b.y;
      const d = dx * dx + dy * dy;
      if (d < 120 * 120) {
        ctx.strokeStyle =
          "rgba(124, 92, 255," + (1 - d / (120 * 120)) * 0.25 + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

const bars = document.querySelectorAll(".bar");
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const v = e.target.getAttribute("data-val");
        e.target.style.width = v + "%";
        barObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
bars.forEach((b) => barObs.observe(b));

const rings = document.querySelectorAll(".ring");
const ringObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const pct = e.target.getAttribute("data-pct");
        e.target.style.setProperty("--val", pct + "%");
        ringObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
rings.forEach((r) => ringObs.observe(r));

const reveals = document.querySelectorAll(".reveal");
const skills = document.querySelectorAll(".skill");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.classList.contains("skill")) {
          const val = entry.target.getAttribute("data-skill");
          const bar = entry.target.querySelector(".bar > span");
          bar.style.transition = "width 1.2s cubic-bezier(.2,.8,.2,1)";
          requestAnimationFrame(() => (bar.style.width = val + "%"));
        }
      }
    });
  },
  { threshold: 0.2 }
);
reveals.forEach((el) => io.observe(el));
skills.forEach((el) => io.observe(el));

const sections = Array.from(document.querySelectorAll("section"));
const links = Array.from(document.querySelectorAll(".nav-link"));
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = "#" + entry.target.id;
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === id)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
);
sections.forEach((s) => spy.observe(s));

const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 600) toTop.classList.add("show");
  else toTop.classList.remove("show");
});
toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !email || !message) {
    return showMsg("Please fill out all fields.");
  }
  if (!emailOk) {
    return showMsg("Please enter a valid email.");
  }

  showMsg("Thanks! Your message has been queued. I will get back to you soon.");
  form.reset();
});
function showMsg(text) {
  formMsg.textContent = text;
  formMsg.style.color = "var(--accent-2)";
}

document.getElementById("year").textContent = new Date().getFullYear();

document
  .querySelectorAll(".nav a")
  .forEach((a) => a.addEventListener("click", () => a.blur()));

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(makeParticles, 300);
});
