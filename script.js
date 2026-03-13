document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.slice(1);
      const targetEl = targetId ? document.getElementById(targetId) : null;
      if (targetEl) {
        event.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const danceItems = document.querySelectorAll(".dance-item");
  const danceModal = document.getElementById("dance-modal");
  const modalBody = danceModal?.querySelector(".dance-modal-body");
  const closeButton = danceModal?.querySelector(".dance-modal-close");

  function closeDanceModal() {
    if (danceModal) {
      danceModal.classList.remove("open");
      danceModal.setAttribute("aria-hidden", "true");
    }
  }

  danceItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (!danceModal || !modalBody) return;
      const content = item.querySelector("div");
      if (!content) return;
      modalBody.innerHTML = content.innerHTML;
      danceModal.classList.add("open");
      danceModal.setAttribute("aria-hidden", "false");
    });
  });

  closeButton?.addEventListener("click", () => {
    closeDanceModal();
  });

  danceModal?.addEventListener("click", (event) => {
    if (event.target === danceModal) {
      closeDanceModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDanceModal();
    }
  });

  const revealTargets = document.querySelectorAll(
    ".hero-content, .effect-card, .dance-item, .video-card, .contact-card"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealTargets.forEach((el) => observer.observe(el));
});

