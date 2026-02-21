const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const form = document.getElementById('waitlist-form');
const note = document.getElementById('form-note');

if (form && note) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput || !emailInput.value || !emailInput.checkValidity()) {
      note.textContent = 'Enter a valid work email to continue.';
      note.style.color = '#ffb59b';
      return;
    }

    const button = form.querySelector('button');
    if (button) {
      button.disabled = true;
      button.textContent = 'Saving...';
    }

    setTimeout(() => {
      note.textContent = 'You are on the waitlist. We will send your invite soon.';
      note.style.color = '#98f9d7';
      form.reset();
      if (button) {
        button.textContent = 'Request invite';
        button.disabled = false;
      }
    }, 700);
  });
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
