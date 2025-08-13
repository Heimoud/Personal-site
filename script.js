// ===== MOBILE MENU TOGGLE =====
document.addEventListener("DOMContentLoaded", function() {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav-open");
    });
  }

  // ===== UPDATE FOOTER YEAR =====
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // offset for fixed header
          behavior: "smooth"
        });
      }
      // Close mobile nav after click
      mainNav.classList.remove("nav-open");
    });
  });
});
