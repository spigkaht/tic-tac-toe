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

const displayGameBoard = (gameBoard) => {
  console.log(gameBoard[0], "|", gameBoard[1], "|", gameBoard[2]);
  console.log("---------");
  console.log(gameBoard[3], "|", gameBoard[4], "|", gameBoard[5]);
  console.log("---------");
  console.log(gameBoard[6], "|", gameBoard[7], "|", gameBoard[8]);
}

// const getUserInput = () => {
//   const input = window.prompt("Choose a position for your X marker, Player 1");
//   return input;
// }

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

  const domSquares = document.querySelectorAll(".square");

  domSquares.forEach((square) => {
    square.addEventListener("mouseover", (e) => {
      if (square.textContent == "") {
        square.textContent = "X";
        square.classList.add("greyButton");
      }
    })

    square.addEventListener("mouseout", (e) => {
      if (square.classList.contains("greyButton")) {
        square.textContent = "";
        square.classList.remove("greyButton");
      }
    })

    square.addEventListener("click", (e) => {
      if (square.classList.container("greyButton")) {
        square.textContent = "X";
      }
    })
  })



  console.log(domSquares);
  console.log("Running!!");
  // while (running == true) {
    // console.clear();
    // displayGameBoard(gameBoardObj.gameBoard);
    // console.log(currentPlayer.name, "'s turn");

    // await delay(200);
    // let userInput = getUserInput();
    // await delay(200);

    // if (gameBoardObj.gameBoard[userInput] != "-") {
    //   console.log("That spot is already taken!");
    //   userInput = getUserInput();
    // } else if (userInput > 8 || userInput < 0) {
    //   console.log("Incorrect position for entry!");
    //   userInput = getUserInput();
    // }

    // if (currentPlayer == playerOne) {
    //   gameBoardObj.gameBoard[userInput] = "X";
    //   currentPlayer = playerTwo;
    // } else if (currentPlayer == playerTwo) {
    //   gameBoardObj.gameBoard[userInput] = "O"
    //   currentPlayer = playerOne;
    // }

    winner = checkWinCondition(gameBoardObj.gameBoard, currentPlayer);
    if (winner != undefined) {
      console.log("The winner is", winner.name, "!");
      running = false
    }

    if (gameBoardObj.gameBoard.indexOf("-") == -1) {
      console.log("Draw!")
      running = false
    }
  // }
})();
