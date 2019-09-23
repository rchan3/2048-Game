/*----- constants -----*/

/*----- app's state (variables) -----*/

let gameState,board,checkMoved;
//gameState initialized as null - 1 if win, -1 if lose

/*----- cached element references -----*/

let gameBoard = $(`section.game-board`); //target entire board
let boardSquare = $(`.game-board div`); //target board squares

/*----- event listeners -----*/

let gameKey = document.addEventListener("keydown", function(evt)   {
    //return values for direction key pressed (WASD friendly)
    
    //add checkGameState function 
    // only take event listener if there is no win/lose
    if (gameState === 0) {
        // for up direction pressed
        if (evt.key === "w"||evt.key === "ArrowUp") { 
            dirUp();
        }
        // for left direction pressed
        else if (evt.key === "a"||evt.key === "ArrowLeft") {
            dirLeft();
        }
        // for down direction pressed
        else if (evt.key === "s"||evt.key === "ArrowDown") {
            dirDown();
        }
        // for right direction pressed
        else if (evt.key === "d"||evt.key === "ArrowRight") {
            dirRight();
        }
        else {
        }
    }
    
});

/*----- functions -----*/

//update everything on board to the html board
const render = () => {
    board.forEach((boardCol, colIdx) => {
        boardCol.forEach((rowCol, rowIdx) => {
            // $(`${boardSquare}.c${colIdx}r${rowIdx}`).html(`${rowCol}`);
            if (rowCol===0) {
                document.querySelector(`.c${colIdx}r${rowIdx}`).innerHTML = "";
            }
            else{
                
                document.querySelector(`.c${colIdx}r${rowIdx}`).innerHTML = (`${rowCol}`);
                
            }        }
            );
        });
    };
    
    // functions to add the math in each of the 4 directions
    const dirUp = () => {
        checkMoved = 0;
        //make function to add them vertically
        
        //make function to move up
        vMove("up");
        //randomspawn only if a combine/move has happened
        if (checkMoved !== 0) {
            randomSpawn();
        }
        else {
            console.log("nospawn"); //test
        }
    }
    const dirDown = () => {
        checkMoved = 0;
        //make function to add them vertically
        //make function to move down
        vMove("down");
        //randomspawn only checkAdded = 0;if a combine/move has happened
        if (checkMoved !== 0) {
            randomSpawn();
        }
        else {
            console.log("nospawn"); //test
        }
    }
    const dirLeft = () => {
        checkMoved = 0;
        //make function to add them horizontally
        //make function to move left
        //randomspawn only checkAdded = 0;if a combine/move has happened
        if (checkMoved !== 0) {
            randomSpawn();
        }
        else {
            console.log("nospawn"); //test
        }
    }
    const dirRight = () => {
        checkMoved = 0;
        //make function to add them horizontally
        //make function to move right
        //randomspawn only icheckAdded = 0;f a combine/move has happened
        if (checkMoved !== 0) {
            randomSpawn();
        }
        else {
            console.log("nospawn"); //test
        }
    }
    
    // function to do the vertical adding
    const vMove = (x) => {
        //if arrowup
        if (x == "up") {
            board.forEach((boardCol,colIdx) => {
                for(i = 3;i > 0; i--) {
                    if(board[colIdx][i] !== 0) {
                        if (board[colIdx][i-1] === 0) {
                            board[colIdx].splice(i-1,1);
                            board[colIdx].push(0);
                            checkMoved = 1;
                        }
                    }
                    
                }
            });  
        }
        // if arrow down
        else if (x == "down") {
            board.forEach((boardCol,colIdx) => {
                for(i = 0;i < 3; i++) {
                    if(board[colIdx][i] !== 0) {
                        if (board[colIdx][i+1] === 0) {
                            board[colIdx].splice(i+1,1);
                            board[colIdx].unshift(0);
                            checkMoved = 1;
                        }
                    }
                }
            })
        }
        else{}      
    }
    // function to do horizontal adding
    
    //initial board setup
    const init = () => {
        
        board = 
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
        randomSpawn();
        randomSpawn();
        gameState = 0;
    };
    
    // find random empty space on board to spawn
    const randomSpawn = () => {
        let spawnX = (Math.floor((Math.random()*4)));
        let spawnY = (Math.floor((Math.random()*4)));
        
        //check for empty space
        if (board[spawnY][spawnX] === 0) {
            let tempInt = spawnInt();
            board[spawnY][spawnX] = tempInt;
            render();
        }
        // if not empty then run function again
        else {
            randomSpawn();
        }
    };
    
    //makes the number generated either 2 or 4
    const spawnInt = () => {
        let d = Math.random();
        // 70% rate for 2 to appear
        if (d < 0.9)    {
            return 2;
        }
        
        else {
            return 4;
        }
    };
    
    // CONSOLE LOG TESTING
    init();
    
    /*PSEUDOCODE
    
    ARRAY MAPPING FOR REFERENCING
    
    left    
    ["","","",""]
    top    ["","","",""]   bottom  
    ["","","",""]
    ["","","",""]
    right
    
    game functions:
    
    COMPLETED:
    create init board and variables 
    
    create listener for arrow keys/wasd - link to left/right/up/down 
    
    create board  
    
    make render to map board to the html grid 
    
    randomly spawn 2 or 4 tile in a random empty space 
    + spawn 2 on init 
    
    
    WORKING ON:
    after a move
    check for win/lose 
    win = one of the squares in the board has a value of 2040
    lose = all the squares are full and there are no dupe values to the left/right/top/bottom 
    calculate totals of added numbers
    if no win/lose --> move and add identical squares in the fdirection of the button pressed (if one square was added then it cant be added again during the same turn - if there is more than one dupe then the direction chooses which one has prio)
    - add lose/win check to each listener
    - function to do stuff based on direction - only if gameState is null
    
    make sure all the empty space to (direction) is taken up of theres a space 
    
    
    
    if there is time:
    score system - score works by adding to total score based on what was just added
    
    */