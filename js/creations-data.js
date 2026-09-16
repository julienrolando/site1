// Structure de données du portfolio — ajouter un projet ici suffit, pas besoin de toucher au HTML.
const CREATIONS = [
  { title: 'Projet à ajouter', category: 'Posts réseaux sociaux' },
  { title: 'Projet à ajouter', category: 'Posts réseaux sociaux' },
  { title: 'Projet à ajouter', category: 'Flyers' },
  { title: 'Projet à ajouter', category: 'Visuels de marque' },
  { title: 'Projet à ajouter', category: 'Flyers' },
  { title: 'Projet à ajouter', category: 'Visuels de marque' },
];

const CASE_STUDIES = [
  { client: 'Client à venir', format: 'Pack contenus mensuel', result: 'Résultat à venir', desc: 'Cette étude de cas sera complétée dès la première mission de création réalisée.' },
];

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const filters = document.getElementById('filters');
  if (!gallery) return;

  function renderGallery(filter) {
    gallery.innerHTML = '';
    CREATIONS.filter(c => filter === 'Tout' || c.category === filter).forEach(c => {
      const el = document.createElement('div');
      el.className = 'gallery-item reveal in';
      el.innerHTML = `
        <div class="gallery-thumb">Visuel à venir</div>
        <div class="gallery-info">
          <span class="cat">${c.category}</span>
          <h4>${c.title}</h4>
        </div>`;
      gallery.appendChild(el);
    });
  }

  if (filters) {
    filters.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGallery(btn.dataset.filter);
      });
    });
  }

  renderGallery('Tout');

  const cs = document.getElementById('case-studies');
  if (cs) {
    CASE_STUDIES.forEach(c => {
      const el = document.createElement('div');
      el.className = 'case-study reveal';
      el.innerHTML = `
        <div class="cs-meta">
          <div><b>Client</b><br>${c.client}</div>
          <div><b>Format</b><br>${c.format}</div>
          <div><b>Résultat</b><br>${c.result}</div>
        </div>
        <div><p>${c.desc}</p></div>`;
      cs.appendChild(el);
    });
    const io = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .12 });
    cs.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
});
