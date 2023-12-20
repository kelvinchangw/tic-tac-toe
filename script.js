// // Players are stored in objects
// function createPlayer(name) {
//     const playerName = name;
// }

// Game object
const game = {
    // Initialize 2D array
    gameboardArray: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],

    // Assign current gameboard to a newly created empty 2D array
    initializeGame() {
        this.gameboardArray = this.gameboardArray.map(row => row.map(() => ""));

        tiles.forEach(tile => {
            tile.classList.remove("winning-tiles", "losing-tiles");
            tile.innerHTML = "";
        });
    },

    // Update gameboard if clicked tile is empty
    updateGameboard(row, col, playerSymbol, tileElement) {
        if(this.gameboardArray[row][col] == "") {
            this.gameboardArray[row][col] = playerSymbol;
            tileElement.innerHTML = playerSymbol;

            // End game if either board is filled or one of the win conditions are met
            if(this.checkForFilled(playerSymbol) || this.checkForWin(playerSymbol)) {
                this.endGame(playerSymbol);
            }
        }
    },

    // checkForRowWin(playerSymbol) {
    //     return this.gameboardArray.some(row => row.every(cell => cell == playerSymbol));
    // },

    checkForRowWin(playerSymbol) {
        for(let rowIndex = 0; rowIndex < this.gameboardArray.length; rowIndex++) {
            let row = this.gameboardArray[rowIndex];
            if(row.every(cell => cell == playerSymbol)) {
                return row.map((_, colIndex) => [rowIndex, colIndex]);
            }
        }

        return null;
    },

    // checkForColWin(playerSymbol) {
    //     return this.gameboardArray.some((_, colIndex) =>
    //            this.gameboardArray.every(row => row[colIndex] == playerSymbol)
    //     );
    // },

    checkForColWin(playerSymbol) {
        for(let colIndex = 0; colIndex < this.gameboardArray.length; colIndex++) {
            if (this.gameboardArray.every(row => row[colIndex] == playerSymbol)) {
                return this.gameboardArray.map((_, rowIndex) => [rowIndex, colIndex]);
            }
        }

        return null;
    },

    // checkForDiagonalWin(playerSymbol) {
    //     return this.gameboardArray.every((row, idx) => row[idx] == playerSymbol) ||
    //            this.gameboardArray.every((row, idx) => row[2 - idx] == playerSymbol);
    // },

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
        if(diagonal1.every(([row, col]) => this.gameboardArray[row][col] == playerSymbol)) {
            return diagonal1;
        } else if(diagonal2.every(([row, col]) => this.gameboardArray[row][col] == playerSymbol)) {
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
        if(!game.gameboardArray.some(row => row.some(tile => tile == ""))) this.endGame(playerSymbol);
    },

    endGame(playerSymbol) {
        let winningTiles = this.checkForWin(playerSymbol);
        if(winningTiles) {
            this.highlightWinningTiles(winningTiles);
        } else {
            this.highlightAllTiles();
        }

        console.log("END GAME");
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
    game.initializeGame();
})

// Goals
// Avoid having global code
// Utilize factories as much as possible
    // If we only need one instance of something, wrap the factory inside an IIFE

// Each little piece of functionality should be able to fit in the game, player or gameboard objects
    // Put them in logical places

// Create logic that checks when the game is over
// Should check for a win everytime a new tile (X, O) is placed

// Grab all gameboard buttons
const tiles = document.querySelectorAll(".field");
let playerSymbol = "X";

// Update gameboard when any of the gameboard buttons are clicked
tiles.forEach(tile => {
    tile.addEventListener("click", function() {
        // Convert the string data fields into integer ones to pass into function below
        const row = +this.dataset.row;
        const col = +this.dataset.col;

        game.updateGameboard(row, col, playerSymbol, this);

        // Players alternate for their turns
        playerSymbol = playerSymbol === "X" ? "O" : "X";
    });
});

// Check if game has ended
// Called everytime one of the following conditions is met:
    // Player fills a tile
    // CPU fills a tile
    // All tiles are filled



// Checking for all winning conditions
    // 3 in a rows
        // Rows, columns, diagonals
    // Ties

// Create an object that will handle the display/DOM logic
    // Write a function that will render the contents of the gameboard array to the webpage
    // Write a function that will allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements
        // e.g. letting players click on a board square to place marker
            // Create a function that that keeps players from playing in spots that are already taken

// Allow players to put in their names
// Include a button to start/restart the game
// Add a display element that shows the results upon game end