// Structure de données du portfolio — ajouter un projet ici suffit, pas besoin de toucher au HTML.
const CREATIONS = [
  { title: 'Projet à ajouter', category: 'Posts réseaux sociaux' },
  { title: 'Projet à ajouter', category: 'Posts réseaux sociaux' },
  { title: 'Projet à ajouter', category: 'Flyers' },
  { title: 'Projet à ajouter', category: 'Visuels de marque' },
  { title: 'Projet à ajouter', category: 'Flyers' },
  { title: 'Projet à ajouter', category: 'Visuels de marque' },
];

// Démonstrations — cas fictifs illustrant chaque pilier, jamais présentés
// comme de vrais clients (badge "Démonstration" affiché sur chaque carte).
const CASE_STUDIES = [
  {
    badge: 'Démonstration · Pilier Création',
    title: 'Kit de lancement réseaux sociaux',
    image: 'img/demo-creation-kit-lancement.jpg',
    alt: 'Trois publications Instagram avec une identité visuelle cohérente pour un commerce de café et boulangerie fictif',
    contexte: 'Un commerce fictif souhaite lancer son compte Instagram avec une identité visuelle cohérente dès le premier post.',
    realisation: '3 visuels de posts pensés comme un mini kit de lancement : même palette, même typographie, un fil visuel reconnaissable.',
    resultat: 'Un aperçu concret de ce que donne un pack de contenus mensuel, adaptable à une vraie activité.',
  },
  {
    badge: 'Démonstration · Pilier Automatisation',
    title: 'Automatisation de facturation',
    image: 'img/demo-automatisation-facturation.jpg',
    alt: 'Photo avant/après d\'un artisan fictif : débordé par sa facturation manuelle, puis serein grâce à un processus automatisé',
    contexte: 'Un artisan fictif perd plusieurs heures chaque mois à établir ses factures et relancer les clients en retard.',
    realisation: 'Schéma avant/après : un processus manuel et répétitif transformé en flux automatisé (génération, envoi, relances programmées).',
    resultat: 'Une illustration du temps gagné une fois les tâches répétitives déléguées à l\'automatisation.',
  },
  {
    badge: 'Démonstration · Pilier Prise en main',
    title: 'Assistant IA personnalisé',
    image: 'img/demo-prise-en-main-assistant.jpg',
    alt: 'Personne fictive utilisant une tablette pour gérer son agenda grâce à un assistant IA',
    contexte: 'Une personne peu à l\'aise avec la technique veut mieux gérer ses rendez-vous et sa correspondance au quotidien.',
    realisation: 'Mise en place d\'un assistant IA simple pour trier les mails, préparer des réponses et organiser l\'agenda.',
    resultat: 'Un cas type de ce que permet un accompagnement Prise en main, sans jargon ni prérequis technique.',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const filters = document.getElementById('filters');
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
    { threshold: 0.12 }
  );

  function renderGallery(filter) {
    if (!gallery) return;
    gallery.innerHTML = '';
    CREATIONS.filter((c) => filter === 'Tout' || c.category === filter).forEach((c) => {
      const el = document.createElement('div');
      el.className = 'gallery-item reveal';
      el.innerHTML = `
        <div class="gallery-thumb">Visuel à venir</div>
        <div class="gallery-info">
          <span class="cat">${c.category}</span>
          <h4>${c.title}</h4>
        </div>`;
      gallery.appendChild(el);
      io.observe(el);
    });
  }

  if (gallery) {
    if (filters) {
      filters.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          filters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          renderGallery(btn.dataset.filter);
        });
      });
    }
    renderGallery('Tout');
  }

  const cs = document.getElementById('case-studies');
  if (cs) {
    CASE_STUDIES.forEach((c) => {
      const el = document.createElement('div');
      el.className = 'case-study reveal';
      el.innerHTML = `
        <div class="case-study-visual"><img src="${c.image}" alt="${c.alt}" loading="lazy"></div>
        <span class="demo-badge">${c.badge}</span>
        <h3 class="case-study-title">${c.title}</h3>
        <div class="cs-meta">
          <div><b>Contexte</b><br>${c.contexte}</div>
          <div><b>Réalisation</b><br>${c.realisation}</div>
          <div><b>Résultat</b><br>${c.resultat}</div>
        </div>`;
      cs.appendChild(el);
      io.observe(el);
    });
  }
});
