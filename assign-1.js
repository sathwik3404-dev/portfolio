(function () {
  'use strict';

  
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Highlight the sidebar link for the section in view
  var links = document.querySelectorAll('.nav a');
  var sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { observer.observe(s); });
  }

  // Project filter
  var chips = document.querySelectorAll('.chip');
  var projects = document.querySelectorAll('.project');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      });
      projects.forEach(function (p) {
        var types = p.getAttribute('data-type').split(' ');
        p.hidden = !(filter === 'all' || types.indexOf(filter) !== -1);
      });
    });
  });
})();