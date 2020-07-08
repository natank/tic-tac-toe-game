let boards = [] // An array of boards to store game 
let currentMove = 0 // The currently displayed move

function GameController() {

}

function onDeleteLast() {
    // delete last move
    // pops out a single item from boards[] and re-render the board
    alert("onDeleteLAst")
}

function onRecordClick(event) {
    // Get record button click event
    // Get the value of the record from the local storage
    // display the value of the record on a popup

    alert("onRecordClick")
}

function onSaveClick(event) {
    // save `boards` to the local storage

}


function renderBoard() {
    // renders the latest element in boards[]

}

function initGame() {
    // initialize the game
    // initialize boards[] 
    // re-render the last board
}




export default GameController