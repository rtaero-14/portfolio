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
    root.innerHTML = `<main class="detail-page d-flex align-items-center justify-content-center"><section class="empty-state"><h1>Projet introuvable</h1><a class="detail-back mt-3 d-inline-block" href="./index.html">Retour au portfolio</a></section></main>`;
    return;
  }

  root.style.setProperty("--accent", project.accent.color);
  root.innerHTML = `
    <main class="detail-page">
      <section class="detail-hero">
        <div class="detail-hero-media"><img src="${project.image}" alt="${project.title}"></div>
        <div class="detail-overlay"></div>
        <a class="detail-back" href="./index.html">Retour</a>
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
          <h2 class="detail-section-title">Compétence(s) Démontrée(s)</h2>
          <div class="detail-tags">
            ${Array.isArray(project.competence) 
              ? project.competence.map(comp => `<span class="detail-tag" style="background: color-mix(in srgb, var(--accent) 20%, #000 80%); border-color: var(--accent); margin-bottom: 0.5rem;">${comp}</span>`).join("")
              : `<span class="detail-tag" style="background: color-mix(in srgb, var(--accent) 20%, #000 80%); border-color: var(--accent);">${project.competence || "Non spécifiée"}</span>`
            }
          </div>
        </section>

        ${project.isGroup ? `
        <section class="detail-section">
          <h2 class="detail-section-title">Mon rôle dans le projet</h2>
          <article class="detail-card">
            <p class="mb-0">${project.roleDetail}</p>
          </article>
        </section>
        ` : ''}

        <section class="detail-section">
          <h2 class="detail-section-title">Apprentissages Critiques (AC)</h2>
          <div class="detail-grid">
            ${(project.apprentissagesCritiques || []).map((ac) => `<article class="detail-card"><span class="detail-tag mb-3 d-inline-block" style="border-style: solid; background: rgba(255,255,255,0.05); border-color: var(--muted); font-size: 0.85rem; padding: 0.3rem 0.7rem;">${ac.id}</span><p class="mb-0">${ac.description}</p></article>`).join("")}
          </div>
        </section>

        <section class="detail-section">
          <h2 class="detail-section-title">Technologies & Livrables</h2>
          <div class="detail-tags mb-3">
            ${(project.technologies || []).map((tech) => `<span class="detail-tag">${tech}</span>`).join("")}
          </div>
          <div class="detail-tags">
            ${(project.livrables || []).map((l) => {
              if (typeof l === 'object') return `<a href="${l.url}" target="_blank" class="detail-tag" style="border-style: dashed; text-decoration: none; color: inherit;">🔗 ${l.name}</a>`;
              return `<span class="detail-tag" style="border-style: dashed;">📄 ${l}</span>`;
            }).join("")}
          </div>
          
          ${project.gallery && project.gallery.length > 0 ? `
          <div class="detail-grid mt-4" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            ${project.gallery.map((img) => `
              <div class="detail-card" style="padding: 0.5rem; overflow: hidden; display: flex; align-items: center; justify-content: center; aspect-ratio: 16/9; border-color: color-mix(in srgb, var(--accent) 40%, transparent); background: #000;">
                <img src="${img}" alt="Capture d'écran" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 0.5rem; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              </div>
            `).join("")}
          </div>
          ` : ''}
        </section>

        <section class="detail-section">
          <h2 class="detail-section-title">Analyse Réflexive : Difficultés</h2>
          <div class="detail-grid">
            ${(project.difficulties || []).map((d, i) => `<article class="detail-card"><div class="detail-number">${i + 1}</div><p class="mb-0">${d}</p></article>`).join("")}
          </div>
        </section>

        <section class="detail-section">
          <h2 class="detail-section-title">Analyse Réflexive : Savoirs Acquis</h2>
          <div class="detail-grid">
            ${(project.skills || []).map((s) => `<article class="detail-card result-card"><p class="mb-0">✅ ${s}</p></article>`).join("")}
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
