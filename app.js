(function () {
  const data = window.PORTFOLIO || { profile: {}, projects: [] };
  const profile = data.profile || {};
  const toolIcons = {
    "COMSOL Multiphysics": "https://api.iconify.design/thesvg/comsol.svg",
    MATLAB: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.18.0/icons/matlab/matlab-original.svg",
    Verilog: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.18.0/icons/verilog/verilog-original.svg",
    "Arduino IDE": "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.18.0/icons/arduino/arduino-original.svg",
    nanoHUB: "https://commons.wikimedia.org/wiki/Special:FilePath/NanoHUB_N_COLOR_HIRES.png",
    LTspice: "https://cdn.simpleicons.org/ltspice/102A43",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.18.0/icons/cplusplus/cplusplus-original.svg",
    "Autodesk Tinkercad": "https://cdn.simpleicons.org/tinkercad/102A43",
    "Microsoft Office": "https://api.iconify.design/logos/microsoft.svg",
  };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const byId = (id) => document.getElementById(id);

  const photoTrigger = document.querySelector("[data-photo-trigger]");
  if (photoTrigger) {
    const photoDialog = document.createElement("dialog");
    photoDialog.className = "profile-photo-dialog";
    photoDialog.setAttribute("aria-label", "Portrait of Noshin Sadia Nur");
    photoDialog.innerHTML = '<button class="photo-dialog-close" type="button" aria-label="Close portrait">×</button><img alt="Portrait of Noshin Sadia Nur">';
    document.body.appendChild(photoDialog);
    photoDialog.querySelector("img").src = photoTrigger.querySelector("img").src;
    photoTrigger.addEventListener("click", () => photoDialog.showModal());
    photoDialog.querySelector(".photo-dialog-close").addEventListener("click", () => photoDialog.close());
    photoDialog.addEventListener("click", (event) => {
      if (event.target === photoDialog) photoDialog.close();
    });
  }

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = byId("site-sidebar");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const desktopSidebar = window.matchMedia("(min-width: 1100px)");
  const closeMenu = () => {
    document.body.classList.remove("menu-open", "menu-pinned");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open portfolio menu");
    }
    if (menu) menu.setAttribute("aria-hidden", "true");
    if (backdrop) backdrop.hidden = true;
  };
  const openMenu = () => {
    if (desktopSidebar.matches) {
      document.body.classList.remove("menu-open");
      document.body.classList.add("menu-pinned");
    } else {
      document.body.classList.remove("menu-pinned");
      document.body.classList.add("menu-open");
    }
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close portfolio menu");
    }
    if (menu) menu.setAttribute("aria-hidden", "false");
    if (backdrop) backdrop.hidden = desktopSidebar.matches;
  };
  if (menuToggle && menu && backdrop) {
    if (desktopSidebar.matches) openMenu();
    desktopSidebar.addEventListener("change", () => {
      if (desktopSidebar.matches || menuToggle.getAttribute("aria-expanded") === "true") openMenu();
      else closeMenu();
    });
    menuToggle.addEventListener("click", () => {
      if (menuToggle.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });
    document.querySelector("[data-menu-close]")?.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  document.querySelectorAll("[data-profile]").forEach((element) => {
    const value = profile[element.dataset.profile];
    if (!value) return;
    if (element.dataset.profile === "about" && Array.isArray(value)) {
      element.innerHTML = value.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("");
    } else {
      element.textContent = value;
    }
  });

  if (profile.email) {
    ["email-link", "email-address", "hero-email"].forEach((id) => {
      const link = byId(id);
      if (!link) return;
      link.href = `mailto:${profile.email}`;
      if (id === "email-address") link.textContent = profile.email;
    });
  }

  const phone = byId("phone-link");
  if (phone && profile.phone) {
    phone.href = `tel:${profile.phone}`;
    phone.textContent = profile.phone;
  }
  const heroPhone = byId("hero-phone");
  if (heroPhone && profile.phone) {
    heroPhone.href = `tel:${profile.phone}`;
    const heroPhoneNumber = byId("hero-phone-number");
    if (heroPhoneNumber) heroPhoneNumber.textContent = profile.phone;
  }

  const skillsList = byId("skills-list");
  if (skillsList) {
    skillsList.innerHTML = (profile.skills || []).map((skill) =>
      `<span class="simple-skill-chip">${esc(skill)}</span>`
    ).join("");
  }

  const toolsList = byId("tools-list");
  if (toolsList) {
    toolsList.innerHTML = (profile.tools || []).map((tool) => {
      const icon = toolIcons[tool];
      return `<div class="simple-tool-item"><span class="simple-tool-mark">${icon ? `<img src="${icon}" alt="" aria-hidden="true" loading="lazy">` : ""}</span><span>${esc(tool)}</span></div>`;
    }).join("");
  }

  if (profile.experience) {
    const experienceFields = {
      "experience-role": profile.experience.role,
      "experience-org": profile.experience.organization,
      "experience-description": profile.experience.description,
      "experience-status": profile.experience.status,
    };
    Object.entries(experienceFields).forEach(([id, value]) => {
      const element = byId(id);
      if (element && value) element.textContent = value;
    });
    const experienceSkills = byId("experience-skills");
    if (experienceSkills) {
      experienceSkills.innerHTML = (profile.experience.skills || []).map((skill) =>
        `<span class="experience-skill">${esc(skill)}</span>`
      ).join("");
    }
  }

  const socials = byId("social-links");
  const links = (profile.links || []).filter((item) => item.label && item.url);
  if (socials) {
    links.forEach((item) => {
      const anchor = document.createElement("a");
      anchor.href = item.url;
      anchor.textContent = item.label;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      socials.appendChild(anchor);
    });
  }

  const linkedin = links.find((item) => String(item.label).toLowerCase() === "linkedin");
  const heroLinkedin = byId("hero-linkedin");
  if (linkedin && heroLinkedin) heroLinkedin.href = linkedin.url;

  const frequencySlider = byId("frequency-slider");
  const cutoffSlider = byId("cutoff-slider");
  if (frequencySlider && cutoffSlider) {
    let lastScopeDraw = 0;
    function drawScope(now = performance.now()) {
      if (now - lastScopeDraw < 35) return;
      lastScopeDraw = now;
      const frequency = Number(frequencySlider.value);
      const cutoff = Number(cutoffSlider.value);
      const period = 1 / frequency;
      const halfPeriod = period / 2;
      const tau = 1 / (2 * Math.PI * cutoff);
      const decay = Math.exp(-halfPeriod / tau);
      const peak = (1 - decay) / (1 + decay);
      const width = 700;
      const points = 700;
      const cycles = 3;
      const center = 180;
      const scale = 125;
      let inputPath = "";
      let outputPath = "";

      for (let index = 0; index <= points; index += 1) {
        const x = (index / points) * width;
        const cyclePosition = (index / points * cycles + (now / 1000 * 0.12)) % 1;
        const phase = cyclePosition * period;
        const input = phase < halfPeriod ? -1 : 1;
        const output = phase < halfPeriod
          ? -1 + (peak + 1) * Math.exp(-phase / tau)
          : 1 - (peak + 1) * Math.exp(-(phase - halfPeriod) / tau);
        inputPath += `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${(center - input * scale).toFixed(2)}`;
        outputPath += `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${(center - output * scale).toFixed(2)}`;
      }

      const inputTrace = byId("input-trace");
      const outputTrace = byId("output-trace");
      if (inputTrace) inputTrace.setAttribute("d", inputPath);
      if (outputTrace) outputTrace.setAttribute("d", outputPath);
      const frequencyValue = byId("frequency-value");
      const cutoffValue = byId("cutoff-value");
      const timeScale = byId("time-scale");
      if (frequencyValue) frequencyValue.textContent = `${frequency} Hz`;
      if (cutoffValue) cutoffValue.textContent = `${cutoff} Hz`;
      if (timeScale) timeScale.textContent = `${(300000 / frequency).toFixed(0)} µs / div`;

      const ratio = cutoff / frequency;
      let result;
      if (ratio >= 3) result = "Cutoff is well above the input, so the output passes almost unchanged.";
      else if (ratio >= 1.5) result = "The cutoff is above the input; most of the waveform passes with gently rounded edges.";
      else if (ratio >= 0.67) result = "The input is near the cutoff, so the RC response rounds each transition.";
      else result = "The input is above cutoff, so the output is more attenuated and smoothed.";

      const caption = byId("scope-caption");
      if (caption) caption.textContent = `τ = RC = ${(tau * 1e6).toFixed(0)} µs · fc = 1 / (2πRC). At ${frequency} Hz with a ${cutoff} Hz cutoff, the output swing is about ${(peak * 100).toFixed(0)}% of input. ${result}`;
    }

    frequencySlider.addEventListener("input", () => drawScope(performance.now()));
    cutoffSlider.addEventListener("input", () => drawScope(performance.now()));
    drawScope(performance.now());
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const animateScope = (now) => { drawScope(now); requestAnimationFrame(animateScope); };
      requestAnimationFrame(animateScope);
    }
  }

  const grid = byId("project-grid");
  const search = byId("search");
  const empty = byId("empty");
  if (grid && search && empty) {
    let activeFilter = "All";
    const renderTools = (tools) => (tools || []).map((tool) => {
      const icon = toolIcons[tool];
      return `<span class="tool-chip">${icon ? `<img src="${icon}" alt="" aria-hidden="true" loading="lazy">` : ""}<span>${esc(tool)}</span></span>`;
    }).join("");
    function renderProjects() {
      const term = search.value.trim().toLowerCase();
      const shown = (data.projects || []).filter((project) =>
        (activeFilter === "All" || (project.filters || []).includes(activeFilter))
        && (!term || [project.title, project.course, project.category, project.summary, project.description, ...(project.tools || []), ...(project.tags || []), ...(project.filters || [])].join(" ").toLowerCase().includes(term))
      );

      grid.innerHTML = shown.map((project, index) =>
        `<details class="project-card reveal" style="animation-delay:${Math.min(index * 55, 220)}ms"><summary class="project-summary"><div class="card-top"><span class="category">${esc(project.category)}</span><span class="status ${project.status === "In progress" ? "progress" : project.category === "Coursework" ? "course" : "exploring"}">${esc(project.status)}</span></div><h3>${esc(project.title)}</h3><p class="course-line">${esc(project.course || "Course code and title to add")}</p><p class="summary-description">${esc(project.summary || project.description)}</p>${project.tools?.length ? `<div class="tool-icons" aria-label="Software and tools"><span class="tool-icons-label">TOOLS</span>${renderTools(project.tools)}</div>` : ""}<span class="expand-control"><span class="expand-label"></span><span class="expand-icon" aria-hidden="true">+</span></span></summary><div class="project-details"><p class="description">${esc(project.description)}</p>${project.tags?.length ? `<div class="detail-topics"><span class="detail-label">Focus</span><div class="tags">${project.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div></div>` : ""}${project.link ? `<a class="project-link" href="${esc(project.link)}" target="_blank" rel="noreferrer">${esc(project.linkLabel || "View project")} <span>↗</span></a>` : ""}</div></details>`
      ).join("");
      empty.hidden = shown.length > 0;
      const count = byId("project-count");
      if (count) count.textContent = `${String((data.projects || []).length).padStart(2, "0")} PROJECTS`;
    }

    document.querySelectorAll(".filter").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelector(".filter.active")?.classList.remove("active");
        button.classList.add("active");
        activeFilter = button.dataset.filter;
        renderProjects();
      });
    });
    search.addEventListener("input", renderProjects);
    renderProjects();
  }

  const year = byId("year");
  if (year) year.textContent = new Date().getFullYear();
})();

  // Warm the section pages in the background to avoid another request on each click.
  const pagePaths = ["index.html", "about.html", "projects.html", "experience.html", "skills.html", "contact.html"];
  const prefetchedPages = new Set();
  const prefetchPage = (path) => {
    if (!path || prefetchedPages.has(path) || !pagePaths.includes(path)) return;
    prefetchedPages.add(path);
    const hint = document.createElement("link");
    hint.rel = "prefetch";
    hint.href = path;
    document.head.appendChild(hint);
  };
  document.querySelectorAll(".sidebar-link[href]").forEach((link) => {
    const path = link.getAttribute("href");
    link.addEventListener("pointerenter", () => prefetchPage(path), { once: true });
    link.addEventListener("focus", () => prefetchPage(path), { once: true });
  });
  if (!navigator.connection?.saveData) {
    const warmPages = () => pagePaths.forEach(prefetchPage);
    if ("requestIdleCallback" in window) window.requestIdleCallback(warmPages, { timeout: 1800 });
    else window.setTimeout(warmPages, 900);
  }
