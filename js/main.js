/*----- constants -----*/

/*----- app's state (variables) -----*/

let gameState,board,checkMoved,checkAdded,rgbInt,totalScore;
//gameState initialized as null - 1 if win, -1 if lose
// checkMoved and checkAdded as 0 if nothing can be moved or added

/*----- cached element references -----*/

let gameBoard = $(`section.game-board`); //target entire board
let boardSquare = $(`.game-board div`); //target board squares

/*----- event listeners -----*/

// on button click, it will reset the game
let newGame = $(':button').click(function () { 
    init();
});

let gameKey = document.addEventListener("keydown", function(evt){   
    //return values for direction key pressed (WASD friendly)
    
    //add checkGameState function 
    // only take event listener if there is no win/lose
    if (gameState === 0) {
        // for up direction pressed
        if (evt.key === "w"||evt.key === "ArrowUp") { 
            console.log("up")
            dirUp();
        }
        // for left direction pressed
        else if (evt.key === "a"||evt.key === "ArrowLeft") {
            dirLeft();
            console.log("left")
        }
        // for down direction pressed
        else if (evt.key === "s"||evt.key === "ArrowDown") {
            dirDown();
            console.log("down")
        }
        // for right direction pressed
        else if (evt.key === "d"||evt.key === "ArrowRight") {
            dirRight();
            console.log("right")
        }
        else {
        }
    }    
});

/*----- functions -----*/

//update everything on board to the html board
const render = () => {
    checkWin();
    board.forEach((boardCol, colIdx) => {
        boardCol.forEach((rowCol, rowIdx) => {
            // $(`${boardSquare}.c${colIdx}r${rowIdx}`).html(`${rowCol}`);
            if (rowCol===0) {
                document.querySelector(`.c${colIdx}r${rowIdx}`).innerHTML = "";
                document.querySelector(`.c${colIdx}r${rowIdx}`).style.backgroundColor = 'white';
            }
            else{ 
                document.querySelector(`.c${colIdx}r${rowIdx}`).innerHTML = (`${rowCol}`);
                //create algorithm for colors
                rgbInt = rowCol/2048;
                document.querySelector(`.c${colIdx}r${rowIdx}`).style.backgroundColor = `rgba(156, 215, 177,${rgbInt})`;
                rgbInt=0;
            }        
        });
    });
    console.log(totalScore);
    
};

// functions to add the math in each of the 4 directions
const dirUp = () => {
    checkAdded = 0;
    checkMoved = 0;
    //make function to add them vertically
    addUp();  
    //make function to move up
    vMove("up");
    //randomspawn only if a combine/move has happened
    if (checkMoved !== 0||checkAdded !== 0) {
        randomSpawn();
    }
    else {
        
    }
}

const dirDown = () => {
    checkMoved = 0;
    checkAdded = 0;
    //make function to add them vertically
    addDown();
    //make function to move down
    vMove("down");
    //randomspawn only checkAdded = 0;if a combine/move has happened
    if (checkMoved !== 0||checkAdded !== 0) {
        randomSpawn();
    }
    else {
        
    }
}

const dirLeft = () => {
    checkMoved = 0;
    checkAdded = 0;
    //make function to add them horizontally
    addLeft();
    //make function to move left
    hMove("left");
    hMove("left");
    hMove("left");//run few times because sometimes theres a random space if only run once - need to recode it later probably. when it sees a white space it doesnt move whatever is behind itself so it needed to run twice. 
    //randomspawn only checkAdded = 0;if a combine/move has happened
    if (checkMoved !== 0||checkAdded !== 0) {
        randomSpawn();
    }
    else {
        
    }
}

const dirRight = () => {
    checkMoved = 0;
    checkAdded = 0;
    //make function to add them horizontally
    addRight();
    //make function to move right
    hMove("right");
    hMove("right");
    hMove("right");//run twice because sometimes theres a random space if only run once - need to recode it later probably. when it sees a white space it doesnt move whatever is behind itself so it needed to run twice. 
    //randomspawn only icheckAdded = 0;f a combine/move has happened
    if (checkMoved !== 0||checkAdded !== 0) {
        randomSpawn();
    }
    else {
        
    }
}

// function to do the vertical moving
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

// function to do horizontal moving
const hMove = (x) => {
    if (x == "right") {
        board.forEach((innerA,innerIdx) => {
            for (i = 0; i < 3; i++) {
                if (board[i][innerIdx] !== 0) {
                    if (board[i+1][innerIdx] === 0) {
                        let tempVar = board[i][innerIdx];
                        board[i+1][innerIdx] = tempVar;
                        board[i].splice((innerIdx),1,0);
                        checkMoved = 1;
                    }
                }
            }
        });
    }
    else if (x = "left") {
        board.forEach((innerA,innerIdx) => {
            for (i = 3;i > 0; i--) {
                if (board[i][innerIdx] !== 0) {
                    if (board[i-1][innerIdx] === 0) {
                        let tempVar = board[i][innerIdx];
                        board[i-1][innerIdx] = tempVar;
                        board[i].splice((innerIdx),1,0);
                        checkMoved = 1;
                    }
                }
            }
        });
    }
    else{}
}

