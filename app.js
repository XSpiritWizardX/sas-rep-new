const reveals = document.querySelectorAll('.reveal');

const onIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
reveals.forEach((el) => observer.observe(el));

const form = document.getElementById('waitlist-form');
const message = document.getElementById('waitlist-message');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value.trim();

    if (!email || !email.includes('@')) {
      message.textContent = 'Please enter a valid work email.';
      message.style.color = '#ff4d00';
      return;
    }

    message.textContent = `Thanks! ${email} is on the list.`;
    message.style.color = '#ffe900';
    form.reset();
  });
}
