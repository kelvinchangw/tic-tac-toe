// Gameboard as an array inside of a Gameboard object
// MIGHT NOT NEED
// const gameboard = {
//     gameboardArray: []
// };

// Players are stored in objects
// Create player and 
function createPlayer(name) {
    const playerName = name;
}

// Create an object to control the flow of the game itself
    // Initialize board to empty
    // Player always plays first against CPU
// function initializeGame() {
//     // Initialize 2D array
//     gameboardArray = [
//         ["", "", ""],
//         ["", "", ""],
//         ["", "", ""]
//     ];

//     assignButtons();
// }

const game = {
    // Initialize 2D array
    gameboardArray: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    // Update gameboard tiles
    updateGameboard(row, col, playerSymbol) {
        if(this.gameboardArray[row][col] == "") {
            this.gameboardArray[row][col] == playerSymbol;
        }
    }
}

// Assign start game button
const initializeBtn = document.getElementById("initialize-btn");

// Initialize game when initialize button is pressed
initializeBtn.addEventListener("click", () => {
    initializeGame();
})

// Goals
// Avoid having global code
// Utilize factories as much as possible
    // If we only need one instance of something, wrap the factory inside an IIFE

// Each little piece of functionality should be able to fit in the game, player or gameboard objects
    // Put them in logical places

// Create logic that checks when the game is over
// Should check for a win everytime a new tile (X, O) is placed

// Grabs all buttons from the gameboard and converts nodelist into array to use with forEach
const tiles = document.querySelectorAll(".field");
console.log("NEW TILES: " + tiles);

tiles.forEach(tile => {
    tile.addEventListener("click", function() {
        
    })
})




// Grabs all buttons from the gameboard and converts nodelist into array to use with forEach
const tileFields = Array.from(document.getElementsByClassName("field"));

// Update tile visuals and gameboardArray
function assignButtons() {
    tileFields.forEach(button => {
        button.addEventListener("click", function() {
            // Changes visual/marks tile on player click if field is empty
            if(!this.innerHTML) {
                // Retrieve & convert row/col data field strings to numbers for processing
                let tileRow = +this.dataset.row;
                let tileCol = +this.dataset.col;

                updateGameboard(tileRow, tileCol);
    
                // Change tile visual
                this.innerHTML = "X";
    
                console.log(gameboardArray);
                console.log(tileRow, tileCol);
            }
    
            // Check if game has ended
            actionCheck();
        })
    });    
}

function updateGameboard(tileRow, tileCol) {
    // Update gameboardArray with player choice
    gameboardArray[tileRow][tileCol] = "X";
}

// Check if game has ended
// Called everytime one of the following conditions is met:
    // Player fills a tile
    // CPU fills a tile
    // All tiles are filled
function actionCheck() {

}

console.log(tileFields)
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