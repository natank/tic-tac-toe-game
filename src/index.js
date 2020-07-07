import _ from 'lodash'
import './styles/styles.css'

document.addEventListener('DOMContentLoaded', () => {
  function createTitle() {
    let titleMarkup = `<h1>Let's play Tic Tac Toe</h1>`
    document.getElementById('root').insertAdjacentHTML('beforeend', titleMarkup);
  }
  function createBoard(dimension = 3) {
    let boardElement = document.createElement('div');
    boardElement.classList.add('board');

    for (let i = 0; i < dimension; i++) {
      let rowElement = document.createElement('div');
      rowElement.classList.add('board-row');
      boardElement.appendChild(rowElement);

      for (let i = 0; i < dimension; i++) {
        let cellElement = document.createElement('a');
        cellElement.classList.add('row-cell');
        rowElement.appendChild(cellElement)
      }

    }
    document.getElementById('root').appendChild(boardElement)
  }

  function createBoard2(dimension = 3) {
    let boardElement = document.createElement('div');
    boardElement.classList.add('board');
    boardElement = document.getElementById('root').appendChild(boardElement)

    let boardClientWidth = boardElement.clientWidth;
    let boardOffsetWidth = boardElement.offsetWidth * 1.5;

    console.log(`board client width is : ${boardClientWidth}`);
    console.log(`board offset width is : ${boardOffsetWidth}`);
    let cellWidth = boardClientWidth / dimension;
    let cellWidthRelative = boardClientWidth / dimension / boardOffsetWidth * 100;
    console.log(`cell width is ${cellWidth}%`)

    for (let i = 0; i < dimension ** 2; i++) {
      let cellElement = document.createElement('a');
      cellElement.classList.add('cell');
      cellElement = boardElement.appendChild(cellElement);
      cellElement.setAttribute("style", `width: ${cellWidthRelative}%; padding-bottom: ${cellWidthRelative}%; transform: translateY(${boardOffsetWidth / cellWidth * 50}%)`)
    }
  }

  createTitle();
  createBoard2(3);
});
if (module.hot) {
  module.hot.accept()
}