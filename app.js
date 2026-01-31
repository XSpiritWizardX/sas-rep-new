const revealElements = document.querySelectorAll('.reveal');
const form = document.getElementById('waitlist-form');
const status = document.getElementById('form-status');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const email = data.get('email');
  status.textContent = `Thanks, ${email}! You’re on the list.`;
  form.reset();
});
