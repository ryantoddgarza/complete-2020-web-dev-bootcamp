function sounds(key) {
  switch (key) {
    case 'w':
      new Audio('sounds/crash.mp3').play();
      break;
    case 'a':
      new Audio('sounds/kick.mp3').play();
      break;
    case 's':
      new Audio('sounds/snare.mp3').play();
      break;
    case 'd':
      new Audio('sounds/tom-1.mp3').play();
      break;
    case 'j':
      new Audio('sounds/tom-2.mp3').play();
      break;
    case 'k':
      new Audio('sounds/tom-3.mp3').play();
      break;
    case 'l':
      new Audio('sounds/tom-4.mp3').play();
      break;
  }
}

function animate(key) {
  const activeButton = document.querySelector(`.${key}`);
  activeButton.classList.add('pressed');

  setTimeout(function () {
    activeButton.classList.remove('pressed');
  }, 100);
}

function handleSelect(key) {
  sounds(key);
  animate(key);
}

// Clicks
const drums = document.querySelectorAll('.drum');

for (i = 0; i < drums.length; i++) {
  drums[i].addEventListener('click', function () {
    handleSelect(this.innerHTML);
  });
}

// Keyboard
document.addEventListener('keydown', function ({ key }) {
  handleSelect(key);
});
