const players = {
    // Initialize score displays
    xScoreDisplay: document.querySelector(".x-score-display"),
    oScoreDisplay: document.querySelector(".o-score-display"),
    drawScoreDisplay: document.querySelector(".draw-score-display"),

    // Update visual score displays
    updateScoreDisplay(winningPlayer) {
        switch(winningPlayer) {
            case "X":
                this.xScoreDisplay.textContent++;
                break;
            case "O":
                this.oScoreDisplay.textContent++;
                break;
            case "DRAW":
                this.drawScoreDisplay.textContent++;
                break;
        }
    }
}

const game = {
    // Initialize 2D array
    gameboardArray: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],

    // Initialize variable to keep track of if game has ended
    hasGameEnded: false,

    // Resets gameboard to initial state
    resetGameboard() {
        this.gameboardArray = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];

        // Reinitialize variable to keep track of if game has ended
        this.hasGameEnded = false;

        // Initialize symbol hovering
        updateCurrentPlayerSymbol(playerSymbol);

        // Clear each tile for new game
        tiles.forEach(tile => {
            tile.classList.remove("winning-tiles", "draw-tiles", "permanent-symbol");
            tile.innerHTML = "";
        });
    },

    // Assign current gameboard to a newly created empty 2D array
    initializeGame() {
        this.resetGameboard();
    },

    // Update gameboard if clicked tile is empty
    updateGameboard(row, col, playerSymbol, tileElement) {
        if(this.gameboardArray[row][col] === "") {
            this.gameboardArray[row][col] = playerSymbol;
            tileElement.innerHTML = playerSymbol;

            // End game if either board is filled or one of the win conditions are met
            if (!this.hasGameEnded && (this.checkForFilled(playerSymbol) || this.checkAllWinConditions(playerSymbol))) {
                this.endGame(playerSymbol);
            }
            return true; // Tile was successfully placed
        }
        return false; // Tile was filled/not placed
    },

    checkForRowWin(playerSymbol) {
        for(let row = 0; row < this.gameboardArray.length; row++) {
            let rowCells = this.gameboardArray[row].map((_, col) => [row, col]);
            if(this.checkWinCondition(playerSymbol, rowCells)) {
                return rowCells;
            }
        }

        return null;
    },

    checkForColWin(playerSymbol) {
        for(let col = 0; col < this.gameboardArray.length; col++) {
            let colCells = this.gameboardArray.map((_, row) => [row, col]);
            if (this.checkWinCondition(playerSymbol, colCells)) {
                return colCells;
            }
        }

        return null;
    },

    checkForDiagonalWin(playerSymbol) {
        const size = this.gameboardArray.length;
        
        // Create two arrays with diagonal coordinates
        // diagonal1 is top left to bottom right
        // diagonal2 is bottom left to top right
        let diagonal1 = Array.from({length: size}, (_, i) => [i, i]);
        let diagonal2 = Array.from({length: size}, (_, i) => [i, size - 1 - i]);

        // Return correct diagonal array if diagonal win condition was met
        if(this.checkWinCondition(playerSymbol, diagonal1)) {
            return diagonal1;
        } else if(this.checkWinCondition(playerSymbol, diagonal2)) {
            return diagonal2;
        }

        return null;
    },

    
    // Checks all win conditions
    checkAllWinConditions(playerSymbol) {
        // Checks all possible win conditions and return winning coordinates if exists
        return this.checkForRowWin(playerSymbol) || this.checkForColWin(playerSymbol) || this.checkForDiagonalWin(playerSymbol);
    },

    // Ends game if board is filled
    checkForFilled(playerSymbol) {
        if(!this.gameboardArray.some(row => row.some(tile => tile === ""))) {
            this.endGame(playerSymbol);
        }
    },

    // Ends the game if the game hasn't ended already
    endGame(playerSymbol) {
        if (!this.hasGameEnded) {
            this.hasGameEnded = true; // Set the flag to prevent multiple triggers

            // Store coordinates of winning tiles if there are any
            let winningTiles = this.checkAllWinConditions(playerSymbol);

            // Toggle tiles off to indicate game has ended
            updateTileDisplay("inactive");

            // Update score displays
            if(winningTiles) {
                // Highlight winning tiles and update winning player's score display
                this.highlightWinningTiles(winningTiles);
                players.updateScoreDisplay(playerSymbol);
            } else {
                // Turn all tiles red and update draw score display
                this.highlightAllTiles();
                players.updateScoreDisplay("DRAW");
            }
        }
    },

    // Highlights winning tiles green
    highlightWinningTiles(winningTiles) {
        winningTiles.forEach(([row, col]) => {
            let tile = document.querySelector(`.field[data-row="${row}"][data-col="${col}"]`);
            tile.classList.add("winning-tiles");
        });
    },

    // Highlights all tiles red
    highlightAllTiles() {
        tiles.forEach(tile => {
            tile.classList.add("draw-tiles");
        });
    },

    // Centralized win condition check
    checkWinCondition(playerSymbol, cells) {
        // Check if all cells of the passed in array are the same player symbol
        return cells.every(([row, col]) => this.gameboardArray[row][col] === playerSymbol);
    }
}

// Assign start game button
const initializeBtn = document.getElementById("initialize-btn");

// Initialize game when initialize button is pressed
initializeBtn.addEventListener("click", () => {
    updateTileDisplay("active");
    game.initializeGame();
});

// Visually updates the tiles based on if the game has ended or not
function updateTileDisplay(status) {
    const isActive = status === "active";

    tiles.forEach(tile => {
        tile.classList.toggle("active-tile", isActive);
    });
}

// Grab all gameboard buttons
const tiles = document.querySelectorAll(".field");
let playerSymbol = "X";

// Updates data attribute of tiles for dynamic symbol hovering
function updateCurrentPlayerSymbol(symbol) {
    tiles.forEach(tile => {
        // Remove symbol preview when hovering for tiles that have a placed symbol
        if(tile.classList.contains("permanent-symbol")) {
            tile.removeAttribute("data-symbol");
        } else {
            tile.setAttribute("data-symbol", symbol);
        }
    });
}

// Assign gameboard display
const gameboardDisplay = document.querySelector(".gameboard-display");

// Event listener for when/if a tile is clicked
// Event argument is automatically passed by JS to the function when event listener detects a click
// The function handleTileClick is passed by reference (without parentheses), meaning it won't be executed when the event listener is first assigned
// If we passed the function using handleTileClick() (with parentheses), the function would execute at the time of event listener assignment, which we do not want
gameboardDisplay.addEventListener("click", handleTileClick);

// Function to handle the logic when a tile is clicked
function handleTileClick(event) {
    // Check if the clicked element is a tile
    if(event.target.classList.contains("field")) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        // If the symbol was successfully placed
        if(game.updateGameboard(row, col, playerSymbol, event.target)) {
            markTileAsPermanent(event.target);
            togglePlayerSymbol();
        }
    }
}

// Mark passed in tile as permanent to indicate tile was successfully placed
function markTileAsPermanent(tile) {
    tile.classList.add("permanent-symbol");
}

// Toggle player symbol and update symbol hovering
function togglePlayerSymbol() {
    playerSymbol = playerSymbol === "X" ? "O" : "X";
    updateCurrentPlayerSymbol(playerSymbol);
}