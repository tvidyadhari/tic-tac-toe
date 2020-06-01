let turn = 0;
let remainingCells = 9;
let grid = [[null, null, null],
            [null, null, null],
            [null, null, null]];
const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");

// reset
const replay = document.querySelector(".replay");
replay.addEventListener("click", ()=>{
    grid = [[null, null, null],
            [null, null, null],
            [null, null, null]];
    cells.forEach((cell) => {
        cell.classList.remove("o");
        cell.classList.remove("x");
        cell.classList.remove("disabled");
        cell.innerHTML = "";
    })
    turn = 0;
    remainingCells = 9;
    message.innerHTML = "x's turn";

});


cells.forEach(cell => {
    cell.addEventListener("click", (event) => {
        let row = Math.ceil(+event.target.id/3) - 1;
        let col = (+event.target.id - 1) % 3;
        let curTurn = "x";
        let nextTurn = "o";
        // o's turn
        if(turn === 1) {
            curTurn = "o";
            nextTurn = "x"
        } 
        event.target.classList.add(curTurn);
        event.target.innerHTML = curTurn;
        message.innerHTML = `${nextTurn}'s turn`;
        event.target.classList.add("disabled");
        remainingCells -= 1;
        console.log(row+" "+col);

        grid[row][col] = curTurn;
        let res = checkWin(row, col, curTurn);
        if(res === true) {
            makeAllDisabled();
            message.innerHTML = `${curTurn} won!!!`;
        }
        else if(remainingCells == 0) {
            makeAllDisabled();
            message.innerHTML = `it's a draw folks!`;
        }

        turn = +!turn;

    });
});

const makeAllDisabled = () => {
    cells.forEach(cell => {
        cell.classList.add("disabled");
    });
};
const checkWin = (row, col, curTurn) => {
    console.log(`checking for ${curTurn}`);
    // check row
    let fail = false;
    for(let i = 0; i < 3; i++) {
        if(grid[row][i] !== curTurn) {
            fail = true;
            break;
        }
    }
    if(!fail)
        return true;

    // check col
    fail = false;
    for(let i = 0; i < 3; i++) {
        if(grid[i][col] !== curTurn) {
            fail = true;
            break;
        }
    }
    if(!fail)
        return true;


    // check diag-1
    fail = false;
    for(let i = 0; i < 3; i++) {
        if(grid[i][i] !== curTurn) {
            fail = true;
            break;
        }
    }
    if(!fail)
        return true;


    // check diag-2
    fail = false;
    for(let i = 0; i < 3; i++) {
        if(grid[i][2 - i] !== curTurn) {
            fail = true;
            break;
        }
    }
    if(!fail)
        return true;
    
    return false;
};