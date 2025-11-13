
/*-------------------------------- Constants --------------------------------*/
const choices = ['playerX', 'player0'];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn; 
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

// console.log(squareEls);  
// console.log(messageEl);  





/*-------------------------------- Functions --------------------------------*/
const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = '🍒';  
    winner = false;
    tie = false;
    render();  
};

const render = () => {
    updateBoard();
    updateMessage();
    console.log("Render function called!");
};

const updateBoard = () => {
  board.forEach((cell, index) => {
    squareEls[index].innerText = cell;
  });
};


const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.innerText = `It's ${turn}'s turn!`;
  } else if (!winner && tie) {
    messageEl.innerText = "It's a tie!";
  } else {
    messageEl.innerText = `Congratulations ${turn} wins!`;
  }
};

const placePiece = (index) => {
  board[index] = turn;
  console.log(board); // For testing
};

const handleClick = (event) => {
  const squareIndex = event.target.id;
  
  if (board[squareIndex] !== '' || winner) {
    return;
  }
  
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
  console.log("Valid click on square:", squareIndex);
};


const checkForWinner = () => {
  winningCombos.forEach((combo) => {
    if (
      board[combo[0]] !== '' &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = true;
      confetti();
    }
  });
  console.log("Winner:", winner); 
};

const checkForTie = () => {
  if (winner) {
    return;
  }
  
  if (board.includes('')) {
    tie = false;
  } else {
    tie = true;
  }
  
  console.log("Tie:", tie); 
};

const switchPlayerTurn = () => {
  if (winner) {
    return;
  }
  
  turn = turn === '🍒' ? '🍋' : '🍒';  
};

init();




/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);


