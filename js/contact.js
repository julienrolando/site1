// Soumission du formulaire de contact via Web3Forms (service gratuit d'envoi
// d'email, sans backend à héberger) — affiche un message de confirmation
// sans recharger la page.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Erreur');
      form.classList.add('is-hidden');
      form.style.display = 'none';
      document.getElementById('form-success').classList.add('show');
    } catch (err) {
      form.submit();
    }
  });
});
