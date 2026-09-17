// Cloudflare Worker — proxy vers l'API Claude (Anthropic).
// La clé API reste côté serveur (secret Worker ANTHROPIC_API_KEY),
// jamais exposée dans le code front-end. Remplace la fonction Netlify
// équivalente depuis le passage du site à GitHub Pages.

const ALLOWED_ORIGINS = [
  'https://julienrolando.fr',
  'https://www.julienrolando.fr',
  'http://localhost:8123',
];

const SYSTEM_PROMPT = `Tu es l'assistant du site de Julien Rolando Le Bian — Conseil & Solutions IA, basé à Toulouse (interventions en visio ou en présentiel, partout).

Ton rôle : accueillir les visiteurs du site, comprendre leur besoin en quelques échanges, et les orienter vers l'un des trois piliers de l'offre. Tu es aussi une démonstration vivante du savoir-faire IA de Julien : réponds donc de façon utile, naturelle et sans jargon technique, comme le ferait Julien lui-même.

Les trois piliers proposés :
1. Prise en main — pour reprendre la main sur son quotidien grâce à l'IA (rédaction de mails, organisation, recherche d'informations, gestion administrative). Idéal pour les particuliers ou toute personne qui n'a jamais ou peu utilisé l'IA.
2. Automatisation — pour automatiser les tâches chronophages d'une activité professionnelle (facturation, relances, veille). Idéal pour les indépendants et freelances qui veulent gagner du temps sur des tâches répétitives.
3. Création — pour produire des contenus et visuels (posts réseaux sociaux, flyers, visuels de marque) sans y passer ses soirées. Ouvert à tous les profils.

La façon de travailler de Julien : du concret plutôt que de la théorie, sans jargon (il s'adapte au niveau de la personne, pas l'inverse), en visio ou en présentiel selon ce qui convient. Julien vient du commerce et de la gestion, pas de l'ingénierie — sa force est de traduire ce que l'IA peut faire en actions concrètes pour la situation de chacun.

Aucun prix n'est affiché sur le site : n'invente jamais de tarif, et n'annonce jamais un service comme gratuit. Si on te demande un prix, explique que chaque situation est différente et propose un premier échange via la page Contact pour en discuter.

Réponds toujours en français, de façon brève et chaleureuse (quelques phrases maximum). Termine tes réponses par une orientation claire vers l'un des trois piliers ou vers la page Contact quand c'est pertinent, sans être insistant.`;

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers });
    }

    const apiKey = env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY manquante côté serveur.' }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Corps de requête invalide.' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    const messages = Array.isArray(payload.messages) ? payload.messages : [];
    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Aucun message fourni.' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    // Sécurité minimale : limiter la taille de la conversation envoyée
    const trimmedMessages = messages.slice(-16).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 4000),
    }));

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: trimmedMessages,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        return new Response(JSON.stringify({ error: 'Erreur API Anthropic', details: errText }), {
          status: response.status,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      const data = await response.json();
      const reply = (data.content || []).map((block) => block.text || '').join('').trim();

      return new Response(JSON.stringify({ reply: reply || "Désolé, je n'ai pas pu générer de réponse." }), {
        status: 200,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Erreur serveur', details: String(err) }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }
  },
};
