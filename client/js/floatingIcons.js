const gymIcons = [
  'https://cdn-icons-png.flaticon.com/512/2331/2331943.png',
  'https://cdn-icons-png.flaticon.com/512/2972/2972549.png',
  'https://cdn-icons-png.flaticon.com/512/2707/2707561.png',
  'https://cdn-icons-png.flaticon.com/512/871/871613.png',
  'https://cdn-icons-png.flaticon.com/512/1041/1041874.png',
  'https://cdn-icons-png.flaticon.com/512/1041/1041882.png',
  'https://cdn-icons-png.flaticon.com/512/427/427735.png'
];

function spawnFloatingIcon() {
  const icon = document.createElement('div');
  icon.classList.add('floating-icon');
  icon.style.left = Math.random() * 100 + 'vw';
  icon.style.top = '100vh';
  const size = 40 + Math.random() * 40;
  icon.style.width = icon.style.height = size + 'px';
  icon.style.backgroundImage = `url('${gymIcons[Math.floor(Math.random() * gymIcons.length)]}')`;
  icon.style.animationDuration = (10 + Math.random() * 20) + 's';
  document.body.appendChild(icon);

  setTimeout(() => {
    icon.remove();
  }, 30000);
}

setInterval(spawnFloatingIcon, 2000);
for (let i = 0; i < 5; i++) {
  setTimeout(spawnFloatingIcon, i * 1000);
}