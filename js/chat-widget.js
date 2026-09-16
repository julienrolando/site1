// Widget de chat flottant — connecté à un vrai assistant IA (API Claude via
// la fonction serverless Netlify /.netlify/functions/chat). La clé API reste
// côté serveur, jamais exposée ici.
(function () {
  const history = [];

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  const fab = el('button', 'chat-fab', '💬');
  fab.type = 'button';
  fab.setAttribute('aria-label', 'Ouvrir le chat');

  const panel = el('div', 'chat-panel');
  panel.innerHTML = `
    <div class="chat-panel-head">
      <div class="widget-head" style="margin-bottom:0;">
        <div class="avatar">💬</div>
        <div><strong>Assistant Conseil & IA</strong><span>Propulsé par Claude (Anthropic)</span></div>
      </div>
      <button type="button" class="chat-panel-close" aria-label="Fermer le chat">✕</button>
    </div>
    <div class="chat-window"></div>
    <form class="chat-input-row">
      <input type="text" placeholder="Écrivez votre message…" aria-label="Votre message" autocomplete="off">
      <button type="submit" class="btn btn-primary" aria-label="Envoyer">→</button>
    </form>
  `;

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(fab);
    document.body.appendChild(panel);

    const windowEl = panel.querySelector('.chat-window');
    const form = panel.querySelector('.chat-input-row');
    const input = form.querySelector('input');
    const closeBtn = panel.querySelector('.chat-panel-close');

    function addMessage(text, from) {
      const div = el('div', 'msg ' + from, text);
      windowEl.appendChild(div);
      windowEl.scrollTop = windowEl.scrollHeight;
      return div;
    }

    function showTyping() {
      const t = el('div', 'msg bot typing', '<span></span><span></span><span></span>');
      windowEl.appendChild(t);
      windowEl.scrollTop = windowEl.scrollHeight;
      return t;
    }

    let opened = false;
    function openPanel() {
      panel.classList.add('open');
      fab.classList.add('is-open');
      if (!opened) {
        opened = true;
        addMessage('Bonjour 👋 Je peux répondre à vos questions et vous orienter vers l\'offre la plus adaptée : Prise en main, Automatisation ou Création. Que puis-je faire pour vous ?', 'bot');
      }
      input.focus();
    }
    function closePanel() {
      panel.classList.remove('open');
      fab.classList.remove('is-open');
    }

    fab.addEventListener('click', () => {
      panel.classList.contains('open') ? closePanel() : openPanel();
    });
    closeBtn.addEventListener('click', closePanel);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      addMessage(text, 'user');
      history.push({ role: 'user', content: text });

      const typing = showTyping();
      form.querySelector('button').disabled = true;

      try {
        const res = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });
        const data = await res.json();
        typing.remove();
        const reply = data.reply || "Désolé, une erreur est survenue. Vous pouvez aussi passer par le formulaire de contact.";
        addMessage(reply, 'bot');
        history.push({ role: 'assistant', content: reply });
      } catch (err) {
        typing.remove();
        addMessage("Je n'arrive pas à me connecter pour le moment. N'hésitez pas à utiliser le formulaire de contact.", 'bot');
      } finally {
        form.querySelector('button').disabled = false;
      }
    });
  });
})();
