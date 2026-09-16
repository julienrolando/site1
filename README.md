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
- Formulaire de contact via **Netlify Forms** (`data-netlify="true"`)
- Hébergement : **Netlify**, déploiement automatique à chaque push sur la branche `main`
- Nom de domaine : `julienrolando.fr`, acheté chez **OVH**, DNS pointés vers Netlify (enregistrements A vers `75.2.60.5`)
- Email professionnel : **OVH MX Plan** (achat unique, pas d'abonnement), adresse `contact@julienrolando.fr` déjà créée

## Direction visuelle

- **Palette** : fond sombre `#0f1a33`, bleu marine `#1e3a8a`, cyan accent `#5ec8d8`, textes clairs `#eef2ff` / `#c3cbe0` / `#aab4cc`
- **Typographie** : titres en `Sora` (600-800), texte courant en `Inter` (400-600)
- **Style** : Bento Grid pour les offres + point d'entrée interactif (quiz de diagnostic + simulation de chatbot) dès le hero de la page d'accueil
- Logo fourni séparément, à ne pas modifier

## Pages du site

1. **Accueil** (`index.html`) — hero avec quiz, aperçu des 3 offres, bandeau diagnostic/chatbot
2. **Offres** (`offres.html`) — 3 offres détaillées (Prise en main IA, Pack Copilote IA, Création & Communication), formats multiples, **aucun prix affiché**
3. **Créations** (`creations.html`) — portfolio, actuellement en placeholders (galerie + études de cas), à remplir au fur et à mesure des vrais projets réalisés
4. **À propos** (`a-propos.html`) — parcours commerce/gestion, positionnement
5. **Contact** (`contact.html`) — formulaire Netlify Forms ; **pas de widget de calendrier externe intégré** (Calendly non configuré) — emplacement prévu dans le code (`<!-- EMPLACEMENT WIDGET CALENDRIER -->`)
6. **Mentions légales** (`mentions-legales.html`) — infos légales + politique de confidentialité RGPD

## Fonctionnalités à connaître

- **Quiz de diagnostic** : 5 questions en JS pur, sans backend, oriente vers l'une des 3 offres selon les réponses
- **Chatbot** : simulation scriptée en JS (pas de vraie IA branchée), suit la même logique que le quiz. Emplacement prévu pour brancher un vrai outil plus tard (`<!-- EMPLACEMENT INTÉGRATION CHATBOT IA -->`)
- **Calendrier de rendez-vous** : pas encore intégré (ni Calendly ni autre) — CTA "Réserver un échange" renvoie vers le formulaire de contact en attendant

## Ce qui reste en attente / à faire un jour

- [ ] Remplacer les placeholders de la page Créations par de vrais projets
- [ ] Décider si un outil de calendrier (Calendly ou équivalent) est branché, et où
- [ ] Décider si un vrai chatbot IA remplace la simulation actuelle
- [ ] Vérifier que l'adresse de l'hébergeur (Netlify) dans les mentions légales reste à jour

## Pour toute nouvelle session Claude Code

Ce fichier résume l'état du projet à un instant T — toujours vérifier le contenu réel des fichiers avant de faire une hypothèse sur ce qui existe déjà (ce README peut ne pas avoir été mis à jour après la dernière modification).
