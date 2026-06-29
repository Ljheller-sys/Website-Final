const bg = document.getElementById('projekteBg');
const items = document.querySelectorAll('.projekt-item');
let fadeTimeout;

items.forEach(item => {
  const img = item.dataset.img;

  item.addEventListener('mouseenter', () => {
    clearTimeout(fadeTimeout);
    bg.style.backgroundImage = `url('${img}')`;
    bg.classList.add('visible');
  });

  item.addEventListener('mouseleave', () => {
    fadeTimeout = setTimeout(() => {
      bg.classList.remove('visible');
    }, 80);
  });
});
