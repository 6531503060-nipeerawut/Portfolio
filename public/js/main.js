document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
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

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const content = item.getAttribute("data-preview");
      const previewCard = item.querySelector(".card-preview");
      if (previewCard) {
        previewCard.innerHTML = content;
      }
    });
  });

  if (window.location.pathname === "/") {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "instant" });
    }
  }

  const copyEmail = () => {
    const emailText = document.getElementById("email").innerText;
    navigator.clipboard.writeText(emailText).then(() => {
      Swal.fire({
        icon: "success",
        title: "Copied!",
        text: "Email address copied to clipboard",
        showConfirmButton: false,
        timer: 1500,
      });
    }).catch(() => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to copy email.",
      });
    });
  };

  window.copyEmail = copyEmail;

  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const modeToggle = document.getElementById("mode-toggle");
  if (modeToggle) {
    modeToggle.addEventListener("change", () => {
      const isDarkMode = modeToggle.checked;
      document.documentElement.style.setProperty(
        "--current-background",
        isDarkMode ? "var(--background-dark)" : "var(--background-light)"
      );
      document.documentElement.style.setProperty(
        "--current-text",
        isDarkMode ? "var(--text-dark)" : "var(--text-light)"
      );
    });
  }
});