const WEDDING_DATE = new Date("2026-09-19T13:30:00");

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

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
  desktop: 1705,
  mobile: 1860,
};

function setupGoogleFormEmbed() {
  const frame = document.getElementById("form-embed-frame");
  const iframe = document.getElementById("google-form-iframe");
  if (!frame || !iframe) return;

  const setHeight = () => {
    const mobile = window.matchMedia("(max-width: 480px)").matches;
    const height = mobile ? GOOGLE_FORM_HEIGHTS.mobile : GOOGLE_FORM_HEIGHTS.desktop;
    frame.style.height = `${height}px`;
    iframe.style.height = `${height}px`;
  };

  setHeight();
  window.addEventListener("resize", setHeight);
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
cleanHomeUrl();
setupNavigation();
setupGoogleFormEmbed();
setupFaqDeepLinks();
