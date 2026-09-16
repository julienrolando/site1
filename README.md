# Site Julien Rolando Le Bian — Conseil & Solutions IA

Site vitrine statique (HTML/CSS/JS, sans framework) pour la micro-entreprise de conseil, formation IA et création de contenus de Julien Rolando Le Bian.

## Informations de l'entreprise

- **Dirigeant** : Julien Rolando Le Bian — EI (Entrepreneur Individuel)
- **SIREN** : 830 012 175 — **SIRET** : 830 012 175 00055 — **Code APE** : 6202A
- **Adresse** : 10 Avenue Henri Guillaumet, Bât. C109, Étg 3, App. 109 — 31500 Toulouse
- **TVA** : Non applicable (franchise en base, micro-entreprise)
- **Site** : julienrolando.fr — **Email** : contact@julienrolando.fr — **Tél** : 06 52 49 48 73

## Stack technique

- HTML / CSS / JS vanilla, pas de framework
- Formulaire de contact via **Netlify Forms** (`data-netlify="true"`) — un seul champ profil a été retiré, le formulaire ne demande plus que nom / email / message
- **Chatbot IA réel** connecté à l'API Claude (Anthropic) via une fonction serverless Netlify (`netlify/functions/chat.js`) — la clé API (`ANTHROPIC_API_KEY`) est une variable d'environnement Netlify, jamais dans le code. **Sans cette variable configurée sur Netlify, le chatbot ne répond pas** (message d'erreur générique côté visiteur).
- Hébergement : **Netlify**, déploiement automatique à chaque push sur la branche `main`
- Nom de domaine : `julienrolando.fr`, acheté chez **OVH**, DNS pointés vers Netlify (enregistrements A vers `75.2.60.5`)
- Email professionnel : **OVH MX Plan** (achat unique, pas d'abonnement), adresse `contact@julienrolando.fr` déjà créée

## Direction visuelle

- **Palette** : fond sombre `#0f1a33`, bleu marine `#1e3a8a`, cyan accent `#5ec8d8`, textes clairs `#eef2ff` / `#c3cbe0` / `#aab4cc`
- **Typographie** : titres en `Sora` (600-800), texte courant en `Inter` (400-600)
- **Style** : Bento Grid pour les 3 piliers (chacun avec un visuel généré par IA, `img/pilier-*.png`) + point d'entrée interactif (quiz de diagnostic + chatbot IA flottant) dès le hero de la page d'accueil
- Logo fourni par le client (`img/logo.png` / `img/logo-icon.png`), utilisé pour le favicon et le header/footer — à ne pas modifier
- Aucune restriction géographique affichée : les interventions sont présentées "en visio ou en présentiel", sans mention de ville imposée (Toulouse reste l'adresse légale/de base, cf. mentions légales)
- Aucune mention de prix ni de gratuité dans le hero de l'accueil

## Les 3 piliers (remplacent les anciennes offres par profil)

1. **Prise en main** (`#prise-en-main`) — reprendre la main sur son quotidien grâce à l'IA
2. **Automatisation** (`#automatisation`) — automatiser les tâches chronophages d'une activité pro
3. **Création** (`#creation`) — produire des contenus et visuels

Ces piliers ne sont plus associés à un profil (particulier/indépendant) mais à un besoin. Les formats n'affichent plus de durée chiffrée (ex: "1h30-2h") — la durée s'adapte au besoin réel.

## Pages du site

1. **Accueil** (`index.html`) — hero, aperçu des 3 piliers avec visuels, quiz de diagnostic (4 questions)
2. **Offres** (`offres.html`) — 3 piliers détaillés, formats multiples, **aucun prix affiché**
3. **Créations** (`creations.html`) — portfolio, actuellement en placeholders (galerie + études de cas), à remplir au fur et à mesure des vrais projets réalisés
4. **À propos** (`a-propos.html`) — parcours commerce/gestion en paragraphes continus (pas de liste à puces)
5. **Contact** (`contact.html`) — formulaire Netlify Forms simplifié (nom / email / message) ; le lien nav "Contact" et le CTA "Réserver un échange" pointent tous deux vers ce même formulaire ; **pas de widget de calendrier externe intégré** (Calendly non configuré) — emplacement prévu dans le code (`<!-- EMPLACEMENT WIDGET CALENDRIER -->`)
6. **Mentions légales** (`mentions-legales.html`) — infos légales + politique de confidentialité RGPD (page non modifiée)

## Fonctionnalités à connaître

- **Quiz de diagnostic** (`js/quiz.js`) : 4 questions (situation / usage actuel / besoin concret / frein), sans backend, oriente vers l'un des 3 piliers
- **Chatbot IA** (`js/chat-widget.js` + `netlify/functions/chat.js`) : widget flottant en bas à droite, fermé par défaut. Appelle l'API Claude côté serveur avec un prompt système qui connaît les 3 piliers et la façon de travailler de Julien. **Nécessite `ANTHROPIC_API_KEY` dans les variables d'environnement Netlify** (Project configuration → Environment variables) pour fonctionner en production.
- **Calendrier de rendez-vous** : pas encore intégré (ni Calendly ni autre) — le formulaire de contact fait office de point d'entrée unique en attendant

## Ce qui reste en attente / à faire un jour

- [ ] **Créer une clé API sur console.anthropic.com et l'ajouter comme variable d'environnement `ANTHROPIC_API_KEY` sur Netlify** — sans ça le chatbot ne fonctionne pas en production
- [ ] Remplacer les placeholders de la page Créations par de vrais projets
- [ ] Décider si un outil de calendrier (Calendly ou équivalent) est branché, et où
- [ ] Vérifier que l'adresse de l'hébergeur (Netlify) dans les mentions légales reste à jour

## Pour toute nouvelle session Claude Code

Ce fichier résume l'état du projet à un instant T — toujours vérifier le contenu réel des fichiers avant de faire une hypothèse sur ce qui existe déjà (ce README peut ne pas avoir été mis à jour après la dernière modification).
