document.addEventListener("DOMContentLoaded", function () {
    var _a;
    // Define the properties of the game board
    var properties = [
        { name: "Mediterranean Avenue", price: 60, rent: [2, 10, 30, 90, 160, 250], owner: null, color: "brown" },
        { name: "Baltic Avenue", price: 60, rent: [4, 20, 60, 180, 320, 450], owner: null, color: "brown" },
        { name: "Oriental Avenue", price: 100, rent: [6, 30, 90, 270, 400, 550], owner: null, color: "lightblue" },
        { name: "Connecticut Avenue", price: 120, rent: [8, 40, 100, 300, 450, 600], owner: null, color: "lightblue" },
        { name: "St. Charles Place", price: 140, rent: [10, 50, 150, 450, 625, 750], owner: null, color: "pink" },
        { name: "States Avenue", price: 140, rent: [10, 50, 150, 450, 625, 750], owner: null, color: "pink" },
        { name: "Virginia Avenue", price: 160, rent: [12, 60, 180, 500, 700, 900], owner: null, color: "pink" },
        { name: "St. James Place", price: 180, rent: [14, 70, 200, 550, 750, 950], owner: null, color: "orange" },
        { name: "Tennessee Avenue", price: 180, rent: [14, 70, 200, 550, 750, 950], owner: null, color: "orange" },
        { name: "New York Avenue", price: 200, rent: [16, 80, 220, 600, 800, 1000], owner: null, color: "orange" },
        { name: "Kentucky Avenue", price: 220, rent: [18, 90, 250, 700, 875, 1050], owner: null, color: "red" },
        { name: "Indiana Avenue", price: 220, rent: [18, 90, 250, 700, 875, 1050], owner: null, color: "red" },
        { name: "Illinois Avenue", price: 240, rent: [20, 100, 300, 750, 925, 1100], owner: null, color: "red" },
        { name: "Atlantic Avenue", price: 260, rent: [22, 110, 330, 800, 975, 1150], owner: null, color: "yellow" },
        { name: "Ventnor Avenue", price: 260, rent: [22, 110, 330, 800, 975, 1150], owner: null, color: "yellow" },
        { name: "Marvin Gardens", price: 280, rent: [24, 120, 360, 850, 1025, 1200], owner: null, color: "yellow" },
        { name: "Pacific Avenue", price: 300, rent: [26, 130, 390, 900, 1100, 1275], owner: null, color: "green" },
        { name: "North Carolina Avenue", price: 300, rent: [26, 130, 390, 900, 1100, 1275], owner: null, color: "green" },
        { name: "Pennsylvania Avenue", price: 320, rent: [28, 150, 450, 1000, 1200, 1400], owner: null, color: "green" },
        { name: "Park Place", price: 350, rent: [35, 175, 500, 1100, 1300, 1500], owner: null, color: "darkblue" },
        { name: "Boardwalk", price: 400, rent: [50, 200, 600, 1400, 1700, 2000], owner: null, color: "darkblue" }
    ];
    var boardCells = Array.from(document.querySelectorAll(".cell"));
    // Define the players
    var players = [
        { name: "Player 1", money: 1500, position: 0, token: document.createElement("div") },
        { name: "Player 2", money: 1500, position: 0, token: document.createElement("div") }
    ];
    var currentPlayerIndex = 0;
    // Initialize player tokens on the board
    var initializeTokens = function () {
        players.forEach(function (player, index) {
            player.token.classList.add("token");
            player.token.style.backgroundColor = index === 0 ? "red" : "blue";
            var startCell = boardCells[player.position];
            if (startCell) {
                startCell.appendChild(player.token);
            }
        });
    };
    // Apply property colors to the top of the cells (just like real Monopoly)
    var applyPropertyColors = function () {
        boardCells.forEach(function (cell, index) {
            var property = properties[index];
            if (property && property.color) {
                var cellColor = property.color;
                cell.style.setProperty("--cell-color", cellColor); // This will be applied to the top part of the cell
            }
        });
    };
    // Handle property purchase after the player has moved
    var buyProperty = function (property, player) {
        if (property.owner === null) {
            var confirmPurchase = confirm("Do you want to buy ".concat(property.name, " for $").concat(property.price, "?"));
            if (confirmPurchase && player.money >= property.price) {
                player.money -= property.price; // Deduct the price from the player's money
                property.owner = player.name; // Assign the property to the player
                alert("".concat(player.name, " bought ").concat(property.name, " for $").concat(property.price));
                updateUI(); // Update the player info on the board
            }
            else {
                alert("You can't afford this property!");
            }
        }
        else {
            alert("This property is already owned by ".concat(property.owner, ". You must pay rent."));
            payRent(property, player); // Handle rent payment if the property is owned
        }
    };
    // Rent Payment
    var payRent = function (property, player) {
        if (property.owner === null) {
            alert("This property is unowned!");
            return;
        }
        var owner = property.owner;
        var rentAmount = property.rent[0]; // Default rent
        alert("".concat(player.name, " pays $").concat(rentAmount, " rent to ").concat(owner));
        var ownerPlayer = players.find(function (p) { return p.name === owner; });
        if (ownerPlayer) {
            ownerPlayer.money += rentAmount;
        }
        updateUI(); // Update player info after rent payment
    };
    // Update UI to reflect changes in the game
    var updateUI = function () {
        players.forEach(function (player, index) {
            var moneySpan = document.getElementById("player".concat(index + 1, "-money"));
            var positionSpan = document.getElementById("player".concat(index + 1, "-position"));
            if (moneySpan)
                moneySpan.textContent = "$".concat(player.money);
            if (positionSpan)
                positionSpan.textContent = properties[player.position] ? properties[player.position].name : "Unknown Location";
        });
    };
    // Roll the dice
    var rollDice = function () { return Math.floor(Math.random() * 6) + 1; };
    // Move player based on dice roll
    var movePlayer = function (player, diceRoll) {
        var currentCell = boardCells[player.position];
        if (currentCell) {
            currentCell.removeChild(player.token); // Remove the token from the current cell
        }
        player.position = (player.position + diceRoll) % boardCells.length; // Move player
        var newCell = boardCells[player.position];
        if (newCell) {
            newCell.appendChild(player.token); // Add the token to the new cell
            // Only prompt to buy property after moving the player to the new cell
            setTimeout(function () {
                var currentProperty = properties[player.position];
                if (currentProperty) {
                    buyProperty(currentProperty, player);
                }
            }, 500); // Delay to show the player move first
        }
    };
    // Handle dice roll button click
    var handleRoll = function () {
        var diceRoll = rollDice();
        console.log("Player ".concat(players[currentPlayerIndex].name, " rolled a ").concat(diceRoll));
        var currentPlayer = players[currentPlayerIndex];
        movePlayer(currentPlayer, diceRoll);
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch player
        updateUI(); // Update player info after the move
    };
    // Initialize the game
    initializeTokens();
    applyPropertyColors();
    updateUI();
    // Add event listener to the roll dice button
    (_a = document.getElementById("roll-dice")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleRoll);
});
