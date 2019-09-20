/*----- constants -----*/

/*----- app's state (variables) -----*/

let win, lose,board;

/*----- cached element references -----*/

let gameBoard = $(`section.game-board`); //target entire board
let boardSquare = $(`.game-board div`); //target board squares

/*----- event listeners -----*/



/*----- functions -----*/

const init = () => {

    //initial board setup
    board = 
    [[0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]];

    render();
}

const render = () => {

    board.forEach((boardCol, colIdx) => {
        boardCol.forEach((rowCol, rowIdx) => {
            // $(`${boardSquare}.c${colIdx}r${rowIdx}`).html(`${rowCol}`);
            document.querySelector(`.c${colIdx}r${rowIdx}`).innerHTML = (`${rowCol}`);
        }
        );
    });
}


// CONSOLE LOG TESTING
init();

/*PSEUDOCODE
game functions:
create init board and variables
create listener for arrow keys/wasd - link to left/right/up/down
create board 
make render to map board to the html grid 

after a move
check for win/lose 
    win = one of the squares in the board has a value of 2040
    lose = all the squares are full and there are no dupe values to the left/right/top/bottom 
calculate totals of added numbers

if no win/lose -->
make sure all the empty space to (direction) is taken up of theres a space 
spawn 2 or 4 tile in a random empty space

if there is time:
score system - score works by adding to total score 
    
 */