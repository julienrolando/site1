// Quiz de diagnostic — 5 questions, logique de mapping simple, sans backend.
(function () {
  const root = document.getElementById('diag-quiz');
  if (!root) return;

  const questions = [
    {
      key: 'profil',
      q: 'Vous êtes plutôt…',
      options: ['Particulier', 'Indépendant / freelance', 'Je ne sais pas encore']
    },
    {
      key: 'usage',
      q: 'Votre usage actuel de l\'IA ?',
      options: ['Jamais essayé', 'Un peu, sans méthode', 'Oui, régulièrement']
    },
    {
      key: 'besoin',
      q: 'Votre besoin principal ?',
      options: ['Mieux m\'organiser au quotidien', 'Automatiser une tâche répétitive', 'Produire des contenus / visuels']
    },
    {
      key: 'dispo',
      q: 'Votre disponibilité ?',
      options: ['Une seule séance me suffit', 'Je peux m\'investir sur plusieurs semaines', 'Je préfère déléguer complètement']
    },
    {
      key: 'contact',
      q: 'Comment préférez-vous être contacté ?',
      options: ['Email', 'Téléphone', 'Réserver directement un créneau']
    }
  ];

  let step = 0;
  const answers = {};

  const els = {
    progress: root.querySelector('.progress-bar > i'),
    body: root.querySelector('.quiz-body'),
  };

  function computeResult() {
    if (answers.dispo === 'Je préfère déléguer complètement') {
      return { tag: 'Recommandation', title: 'Mission à la carte / Pack lancement', desc: 'Vous préférez déléguer : on prend le sujet en charge de bout en bout, vous restez concentré sur votre activité.', link: 'offres.html#creation' };
    }
    if (answers.besoin === 'Produire des contenus / visuels') {
      return { tag: 'Recommandation', title: 'Création & Communication', desc: 'Des contenus qui vous ressemblent — posts, visuels, flyers — sans y passer vos soirées.', link: 'offres.html#creation' };
    }
    if (answers.profil === 'Indépendant / freelance' && answers.besoin === 'Automatiser une tâche répétitive') {
      return { tag: 'Recommandation', title: 'Pack Copilote IA', desc: 'Un audit de vos tâches chronophages et des automatisations durables mises en place avec vous.', link: 'offres.html#copilote' };
    }
    if (answers.profil === 'Particulier' && answers.besoin === 'Mieux m\'organiser au quotidien') {
      return { tag: 'Recommandation', title: 'Prise en main IA', desc: 'Reprenez la main sur votre quotidien grâce à l\'IA — sans jargon, à votre rythme.', link: 'offres.html#prise-en-main' };
    }
    return { tag: 'Recommandation', title: 'Prise en main IA', desc: 'Un premier échange pour cerner précisément ce que l\'IA peut faire pour vous.', link: 'offres.html' };
  }

  function render() {
    const pct = Math.min(100, (step / questions.length) * 100);
    els.progress.style.width = pct + '%';

    if (step >= questions.length) {
      const r = computeResult();
      els.body.innerHTML = `
        <div class="quiz-result">
          <span class="result-tag">${r.tag}</span>
          <h3>${r.title}</h3>
          <p>${r.desc}</p>
          <a class="btn btn-primary btn-block" href="${r.link}">Voir cette offre</a>
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
