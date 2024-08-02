function createGameBoard () {
  const gameBoard = [];

  for (let i = 0; i <= 8; i++) {
    gameBoard[i] = "-";
  }

  return { gameBoard };
}

function createPlayer (name, marker) {
  return { name, marker };
}

const checkWinCondition = (board, player) => {
  let winner = player;
  const marker = player.marker;

  for (let i = 0; i <= 2; i++) {
    if (board[i] == marker && board[i + 3] == marker && board[i + 6] == marker) {
      return player
    }
  }

  for (let i = 0; i <= 6; i += 3) {
    if (board[i] == marker && board[i + 1] == marker && board[i + 2] == marker) {
      return player
    }
  }

  if (board[0] == marker && board[4] == marker && board[8] == marker) {
    return player
  }

  if (board[2] == marker && board[4] == marker && board[6] == marker) {
    return player
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(function runGame () {
  let running = true;
  const playerOne = createPlayer("Player 1", "X");
  const playerTwo = createPlayer("Player 2", "O");
  const gameBoardObj = createGameBoard();
  let currentPlayer = playerOne;
  let winner = undefined;

  const domSquares = document.querySelectorAll(".square");
  const winDiv = document.querySelector("#winContainer");

  domSquares.forEach((square) => {
    square.addEventListener("mouseover", (e) => {
      if (square.textContent == "") {
        square.classList.add("greyButton");
      }
    })

    square.addEventListener("mouseout", (e) => {
      if (square.classList.contains("greyButton")) {
        square.classList.remove("greyButton");
      }
    })

    square.addEventListener("click", (e) => {
      if (square.textContent == "" && winner == undefined) {
        square.textContent = currentPlayer.marker;
        gameBoardObj.gameBoard[square.id] = currentPlayer.marker

        winner = checkWinCondition(gameBoardObj.gameBoard, currentPlayer);
        if (winner != undefined) {
          winDiv.textContent = `The winner is ${winner.name}!`;
          running = false
        }

        if (gameBoardObj.gameBoard.indexOf("-") == -1) {
          winDiv.textContent = "Draw!";
          running = false
        }

        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
      }
    })
  })
})();
