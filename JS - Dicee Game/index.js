// Generate 2 random numbers
function diceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

const randomNum1 = diceRoll();
const randomNum2 = diceRoll();

// create string to use in `src`
const img1Src = `images/dice${randomNum1}.png`;
const img2Src = `images/dice${randomNum2}.png`;

// Set `src` attribute in both `img` elements
document.getElementById('img1').setAttribute('src', img1Src);
document.getElementById('img2').setAttribute('src', img2Src);

// Change title to display winner
function outcome() {
  if (randomNum1 > randomNum2) {
    return 'Player 1 Wins';
  } else if (randomNum1 < randomNum2) {
    return 'Player 2 Wins';
  } else {
    return 'Draw!';
  }
}

document.querySelector('h1').textContent = outcome();