//function to add all elements on up
const addUp = () => {
    board.forEach((boardCol,colIdx) => {
        
        if (board[colIdx][0] == board[colIdx][1] && (board[colIdx][0] + board[colIdx][1] !== 0 )) {
            board[colIdx][0] = board[colIdx][0] + board[colIdx][1];
            board[colIdx][1] = 0;
            totalScore += board[colIdx][0];
            checkAdded = 1;
            if (board[colIdx][2] == board[colIdx][3] && (board[colIdx][2] + board[colIdx][3] !== 0)){
                board[colIdx][2] = board[colIdx][2] + board[colIdx][3];
                board[colIdx][3] = 0;
                totalScore += board[colIdx][2];
            };
        }
        
        else if (board[colIdx][1] == board[colIdx][2] && (board[colIdx][1] + board[colIdx][2] !== 0)) {
            board[colIdx][1] = board[colIdx][1] + board[colIdx][2];
            board[colIdx][2] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][1];
        }
        else if (board[colIdx][0] == board[colIdx][2] && (board[colIdx][0] + board[colIdx][2] !== 0) && board[colIdx][1] === 0) {
            board[colIdx][0] = board[colIdx][0] + board[colIdx][2];
            board[colIdx][2] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][0];
        }
        
        else if (board[colIdx][2] == board[colIdx][3]  && (board[colIdx][2] + board[colIdx][3] !== 0)) {
            board[colIdx][2] = board[colIdx][2] + board[colIdx][3];
            board[colIdx][3] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][2];
        }
        else if (board[colIdx][1] == board[colIdx][3] && (board[colIdx][1] + board[colIdx][3] !== 0) && (board[colIdx][2] === 0 )) {
            board[colIdx][1] = board[colIdx][1] + board[colIdx][3];
            board[colIdx][3] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][1];
        }
        
        else if  (board[colIdx][0] == board[colIdx][3] && (board[colIdx][0] + board[colIdx][3] !== 0) && (board[colIdx][1] + board[colIdx][2] == 0)) {
            board[colIdx][0] = board[colIdx][0] + board[colIdx][3];
            board[colIdx][3] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][0];
        }
        
        else{};
        
    });
};

// function to add all elements on down
const addDown = () => {
    board.forEach((boardCol,colIdx) => {
        if (board[colIdx][3] == board[colIdx][2] && (board[colIdx][2] + board[colIdx][3] !== 0)) {
            board[colIdx][3] = board[colIdx][3] + board[colIdx][2];
            board[colIdx][2] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][3];
            if (board[colIdx][1] == board[colIdx][0]&& (board[colIdx][0] + board[colIdx][1] !== 0 )){
                board[colIdx][1] = board[colIdx][1] + board[colIdx][0];
                board[colIdx][0] = 0;
                totalScore += board[colIdx][1];
            };
        }
        
        else if (board[colIdx][2] == board[colIdx][1] && (board[colIdx][2] + board[colIdx][1] !== 0)) {
            board[colIdx][2] = board[colIdx][2] + board[colIdx][1];
            board[colIdx][1] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][2];
        }
        
        else if ((board[colIdx][2] == board[colIdx][0]) && (board[colIdx][0] + board[colIdx][2] !== 0) && (board[colIdx][1] === 0)) {
            board[colIdx][2] = board[colIdx][2] + board[colIdx][0];
            board[colIdx][0] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][2];
        }
        else if (board[colIdx][1] == board[colIdx][0]&& (board[colIdx][0] + board[colIdx][1] !== 0 )){
            board[colIdx][1] = board[colIdx][1] + board[colIdx][0];
            board[colIdx][0] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][1];
        }
        
        else if (board[colIdx][3] == board[colIdx][1] && (board[colIdx][1] + board[colIdx][3] !== 0) && (board[colIdx][2] === 0 )) {
            board[colIdx][3] = board[colIdx][3] + board[colIdx][1];
            board[colIdx][1] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][13];
        }
        else if  ((board[colIdx][3] == board[colIdx][0])&&(board[colIdx][3] + board[colIdx][0] !== 0) && (board[colIdx][1] + board[colIdx][2]===0)) {
            board[colIdx][3] = board[colIdx][3] + board[colIdx][0];
            board[colIdx][0] = 0;
            checkAdded = 1;
            totalScore += board[colIdx][3];
        }
        
        else{};
        
    });

}

