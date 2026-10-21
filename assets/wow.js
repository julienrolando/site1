/* ============================================================
   EFFETS « WAOUH » — inspirés du catalogue 21st.dev
   1. Fond de particules interactif (hero)
   2. Mot du titre qui se transforme (accueil)
   3. Halo lumineux qui suit la souris (cartes)
   4. Réalisations en grille bento + inclinaison 3D
   Aucun effet si l'appareil demande moins d'animations.
   ============================================================ */
(function(){
  'use strict';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced) return;

  /* ---------- 1. Particules ---------- */
  (function(){
    var hero = document.querySelector('.hero');
    if (!hero || !window.HTMLCanvasElement) return;
    var cv = document.createElement('canvas');
    cv.className = 'hero__particles';
    cv.setAttribute('aria-hidden', 'true');
    hero.insertBefore(cv, hero.firstChild);
    var ctx = cv.getContext('2d');
    if (!ctx) return;

    var W = 0, H = 0, dpr = 1, pts = [], running = false, raf = 0;
    var mouse = {x: -9999, y: -9999, on: false};
    var LINK = 130, REACH = 170;

    function size(){
      var r = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(28, Math.min(90, Math.round(W * H / 15000)));
      if (W < 620) n = Math.min(n, 38);
      pts = [];
      for (var i = 0; i < n; i++){
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - .5) * .32, vy: (Math.random() - .5) * .32,
          r: Math.random() * 1.6 + .7,
          c: Math.random() < .22 ? '170,150,255' : '127,227,240'
        });
      }
    }

    function frame(){
      ctx.clearRect(0, 0, W, H);
      var i, j, p, q, dx, dy, d;
      for (i = 0; i < pts.length; i++){
        p = pts[i];
        if (mouse.on){
          dx = p.x - mouse.x; dy = p.y - mouse.y; d = Math.sqrt(dx*dx + dy*dy);
          if (d < REACH && d > 0.1){
            var f = (1 - d / REACH) * .9;
            p.x += dx / d * f; p.y += dy / d * f;
          }
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
      }
      ctx.lineWidth = 1;
      for (i = 0; i < pts.length; i++){
        p = pts[i];
        for (j = i + 1; j < pts.length; j++){
          q = pts[j]; dx = p.x - q.x; dy = p.y - q.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          d = Math.sqrt(dx*dx + dy*dy);
          if (d < LINK){
            ctx.strokeStyle = 'rgba(127,227,240,' + ((1 - d / LINK) * .22).toFixed(3) + ')';
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        if (mouse.on){
          dx = p.x - mouse.x; dy = p.y - mouse.y; d = Math.sqrt(dx*dx + dy*dy);
          if (d < REACH + 40){
            ctx.strokeStyle = 'rgba(170,150,255,' + ((1 - d / (REACH + 40)) * .5).toFixed(3) + ')';
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(' + p.c + ',.85)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    function start(){ if (!running){ running = true; raf = requestAnimationFrame(frame); } }
    function stop(){ running = false; cancelAnimationFrame(raf); }

    size();
    requestAnimationFrame(function(){ cv.classList.add('is-on'); });
    var rt;
    window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(size, 200); });
    if (finePointer){
      hero.addEventListener('pointermove', function(e){
        var r = hero.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
      });
      hero.addEventListener('pointerleave', function(){ mouse.on = false; });
    }
    var visible = true;
    if ('IntersectionObserver' in window){
      new IntersectionObserver(function(en){
        visible = en[0].isIntersecting;
        if (visible && !document.hidden) start(); else stop();
      }).observe(hero);
    } else start();
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) stop(); else if (visible) start();
    });
  })();

  /* ---------- 2. Mot qui se transforme ---------- */
  (function(){
    var title = document.querySelector('.hero__title');
    var line = title && title.querySelector('.hw-text--accent');
    if (!line) return;
    var txt = line.textContent.normalize ? line.textContent.normalize('NFC') : line.textContent;
    var m = txt.match(/^([\s\S]*?)(léger)(\s*\?)\s*$/);
    if (!m) return;
    var words = ['léger', 'simple', 'serein'];

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'morph-svg'); svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = '<defs><filter id="morph-threshold"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"/></filter></defs>';
    document.body.appendChild(svg);

    line.classList.add('has-morph');
    line.textContent = '';
    var pre = document.createElement('span'); pre.className = 'morph-pre'; pre.textContent = m[1];
    var box = document.createElement('span'); box.className = 'morph'; box.setAttribute('aria-hidden', 'true');
    var spans = words.map(function(w, i){
      var s = document.createElement('span');
      s.className = 'morph__w' + (i === 0 ? ' is-on' : '');
      s.textContent = w; box.appendChild(s); return s;
    });
    var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = m[2];
    var end = document.createElement('span'); end.textContent = m[3];
    var tail = document.createElement('span'); tail.style.whiteSpace = 'nowrap';
    tail.appendChild(box); tail.appendChild(sr); tail.appendChild(end);
    line.appendChild(pre); line.appendChild(tail);

    var MORPH = 1.2, HOLD = 2.4;
    var idx = 0, morph = 0, cool = HOLD, last = 0, raf = 0, timer = 0;

    var widths = [];
    function measure(){ widths = spans.map(function(s){ return s.getBoundingClientRect().width; }); }
    function setStyles(f){
      var a = spans[idx], b = spans[(idx + 1) % spans.length];
      box.classList.add('is-morphing');
      if (widths.length){
        var e = f < .5 ? 2*f*f : 1 - Math.pow(-2*f + 2, 2) / 2;
        box.style.width = (widths[idx] + (widths[(idx + 1) % spans.length] - widths[idx]) * e) + 'px';
      }
      b.style.filter = 'blur(' + Math.min(8 / f - 8, 100) + 'px)';
      b.style.opacity = Math.pow(f, .4);
      var g = 1 - f;
      a.style.filter = 'blur(' + Math.min(8 / g - 8, 100) + 'px)';
      a.style.opacity = Math.pow(g, .4);
    }
    function rest(){
      box.classList.remove('is-morphing');
      if (widths.length) box.style.width = widths[idx] + 'px';
      spans.forEach(function(s, i){
        s.style.filter = ''; s.style.opacity = i === idx ? 1 : 0;
      });
    }
    function tick(now){
      var dt = Math.min((now - (last || now)) / 1000, .1); last = now;
      if (cool > 0){
        cool -= dt;
        if (cool <= 0){ morph = 0; }
        else rest();
      } else {
        morph += dt;
        var f = morph / MORPH;
        if (f >= 1){
          idx = (idx + 1) % spans.length; cool = HOLD; rest();
        } else setStyles(f);
      }
      raf = requestAnimationFrame(tick);
    }
    function stop(){ cancelAnimationFrame(raf); clearTimeout(timer); }
    function startAfterWriting(){
      stop(); idx = 0; cool = HOLD; morph = 0; last = 0; rest();
      timer = setTimeout(function(){ raf = requestAnimationFrame(tick); }, 3100);
    }
    measure(); rest();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ measure(); rest(); });
    window.addEventListener('resize', function(){ measure(); rest(); });
    startAfterWriting();
    /* le titre se réécrit quand il revient à l'écran : on repart du premier mot */
    new MutationObserver(function(){
      if (title.classList.contains('is-writing')) startAfterWriting(); else stop();
    }).observe(title, {attributes: true, attributeFilter: ['class']});
    document.addEventListener('visibilitychange', function(){ if (document.hidden) stop(); else startAfterWriting(); });
  })();

  /* ---------- 3. Halo qui suit la souris ---------- */
  if (finePointer){
    document.querySelectorAll('.offer, .work').forEach(function(card){
      card.classList.add('has-spot');
      var s = document.createElement('span'); s.className = 'spot'; s.setAttribute('aria-hidden', 'true');
      card.appendChild(s);
      card.addEventListener('pointermove', function(e){
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- 4. Bento des réalisations ---------- */
  (function(){
    var works = document.getElementById('works');
    if (!works) return;
    var items = works.children;
    function sync(){
      var allVisible = Array.prototype.every.call(items, function(li){ return !li.hidden; });
      works.classList.toggle('works--bento', allVisible && items.length === 6);
    }
    sync();
    new MutationObserver(sync).observe(works, {subtree: true, attributes: true, attributeFilter: ['hidden']});

    if (!finePointer) return;
    works.querySelectorAll('.work').forEach(function(card){
      card.addEventListener('pointermove', function(e){
        if (!works.classList.contains('works--bento')) return;
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((x - .5) * 7).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((.5 - y) * 5).toFixed(2) + 'deg');
        card.classList.add('is-tilting');
      });
      card.addEventListener('pointerleave', function(){ card.classList.remove('is-tilting'); });
    });
  })();
})();
