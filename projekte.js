const bg = document.getElementById('projekteBg');
const items = document.querySelectorAll('.projekt-item');

items.forEach(item => {
  const img = item.dataset.img;

  item.addEventListener('mouseenter', () => {
    bg.style.backgroundImage = `url('${img}')`;
    bg.classList.add('visible');
  });

  item.addEventListener('mouseleave', () => {
    bg.classList.remove('visible');
  });
});
