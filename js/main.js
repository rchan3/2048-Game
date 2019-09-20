/*----- constants -----*/

/*----- app's state (variables) -----*/

let win, lose,board;

/*----- cached element references -----*/

let gameBoard = $(`section.game-board`); //target entire board
let boardSquare = $(`.game-board div`); //target board squares

/*----- event listeners -----*/

let gameKey = document.addEventListener("keydown", function(evt)   {
    //return values for direction key pressed (WASD friendly)

    // for up direction pressed
    if (evt.key === "w"||evt.key === "ArrowUp") { 
        console.log("dirUp");
    }
    // for left direction pressed
    else if (evt.key === "a"||evt.key === "ArrowLeft") {
        console.log("dirLeft");
    }
    // for down direction pressed
    else if (evt.key === "s"||evt.key === "ArrowDown") {
        console.log("dirDown");
    }
    // for right direction pressed
    else if (evt.key === "d"||evt.key === "ArrowRight") {
        console.log("dirRight");
    }
    else {
    }
});

/*----- functions -----*/

const render = () => {
    
    board.forEach((boardCol, colIdx) => {
        boardCol.forEach((rowCol, rowIdx) => {
            // $(`${boardSquare}.c${colIdx}r${rowIdx}`).html(`${rowCol}`);
            document.querySelector(`.c${colIdx}r${rowIdx}`).innerHTML = (`${rowCol}`);
        }
        );
    });
}

const init = () => {
    
    //initial board setup
    board = 
    [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""]
    ];
}

//makes the number generated either 2 or 4
const randomSpawn = () => {
        console.log((Math.floor((Math.random()*2+1)))*2);
}

// CONSOLE LOG TESTING
init();

/*PSEUDOCODE

            left    
        ["","","",""]
 top    ["","","",""]   bottom  
        ["","","",""]
        ["","","",""]
          right

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