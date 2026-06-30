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

// menu image preview — side panels
const leftPanel  = document.getElementById('menuImgLeft');
const rightPanel = document.getElementById('menuImgRight');
const leftImg    = leftPanel  ? leftPanel.querySelector('img')  : null;
const rightImg   = rightPanel ? rightPanel.querySelector('img') : null;
let currentSrc = '';

function showPreview(img) {
  if (!leftPanel || !img) return;
  if (img !== currentSrc) {
    currentSrc = img;
    if (leftImg)  leftImg.src  = img;
    if (rightImg) rightImg.src = img;
  }
  leftPanel.classList.add('preview-active');
  rightPanel.classList.add('preview-active');
}

function hidePreview() {
  if (leftPanel)  leftPanel.classList.remove('preview-active');
  if (rightPanel) rightPanel.classList.remove('preview-active');
  currentSrc = '';
}

menuLinks.forEach(link => {
  const img = link.dataset.preview;
  if (img) { const pre = new Image(); pre.src = img; }
  link.addEventListener('mouseenter', () => showPreview(link.dataset.preview));
});

overlay.addEventListener('mouseleave', hidePreview);

// click flash animation
menuLinks.forEach(link => {
  link.addEventListener('click', function() {
    this.classList.add('clicked');
  });
});

// touch preview flash (mobile only)
menuLinks.forEach(link => {
  link.addEventListener('touchstart', function(e) {
    const img = this.dataset.preview;
    const href = this.getAttribute('href');
    if (!img || !href || href === '#') return;
    e.preventDefault();
    showPreview(img);
    setTimeout(() => { window.location.href = href; }, 350);
  }, { passive: false });
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
