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
    randomSpawn();
    randomSpawn();
}

// find random empty space on board to spawn
const randomSpawn = () => {
    let spawnX = (Math.floor((Math.random()*4)));
    let spawnY = (Math.floor((Math.random()*4)));
    
    //check for empty space
    if (board[spawnY][spawnX] === "") {
        let tempInt = spawnInt();
        board[spawnY][spawnX] = String(tempInt);
        render();
    }
    // if not empty then run function again
    else {
        randomSpawn();
    }
}

//makes the number generated either 2 or 4
const spawnInt = () => {
    let d = Math.random();
    // 70% rate for 2 to appear
    if (d < 0.7)    {
        return 2;
    }

    else {
        return 4;
    }
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

create init board and variables FINIS(?)

create listener for arrow keys/wasd - link to left/right/up/down FINIS

create board  FINIS

make render to map board to the html grid FINIS

after a move
check for win/lose 
win = one of the squares in the board has a value of 2040
lose = all the squares are full and there are no dupe values to the left/right/top/bottom 
calculate totals of added numbers

if no win/lose -->

make sure all the empty space to (direction) is taken up of theres a space 

randomly spawn 2 or 4 tile in a random empty space FINIS
    + spawn 2 on init

if there is time:
score system - score works by adding to total score 

*/