// function to add all elements on left
const addLeft = () => {
    // run for loop 4 times
    for(i = 0; i < 4; i++) {
        // list different possibilities with priority to left
        
        // if 2 sets of numbers that need to be added in the row
        if (board[0][i]===board[1][i] && (board[0][i] + board[1][i] !== 0)) {
            board[0][i]=board[0][i]+board[1][i];
            board[1][i] = 0;
            checkAdded = 1;
            totalScore += board[0][i];
            if (board[3][i]===board[2][i] && (board[3][i] + board[2][i] !== 0)) {
                board[3][i]=board[3][i]+board[2][i];
                board[2][i] = 0;   
                totalScore += board[3][i];
            }
        }
        
        else if ((board[2][i]===board[0][i]) && (board[2][i] + board[0][i] !== 0)&&(board[1][i])===0) {
            board[2][i]=board[2][i]+board[0][i];
            board[0][i] = 0;
            checkAdded = 1;   
            totalScore += board[2][i];
        }
        else if ((board[3][i]===board[0][i]) && (board[3][i] + board[0][i] !== 0) && (board[2][i])===0) {
            board[3][i]=board[3][i]+board[0][i];
            board[0][i] = 0;
            checkAdded = 1;
            totalScore += board[3][i];
        }
        else if ((board[2][i]===board[1][i]) && (board[2][i] + board[1][i] !== 0)) {
            board[2][i]=board[2][i]+board[1][i];
            board[1][i] = 0;
            checkAdded = 1;
            totalScore += board[2][i];
        }
        else if ((board[3][i]===board[1][i]) && (board[3][i] + board[1][i] !== 0)&&(board[2][i]===0)) {
            board[3][i]=board[3][i]+board[1][i];
            board[1][i] = 0;
            checkAdded = 1;
            totalScore += board[1][i];
        }
        else if ((board[3][i]===board[2][i]) && (board[3][i] + board[2][i] !== 0)) {
            board[3][i]=board[3][i]+board[2][i];
            board[2][i] = 0;
            checkAdded = 1;
            totalScore += board[3][i];
        } 
        else{}
    }
}

// function to add all elements on right
const addRight = () => {
    // run for loop 4 times
    for(i = 0; i < 4; i++) {
        // list different possibilities with priority to left
        // 2 sets of numbers that need to be added in the row
        if (board[3][i]==board[2][i] && (board[3][i] + board[2][i] !== 0)) {
            board[3][i]=board[3][i]+board[2][i];
            board[2][i] = 0;   
            checkAdded = 1;
            totalScore += board[3][i];
            if (board[0][i]==board[1][i] && (board[0][i] + board[1][i] !== 0)) {
                board[0][i]=board[0][i]+board[1][i];
                board[1][i] = 0;
                totalScore += board[0][i];
            }
        } 
        else if ((board[3][i]==board[2][i]) && (board[3][i] + board[2][i] !== 0)) {
            board[3][i]=board[3][i]+board[2][i];
            board[2][i] = 0;
            checkAdded = 1;
            totalScore += board[3][i];
        }
        else if ((board[3][i]==board[1][i]) && (board[3][i] + board[1][i] !== 0)&&(board[2][i]==0)) {
            board[3][i]=board[3][i]+board[1][i];
            board[1][i] = 0;
            checkAdded = 1;
            totalScore += board[3][i];
        }
        else if ((board[2][i]==board[1][i]) && (board[2][i] + board[1][i] !== 0)) {
            board[2][i]=board[2][i]+board[1][i];
            board[1][i] = 0;
            checkAdded = 1;
            totalScore += board[2][i];
        }
        else if ((board[3][i]==board[0][i]) && (board[3][i] + board[0][i] !== 0)&&(board[2][i] + board[1][i]==0)) {
            board[3][i]=board[3][i]+board[0][i];
            board[0][i] = 0;
            checkAdded = 1;
            totalScore += board[3][i];
        }
        else if ((board[2][i]==board[0][i]) && (board[2][i] + board[0][i] !== 0)&&(board[1][i] === 0)) {
            board[2][i]=board[2][i]+board[0][i];
            board[0][i] = 0;
            checkAdded = 1;
            totalScore += board[2][i];
        }
        else if (board[0][i]==board[1][i] && (board[0][i] + board[1][i] !== 0)) {
            board[0][i]=board[0][i]+board[1][i];
            board[1][i] = 0;
            totalScore += board[0][i];
            checkAdded = 1;
        }
        else{}
    }
}

const checkWin = () => {
    board.forEach((boardCol,colIdx) => {
        boardCol.forEach((rowCol,rowIdx) => {
            if (rowCol === 2048) {
                gameState = 1;
                alert("YOU WIN!");
            }
        });
    });
}


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
    totalScore = 0;
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
    };
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

/*

game functions:

COMPLETED:
create init board and variables 

create listener for arrow keys/wasd - link to left/right/up/down 

create board  

make render to map board to the html grid 

randomly spawn 2 or 4 tile in a random empty space 
+ spawn 2 on init 

if no win/lose --> move and add identical squares in the fdirection of the button pressed (if one square was added then it cant be added again during the same turn - if there is more than one dupe then the direction chooses which one has prio)

- function to do stuff based on direction - only if gameState is null 

make sure all the empty space to (direction) is taken up of theres a space 

after a move
check for win/ 
win = one of the squares in the board has a value of 2040

fix the css - change grid number size (3 digits breaks out of grid)

new game button

colors for each number square based on value

WORKING ON:

if there is time:

score system - score works by calculating totals of added numbers

sliding animation ???

*/