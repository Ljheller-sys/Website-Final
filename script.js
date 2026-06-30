// always start at top on page load
window.scrollTo(0, 0);
history.scrollRestoration = 'manual';

// scroll fade-in
const targets = [
  document.querySelector('.collage'),
  document.querySelector('.banner'),
  document.querySelector('.about'),
];

targets.forEach(el => el && el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);

targets.forEach(el => el && observer.observe(el));

// burger menu
const burger    = document.getElementById('burger');
const overlay   = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuLinks = document.querySelectorAll('.menu-link');

function openMenu() {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

burger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// click flash animation
menuLinks.forEach(link => {
  link.addEventListener('click', function() {
    this.classList.add('clicked');
  });
});

// nav background on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(10,10,10,0.92)'
    : 'transparent';
  nav.style.backdropFilter = window.scrollY > 60 ? 'blur(12px)' : 'none';
  nav.style.transition = 'background 0.4s, backdrop-filter 0.4s';
});
