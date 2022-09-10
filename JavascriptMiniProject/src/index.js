const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
const rollDice = () => {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `./images/dice-${dice}.png`;
    console.log(dice);
    if (dice === 1) {
      switchPlayer();
    } else {
      currentScore += dice;
      activePlayer === 0
        ? (current0El.textContent = currentScore)
        : (current1El.textContent = currentScore);
      diceEl.classList.remove("hidden");
    }
  }
};
const holdClick = () => {
  if (playing) {
    let playerScore = document.getElementById(`current--${activePlayer}`);
    scores[activePlayer] += currentScore;
    console.log(playerScore.textContent);
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
};
btnNew.addEventListener("click", init);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdClick);
