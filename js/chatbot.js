/*
  SIMULATION DE CHATBOT — arbre de conversation scripté en JavaScript, sans backend ni IA réelle.
  <!-- EMPLACEMENT INTÉGRATION CHATBOT IA : remplacer cette logique par un appel à un vrai
       assistant conversationnel (ex: API Claude) quand l'outil sera choisi et configuré. -->
*/
(function () {
  const root = document.getElementById('site-chatbot');
  if (!root) return;

  const windowEl = root.querySelector('.chat-window');
  const optionsEl = root.querySelector('.chat-options');
  const state = {};

  function addMessage(text, from) {
    const div = document.createElement('div');
    div.className = 'msg ' + from;
    div.textContent = text;
    windowEl.appendChild(div);
    windowEl.scrollTop = windowEl.scrollHeight;
  }

  function showTyping(callback) {
    const t = document.createElement('div');
    t.className = 'msg bot typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    windowEl.appendChild(t);
    windowEl.scrollTop = windowEl.scrollHeight;
    setTimeout(() => { t.remove(); callback(); }, 650);
  }

  function setOptions(options) {
    optionsEl.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'chat-option';
      btn.type = 'button';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        addMessage(opt.label, 'user');
        optionsEl.innerHTML = '';
        showTyping(() => opt.next());
      });
      optionsEl.appendChild(btn);
    });
  }

  function botSay(text, options) {
    showTyping(() => {
      addMessage(text, 'bot');
      if (options) setOptions(options);
    });
  }

  function stepProfil() {
    setOptions([
      { label: 'Particulier', next: () => { state.profil = 'particulier'; stepBesoinParticulier(); } },
      { label: 'Indépendant / freelance', next: () => { state.profil = 'indep'; stepBesoinIndep(); } },
    ]);
  }

  function stepBesoinParticulier() {
    botSay('Très bien ! Qu\'aimeriez-vous améliorer en priorité ?', [
      { label: 'M\'organiser au quotidien', next: () => finish('Prise en main IA', 'offres.html#prise-en-main') },
      { label: 'Créer des contenus / visuels', next: () => finish('Création & Communication', 'offres.html#creation') },
    ]);
  }

  function stepBesoinIndep() {
    botSay('Compris. Votre priorité en ce moment ?', [
      { label: 'Automatiser des tâches répétitives', next: () => finish('Pack Copilote IA', 'offres.html#copilote') },
      { label: 'Produire du contenu régulièrement', next: () => finish('Création & Communication', 'offres.html#creation') },
    ]);
  }

  function finish(offer, link) {
    botSay(`D'après vos réponses, l'offre "${offer}" est la plus adaptée. Je vous propose un premier échange sans engagement pour en discuter.`, [
      { label: '📅 Réserver un créneau', next: () => { window.location.href = 'contact.html'; } },
      { label: `Voir l'offre "${offer}"`, next: () => { window.location.href = link; } },
      { label: 'Recommencer', next: () => { windowEl.innerHTML = ''; state.profil = null; start(); } },
    ]);
  }

  function start() {
    botSay('Bonjour 👋 Je peux vous aider à trouver l\'offre la plus adaptée à votre situation. Vous êtes plutôt particulier ou indépendant ?', null);
    setTimeout(stepProfil, 700);
  }

  start();
})();
