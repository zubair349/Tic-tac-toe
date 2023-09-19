const cells = document.querySelectorAll(".box");
const statusText = document.querySelector("#text");
const restart = document.querySelector(".btn");
const winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;


// Functions
initalizeGame();

function initalizeGame() {
    cells.forEach(box =>box.addEventListener("click", cellClicked));
    restart.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellId =this.getAttribute("id");
    if (options[cellId] != "" || !running) {
        return;
    }
    cellUpdate(this, cellId);
    checkWinner();
    
}

function cellUpdate(box, index) {
    options[index] = currentPlayer;
    box.textContent = currentPlayer;

}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
    let roundWin = false;
     for(let i = 0 ; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWin = true;
            break;
        }
    }

    if(roundWin) {
        statusText.textContent = `${currentPlayer} Won`;
        running = false;
    }
    else if(!options.includes("")) {
        statusText.textContent = `Draw`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(box => box.textContent = "");
    running = true;
}