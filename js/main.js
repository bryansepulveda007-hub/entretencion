/* =========================================================
   Entretención: menú que marca el tema visible, visor de
   imágenes en grande y comparador antes/después.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Menú: resalta el tema que se está leyendo ---------- */
  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.menu a'));
  var porId = {};
  enlaces.forEach(function (a) { porId[a.getAttribute('href').slice(1)] = a; });

  var marcar = function (id) {
    enlaces.forEach(function (a) {
      var activo = a === porId[id];
      a.classList.toggle('activo', activo);
      if (activo) {
        a.setAttribute('aria-current', 'true');
        // en pantallas chicas el menú se desplaza; deja visible el tema activo
        var menu = a.parentElement;
        if (menu.scrollWidth > menu.clientWidth) {
          menu.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
        }
      } else {
        a.removeAttribute('aria-current');
      }
    });
  };

  if ('IntersectionObserver' in window) {
    var visibles = {};
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { visibles[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      var mejor = null, max = 0;
      Object.keys(visibles).forEach(function (id) {
        if (visibles[id] > max) { max = visibles[id]; mejor = id; }
      });
      if (mejor) marcar(mejor);
      else enlaces.forEach(function (a) { a.classList.remove('activo'); a.removeAttribute('aria-current'); });
    }, { rootMargin: '-25% 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });

    Object.keys(porId).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) observador.observe(sec);
    });
  }

  /* ---------- Visor de imágenes en grande ---------- */
  var visor = document.getElementById('visor');
  var visorImg = document.getElementById('visor-img');
  var cerrar = document.getElementById('visor-cerrar');

  if (visor && visor.showModal) {
    document.querySelectorAll('.zoom').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var chica = boton.querySelector('img');
        visorImg.src = boton.getAttribute('data-grande');
        visorImg.alt = chica ? chica.alt : '';
        visor.showModal();
      });
    });
    cerrar.addEventListener('click', function () { visor.close(); });
    // clic fuera de la imagen cierra
    visor.addEventListener('click', function (e) {
      if (e.target === visor) visor.close();
    });
  } else {
    // navegador sin <dialog>: abre la imagen en otra pestaña
    document.querySelectorAll('.zoom').forEach(function (boton) {
      boton.addEventListener('click', function () {
        window.open(boton.getAttribute('data-grande'), '_blank', 'noopener');
      });
    });
  }

  /* ---------- Comparador antes/después ---------- */
  var comparador = document.getElementById('comparador');
  var control = document.getElementById('comparador-control');
  if (comparador && control) {
    var mover = function () { comparador.style.setProperty('--pos', control.value + '%'); };
    control.addEventListener('input', mover);
    mover();
  }
})();
