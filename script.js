const WEDDING_DATE = new Date("2026-09-19T15:00:00");

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
}

function setupRsvpForm() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const submission = Object.fromEntries(formData.entries());
    submission.submittedAt = new Date().toISOString();

    const existing = JSON.parse(localStorage.getItem("wedding-rsvps") || "[]");
    existing.push(submission);
    localStorage.setItem("wedding-rsvps", JSON.stringify(existing));

    form.reset();
    alert("Köszönjük! A visszajelzésedet helyben mentettük ebben a demó sablonban.");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);
setupNavigation();
setupRsvpForm();
