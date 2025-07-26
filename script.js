document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    body.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);
  }

  themeToggle.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "dark") {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      updateThemeIcon("light");
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      updateThemeIcon("dark");
    }
  });

  function updateThemeIcon(theme) {
    const moonIcon = document.querySelector(".fa-moon");
    const sunIcon = document.querySelector(".fa-sun");

    if (theme === "dark") {
      moonIcon.style.opacity = "0";
      sunIcon.style.opacity = "1";
    } else {
      moonIcon.style.opacity = "1";
      sunIcon.style.opacity = "0";
    }
  }

  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Sticky header on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  // Animate skills progress bars on scroll
  const skillItems = document.querySelectorAll(".skill-item");

  function animateSkills() {
    skillItems.forEach((item) => {
      const progress = item.querySelector(".progress");
      const percent = item.querySelector(
        ".skill-info span:last-child"
      ).textContent;
      progress.style.width = percent;
    });
  }

  // Intersection Observer for skills animation
  const skillsSection = document.querySelector(".skills");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // Set current year in footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would typically send the form data to a server
      // For demonstration, we'll just show an alert
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    });
  }

  // Animate elements on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".hero-content, .about-image, .about-text, .skills-category, .timeline-item, .project-item, .contact-info, .contact-form"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animation
  const animateElements = document.querySelectorAll(
    ".hero-content, .about-image, .about-text, .skills-category, .timeline-item, .project-item, .contact-info, .contact-form"
  );
  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  // Trigger once on load in case elements are already in view
  animateOnScroll();
});
