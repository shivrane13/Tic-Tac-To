const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const player = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const playerConfigOverlay = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");
const gameAreaEle = document.getElementById("active-game");
const activePlayerName = document.getElementById("active-player-name");
const gameOverEle = document.getElementById("game-over");

const editPlayer1Btn = document.getElementById("edit-player-1-btn");
const editPlayer2Btn = document.getElementById("edit-player-2-btn");
const cancelConfigBtn = document.getElementById("cancel-config-btn");
const startNewGameBtn = document.getElementById("start-game-btn");
const gameFiled = document.querySelectorAll("#game-board li");
const gameBoardEle = document.getElementById("game-board");

editPlayer1Btn.addEventListener("click", openPlayerConfig);
editPlayer2Btn.addEventListener("click", openPlayerConfig);

cancelConfigBtn.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameBtn.addEventListener("click", startNewGame);

for (const gameFiledEle of gameFiled) {
  gameFiledEle.addEventListener("click", selectGameFild);
}
