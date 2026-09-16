// Affiche un message de confirmation après soumission du formulaire Netlify (redirection évitée via fetch).
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() })
      .then(() => {
        form.classList.add('is-hidden');
        form.style.display = 'none';
        document.getElementById('form-success').classList.add('show');
      })
      .catch(() => { form.submit(); });
  });
});
