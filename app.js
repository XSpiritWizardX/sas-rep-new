document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));

  const toggles = document.querySelectorAll('[data-billing]');
  const priceEls = document.querySelectorAll('.price[data-month][data-year]');
  const noteEls = document.querySelectorAll('.cycle-note[data-month-note][data-year-note]');

  function setBilling(mode) {
    toggles.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.billing === mode));
    priceEls.forEach((el) => {
      el.textContent = mode === 'yearly' ? el.dataset.year : el.dataset.month;
    });
    noteEls.forEach((el) => {
      el.textContent = mode === 'yearly' ? el.dataset.yearNote : el.dataset.monthNote;
    });
  }

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => setBilling(btn.dataset.billing));
  });

  const form = document.getElementById('waitlist-form');
  const emailInput = document.getElementById('email');
  const note = document.getElementById('form-note');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      note.textContent = 'Enter a valid work email to join the waitlist.';
      note.classList.add('error');
      emailInput.focus();
      return;
    }

    note.classList.remove('error');
    note.textContent = 'Reserving your spot...';

    setTimeout(() => {
      note.textContent = 'You are in. Watch your inbox for early access details.';
      form.reset();
    }, 700);
  });
});
