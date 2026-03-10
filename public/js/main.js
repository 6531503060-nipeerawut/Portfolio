document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const modeToggle = document.getElementById("mode-toggle");
  const root = document.documentElement;

  function updateActiveLink() {
    const scrollPos = window.scrollY + 140;
    let currentSection = "";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href").substring(1);
      if (href === currentSection) {
        link.classList.add("active");
      }
    });
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.setAttribute("data-theme", theme);
    if (modeToggle) {
      modeToggle.checked = isDark;
    }
    localStorage.setItem("portfolio-theme", theme);
  }

  function initTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      applyTheme(savedTheme);
    } else {
      applyTheme("light");
    }
  }

  function setupPreviewCards() {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const content = item.getAttribute("data-preview");
        const previewCard = item.querySelector(".card-preview");
        if (previewCard) {
          previewCard.innerHTML = content;
        }
      });
    });
  }

  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const navHeight = 76;
        const topPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      });
    });
  }

  function setupCopyEmail() {
    const copyEmail = () => {
      const emailText = document.getElementById("email")?.innerText;
      if (!emailText) return;

      navigator.clipboard
        .writeText(emailText)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Copied!",
            text: "Email address copied to clipboard",
            showConfirmButton: false,
            timer: 1500,
            background: root.getAttribute("data-theme") === "dark" ? "#0f172a" : "#ffffff",
            color: root.getAttribute("data-theme") === "dark" ? "#eaf2ff" : "#0f172a",
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to copy email.",
            background: root.getAttribute("data-theme") === "dark" ? "#0f172a" : "#ffffff",
            color: root.getAttribute("data-theme") === "dark" ? "#eaf2ff" : "#0f172a",
          });
        });
    };

    window.copyEmail = copyEmail;
  }

  function setupYear() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  function setupThemeToggle() {
    if (!modeToggle) return;

    modeToggle.addEventListener("change", () => {
      applyTheme(modeToggle.checked ? "dark" : "light");
    });
  }

  function setupMobileMenuAutoClose() {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          new bootstrap.Collapse(navbarCollapse).hide();
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!navbarCollapse || !navbarToggler) return;

      const isClickInside =
        navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);

      if (!isClickInside && navbarCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);

  if (window.location.pathname === "/") {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "instant" });
    }
  }

  initTheme();
  updateActiveLink();
  setupPreviewCards();
  setupSmoothScroll();
  setupCopyEmail();
  setupYear();
  setupThemeToggle();
  setupMobileMenuAutoClose();
});
