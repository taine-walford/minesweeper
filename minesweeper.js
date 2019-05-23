document.addEventListener('DOMContentLoaded', startGame);

// Define your `board` object here! 
function generateBoard (rows, cols){
  var chance = 0.0;
  var board = {cells: []};
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      board.cells.push({ row: x, col: y, isMine: false, isMarked: false, hidden: true })
      chance = Math.random();
      if (chance < 0.45) board.cells[board.cells.length - 1].isMine = true; 
    }
  }
  return board;
}
var board = generateBoard(3, 3);


function startGame () {
  document.addEventListener('mousedown',   checkForWin); //Left click
  document.addEventListener('contextmenu', checkForWin); //Right click
  lib.initBoard()
  for(let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}

function checkForWin () {
  var win = true;
  for(let i = 0; i < board.cells.length; i++) {
    if(board.cells[i].isMine == true) {
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

