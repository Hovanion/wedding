const WEDDING_DATE = new Date("2026-09-19T14:30:00");
const WEDDING_DAY_START = new Date("2026-09-19T00:00:00");
const WEDDING_DAY_END = new Date("2026-09-20T10:00:00");
const RSVP_DEADLINE = new Date("2026-07-16T00:00:00");

const RSVP_DEADLINE_TEXT = {
  before: {
    hero: "Visszajelzést 2026. július 15-ig várunk",
    note: "Kérjük, jelezzetek vissza 2026. július 15-ig",
    faq: " A visszajelzéseket 2026. július 15-ig várjuk.",
  },
  after: {
    hero: "Ha még nem jeleztetek vissza, írjatok nyugodtan",
    note: "Ha még nem jeleztetek vissza, írjatok nyugodtan",
    faq: " Ha még nem jeleztetek vissza, írjatok nyugodtan.",
  },
};

function setupRsvpDeadline() {
  const afterDeadline = new Date() >= RSVP_DEADLINE;
  const messages = afterDeadline ? RSVP_DEADLINE_TEXT.after : RSVP_DEADLINE_TEXT.before;

  const heroEl = document.getElementById("rsvp-deadline-hero");
  const noteEl = document.getElementById("rsvp-deadline-note");
  const faqEl = document.getElementById("rsvp-deadline-faq");

  if (heroEl) heroEl.textContent = messages.hero;
  if (noteEl) noteEl.textContent = messages.note;
  if (faqEl) faqEl.textContent = messages.faq;
}

function updateCountdown() {
  const countdownEl = document.getElementById("countdown");
  const gridEl = document.getElementById("countdown-grid");
  const messageEl = document.getElementById("countdown-message");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!countdownEl || !gridEl || !messageEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();

  if (now >= WEDDING_DAY_END) {
    showCountdownMessage(countdownEl, gridEl, messageEl, "Köszönjük, hogy velünk ünnepeltek");
    return;
  }

  if (now >= WEDDING_DAY_START) {
    showCountdownMessage(countdownEl, gridEl, messageEl, "Ma van a nagy nap!");
    return;
  }

  hideCountdownMessage(countdownEl, gridEl, messageEl);

  const diff = WEDDING_DATE - now;
  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

function showCountdownMessage(countdownEl, gridEl, messageEl, text) {
  countdownEl.classList.add("is-message");
  gridEl.hidden = true;
  messageEl.hidden = false;
  messageEl.textContent = text;
}

function hideCountdownMessage(countdownEl, gridEl, messageEl) {
  countdownEl.classList.remove("is-message");
  gridEl.hidden = false;
  messageEl.hidden = true;
  messageEl.textContent = "";
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  setupNavActiveState(links);
}

function setupNavActiveState(navLinksContainer) {
  const sectionLinks = [...navLinksContainer.querySelectorAll("a")].filter((link) => {
    const href = link.getAttribute("href") || "";
    return href.startsWith("#") && href.length > 1;
  });

  if (sectionLinks.length === 0) return;

  const sections = sectionLinks
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);

  const setActive = (id) => {
    sectionLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const clearActive = () => {
    sectionLinks.forEach((link) => link.classList.remove("is-active"));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible[0]) {
        setActive(visible[0].target.id);
        return;
      }

      if (window.scrollY < 120) {
        clearActive();
      }
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.15, 0.4] }
  );

  sections.forEach((section) => observer.observe(section));

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActive(link.getAttribute("href").slice(1));
    });
  });

  const initialId = window.location.hash.slice(1);
  if (initialId && document.getElementById(initialId)) {
    setActive(initialId);
  }
}

const GOOGLE_FORM_HEIGHTS = {
  desktop: 2500,
  mobile: 2900,
  submitted: 560,
};
const GOOGLE_FORM_HEIGHT_BUFFER = 180;
const GOOGLE_FORM_MOBILE_BREAKPOINT = 768;

function setupGoogleFormEmbed() {
  const frame = document.getElementById("form-embed-frame");
  const iframe = document.getElementById("google-form-iframe");
  if (!frame || !iframe) return;

  let loadCount = 0;

  const isMobile = () => window.matchMedia(`(max-width: ${GOOGLE_FORM_MOBILE_BREAKPOINT}px)`).matches;

  const getFormHeight = () => (isMobile() ? GOOGLE_FORM_HEIGHTS.mobile : GOOGLE_FORM_HEIGHTS.desktop);

  const applyHeight = (height) => {
    const nextHeight = Math.max(Math.round(height), 320);
    frame.style.height = `${nextHeight}px`;
    iframe.style.height = `${nextHeight}px`;
  };

  applyHeight(getFormHeight() + GOOGLE_FORM_HEIGHT_BUFFER);

  iframe.addEventListener("load", () => {
    loadCount += 1;

    if (loadCount >= 2) {
      applyHeight(GOOGLE_FORM_HEIGHTS.submitted);
      frame.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    applyHeight(getFormHeight() + GOOGLE_FORM_HEIGHT_BUFFER);
  });

  window.addEventListener("resize", () => {
    if (loadCount >= 2) return;
    applyHeight(getFormHeight() + GOOGLE_FORM_HEIGHT_BUFFER);
  });
}

function cleanHomeUrl() {
  const { pathname, search, hash } = window.location;
  if (!/\/index\.html$/i.test(pathname)) return;

  const cleanPath = pathname.replace(/\/index\.html$/i, "/");
  window.history.replaceState(null, "", `${cleanPath}${search}${hash}`);
}

function setupFaqDeepLinks() {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (target instanceof HTMLDetailsElement) {
    target.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
setupRsvpDeadline();
cleanHomeUrl();
setupNavigation();
setupGoogleFormEmbed();
setupFaqDeepLinks();
