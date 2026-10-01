// Structure de données du portfolio — ajouter un projet ici suffit, pas besoin de toucher au HTML.
const CREATIONS = [
  { title: 'Projet à ajouter', category: 'Flyers' },
  { title: 'Projet à ajouter', category: 'Flyers' },
  { title: 'Projet à ajouter', category: 'Visuels de marque' },
  { title: 'Projet à ajouter', category: 'Visuels de marque' },
];

// ---------- Projets réels, en pleine largeur avec carrousel manuel (boutons ← →) ----------
const REAL_CASE_STUDIES = [
  {
    badge: 'Projet réalisé · Automatisation',
    title: 'Automatisation d\'une agence immobilière indépendante',
    contexte: 'Une agence indépendante de 5 agents reçoit chaque jour pièces d\'identité, mandats, diagnostics et justificatifs par email. Le classement manuel dans la plateforme de gestion était long, source d\'erreurs, sans interconnexion native avec le CRM — d\'où doublons de dossiers et documents égarés.',
    realisation: 'Audit des outils et de l\'interconnexion existante, cadrage fonctionnel (types de pièces, règles de rattachement, circuit de repli), puis développement d\'un programme de lecture et d\'analyse des emails qui classe automatiquement chaque pièce dans le bon dossier — avec un circuit « à vérifier » pour toute pièce non reconnue et des règles de classification paramétrables sans toucher au code.',
    resultat: 'Les agents sont déchargés du tri documentaire et peuvent se concentrer sur leur métier : plus aucun document perdu, et un contrôle humain conservé sur les cas ambigus.',
    images: [
      'img/creations/automatisation-agence-1.jpg',
      'img/creations/automatisation-agence-2.jpg',
      'img/creations/automatisation-agence-3.jpg',
      'img/creations/automatisation-agence-4.jpg',
      'img/creations/automatisation-agence-5.jpg',
      'img/creations/automatisation-agence-6.jpg',
      'img/creations/automatisation-agence-7.jpg',
      'img/creations/automatisation-agence-8.jpg',
      'img/creations/automatisation-agence-9.jpg',
    ],
  },
  {
    badge: 'Projet réalisé · Visuels de marque',
    title: 'Identité de marque d\'une agence immobilière',
    contexte: 'Une agence immobilière indépendante voulait une image professionnelle et cohérente, sans repartir de zéro à chaque document : supports disparates, peu de cohérence visuelle, besoin d\'un système réutilisable en autonomie pour des audiences variées (vendeurs, acheteurs, investisseurs, futurs agents).',
    realisation: 'Conception et livraison de l\'identité visuelle complète sous Canva : palette maîtrisée (gris ardoise et cyan), typographies, ton de communication, bibliothèque d\'icônes sur mesure, fiches de vente par type de bien, et organisation des fichiers et modèles pour une utilisation autonome.',
    resultat: 'Un kit de marque complet, cohérent et reconnaissable sur tous les supports — l\'agence peut désormais produire ses propres documents sans perdre en qualité visuelle.',
    images: [
      'img/creations/identite-marque-agence-1.jpg',
      'img/creations/identite-marque-agence-2.jpg',
      'img/creations/identite-marque-agence-3.jpg',
      'img/creations/identite-marque-agence-4.jpg',
      'img/creations/identite-marque-agence-5.jpg',
      'img/creations/identite-marque-agence-6.jpg',
      'img/creations/identite-marque-agence-7.jpg',
      'img/creations/identite-marque-agence-8.jpg',
      'img/creations/identite-marque-agence-9.jpg',
      'img/creations/identite-marque-agence-10.jpg',
    ],
  },
  {
    badge: 'Projet réalisé · Lancement de marque',
    title: 'Le Pin\'s Rose — Lancer une marque de zéro en 2 mois',
    contexte: 'Lancement d\'une marque de pin\'s « contrebande de luxe » (streetwear x haute joaillerie, cible Gen-Z et street-art) de zéro, en environ 2 mois (août à fin septembre 2026) : direction créative, boutique en ligne et canaux de vente à préparer pour le lancement.',
    realisation: '7 étapes de zéro au lancement : direction créative, développement produit (9 variantes), boutique Shopify sur mesure, cadre légal et logistique, puis trois canaux de vente et 15 visuels pour le lancement (Shopify, TikTok Shop, Instagram), avec préparation d\'un live TikTok.',
    resultat: 'Boutique en ligne live avec canaux de vente en place : fiche TikTok Shop France publiée avec 15 visuels produits, canal Meta configuré, et un test d\'achat client réussi jusqu\'au paiement.',
    images: [
      'img/creations/pins-rose-1.jpg',
      'img/creations/pins-rose-2.jpg',
      'img/creations/pins-rose-3.jpg',
      'img/creations/pins-rose-4.jpg',
      'img/creations/pins-rose-5.jpg',
      'img/creations/pins-rose-6.jpg',
      'img/creations/pins-rose-7.jpg',
      'img/creations/pins-rose-8.jpg',
      'img/creations/pins-rose-9.jpg',
      'img/creations/pins-rose-10.jpg',
    ],
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const filters = document.getElementById('filters');
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
    { threshold: 0.12 }
  );

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

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
    // Projets réels : carrousel manuel plein largeur.
    REAL_CASE_STUDIES.forEach((c) => {
      const el = document.createElement('div');
      el.className = 'case-study reveal';
      el.innerHTML = `
        <div class="case-study-visual">
          <img class="cs-slider-img" src="${c.images[0]}" alt="${escapeHtml(c.title)} — visuel 1" loading="lazy">
          <button type="button" class="demo-slider-btn demo-slider-prev" aria-label="Image précédente">‹</button>
          <button type="button" class="demo-slider-btn demo-slider-next" aria-label="Image suivante">›</button>
          <span class="demo-slider-counter">1 / ${c.images.length}</span>
        </div>
        <span class="demo-badge">${c.badge}</span>
        <h3 class="case-study-title">${c.title}</h3>
        <div class="cs-meta">
          <div><b>Contexte</b><br>${c.contexte}</div>
          <div><b>Réalisation</b><br>${c.realisation}</div>
          <div><b>Résultat</b><br>${c.resultat}</div>
        </div>`;
      let i = 0;
      const imgEl = el.querySelector('.cs-slider-img');
      const counterEl = el.querySelector('.demo-slider-counter');
      const show = (n) => {
        i = (n + c.images.length) % c.images.length;
        imgEl.src = c.images[i];
        imgEl.alt = `${c.title} — visuel ${i + 1}`;
        counterEl.textContent = `${i + 1} / ${c.images.length}`;
      };
      el.querySelector('.demo-slider-prev').addEventListener('click', () => show(i - 1));
      el.querySelector('.demo-slider-next').addEventListener('click', () => show(i + 1));
      cs.appendChild(el);
      io.observe(el);
    });
  }
});
