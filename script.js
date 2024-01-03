const xScoreDisplay = document.querySelector(".x-score-display");
const oScoreDisplay = document.querySelector(".o-score-display");
const drawScoreDisplay = document.querySelector(".draw-score-display");

const players = {
    updateScoreDisplay(winningPlayer) {
        if(winningPlayer === "X") xScoreDisplay.textContent++;
        if(winningPlayer === "O") oScoreDisplay.textContent++;
        if(winningPlayer === "DRAW") drawScoreDisplay.textContent++;
    }
}

const game = {
    // Initialize 2D array
    gameboardArray: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],

    hasGameEnded: false,

    // Assign current gameboard to a newly created empty 2D array
    initializeGame() {
        this.gameboardArray = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];

        this.hasGameEnded = false;

        tiles.forEach(tile => {
            tile.classList.remove("winning-tiles", "losing-tiles", "permanent-symbol");
            tile.innerHTML = "";
        });
    },

    // Update gameboard if clicked tile is empty
    updateGameboard(row, col, playerSymbol, tileElement) {
        if(this.gameboardArray[row][col] === "") {
            this.gameboardArray[row][col] = playerSymbol;
            tileElement.innerHTML = playerSymbol;

            // End game if either board is filled or one of the win conditions are met
            if (!this.hasGameEnded && (this.checkForFilled(playerSymbol) || this.checkForWin(playerSymbol))) {
                this.endGame(playerSymbol);
            }
            return true;
        }
        return false; // Tile was filled/not placed
    },

    checkForRowWin(playerSymbol) {
        for(let rowIndex = 0; rowIndex < this.gameboardArray.length; rowIndex++) {
            let row = this.gameboardArray[rowIndex];
            if(row.every(cell => cell === playerSymbol)) {
                return row.map((_, colIndex) => [rowIndex, colIndex]);
            }
        }

        return null;
    },

    checkForColWin(playerSymbol) {
        for(let colIndex = 0; colIndex < this.gameboardArray.length; colIndex++) {
            if (this.gameboardArray.every(row => row[colIndex] === playerSymbol)) {
                return this.gameboardArray.map((_, rowIndex) => [rowIndex, colIndex]);
            }
        }

        return null;
    },

    checkForDiagonalWin(playerSymbol) {
        const size = this.gameboardArray.length;
        let diagonal1 = [], diagonal2 = [];

        // Create two arrays with diagonal coordinates
        // diagonal1 is top left to bottom right
        // diagonal2 is bottom left to top right
        for(let i = 0; i < size; i++) {
            diagonal1.push([i, i]);
            diagonal2.push([i, 2 - i]);
        }

        // Return correct diagonal array if diagonal win condition was met
        if(diagonal1.every(([row, col]) => this.gameboardArray[row][col] === playerSymbol)) {
            return diagonal1;
        } else if(diagonal2.every(([row, col]) => this.gameboardArray[row][col] === playerSymbol)) {
            return diagonal2;
        }

        return null;
    },

    
    // Checks all win conditions
    checkForWin(playerSymbol) {
        // Checks all possible win conditions
        let winRow = this.checkForRowWin(playerSymbol);
        let winCol = this.checkForColWin(playerSymbol);
        let winDiag = this.checkForDiagonalWin(playerSymbol);

        // Returns winning coordinates if exists
        return winRow || winCol || winDiag;
    },

    // Ends game if board is filled
    checkForFilled(playerSymbol) {
        if(!game.gameboardArray.some(row => row.some(tile => tile === ""))) this.endGame(playerSymbol);
    },

    endGame(playerSymbol) {
        if (!this.hasGameEnded) {
            this.hasGameEnded = true; // Set the flag to prevent multiple triggers

            let winningTiles = this.checkForWin(playerSymbol);
            updateTileDisplayToInactive();
            updateTilesToInactive();
            if(winningTiles) {
                this.highlightWinningTiles(winningTiles);
                players.updateScoreDisplay(playerSymbol);
            } else {
                // Executes if no winner & all tiles filled
                this.highlightAllTiles();
                players.updateScoreDisplay("DRAW");
            }
        }
    },

    highlightWinningTiles(winningTiles) {
        winningTiles.forEach(([row, col]) => {
            let tile = document.querySelector(`.field[data-row="${row}"][data-col="${col}"]`);
            tile.classList.add("winning-tiles");
        });
    },

    highlightAllTiles() {
        tiles.forEach(tile => {
            tile.classList.add("losing-tiles");
        });
    }
}

// Assign start game button
const initializeBtn = document.getElementById("initialize-btn");

// Initialize game when initialize button is pressed
initializeBtn.addEventListener("click", () => {
    updateTileDisplayToInProgress();
    updateTilesToInProgress();
    game.initializeGame();
})

function updateTileDisplayToInProgress() {
    document.querySelector(".gameboard-display").classList.add("gameboard-display-active");
}

function updateTileDisplayToInactive() {
    document.querySelector(".gameboard-display").classList.remove("gameboard-display-active");
}

function updateTilesToInProgress() {
    tiles.forEach(tile => tile.classList.remove("inactive-tile"));
}

function updateTilesToInactive() {
    tiles.forEach(tile => tile.classList.add("inactive-tile"));
}

// Grab all gameboard buttons
const tiles = document.querySelectorAll(".field");
let playerSymbol = "X";

// Update gameboard when any of the gameboard buttons are clicked
tiles.forEach(tile => {
    tile.addEventListener("mouseover", function() {
        if (!this.innerHTML) {
            this.innerHTML = playerSymbol;
        }
    });

    tile.addEventListener("mouseout", function() {
        // Only clear if the tile does not have a permanent symbol
        if (!this.classList.contains("permanent-symbol")) {
            this.innerHTML = "";
        }
    });

    tile.addEventListener("click", function() {
        const row = +this.dataset.row;
        const col = +this.dataset.col;
        
        if (game.updateGameboard(row, col, playerSymbol, this)) {
            this.classList.add("permanent-symbol"); // Add class to indicate permanent placement
            playerSymbol = playerSymbol === "X" ? "O" : "X";
        }
    });
});