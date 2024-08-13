function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverEle.firstElementChild.innerHTML =
    'Your won! <span id="winner-name">PLAYER NAME</span>!';

  gameOverEle.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;

      const gameBoardItemEle = gameBoardEle.children[gameBoardIndex];
      gameBoardItemEle.textContent = "";
      gameBoardItemEle.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (player[0].name === "" || player[1].name === "") {
    alert("Please set custom player names for both payers!");
    return;
  }

  resetGameStatus();

  activePlayerName.textContent = player[activePlayer].name;
  gameAreaEle.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = player[activePlayer].name;
}

function selectGameFild(event) {
  const selectedFild = event.target;
  if (selectedFild.tagName !== "LI" || gameIsOver) {
    return;
  }

  const selectedColumn = selectedFild.dataset.col - 1;
  const selectedRow = selectedFild.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select a empty filed");
    return;
  }

  selectedFild.textContent = player[activePlayer].symbol; //player[0]
  selectedFild.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  console.log(gameData);

  const winnerId = checkGameOver();
  console.log(winnerId);

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkGameOver() {
  //cheking the rows for euality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  //checking colm for euality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Diagonal: Top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] == gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  //Digonal: bottom left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] == gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverEle.style.display = "block";

  if (winnerId > 0) {
    const winnerName = player[winnerId - 1].name;
    gameOverEle.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOverEle.firstElementChild.textContent = "It's a draw!";
  }
}
