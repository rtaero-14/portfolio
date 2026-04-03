function limitTechPills(technologies, maxVisible) {
  const visible = technologies.slice(0, maxVisible);
  const hiddenCount = Math.max(technologies.length - maxVisible, 0);
  return { visible, hiddenCount };
}

function renderHomeCards() {
  const scroller = document.getElementById("cards-scroller");
  if (!scroller) return;

  projectsData.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card card";
    card.dataset.index = String(index);
    card.style.setProperty("--accent", project.accent.color);
    card.style.setProperty("--glow", project.accent.glow);

    const { visible, hiddenCount } = limitTechPills(project.technologies, 3);

    card.innerHTML = `
      <div class="project-media">
        <img class="project-image" src="${project.image}" alt="${project.title}">
        <div class="project-gradient"></div>
      </div>
      <div class="project-body">
        <span class="project-badge">${project.year}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        <div class="tech-list">
          ${visible.map((tech) => `<span class="tech-pill">${tech}</span>`).join("")}
          ${hiddenCount > 0 ? `<span class="tech-pill">+${hiddenCount}</span>` : ""}
        </div>
        <a class="project-link stretched-link" href="./project.html?id=${project.id}" aria-label="Voir le projet ${project.title}">
        </a>
      </div>
    `;

    scroller.appendChild(card);
  });

  setupHomeCarousel();
}

function getClosestCardIndex(scroller, cards) {
  const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
  let closestIndex = 0;
  let smallestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.clientWidth / 2;
    const distance = Math.abs(scrollerCenter - cardCenter);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function setupHomeCarousel() {
  const scroller = document.getElementById("cards-scroller");
  const prevButton = document.getElementById("carousel-prev");
  const nextButton = document.getElementById("carousel-next");
  const dotsContainer = document.getElementById("carousel-dots");
  if (!scroller || !prevButton || !nextButton || !dotsContainer) return;

  const cards = Array.from(scroller.querySelectorAll(".project-card"));
  if (!cards.length) return;

  let activeIndex = Math.floor(cards.length / 2);
  let isTicking = false;
  const dots = [];

  function updateVisualState() {
    cards.forEach((card, index) => {
      const isActive = index === activeIndex;
      card.classList.toggle("is-active", isActive);
      card.classList.toggle("is-inactive", !isActive);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });

    prevButton.disabled = false;
    nextButton.disabled = false;
  }

  function goToCard(index, smooth = true) {
    const clampedIndex = Math.max(0, Math.min(index, cards.length - 1));
    activeIndex = clampedIndex;
    const targetCard = cards[clampedIndex];
    const targetLeft = targetCard.offsetLeft - (scroller.clientWidth - targetCard.clientWidth) / 2;
    scroller.scrollTo({
      left: Math.max(targetLeft, 0),
      behavior: smooth ? "smooth" : "auto"
    });
    updateVisualState();
  }

  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Afficher le projet ${index + 1}`);
    dot.addEventListener("click", () => goToCard(index));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  prevButton.addEventListener("click", () => {
    const nextIndex = activeIndex === 0 ? cards.length - 1 : activeIndex - 1;
    goToCard(nextIndex);
  });

  nextButton.addEventListener("click", () => {
    const nextIndex = activeIndex === cards.length - 1 ? 0 : activeIndex + 1;
    goToCard(nextIndex);
  });

  scroller.addEventListener("scroll", () => {
    if (isTicking) return;
    isTicking = true;
    window.requestAnimationFrame(() => {
      const newIndex = getClosestCardIndex(scroller, cards);
      if (newIndex !== activeIndex) {
        activeIndex = newIndex;
        updateVisualState();
      }
      isTicking = false;
    });
  });

  window.addEventListener("resize", () => {
    goToCard(activeIndex, false);
  });

  goToCard(activeIndex, false);
}

function getProjectFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return projectsData.find((project) => project.id === id);
}

function renderDetailPage() {
  const root = document.getElementById("project-detail-root");
  if (!root) return;

  const project = getProjectFromUrl();
  if (!project) {
    root.innerHTML = `
      <main class="detail-page d-flex align-items-center justify-content-center">
        <section class="empty-state">
          <h1>Projet introuvable</h1>
          <p class="hero-subtitle">Le projet demandé n'existe pas ou n'a pas encore été configuré.</p>
          <a class="detail-back mt-3 d-inline-block" href="./index.html">Retour au portfolio</a>
        </section>
      </main>
    `;
    return;
  }

  root.style.setProperty("--accent", project.accent.color);
  root.innerHTML = `
    <main class="detail-page">
      <section class="detail-hero">
        <div class="detail-hero-media">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="detail-overlay"></div>
        <a class="detail-back" href="./index.html"><- Retour</a>
        <div class="detail-content">
          <span class="detail-year">${project.year}</span>
          <h1 class="detail-title">${project.title}</h1>
          <p class="detail-description">${project.description}</p>
          <div class="detail-meta">
            <span>Année: ${project.year}</span>
            <span>Rôle: ${project.role}</span>
          </div>
        </div>
      </section>

      <section class="detail-main">
        <section class="detail-section">
          <h2 class="detail-section-title">Technologies Utilisées</h2>
          <div class="detail-tags">
            ${project.technologies.map((tech) => `<span class="detail-tag">${tech}</span>`).join("")}
          </div>
        </section>

        <section class="detail-section">
          <h2 class="detail-section-title">Défis Techniques</h2>
          <div class="detail-grid">
            ${project.challenges
              .map((challenge, index) => `
                <article class="detail-card">
                  <div class="detail-number">${index + 1}</div>
                  <p class="mb-0">${challenge}</p>
                </article>
              `)
              .join("")}
          </div>
        </section>

        <section class="detail-section">
          <h2 class="detail-section-title">Résultats</h2>
          <div class="detail-grid">
            ${project.results
              .map((result) => `
                <article class="detail-card result-card">
                  <p class="mb-0">${result}</p>
                </article>
              `)
              .join("")}
          </div>
        </section>
      </section>
    </main>
  `;
}

if (document.body.dataset.page === "home") {
  renderHomeCards();
}

if (document.body.dataset.page === "detail") {
  renderDetailPage();
}
