export function renderTitle() {
  let titleMarkup = `<h1>Let's play Tic Tac Toe</h1>`
  document.querySelector('.container').insertAdjacentHTML('afterbegin', titleMarkup);
}

export function renderBoard(gameState, onMoveCb) {
  let boardElement = createNewBoardElement(gameState.boardDimension);
  addCellsToBoard(gameState, boardElement, onMoveCb)
}
// Create a new board element and add it to the DOM
function createNewBoardElement(boardDimension) {

  let boardElement = document.createElement('div');

  boardElement.classList.add('board');

  boardElement.setAttribute("style", `--dimension: ${boardDimension}`)

  // first remove existing board element from the DOM (if any)
  let existingBoardElement = document.querySelector('.board');
  if (existingBoardElement) existingBoardElement.parentNode.removeChild(existingBoardElement);

  // Add the board element to the DOM
  let boardContainerElement = document.querySelector('#board-container');
  return boardContainerElement.appendChild(boardElement);
}


function addCellsToBoard({ boards, displayMove, gameOngoing }, boardElement, onMoveCb) {
  let arrCells = boards[displayMove];
  //Create a DOM element for each cell

  arrCells.forEach((cell, currIndex) => {
    // Create the cell element
    let cellElement = createCellElement(cell, currIndex, gameOngoing, onMoveCb)

    // Add the cell to the board
    cellElement = boardElement.appendChild(cellElement);
  })
}

function createCellElement(cell, currIndex, gameOngoing, onMoveCb) {
  // 1 - create generic cell
  let cellElement = document.createElement('div');
  cellElement.innerHTML = `
      <div class="cell__placeholder"></div>
      <span class="cell__content"></span>
  `

  cellElement.setAttribute("index", currIndex);
  cellElement.classList.add('cell');

  // 2 - determine specific style for a cell
  if (cell.value === null) cellElement.classList.add('cell--empty');
  else if (cell.value === 'player-x') cellElement.classList.add('cell--x');
  else if (cell.value === 'player-o') cellElement.classList.add('cell--o');

  if (cell.isSequence) cellElement.classList.add('cell--sequence')

  // 3 - Listen to click event on empty cells only

  if (cell.value === null && gameOngoing) {
    cellElement.addEventListener('click', onMoveCb)
  }
  return cellElement
}

export function renderControlPanel({
  onNewGame,
  onChangeBoard,
  onDeleteLast,
  onGetRecord,
  onSaveGame,
  onUploadGame
}) {
  document.querySelector('.control-panel--new').addEventListener('click', onNewGame)
  document.querySelector('.control-panel--dimension').addEventListener('click', onChangeBoard)
  document.querySelector('.control-panel--delete-last').addEventListener('click', onDeleteLast)
  document.querySelector('.control-panel--record').addEventListener('click', onGetRecord)
  document.querySelector('.control-panel--save').addEventListener('click', onSaveGame)
  document.querySelector('.control-panel--upload').addEventListener('click', onUploadGame)
}