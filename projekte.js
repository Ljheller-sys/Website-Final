const bgA = document.getElementById('projekteBgA');
const bgB = document.getElementById('projekteBgB');
const items = document.querySelectorAll('.projekt-item');

let active = bgA;
let inactive = bgB;
let leaveTimeout;
let currentImg = null;

// preload images
items.forEach(item => {
  if (item.dataset.img) {
    const img = new Image();
    img.src = item.dataset.img;
  }
});

items.forEach(item => {
  const img = item.dataset.img;

  item.addEventListener('mouseenter', () => {
    clearTimeout(leaveTimeout);

    if (!img || img === currentImg) return;
    currentImg = img;

    // load new image into inactive layer, then crossfade
    inactive.style.backgroundImage = `url('${img}')`;
    inactive.style.opacity = '1';
    active.style.opacity = '0';

    // swap roles
    [active, inactive] = [inactive, active];
  });

  item.addEventListener('mouseleave', () => {
    leaveTimeout = setTimeout(() => {
      active.style.opacity = '0';
      currentImg = null;
    }, 80);
  });
});
