// Tab switching
document.querySelectorAll('.foto-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.foto-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.foto-section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    const section = document.getElementById('tab-' + target);
    if (section) section.classList.add('active');
  });
});

// Lightbox
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCtr = document.getElementById('lightboxCounter');
let currentImages = [];
let currentIndex  = 0;

function openLightbox(imgs, index) {
  currentImages = imgs;
  currentIndex  = index;
  showImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showImage() {
  lightboxImg.src = currentImages[currentIndex];
  lightboxCtr.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
}

document.querySelectorAll('.foto-masonry-item img').forEach((img, i, all) => {
  const srcs = Array.from(all).map(el => el.src);
  img.parentElement.addEventListener('click', () => openLightbox(srcs, i));
});

document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev')?.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage();
});
document.getElementById('lightboxNext')?.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage();
});

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; showImage(); }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % currentImages.length; showImage(); }
});
