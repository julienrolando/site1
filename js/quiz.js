// Quiz de diagnostic — 4 questions qui qualifient réellement le besoin,
// scoring pondéré sur les 3 piliers, sans backend.
(function () {
  const root = document.getElementById('diag-quiz');
  if (!root) return;

  const questions = [
    {
      key: 'situation',
      q: 'Votre situation ?',
      options: [
        { label: 'Particulier', scores: { 'prise-en-main': 1 } },
        { label: 'Indépendant / freelance', scores: { automatisation: 1, creation: 1 } },
        { label: 'Autre', scores: {} },
      ],
    },
    {
      key: 'usage',
      q: 'Votre usage actuel de l\'IA ?',
      options: [
        { label: 'Jamais essayé', scores: { 'prise-en-main': 2 } },
        { label: 'Un peu, sans méthode', scores: { 'prise-en-main': 1, automatisation: 1 } },
        { label: 'Oui, régulièrement', scores: { automatisation: 1, creation: 1 } },
      ],
    },
    {
      key: 'besoin',
      q: 'Votre besoin concret ?',
      options: [
        { label: 'Gagner du temps au quotidien', scores: { 'prise-en-main': 3 } },
        { label: 'Automatiser une tâche professionnelle', scores: { automatisation: 3 } },
        { label: 'Produire des contenus', scores: { creation: 3 } },
      ],
    },
    {
      key: 'frein',
      q: 'Qu\'est-ce qui vous freine aujourd\'hui ?',
      options: [
        { label: 'Le manque de temps', scores: { automatisation: 1 } },
        { label: 'Je ne sais pas par où commencer', scores: { 'prise-en-main': 2 } },
        { label: 'Je préfère déléguer entièrement', scores: { automatisation: 2, creation: 1 } },
      ],
    },
  ];

  let step = 0;
  const answers = {};
  const scores = { 'prise-en-main': 0, automatisation: 0, creation: 0 };

  const els = {
    progress: root.querySelector('.progress-bar > i'),
    body: root.querySelector('.quiz-body'),
  };

  const PILLARS = {
    'prise-en-main': {
      title: 'Prise en main',
      desc: 'Reprenez la main sur votre quotidien grâce à l\'IA — sans jargon, à votre rythme.',
      link: 'offres.html#prise-en-main',
    },
    automatisation: {
      title: 'Automatisation',
      desc: 'Automatisez ce qui vous prend du temps, concentrez-vous sur ce qui compte.',
      link: 'offres.html#automatisation',
    },
    creation: {
      title: 'Création',
      desc: 'Des contenus qui vous ressemblent, sans y passer vos soirées.',
      link: 'offres.html#creation',
    },
  };

  function computeResult() {
    // Le besoin exprimé (question 3) reste le signal le plus fort ; les autres
    // réponses affinent le résultat en cas d'égalité ou de besoin ambigu.
    let best = 'prise-en-main';
    let bestScore = -1;
    Object.keys(scores).forEach((key) => {
      if (scores[key] > bestScore) {
        bestScore = scores[key];
        best = key;
      }
    });
    return PILLARS[best];
  }

  function render() {
    const pct = Math.min(100, (step / questions.length) * 100);
    els.progress.style.width = pct + '%';

    if (step >= questions.length) {
      const r = computeResult();
      els.body.innerHTML = `
        <div class="quiz-result">
          <span class="result-tag">Recommandation</span>
          <h3>${r.title}</h3>
          <p>${r.desc}</p>
          <a class="btn btn-primary btn-block" href="${r.link}">Voir ce pilier</a>
          <a class="btn btn-ghost btn-block" style="margin-top:10px" href="contact.html">Réserver un échange</a>
          <button class="quiz-restart" type="button">Refaire le diagnostic</button>
        </div>`;
      els.body.querySelector('.quiz-restart').addEventListener('click', () => {
        step = 0;
        Object.keys(answers).forEach((k) => delete answers[k]);
        Object.keys(scores).forEach((k) => { scores[k] = 0; });
        render();
      });
      return;
    }

    const current = questions[step];
    els.body.innerHTML = `
      <p class="quiz-question">${step + 1}. ${current.q}</p>
      <div class="quiz-options">
        ${current.options.map((o, i) => `<button class="quiz-option" type="button" data-index="${i}">${o.label}</button>`).join('')}
      </div>`;
    els.body.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        const opt = current.options[Number(btn.dataset.index)];
        answers[current.key] = opt.label;
        Object.entries(opt.scores).forEach(([pillar, pts]) => { scores[pillar] += pts; });
        step++;
        render();
      });
    });
  }

  render();
})();
