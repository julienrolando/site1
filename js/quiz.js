// Quiz de diagnostic — 4 questions qui qualifient le besoin réel, sans backend.
(function () {
  const root = document.getElementById('diag-quiz');
  if (!root) return;

  const questions = [
    {
      key: 'situation',
      q: 'Votre situation ?',
      options: ['Particulier', 'Indépendant / freelance', 'Autre']
    },
    {
      key: 'usage',
      q: 'Votre usage actuel de l\'IA ?',
      options: ['Jamais essayé', 'Un peu, sans méthode', 'Oui, régulièrement']
    },
    {
      key: 'besoin',
      q: 'Votre besoin concret ?',
      options: ['Gagner du temps au quotidien', 'Automatiser une tâche professionnelle', 'Produire des contenus']
    },
    {
      key: 'frein',
      q: 'Qu\'est-ce qui vous freine aujourd\'hui ?',
      options: ['Le manque de temps', 'Je ne sais pas par où commencer', 'Je préfère déléguer entièrement']
    }
  ];

  let step = 0;
  const answers = {};

  const els = {
    progress: root.querySelector('.progress-bar > i'),
    body: root.querySelector('.quiz-body'),
  };

  const PILLARS = {
    'prise-en-main': { title: 'Prise en main', desc: 'Reprenez la main sur votre quotidien grâce à l\'IA — sans jargon, à votre rythme.', link: 'offres.html#prise-en-main' },
    'automatisation': { title: 'Automatisation', desc: 'Automatisez ce qui vous prend du temps, concentrez-vous sur ce qui compte.', link: 'offres.html#automatisation' },
    'creation': { title: 'Création', desc: 'Des contenus qui vous ressemblent, sans y passer vos soirées.', link: 'offres.html#creation' },
  };

  function computeResult() {
    if (answers.besoin === 'Produire des contenus') return PILLARS['creation'];
    if (answers.besoin === 'Automatiser une tâche professionnelle') return PILLARS['automatisation'];
    if (answers.frein === 'Je préfère déléguer entièrement') return PILLARS['automatisation'];
    return PILLARS['prise-en-main'];
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
      els.body.querySelector('.quiz-restart').addEventListener('click', () => { step = 0; Object.keys(answers).forEach(k => delete answers[k]); render(); });
      return;
    }

    const current = questions[step];
    els.body.innerHTML = `
      <p class="quiz-question">${step + 1}. ${current.q}</p>
      <div class="quiz-options">
        ${current.options.map(o => `<button class="quiz-option" type="button" data-value="${o}">${o}</button>`).join('')}
      </div>`;
    els.body.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        answers[current.key] = btn.dataset.value;
        step++;
        render();
      });
    });
  }

  render();
})();
