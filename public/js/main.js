const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const content = item.getAttribute("data-preview");
    const previewCard = item.querySelector(".card-preview");
    if (previewCard) {
      previewCard.innerHTML = content;
    }
  });
});

function copyEmail() {
  const emailText = document.getElementById("email").innerText;
  navigator.clipboard.writeText(emailText).then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Email address copied to clipboard',
      showConfirmButton: false,
      timer: 1500
    });
  }).catch(err => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to copy email.',
    });
  });
}

const yearElement = document.getElementById("current-year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

const modeToggle = document.getElementById("mode-toggle");

modeToggle.addEventListener("change", () => {
  if (modeToggle.checked) {
    document.documentElement.style.setProperty(
      "--current-background",
      "var(--background-dark)"
    );
    document.documentElement.style.setProperty(
      "--current-text",
      "var(--text-dark)"
    );
  } else {
    document.documentElement.style.setProperty(
      "--current-background",
      "var(--background-light)"
    );
    document.documentElement.style.setProperty(
      "--current-text",
      "var(--text-light)"
    );
  }
});