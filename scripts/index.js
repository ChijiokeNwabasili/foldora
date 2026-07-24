"use strict";

// Mobile Navigation

const menuToggle = document.getElementById("menu-toggle");

if (menuToggle) {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.checked = false;
      document.body.classList.remove("no-scroll");
    });
  });

  menuToggle.addEventListener("change", () => {
    document.body.classList.toggle("no-scroll", menuToggle.checked);
  });
}

// FAQ Interaction

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const allItems = document.querySelectorAll(".faq-item");

    allItems.forEach((faq) => {
      if (faq !== item) {
        faq.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

// Contact Form Validation

function setupFormValidation(formId) {
  const form = document.getElementById(formId);

  if (!form) return;

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const phoneInput = document.getElementById("contact-phone");
  const messageInput = document.getElementById("contact-message");

  const nameError = document.getElementById("contact-name-error");
  const emailError = document.getElementById("contact-email-error");
  const phoneError = document.getElementById("contact-phone-error");
  const messageError = document.getElementById("contact-message-error");

  if (
    !nameInput ||
    !emailInput ||
    !phoneInput ||
    !messageInput ||
    !nameError ||
    !emailError ||
    !phoneError ||
    !messageError
  ) {
    return;
  }

  function validateName() {
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter at least 2 characters.";
      return false;
    }

    nameError.textContent = "";
    return true;
  }

  function validateEmail() {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

    if (!pattern.test(emailInput.value.trim())) {
      emailError.textContent = "Enter a valid email address.";
      return false;
    }

    emailError.textContent = "";
    return true;
  }

  function validatePhone() {
    const pattern = /^\+?\d{7,15}$/;

    if (!pattern.test(phoneInput.value.trim())) {
      phoneError.textContent = "Enter a valid phone number (7-15 digits).";
      return false;
    }

    phoneError.textContent = "";
    return true;
  }

  function validateMessage() {
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      return false;
    }

    messageError.textContent = "";
    return true;
  }

  // Real-time validation
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  messageInput.addEventListener("input", validateMessage);

  // Form submission
  form.addEventListener("submit", (event) => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
      event.preventDefault();
      return;
    }

    setTimeout(() => form.reset(), 10);
  });
}

setupFormValidation("contact-form");
