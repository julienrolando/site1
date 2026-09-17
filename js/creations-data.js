// Structure de données du portfolio — ajouter un projet ici suffit, pas besoin de toucher au HTML.
const CREATIONS = [
  {
    title: 'Salon L\'Éclat — Pack contenu mensuel',
    category: 'Posts réseaux sociaux',
    carousel: [
      'img/creations/salon-eclat-semaine-1.jpg',
      'img/creations/salon-eclat-semaine-2.jpg',
      'img/creations/salon-eclat-semaine-3.jpg',
      'img/creations/salon-eclat-semaine-4.jpg',
      'img/creations/salon-eclat-semaine-5.jpg',
    ],
    demo: 'salon-eclat',
  },
  {
    title: 'La Piazzetta — Pack contenu mensuel',
    category: 'Posts réseaux sociaux',
    carousel: [
      'img/creations/piazzetta-1.jpg',
      'img/creations/piazzetta-2.jpg',
      'img/creations/piazzetta-3.jpg',
      'img/creations/piazzetta-4.jpg',
      'img/creations/piazzetta-5.jpg',
    ],
    demo: 'piazzetta',
  },
  { title: 'Projet à ajouter', category: 'Flyers' },
  { title: 'Projet à ajouter', category: 'Visuels de marque' },
  { title: 'Projet à ajouter', category: 'Flyers' },
  { title: 'Projet à ajouter', category: 'Visuels de marque' },
];

// Démonstration détaillée affichée en fenêtre modale au clic sur la carte carrousel.
// Cas fictif, jamais présenté comme un vrai client (badge "Démonstration" toujours visible).
const SALON_ECLAT_DEMO = {
  title: 'Démonstration — Pack de contenu mensuel : Salon L\'Éclat',
  contexte: 'Un salon de coiffure qui n\'a ni le temps ni l\'envie de gérer ses réseaux sociaux au quotidien. Objectif : une présence Instagram cohérente et régulière, sans que le client ait à y penser.',
  semaines: [
    {
      image: 'img/creations/salon-eclat-semaine-1.jpg',
      legende: 'Bienvenue dans notre cocon coiffure 🌿',
      hashtags: '#salonleclat #toulouse',
      pourquoi: 'Poser le décor, donner envie de pousser la porte',
    },
    {
      image: 'img/creations/salon-eclat-semaine-2.jpg',
      legende: 'Nouvelle couleur, nouvelle énergie 🔥',
      hashtags: '#balayage #salonleclat',
      pourquoi: 'Mettre en avant le savoir-faire coloration',
    },
    {
      image: 'img/creations/salon-eclat-semaine-3.jpg',
      legende: 'Coupe nette, style affirmé ✂️',
      hashtags: '#coupehomme #salonleclat',
      pourquoi: 'Toucher aussi la clientèle masculine',
    },
    {
      image: 'img/creations/salon-eclat-semaine-4.jpg',
      legende: 'Le secret d\'une couleur parfaite 🎨',
      hashtags: '#coloration #salonleclat',
      pourquoi: 'Valoriser la technique, rassurer sur l\'expertise',
    },
    {
      image: 'img/creations/salon-eclat-semaine-5.jpg',
      legende: 'Transformation du jour ✨ Balayage + brushing',
      hashtags: '#salonleclat #coiffuretoulouse',
      pourquoi: 'Terminer le mois sur une preuve sociale forte',
    },
  ],
  resultat: 'Un mois de contenu prêt à publier, pensé pour alterner les styles (coloration, coupe homme/femme, ambiance salon) et donner une raison de revenir chaque semaine — sans que le salon n\'ait à improviser quoi poster un dimanche soir.',
};

