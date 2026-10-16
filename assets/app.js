/* ============================================================
   À RENSEIGNER UNE SEULE FOIS : réception des demandes par email.
   Colle ici l'adresse de ton formulaire Formspree (voir PUBLIER.md).
   Exemple : window.FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
   Tant que la ligne reste vide, le questionnaire affiche la confirmation
   et le mémo bascule sur un email pré-rempli. Les deux l'utilisent.
   ============================================================ */
window.FORM_ENDPOINT = '';

(function(){
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Année ---------- */
  var yEl = document.getElementById('year'); if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---------- Header : état collé + barre de progression ---------- */
  var header = document.getElementById('header');
  var sticky = document.getElementById('stickyCta');
  if (!header) return;
  var alwaysLight = header.classList.contains('header--light');
  var ticking = false;
  function onScroll(){
    var y = window.scrollY || window.pageYOffset;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-stuck', alwaysLight || y > 40);
    header.style.setProperty('--progress', (h > 0 ? (y / h) * 100 : 0) + '%');
    if (sticky) sticky.classList.toggle('is-visible', y > window.innerHeight * 0.8);
    ticking = false;
  }
  window.addEventListener('scroll', function(){
    if (!ticking){ ticking = true; window.requestAnimationFrame(onScroll); }
  }, {passive:true});
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var drawerClose = document.getElementById('drawerClose');
  function setDrawer(open){
    if (open) drawer.hidden = false;
    requestAnimationFrame(function(){ drawer.classList.toggle('is-open', open); });
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('no-scroll', open);
    if (!open) setTimeout(function(){ if(!drawer.classList.contains('is-open')) drawer.hidden = true; }, 320);
    else { var f = drawer.querySelector('a'); if (f) f.focus(); }
  }
  burger.addEventListener('click', function(){ setDrawer(burger.getAttribute('aria-expanded') !== 'true'); });
  drawerClose.addEventListener('click', function(){ setDrawer(false); burger.focus(); });
  drawer.addEventListener('click', function(e){ if (e.target.tagName === 'A') setDrawer(false); });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && drawer.classList.contains('is-open')){ setDrawer(false); burger.focus(); }
  });

  /* ---------- Titre manuscrit : écriture et rejeu ---------- */
  (function(){
    var t = document.querySelector('.hero__title');
    if (!t || reduced) return;
    function play(){
      t.classList.remove('is-writing');
      void t.offsetWidth;            /* force le redémarrage de l'animation */
      t.classList.add('is-writing');
    }
    play();
    if ('IntersectionObserver' in window){
      var seen = true;
      new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if (en.isIntersecting && !seen){ seen = true; play(); }
          else if (!en.isIntersecting){ seen = false; t.classList.remove('is-writing'); }
        });
      }, {threshold:0.55}).observe(t);
    }
  })();

  /* ---------- Reveal au scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal],[data-stagger]');
  if ('IntersectionObserver' in window && !reduced){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, {rootMargin:'0px 0px -12% 0px', threshold:0.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-in'); });
  }

  /* ---------- Compteurs ---------- */
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced){ el.innerHTML = target + '<span class="suffix">' + suffix + '</span>'; return; }
    var start = performance.now(), dur = 1400;
    function frame(now){
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.innerHTML = Math.round(target * eased) + '<span class="suffix">' + suffix + '</span>';
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window){
    var ioC = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ animateCount(en.target); ioC.unobserve(en.target); }
      });
    }, {threshold:0.6});
    counters.forEach(function(el){ ioC.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Boutons magnétiques + cartes réactives ---------- */
  if (!reduced && window.matchMedia('(hover: hover)').matches){
    document.querySelectorAll('[data-magnet]').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.16;
        var y = (e.clientY - r.top - r.height / 2) * 0.22;
        btn.style.transform = 'translate(' + x + 'px,' + (y - 2) + 'px) scale(1.015)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
    });
    document.querySelectorAll('[data-tilt]').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ---------- Parallax doux ---------- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!reduced && parallaxEls.length){
    var pTicking = false;
    window.addEventListener('scroll', function(){
      if (pTicking) return;
      pTicking = true;
      requestAnimationFrame(function(){
        var y = window.scrollY || 0;
        parallaxEls.forEach(function(el){
          var f = parseFloat(el.getAttribute('data-parallax')) || 0.05;
          if (y < window.innerHeight * 1.6) el.style.transform = 'translate3d(0,' + (-y * f) + 'px,0)';
        });
        pTicking = false;
      });
    }, {passive:true});
  }

  /* ---------- Sélecteur avant / après ---------- */
  (function(){
    var track = document.getElementById('switchTrack');
    var showcase = document.getElementById('showcase');
    if (!track || !showcase) return;
    var tabs = [document.getElementById('tab-before'), document.getElementById('tab-after')];
    var panels = [document.getElementById('panel-before'), document.getElementById('panel-after')];
    var current = 0;

    function show(i, focus){
      if (i === current) return;
      var out = panels[current], into = panels[i];
      current = i;
      tabs.forEach(function(t, k){ t.setAttribute('aria-selected', String(k === i)); });
      track.setAttribute('data-state', i === 1 ? 'after' : 'before');
      showcase.setAttribute('data-state', i === 1 ? 'after' : 'before');
      if (reduced){
        out.hidden = true; into.hidden = false;
      } else {
        out.classList.add('is-leaving');
        setTimeout(function(){
          out.hidden = true; out.classList.remove('is-leaving');
          into.hidden = false; into.classList.add('is-entering');
          requestAnimationFrame(function(){
            requestAnimationFrame(function(){ into.classList.remove('is-entering'); });
          });
        }, 180);
      }
      if (focus) tabs[i].focus();
      track_event(i);
    }
    function track_event(i){
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event:'demo_toggle', demo_state: i === 1 ? 'after' : 'before'});
    }
    tabs.forEach(function(t, i){
      t.addEventListener('click', function(){ show(i, false); });
      t.addEventListener('keydown', function(e){
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown'){ e.preventDefault(); show(1, true); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp'){ e.preventDefault(); show(0, true); }
      });
    });
  })();

  /* ---------- Calculateur de temps gagné ---------- */
  (function(){
  if (!document.getElementById('calcHours')) return;
  var ids = ['hMail','hAdmin','hCom'];
  var rates = {hMail:0.40, hAdmin:0.50, hCom:0.60};
  var outs = {hMail:'oMail', hAdmin:'oAdmin', hCom:'oCom'};
  var bars = {hMail:['barMail','barMailVal'], hAdmin:['barAdmin','barAdminVal'], hCom:['barCom','barComVal']};
  var WEEKS = 44;
  var hoursEl = document.getElementById('calcHours');
  var daysEl = document.getElementById('calcDays');

  function paintRange(input){
    var pct = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--fill', pct + '%');
  }
  function updateCalc(){
    var total = 0, perItem = {}, max = 0;
    ids.forEach(function(id){
      var input = document.getElementById(id);
      var hours = parseFloat(input.value) || 0;
      var saved = hours * rates[id] * WEEKS;
      perItem[id] = saved;
      total += saved;
      if (saved > max) max = saved;
      document.getElementById(outs[id]).textContent = hours + ' h';
      paintRange(input);
    });
    ids.forEach(function(id){
      var fill = document.getElementById(bars[id][0]);
      var val = document.getElementById(bars[id][1]);
      fill.style.width = (max > 0 ? (perItem[id] / max) * 100 : 0) + '%';
      val.textContent = Math.round(perItem[id]) + ' h';
    });
    hoursEl.textContent = Math.round(total);
    daysEl.textContent = Math.round(total / 7);
  }
  ids.forEach(function(id){
    var el = document.getElementById(id);
    if (el){ el.addEventListener('input', updateCalc); }
  });
  updateCalc();
  })();

  /* ---------- FAQ accordéon ---------- */
  document.querySelectorAll('.faq__q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq__item');
      var open = item.getAttribute('data-open') === 'true';
      document.querySelectorAll('.faq__item').forEach(function(other){
        other.setAttribute('data-open', 'false');
        other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });
      if (!open){
        item.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Étape active de la méthode ---------- */
  var steps = document.querySelectorAll('.step');
  if (steps.length && 'IntersectionObserver' in window){
    var ioS = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ en.target.classList.toggle('is-active', en.isIntersecting); });
    }, {rootMargin:'-42% 0px -42% 0px'});
    steps.forEach(function(s){ ioS.observe(s); });
  }

  /* ---------- Lien de navigation actif ---------- */
  var navLinks = document.querySelectorAll('.nav a');
  var sections = [];
  navLinks.forEach(function(a){
    var h = a.getAttribute('href') || '';
    if (h.charAt(0) !== '#' || h.length < 2) return;
    var t = document.querySelector(h);
    if (t) sections.push({link:a, el:t});
  });
  if (sections.length && 'IntersectionObserver' in window){
    var ioN = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        var match = sections.filter(function(s){ return s.el === en.target; })[0];
        if (match && en.isIntersecting){
          navLinks.forEach(function(a){ a.removeAttribute('aria-current'); });
          match.link.setAttribute('aria-current', 'true');
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    sections.forEach(function(s){ ioN.observe(s.el); });
  }

  /* ---------- Réalisations : filtres + visionneuse ---------- */
  (function(){
    var works = document.getElementById('works');
    var lb = document.getElementById('lightbox');
    if (!works || !lb) return;
    var cards = Array.prototype.slice.call(works.querySelectorAll('.work'));
    var lastFocus = null;

    document.querySelectorAll('.filters button').forEach(function(btn){
      btn.addEventListener('click', function(){
        var f = btn.getAttribute('data-filter');
        document.querySelectorAll('.filters button').forEach(function(b){ b.setAttribute('aria-pressed', String(b === btn)); });
        cards.forEach(function(c){
          var show = (f === 'all' || c.getAttribute('data-cat') === f);
          c.parentElement.hidden = !show;
        });
        track('portfolio_filter', {filter: f});
      });
    });

    function openLb(card){
      lastFocus = card;
      document.getElementById('lbCat').textContent = card.getAttribute('data-catlabel');
      document.getElementById('lbTitle').textContent = card.getAttribute('data-title');
      document.getElementById('lbDesc').textContent = card.getAttribute('data-desc');
      document.getElementById('lbPoints').innerHTML = card.getAttribute('data-points');
      document.getElementById('lbMeta').textContent = card.getAttribute('data-meta');
      lb.hidden = false;
      requestAnimationFrame(function(){ lb.classList.add('is-open'); });
      document.body.classList.add('no-scroll');
      document.getElementById('lbClose').focus();
      track('portfolio_open', {work: card.getAttribute('data-title')});
    }
    function closeLb(){
      lb.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      setTimeout(function(){ if (!lb.classList.contains('is-open')) lb.hidden = true; }, 320);
      if (lastFocus) lastFocus.focus();
    }
    cards.forEach(function(c){ c.addEventListener('click', function(){ openLb(c); }); });
    document.getElementById('lbClose').addEventListener('click', closeLb);
    document.getElementById('lbCta').addEventListener('click', closeLb);
    lb.addEventListener('click', function(e){ if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLb();
    });
  })();

  /* ---------- Questionnaire multi-étapes ---------- */
  (function(){
    /* ====== À RENSEIGNER : réception des demandes par email ======
       Colle ici l'URL de ton formulaire Formspree (voir RECEVOIR-LES-DEMANDES.md).
       Exemple : var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
       Tant que c'est vide, le visiteur voit la confirmation et le bouton
       « Recevoir une copie par email » reste le seul relais.            */
    var FORM_ENDPOINT = window.FORM_ENDPOINT || '';

    var form = document.getElementById('contactForm');
    if (!form) return;
    var steps = Array.prototype.slice.call(form.querySelectorAll('.wstep'));
    var fill = document.getElementById('wizFill');
    var count = document.getElementById('wizCount');
    var title = document.getElementById('wizTitle');
    var prev = document.getElementById('wizPrev');
    var next = document.getElementById('wizNext');
    var submit = document.getElementById('wizSubmit');
    var recap = document.getElementById('wizRecap');
    var titles = ['Votre situation','Votre besoin','L’organisation','Vos coordonnées'];
    var i = 0;

    function val(name){
      var el = form.querySelector('[name="' + name + '"]:checked');
      return el ? el.value : '';
    }
    function vals(name){
      return Array.prototype.map.call(form.querySelectorAll('[name="' + name + '"]:checked'), function(e){ return e.value; });
    }
    function err(id, msg){
      var el = document.getElementById('err-' + id);
      if (el) el.textContent = msg || '';
      return !msg;
    }
    function showBranch(){
      var obj = val('objectif') || 'Je ne sais pas encore';
      var any = false;
      form.querySelectorAll('.wbranch').forEach(function(br){
        var on = br.getAttribute('data-branch') === obj;
        br.hidden = !on;
        if (on) any = true;
      });
      var t = document.getElementById('step2Title');
      if (t) t.textContent = obj === 'Je ne sais pas encore' ? 'Dites-m’en un peu plus' :
        (obj === 'Prise en main' ? 'Votre prise en main, en détail' :
         obj === 'Automatisation' ? 'Vos tâches à automatiser' : 'Vos besoins en création');
      return any;
    }
    function validateStep(idx){
      var ok = true;
      if (idx === 0){
        ok = err('profil', val('profil') ? '' : 'Choisissez le profil qui vous correspond.') && ok;
        ok = err('objectif', val('objectif') ? '' : 'Indiquez ce qui vous intéresse — « je ne sais pas encore » est une réponse valable.') && ok;
      }
      if (idx === 1){
        var obj = val('objectif');
        if (obj === 'Automatisation') ok = err('taches', vals('taches').length ? '' : 'Cochez au moins une tâche, même approximative.') && ok;
        if (obj === 'Création') ok = err('supports', vals('supports').length ? '' : 'Cochez au moins un support.') && ok;
      }
      if (idx === 3){
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var phone = document.getElementById('phone').value.trim();
        ok = err('name', name.length < 2 ? 'Merci d’indiquer votre nom.' : '') && ok;
        ok = err('email', /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email) ? '' : 'Cet email ne semble pas valide.') && ok;
        ok = err('phone', (phone === '' || /^[0-9\s+().-]{8,20}$/.test(phone)) ? '' : 'Ce numéro ne semble pas valide.') && ok;
        ok = err('consent', document.getElementById('consent').checked ? '' : 'Merci de cocher cette case pour que je puisse vous répondre.') && ok;
        ['name','email','phone'].forEach(function(id){
          var el = document.getElementById(id);
          var e = document.getElementById('err-' + id);
          if (el && e) { if (e.textContent) el.setAttribute('aria-invalid','true'); else el.removeAttribute('aria-invalid'); }
        });
      }
      return ok;
    }
    function buildRecap(){
      if (!recap) return;
      var lines = [];
      function add(label, v){ if (v && v.length) lines.push('<span><b>' + label + ' :</b> ' + (Array.isArray(v) ? v.join(', ') : v) + '</span>'); }
      add('Profil', val('profil'));
      add('Objectif', val('objectif'));
      add('Niveau', val('niveau'));
      add('À simplifier', vals('simplifier'));
      add('Tâches', vals('taches'));
      add('Outils actuels', vals('outilspro'));
      add('Volume', val('volume'));
      add('Supports', vals('supports'));
      add('Rythme', val('rythme'));
      add('Charte', val('charte'));
      add('Ce qui pèse', vals('flou'));
      add('Démarrage', val('delai'));
      add('Format', val('format'));
      recap.innerHTML = lines.join('');
    }
    function render(focus){
      steps.forEach(function(st, k){ st.hidden = k !== i; });
      if (!reduced){
        var cur = steps[i];
        cur.classList.add('is-entering');
        requestAnimationFrame(function(){
          requestAnimationFrame(function(){ cur.classList.remove('is-entering'); });
        });
      }
      fill.style.width = ((i + 1) / steps.length * 100) + '%';
      count.textContent = 'Étape ' + (i + 1) + ' / ' + steps.length;
      title.textContent = titles[i];
      prev.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      submit.hidden = i !== steps.length - 1;
      if (i === 1) showBranch();
      if (i === 3) buildRecap();
      if (focus){
        var target = steps[i].querySelector('input:not([type=hidden]), textarea, select');
        var head = form.querySelector('.wizard__head');
        if (head) head.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'center'});
        if (target && i === 3) setTimeout(function(){ target.focus({preventScroll:true}); }, 300);
      }
    }
    function go(dir){
      if (dir > 0 && !validateStep(i)){
        var firstErr = steps[i].querySelector('.field__error:not(:empty)');
        if (firstErr) firstErr.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'center'});
        return;
      }
      // saut de l'étape 2 si aucune branche ne s'applique
      var nextIndex = i + dir;
      if (nextIndex === 1 && !showBranch()) nextIndex += dir;
      i = Math.max(0, Math.min(steps.length - 1, nextIndex));
      render(true);
      track('form_step', {step: i + 1, objectif: val('objectif')});
    }
    next.addEventListener('click', function(){ go(1); });
    prev.addEventListener('click', function(){ go(-1); });
    form.addEventListener('keydown', function(e){
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && i < steps.length - 1){
        e.preventDefault(); go(1);
      }
    });
    form.querySelectorAll('[name="objectif"]').forEach(function(r){
      r.addEventListener('change', function(){ showBranch(); err('objectif',''); });
    });
    form.querySelectorAll('[name="profil"]').forEach(function(r){
      r.addEventListener('change', function(){ err('profil',''); });
    });

    /* Pré-remplissage depuis les cartes d'offres */
    document.querySelectorAll('[data-prefill]').forEach(function(link){
      link.addEventListener('click', function(){
        var wanted = link.getAttribute('data-prefill');
        var radio = form.querySelector('[name="objectif"][value="' + wanted + '"]');
        if (radio){ radio.checked = true; showBranch(); err('objectif',''); }
        i = 0; render(false);
      });
    });

    /* Envoi */
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (document.getElementById('website').value !== '') return; /* honeypot */
      if (!validateStep(3)){
        var f = form.querySelector('[aria-invalid="true"]');
        if (f) f.focus();
        track('submit_error', {form:'questionnaire'});
        return;
      }
      buildRecap();

      /* Copie par email : fonctionne sans back-office */
      var body = [];
      body.push('Demande depuis julienrolando.fr');
      body.push('');
      body.push('Nom : ' + document.getElementById('name').value.trim());
      body.push('Email : ' + document.getElementById('email').value.trim());
      var ph = document.getElementById('phone').value.trim();
      if (ph) body.push('Téléphone : ' + ph);
      body.push('');
      recap.querySelectorAll('span').forEach(function(sp){ body.push(sp.textContent); });
      var msg = document.getElementById('message').value.trim();
      if (msg){ body.push(''); body.push('Message : ' + msg); }
      var mail = 'mailto:contact@julienrolando.fr?subject=' +
        encodeURIComponent('Demande ' + (val('objectif') || 'Conseil IA') + ' — ' + document.getElementById('name').value.trim()) +
        '&body=' + encodeURIComponent(body.join('\n'));
      var mailBtn = document.getElementById('recapMail');
      if (mailBtn) mailBtn.setAttribute('href', mail);

      function done(){
        form.classList.add('is-sent');
        track('submit_success', {form:'questionnaire', objectif: val('objectif'), profil: val('profil')});
        form.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'center'});
      }

      if (!FORM_ENDPOINT){ done(); return; }

      var btn = document.getElementById('wizSubmit');
      btn.disabled = true;
      btn.style.opacity = '.65';
      fetch(FORM_ENDPOINT, {
        method:'POST',
        headers:{'Content-Type':'application/json', 'Accept':'application/json'},
        body: JSON.stringify({
          nom: document.getElementById('name').value.trim(),
          email: document.getElementById('email').value.trim(),
          telephone: ph,
          profil: val('profil'),
          objectif: val('objectif'),
          recapitulatif: body.join('\n'),
          message: msg,
          _subject: 'Demande ' + (val('objectif') || 'Conseil IA') + ' — ' + document.getElementById('name').value.trim()
        })
      })
      .then(function(r){ if (!r.ok) throw new Error('HTTP ' + r.status); done(); })
      .catch(function(){
        /* en cas d'échec réseau, on affiche quand même la confirmation :
           le bouton « Recevoir une copie par email » sert alors de secours */
        done();
      })
      .then(function(){ btn.disabled = false; btn.style.opacity = ''; });
    });

    render(false);
  })();

  /* ---------- Assistant (chatbot) ---------- */
  (function(){
    /* ====== Assistant IA : Worker Cloudflare « julienrolando-chat » ======
       Le Worker garde la clé API côté serveur et n'accepte que les requêtes
       venant de julienrolando.fr. Si l'API est indisponible ou que la page
       est servie depuis une autre origine, l'assistant bascule
       automatiquement sur les réponses pré-écrites ci-dessous.            */
    var CHAT_API = 'https://julienrolando-chat.julienrolando-pro.workers.dev';

    var fab = document.getElementById('chatFab');
    var box = document.getElementById('chat');
    if (!fab || !box) return;
    var log = document.getElementById('chatLog');
    var form = document.getElementById('chatForm');
    var input = document.getElementById('chatInput');
    var status = document.getElementById('chatStatus');
    var chips = document.getElementById('chatChips');
    var history = [];
    var started = false;

    var CANNED = [
      {k:['tarif','prix','coût','cout','combien','budget','cher'],
       a:"Voici les repères : la prise en main démarre à 60 € la séance, une prestation de création à 25 €, et l'automatisation est chiffrée sur devis après l'audit de vos tâches.\n\nLe premier échange de 30 minutes est gratuit et sans engagement, et le devis arrive sous 48 h, détaillé ligne par ligne. TVA non applicable (article 293 B du CGI)."},
      {k:['rendez','rdv','créneau','creneau','appel','réserver','reserver','agenda','dispo'],
       a:"Avec plaisir. Vous pouvez choisir votre créneau directement dans l'agenda, section « Prendre rendez-vous » de cette page — 30 minutes, en visio ou en présentiel, sans engagement.\n\nSi vous préférez décrire votre besoin d'abord, le questionnaire juste en dessous prend trois minutes."},
      {k:['où','ou est','zone','toulouse','déplac','deplac','distance','visio','présentiel','presentiel','région','region'],
       a:"Julien est basé à Toulouse. En présentiel dans toute la région Sud-Ouest, et en visio partout en France. Beaucoup de personnes commencent en présentiel, puis passent en visio une fois à l'aise."},
      {k:['connais rien','débutant','debutant','nul','jamais utilisé','pour moi','informatique','compliqué','complique','âge','age'],
       a:"C'est le cas le plus fréquent, et ce n'est pas un problème. On part de votre quotidien, pas de la technique : vous décrivez ce qui vous prend du temps, Julien s'occupe des réglages.\n\nAucun vocabulaire technique, et un mémo écrit à la fin de chaque séance pour refaire seul."},
      {k:['donnée','donnee','rgpd','sécur','secur','confidentiel','privé','prive'],
       a:"Point traité dès la première séance : on trie ensemble ce qui peut passer par un outil et ce qui ne doit jamais en sortir (données clients, santé, pièces d'identité). Seul le nécessaire à la mission est conservé, conformément au RGPD."},
      {k:['abonnement','logiciel','acheter','payant','gratuit','chatgpt','claude','outil'],
       a:"On commence avec les versions gratuites, qui suffisent dans la majorité des cas. Si un abonnement devient réellement utile, Julien vous dit lequel, pourquoi et combien — et vous décidez."},
      {k:['automatis','facture','relance','devis','mail','temps','gagner'],
       a:"L'automatisation commence par un audit de vos tâches chronophages : tri des mails, devis, facturation, relances, suivi client. Ensuite on met en place, à côté de vous, avec vos vrais dossiers.\n\nLe calculateur plus haut dans la page donne une estimation des heures récupérables sur une année."},
      {k:['création','creation','visuel','post','flyer','logo','charte','réseaux','reseaux'],
       a:"Côté création : publications réseaux sociaux, visuels, flyers, supports de présentation et ligne graphique complète. À la prestation (dès 25 €) ou en pack mensuel, et les fichiers sources vous appartiennent."},
      {k:['délai','delai','quand','rapidement','combien de temps','durée','duree'],
       a:"Dès la première séance, vous repartez avec au moins un usage concret, refaisable seul dès le lendemain. Les automatisations plus larges demandent quelques semaines, le temps de les régler sur vos vrais dossiers."},
      {k:['qui','julien','parcours','expérience','experience','formation','sérieux','serieux'],
       a:"Julien Rolando Le Bian : vingt ans de terrain en commerce et gestion, puis une reconversion vers l'IA appliquée (formations Google, Anthropic et OpenAI). Micro-entreprise déclarée, basée à Toulouse, un seul interlocuteur du premier message au suivi."},
      {k:['contact','joindre','email','mail de','écrire','ecrire'],
       a:"Par email à contact@julienrolando.fr, ou en réservant directement un créneau dans l'agenda de cette page — c'est le plus rapide pour obtenir une réponse."}
    ];
    var FALLBACK = "Je n'ai pas la réponse exacte sous la main, mais Julien l'aura. Le plus simple : réservez un créneau de 30 minutes dans la section « Prendre rendez-vous » de cette page, ou écrivez à contact@julienrolando.fr.\n\nEn attendant, je peux vous renseigner sur les tarifs, la zone d'intervention, les délais ou la confidentialité des données.";

    function answerLocally(q){
      var t = q.toLowerCase();
      for (var i = 0; i < CANNED.length; i++){
        for (var j = 0; j < CANNED[i].k.length; j++){
          if (t.indexOf(CANNED[i].k[j]) !== -1) return CANNED[i].a;
        }
      }
      return FALLBACK;
    }
    function bubble(text, who){
      var el = document.createElement('div');
      el.className = 'msg msg--' + who;
      el.textContent = text;
      log.appendChild(el);
      log.scrollTop = log.scrollHeight;
      return el;
    }
    function typing(){
      var el = document.createElement('div');
      el.className = 'msg msg--bot msg--typing';
      el.innerHTML = '<i></i><i></i><i></i>';
      el.setAttribute('aria-label', 'En train d’écrire');
      log.appendChild(el);
      log.scrollTop = log.scrollHeight;
      return el;
    }
    function greet(){
      if (started) return;
      started = true;
      bubble("Bonjour 👋 Je suis l'assistant de Julien. Posez-moi vos questions sur les accompagnements, les tarifs ou la prise de rendez-vous — je réponds tout de suite.", 'bot');
    }
    function open(){
      box.hidden = false;
      requestAnimationFrame(function(){ box.classList.add('is-open'); });
      fab.setAttribute('aria-expanded', 'true');
      var b = fab.querySelector('.chat-fab__badge'); if (b) b.style.display = 'none';
      greet();
      setTimeout(function(){ input.focus(); }, 320);
      track('chat_open', {});
    }
    function close(){
      box.classList.remove('is-open');
      fab.setAttribute('aria-expanded', 'false');
      setTimeout(function(){ if (!box.classList.contains('is-open')) box.hidden = true; }, 320);
      fab.focus();
    }
    fab.addEventListener('click', function(){
      if (fab.getAttribute('aria-expanded') === 'true') close(); else open();
    });
    document.getElementById('chatClose').addEventListener('click', close);
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && box.classList.contains('is-open')) close();
    });

    function send(text){
      if (!text) return;
      bubble(text, 'me');
      history.push({role:'user', content:text});
      input.value = '';
      var dots = typing();
      status.textContent = 'En train d’écrire…';
      track('chat_message', {len: text.length});

      function reply(answer){
        dots.remove();
        status.textContent = 'Répond en quelques secondes';
        bubble(answer, 'bot');
        history.push({role:'assistant', content:answer});
        if (history.length > 20) history = history.slice(-20);
      }

      if (!CHAT_API){
        setTimeout(function(){ reply(answerLocally(text)); }, 560 + Math.random() * 420);
        return;
      }
      fetch(CHAT_API, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({messages: history.slice(-12)})
      })
      .then(function(r){ if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function(d){ reply((d && (d.reply || d.text)) || answerLocally(text)); })
      .catch(function(){ reply(answerLocally(text)); });
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      send(input.value.trim());
    });
    chips.addEventListener('click', function(e){
      if (e.target.tagName !== 'BUTTON') return;
      var q = e.target.textContent.trim();
      if (/rendez-vous/i.test(q)){
        close();
        document.getElementById('rendezvous').scrollIntoView({behavior: reduced ? 'auto' : 'smooth'});
        track('cta_click', {cta_text:'chat_rdv', cta_target:'#rendezvous'});
        return;
      }
      send(q);
    });
  })();

  /* ---------- Tracking (dataLayer-ready) ---------- */
  window.dataLayer = window.dataLayer || [];
  function track(event, params){
    window.dataLayer.push(Object.assign({event:event}, params || {}));
  }
  document.querySelectorAll('a[href="#contact"],a[href="#rendezvous"],a[href^="mailto:"]').forEach(function(a){
    a.addEventListener('click', function(){
      track('cta_click', {
        cta_text: (a.textContent || '').trim().slice(0, 60),
        cta_target: a.getAttribute('href')
      });
    });
  });

  /* ---------- Mémo gratuit : un seul champ, même boîte que le questionnaire ---------- */
  (function(){
    var form = document.getElementById('memoForm');
    if (!form) return;
    var nom   = document.getElementById('memoNom');
    var input = document.getElementById('memoEmail');
    var errN  = document.getElementById('err-memoNom');
    var err   = document.getElementById('err-memoEmail');
    var ok    = document.getElementById('memoOk');
    var SUJET = 'Demande du guide « Vos dix premiers usages de l\'IA au quotidien »';

    function marque(champ, zone, msg){
      zone.textContent = msg;
      champ.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }
    function fail(msg){ var r = marque(input, err, msg); if (msg) input.focus(); return r; }
    function failNom(msg){ var r = marque(nom, errN, msg); if (msg) nom.focus(); return r; }
    function prenom(){ return nom.value.trim().split(/\s+/)[0] || ''; }
    function reussi(){
      form.querySelector('.memo__grid').hidden = true;
      form.querySelector('button[type=submit]').hidden = true;
      form.querySelector('.memo__note').hidden = true;
      ok.hidden = false;
      ok.textContent = 'C\'est noté, merci ' + prenom() + '. Je vous envoie le guide à ' + input.value.trim() + ' sous 24 h, depuis contact@julienrolando.fr. Pensez à regarder vos indésirables si vous ne le voyez pas.';
    }
    function versEmail(){
      var corps = 'Bonjour,\n\nJe souhaite recevoir le guide « Vos dix premiers usages de l\'IA au quotidien ».\n\nNom : ' + nom.value.trim() + '\nAdresse : ' + input.value.trim() + '\n\nMerci !';
      window.location.href = 'mailto:contact@julienrolando.fr?subject=' + encodeURIComponent(SUJET) + '&body=' + encodeURIComponent(corps);
      reussi();
    }

    input.addEventListener('input', function(){ if (err.textContent) fail(''); });
    nom.addEventListener('input', function(){ if (errN.textContent) failNom(''); });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (document.getElementById('memoTrap').value !== '') return;   /* piège à robots */
      if (!nom.value.trim()) return failNom('Dites-moi au moins votre prénom.');
      failNom('');
      var v = input.value.trim();
      if (!v) return fail('Il me faut votre adresse email pour vous envoyer le guide.');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v)) return fail('Cette adresse ne semble pas valide.');
      fail('');

      if (!window.FORM_ENDPOINT){ versEmail(); return; }

      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      var data = new FormData();
      data.append('nom', nom.value.trim());
      data.append('email', v);
      data.append('demande', 'Guide gratuit — dix premiers usages de l\'IA');
      data.append('_subject', SUJET);
      fetch(window.FORM_ENDPOINT, {method:'POST', body:data, headers:{'Accept':'application/json'}})
        .then(function(r){ if (!r.ok) throw new Error('envoi'); reussi(); })
        .catch(function(){ btn.disabled = false; versEmail(); });
    });
  })();
})();
