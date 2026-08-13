/* =========================================================
   StockSync — main.js
   Handles: mobile nav toggle, gallery lightbox, contact form
   validation and feedback. All client-side only (no PHP).
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a nav link is clicked (mobile)
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Gallery lightbox ---------- */
  var galleryItems = document.querySelectorAll(".gallery-item");
  var overlay = document.getElementById("lightbox-overlay");

  if (galleryItems.length && overlay) {
    var overlayImg = overlay.querySelector("img");
    var overlayCaption = overlay.querySelector(".lightbox-caption");
    var closeBtn = overlay.querySelector(".lightbox-close");
    var lastFocused = null;

    function openLightbox(fullSrc, altText, caption) {
      lastFocused = document.activeElement;
      overlayImg.src = fullSrc;
      overlayImg.alt = altText;
      overlayCaption.textContent = caption || "";
      overlay.hidden = false;
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      overlay.hidden = true;
      overlayImg.src = "";
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var fullSrc = item.getAttribute("data-full") || item.querySelector("img").src;
        var img = item.querySelector("img");
        openLightbox(fullSrc, img.alt, item.getAttribute("data-caption"));
      });
    });

    closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !overlay.hidden) closeLightbox();
    });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById("contact-form");

  if (form) {
    var feedback = document.getElementById("form-feedback");

    var validators = {
      name: function (value) {
        return value.trim().length >= 2 ? "" : "Please enter your full name (min 2 characters).";
      },
      email: function (value) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value.trim()) ? "" : "Please enter a valid email address.";
      },
      subject: function (value) {
        return value.trim().length >= 3 ? "" : "Please enter a subject (min 3 characters).";
      },
      message: function (value) {
        return value.trim().length >= 10 ? "" : "Please enter a message of at least 10 characters.";
      }
    };

    function showFieldError(field, message) {
      var errorEl = document.getElementById(field.id + "-error");
      if (errorEl) errorEl.textContent = message;
      if (message) {
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }
    }

    Object.keys(validators).forEach(function (fieldName) {
      var field = form.elements[fieldName];
      if (!field) return;
      field.addEventListener("blur", function () {
        showFieldError(field, validators[fieldName](field.value));
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Static site — no server to send this to.

      var isValid = true;
      Object.keys(validators).forEach(function (fieldName) {
        var field = form.elements[fieldName];
        if (!field) return;
        var error = validators[fieldName](field.value);
        showFieldError(field, error);
        if (error) isValid = false;
      });

      feedback.classList.remove("success", "error");

      if (isValid) {
        feedback.textContent = "Thanks! Your message has been received. Our team will reply within one business day.";
        feedback.classList.add("success");
        form.reset();
      } else {
        feedback.textContent = "Please fix the highlighted fields and try again.";
        feedback.classList.add("error");
      }

      feedback.focus();
    });
  }
});