const PIAZZETTA_DEMO = {
  title: 'Démonstration — Pack contenus mensuel : La Piazzetta',
  contexte: 'Une pizzeria de quartier qui vit surtout du bouche-à-oreille, mais qui peine à se rendre visible sur les réseaux face à des enseignes plus grosses. Objectif : donner envie, créer de l\'appétit, et remplir les tables du week-end.',
  semaines: [
    {
      image: 'img/creations/piazzetta-1.jpg',
      legende: 'Tout droit sortie du four 🔥🍕',
      hashtags: '#lapiazzetta #pizzanapolitaine',
      pourquoi: 'Le visuel le plus vendeur pour démarrer le mois, direct et gourmand',
    },
    {
      image: 'img/creations/piazzetta-2.jpg',
      legende: 'La pâte du jour, prête à danser 🥌',
      hashtags: '#lapiazzetta #paterachie',
      pourquoi: 'Montrer le savoir-faire artisanal, pas de la pizza industrielle',
    },
    {
      image: 'img/creations/piazzetta-3.jpg',
      legende: 'Venez vous installer chez nous ❤️',
      hashtags: '#lapiazzetta #trattoria',
      pourquoi: 'Donner envie de venir sur place, pas seulement en livraison',
    },
    {
      image: 'img/creations/piazzetta-4.jpg',
      legende: 'Que des produits frais, comme en Italie 🇮🇹',
      hashtags: '#lapiazzetta #produitsfrais',
      pourquoi: 'Rassurer sur la qualité et l\'authenticité des produits',
    },
    {
      image: 'img/creations/piazzetta-5.jpg',
      legende: 'Le vendredi soir comme on l\'aime 🍾😂',
      hashtags: '#lapiazzetta #entreamis',
      pourquoi: 'Terminer le mois sur une ambiance conviviale, inciter à réserver pour le week-end',
    },
  ],
  resultat: 'Un mois de contenu qui alterne le produit (pizza, ingrédients), le savoir-faire (la pâte), le lieu (la salle) et l\'expérience (entre amis) — pour donner plusieurs bonnes raisons de pousser la porte, pas juste "encore une photo de pizza".',
};

const DEMOS = { 'salon-eclat': SALON_ECLAT_DEMO, 'piazzetta': PIAZZETTA_DEMO };

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
  const carouselTimers = [];

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function renderGallery(filter) {
    if (!gallery) return;
    carouselTimers.forEach((t) => clearInterval(t));
    carouselTimers.length = 0;
    gallery.innerHTML = '';
    CREATIONS.filter((c) => filter === 'Tout' || c.category === filter).forEach((c) => {
      const el = document.createElement('div');
      el.className = 'gallery-item reveal';

      if (c.carousel) {
        el.classList.add('gallery-item-demo');
        const imgs = c.carousel.map((src, i) => `<img src="${src}" alt="${escapeHtml(c.title)} — visuel ${i + 1}" loading="lazy" class="${i === 0 ? 'active' : ''}">`).join('');
        el.innerHTML = `
          <div class="gallery-thumb gallery-carousel">${imgs}<span class="demo-badge demo-badge-carousel">Démonstration</span></div>
          <div class="gallery-info">
            <span class="cat">${c.category}</span>
            <h4>${c.title}</h4>
          </div>`;
        const slides = el.querySelectorAll('.gallery-carousel img');
        let idx = 0;
        const timer = setInterval(() => {
          slides[idx].classList.remove('active');
          idx = (idx + 1) % slides.length;
          slides[idx].classList.add('active');
        }, 2500);
        carouselTimers.push(timer);
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => openDemoModal(c.demo));
      } else {
        el.innerHTML = `
          <div class="gallery-thumb">Visuel à venir</div>
          <div class="gallery-info">
            <span class="cat">${c.category}</span>
            <h4>${c.title}</h4>
          </div>`;
      }
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

  // ---------- Fenêtre modale de démonstration ----------
  const overlay = document.createElement('div');
  overlay.className = 'demo-modal-overlay';
  overlay.innerHTML = `
    <div class="demo-modal" role="dialog" aria-modal="true">
      <button type="button" class="demo-modal-close" aria-label="Fermer">✕</button>
      <div class="demo-modal-body"></div>
    </div>`;
  document.body.appendChild(overlay);
  const modalBody = overlay.querySelector('.demo-modal-body');

  function closeModal() {
    overlay.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  function openDemoModal(key) {
    const demo = DEMOS[key];
    if (!demo) return;
    modalBody.innerHTML = `
      <span class="demo-badge">Démonstration</span>
      <h2 class="demo-modal-title">${demo.title}</h2>
      <h3 class="demo-modal-h3">Contexte</h3>
      <p>${demo.contexte}</p>
      <h3 class="demo-modal-h3">Le livrable</h3>
      <div class="demo-weeks">
        ${demo.semaines.map((s, i) => `
          <div class="demo-week">
            <img src="${s.image}" alt="Visuel semaine ${i + 1}" loading="lazy">
            <div>
              <span class="demo-week-num">Semaine ${i + 1}</span>
              <p class="demo-week-legende">« ${escapeHtml(s.legende)} »</p>
              <p class="demo-week-hashtags">${escapeHtml(s.hashtags)}</p>
              <p class="demo-week-why"><b>Pourquoi ce post :</b> ${escapeHtml(s.pourquoi)}</p>
            </div>
          </div>`).join('')}
      </div>
      <h3 class="demo-modal-h3">Le résultat</h3>
      <p>${demo.resultat}</p>
    `;
    overlay.classList.add('open');
    document.body.classList.add('modal-open');
  }

  overlay.querySelector('.demo-modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
