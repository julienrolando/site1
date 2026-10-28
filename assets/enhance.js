/* ============================================================
   ENHANCE — parallaxe des bandeaux photo + barre de lecture
   Rien ne bouge si l'appareil demande moins d'animations.
   ============================================================ */
(function(){
  'use strict';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  var bands = Array.prototype.slice.call(document.querySelectorAll('[data-depth]'));
  var bar = null;
  var article = document.querySelector('.art-body');
  if (article){
    bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
  }
  if (!bands.length && !bar) return;

  var ticking = false;
  function update(){
    var vh = window.innerHeight;
    bands.forEach(function(el){
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var depth = parseFloat(el.getAttribute('data-depth')) || 0.12;
      var center = r.top + r.height / 2 - vh / 2;
      el.style.transform = 'translate3d(0,' + (center * -depth).toFixed(1) + 'px,0)';
    });
    if (bar){
      var a = article.getBoundingClientRect();
      var total = a.height - vh * 0.6;
      var p = Math.min(1, Math.max(0, (-a.top + vh * 0.2) / (total > 0 ? total : 1)));
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    }
    ticking = false;
  }
  function onScroll(){ if (!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  update();
})();
