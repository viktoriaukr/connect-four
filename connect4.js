/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horizon, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i <= HEIGHT; i++) {
    let row = [];
    for (let j = 0; j <= WIDTH; j++) {
      row.push(null);
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top"); // creates row and set it's 'id' to column-top;
  top.addEventListener("click", handleClick); //adds event listener to created row, it will be one of main elements of this game;

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
  //iterates through width of our board and adds navigation buttons/cells inside of the top row;
  //also append this row to our main board
  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
  //does double iteration through the board and creates rest of the board rows and cells for our game;
  //sets 'id', that contain index of each particular cell, to the each cell in the board;
  //appends those elements to the board;if
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (!board[i][x]) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece");
  if (currPlayer === 1) {
    piece.classList.add("piece", "piece-blue");
  } else {
    piece.classList.add("piece", "piece-red");
  }
  const spot = document.getElementById(`${y}-${x}`);
  spot.appendChild(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function fullBoard() {
  let full = board.every((row) => row.every((cell) => cell));
  if (full) {
    return endGame("Board is full, restart the game!!!");
  }
}

function switchPlayer() {
  if (currPlayer === 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
}

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  fullBoard();

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  switchPlayer();
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //This code iterates through HEIGHT and WIDTH of the board and making new arrays that will contain 4 cells in the row, horizontally, vertically, diagonally and first array that contains all matching cells will return true, what eventually will show an alert of which player won; (explanation is not my best feature hah)
  for (let y = 0; y <= HEIGHT; y++) {
    for (let x = 0; x <= WIDTH; x++) {
      let horizon = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horizon) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
