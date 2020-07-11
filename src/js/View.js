export function renderTitle() {
  let titleMarkup = `<h1>Let's play Tic Tac Toe</h1>`
  document.getElementById('root').insertAdjacentHTML('beforeend', titleMarkup);
}

export function renderBoard(arrCells, gameState, onMoveCb) {
  console.log(`cells = ${JSON.stringify(arrCells)}`)

  // first remove existing board element from the DOM (if any)
  let existingBoardElement = document.querySelector('.board');
  if (existingBoardElement) existingBoardElement.parentNode.removeChild(existingBoardElement);

  // create a new board element
  let { boardDimension, gameOngoing } = gameState
  let boardElement = document.createElement('div');
  boardElement.classList.add('board');
  boardElement = document.getElementById('root').appendChild(boardElement)

  // get the board properties from the DOM. required to render cells within the board 
  // properly
  let boardClientWidth = boardElement.clientWidth;
  let boardOffsetWidth = boardElement.offsetWidth * 1.5;

  // determine cell dimensions
  let cellWidth = boardClientWidth / boardDimension;
  let cellWidthRelative = boardClientWidth / boardDimension / boardOffsetWidth * 100;

  // Create cell elements and add them to the DOM
  arrCells.forEach((cell, index) => {
    // 1 - Create a generic board cell
    let cellElement = document.createElement('a');
    cellElement.setAttribute(
      "style",
      `width: ${cellWidthRelative}%; padding-bottom: ${cellWidthRelative}%; transform: translateY(${boardOffsetWidth / cellWidth * 50}%)`
    );
    cellElement.setAttribute("index", index);
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

    // 4  -  Add the cell to the board
    cellElement = boardElement.appendChild(cellElement);

  })
}

export function renderControlPanel(gameOptions) {
  document.querySelector('.control-panel--new').addEventListener('click', gameOptions.onNewGame)
}