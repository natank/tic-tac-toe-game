import * as View from '../View'
import checkSequence from './CheckSequenceController'
import * as GameState from './GameStateController';

function GameController() {
    let gameState = GameState.get();
    View.renderTitle();
    initGame()
    View.renderControlPanel({
        gameState,
        onMove,
        onNewGame,
        onDeleteLast,
        onGetRecord,
        onSaveGame,
        onUploadGame
    })
}

function onMove(event) {
    event.preventDefault();
    // duplicate the current board
    let gameState = GameState.get();
    let { boards, turn } = gameState;
    let newBoard = boards[boards.length - 1].map(cell => cell);
    // determine the index of the cell
    let index = event.target.getAttribute('index');
    // change the value of the cell according to the turn
    newBoard[index].value = turn;
    // check if the new board contains a squence of identical cells
    let sequenceFound = checkSequence(newBoard, gameState);
    if (sequenceFound) {
        gameState = GameState.set({ gameOngoing: false });
    }

    // render the boards
    View.renderBoard(newBoard, gameState, onMove)

    // push the board to the collection
    boards.push(newBoard);
    // change turn
    turn = gameState.turn === 'player-x' ? 'player-o' : 'player-x';

    // update the state
    gameState = GameState.set({ boards, turn });

    console.log(gameState)
}

function onNewGame(event) {
    event.preventDefault();
    // call init game
    initGame();
}
function onDeleteLast() {
    // delete last move
    // pops out a single item from boards[] and re-render the board
    event.preventDefault();
    alert("onDeleteLAst")
}

function onGetRecord(event) {
    event.preventDefault();
    // Get record button click event
    // Get the value of the record from the local storage
    // display the value of the record on a popup

    alert("onRecordClick")
}

function onSaveGame(event) {
    // save `boards` to the local storage
    event.preventDefault();
    alert('save game')

}

function onUploadGame(event) {
    // Upload the game from local storage
    event.preventDefault();
    alert('upload game');
}



/* INIT GAME */
// initialize the game

function initGame() {

    let gameState = GameState.get();

    // Create initial board
    let initialBoard = [];

    // initialize board with empty cells
    for (let i = 0; i < gameState.boardDimension ** 2; i++) {
        initialBoard.push({
            value: null, // the cell value (normally x, y or empty)
            sequence: false // is the cell part of a sequence
        })
    }

    // Reset game state
    GameState.set({
        boards: [initialBoard],
        turn: 'player-x',
        displayMove: 0,
        gameOngoing: true
    })

    // render initial board
    View.renderBoard(initialBoard, gameState, onMove)
}

export default GameController