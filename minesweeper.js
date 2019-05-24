document.addEventListener('DOMContentLoaded', startGame);

// Define your `board` object here! 
function generateBoard (difficulty){
  var chance = 0.0;
  var board = {cells: []};
  for (let x = 0; x < difficulty; x++) {
    for (let y = 0; y < difficulty; y++) {
      board.cells.push({ 
        row: x, 
        col: y, 
        isMine: false, 
        isMarked: false, 
        hidden: true 
      })
      chance = Math.random();
      if (chance < 0.45) board.cells[board.cells.length - 1].isMine = true; 
    }
  }
  return board;
}
var board      = [];
var difficulty = 3;

function startGame () {
  document.addEventListener('mousedown',   checkForWin); //Left click
  document.addEventListener('contextmenu', checkForWin); //Right click
  board = generateBoard(difficulty);
  lib.initBoard()
  for(let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}

function checkForWin () {
  var win = true;
  for(let i = 0; i < board.cells.length; i++) {
    if(board.cells[i].isMine === true) {
      if(!board.cells[i].isMarked) win = false;
    }
    else {
      if(board.cells[i].hidden) win = false;
    }
  }
  if(win==true) lib.displayMessage("Y E E T");
}

function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var mineCount = 0;
  for(let i = 0; i < surrounding.length; i++) {
    if(surrounding[i].isMine) mineCount++;
  }
  return mineCount;
}

function reset() {
  difficulty = document.getElementById("slider").value;
  console.log(difficulty);
  board = generateBoard(difficulty);
  lib.initBoard()
  for(let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  console.log(board)
;}