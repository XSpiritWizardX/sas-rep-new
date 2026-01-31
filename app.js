const reveals = document.querySelectorAll('.reveal');

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

reveals.forEach((el) => observer.observe(el));

const form = document.getElementById('waitlist-form');
const status = document.getElementById('waitlist-status');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();

    if (!email) {
      status.textContent = 'Please enter a valid email.';
      return;
    }

    status.textContent = 'You are in! We will reach out with early access details.';
    form.reset();
  });
}
