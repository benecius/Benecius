document.addEventListener("DOMContentLoaded", () => {
    const boardCells = Array.from(document.querySelectorAll(".cell"));
    const totalCells = boardCells.length;

    const properties = [
        { name: "GO", type: "special", description: "Collect $200 when you pass." },
        { name: "Mediterranean Avenue", type: "property", color: "brown", price: 60, rent: [2, 10, 30, 90, 160, 250], houseCost: 50, hotelCost: 50, houses: 0, owner: null },
        { name: "Community Chest", type: "special", description: "Draw a Community Chest card." },
        { name: "Baltic Avenue", type: "property", color: "brown", price: 60, rent: [4, 20, 60, 180, 320, 450], houseCost: 50, hotelCost: 50, houses: 0, owner: null },
        { name: "Income Tax", type: "tax", price: 200 },
        { name: "Reading Railroad", type: "railroad", price: 200, rent: [25, 50, 100, 200], owner: null },
        { name: "Oriental Avenue", type: "property", color: "light blue", price: 100, rent: [6, 30, 90, 270, 400, 550], houseCost: 50, hotelCost: 50, houses: 0, owner: null },
        { name: "Chance", type: "special", description: "Draw a Chance card." },
        { name: "Vermont Avenue", type: "property", color: "light blue", price: 100, rent: [6, 30, 90, 270, 400, 550], houseCost: 50, hotelCost: 50, houses: 0, owner: null },
        { name: "Connecticut Avenue", type: "property", color: "light blue", price: 120, rent: [8, 40, 100, 300, 450, 600], houseCost: 50, hotelCost: 50, houses: 0, owner: null },
        { name: "Jail", type: "special", description: "Just visiting or in jail." },
        { name: "St. Charles Place", type: "property", color: "pink", price: 140, rent: [10, 50, 150, 450, 625, 750], houseCost: 100, hotelCost: 100, houses: 0, owner: null },
        { name: "Electric Company", type: "utility", price: 150, rentMultiplier: [4, 10], owner: null },
        { name: "States Avenue", type: "property", color: "pink", price: 140, rent: [10, 50, 150, 450, 625, 750], houseCost: 100, hotelCost: 100, houses: 0, owner: null },
        { name: "Virginia Avenue", type: "property", color: "pink", price: 160, rent: [12, 60, 180, 500, 700, 900], houseCost: 100, hotelCost: 100, houses: 0, owner: null },
        { name: "St. James Place", type: "property", color: "orange", price: 180, rent: [14, 70, 200, 550, 750, 950], houseCost: 100, hotelCost: 100, houses: 0, owner: null },
        { name: "Tennessee Avenue", type: "property", color: "orange", price: 180, rent: [14, 70, 200, 550, 750, 950], houseCost: 100, hotelCost: 100, houses: 0, owner: null },
        { name: "New York Avenue", type: "property", color: "orange", price: 200, rent: [16, 80, 220, 600, 800, 1000], houseCost: 100, hotelCost: 100, houses: 0, owner: null },
        { name: "Free Parking", type: "special", description: "No action." },
        { name: "Kentucky Avenue", type: "property", color: "red", price: 220, rent: [18, 90, 250, 700, 875, 1050], houseCost: 150, hotelCost: 150, houses: 0, owner: null },
        { name: "Indiana Avenue", type: "property", color: "red", price: 220, rent: [18, 90, 250, 700, 875, 1050], houseCost: 150, hotelCost: 150, houses: 0, owner: null },
        { name: "Illinois Avenue", type: "property", color: "red", price: 240, rent: [20, 100, 300, 750, 925, 1100], houseCost: 150, hotelCost: 150, houses: 0, owner: null },
        { name: "B&O Railroad", type: "railroad", price: 200, rent: [25, 50, 100, 200], owner: null },
        { name: "Atlantic Avenue", type: "property", color: "yellow", price: 260, rent: [22, 110, 330, 800, 975, 1150], houseCost: 150, hotelCost: 150, houses: 0, owner: null },
        { name: "Ventnor Avenue", type: "property", color: "yellow", price: 260, rent: [22, 110, 330, 800, 975, 1150], houseCost: 150, hotelCost: 150, houses: 0, owner: null },
        { name: "Water Works", type: "utility", price: 150, rentMultiplier: [4, 10], owner: null },
        { name: "Marvin Gardens", type: "property", color: "yellow", price: 280, rent: [24, 120, 360, 850, 1025, 1200], houseCost: 150, hotelCost: 150, houses: 0, owner: null },
        { name: "Empty Cell", type: "empty" },
        { name: "Go to Jail", type: "special", description: "Move directly to Jail. Do not pass GO, do not collect $200." },
        { name: "Pacific Avenue", type: "property", color: "green", price: 300, rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200, hotelCost: 200, houses: 0, owner: null },
        { name: "North Carolina Avenue", type: "property", color: "green", price: 300, rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200, hotelCost: 200, houses: 0, owner: null },
        { name: "Pennsylvania Avenue", type: "property", color: "green", price: 320, rent: [28, 150, 450, 1000, 1200, 1400], houseCost: 200, hotelCost: 200, houses: 0, owner: null },
        { name: "Short Line", type: "railroad", price: 200, rent: [25, 50, 100, 200], owner: null },
        { name: "Park Place", type: "property", color: "dark blue", price: 350, rent: [35, 175, 500, 1100, 1300, 1500], houseCost: 200, hotelCost: 200, houses: 0, owner: null },
        { name: "Luxury Tax", type: "tax", price: 100 },
        { name: "Boardwalk", type: "property", color: "dark blue", price: 400, rent: [50, 200, 600, 1400, 1700, 2000], houseCost: 200, hotelCost: 200, houses: 0, owner: null },
    ];

    const players = [
        { name: "Player 1", money: 1500, position: 0, token: document.createElement("div"), owned: [] },
        { name: "Player 2", money: 1500, position: 0, token: document.createElement("div"), owned: [] },
    ];

    let currentPlayerIndex = 0;

    const rollDice = () => Math.floor(Math.random() * 6) + 1;

    const moveToken = (player) => {
        boardCells.forEach((cell) => {
            if (cell.contains(player.token)) cell.removeChild(player.token);
        });
        const newCell = boardCells[player.position % totalCells];
        newCell?.appendChild(player.token);
    };

    const handleRoll = () => {
        const currentPlayer = players[currentPlayerIndex];
        const diceRoll = rollDice();
        const oldPosition = currentPlayer.position;

        currentPlayer.position = (currentPlayer.position + diceRoll) % totalCells;

        if (oldPosition > currentPlayer.position) {
            currentPlayer.money += 200;
            alert(`${currentPlayer.name} passed GO and collected $200!`);
        }

        moveToken(currentPlayer);

        setTimeout(() => handleCellAction(currentPlayer, diceRoll), 500);
        updatePlayerInfo();
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    };

    const handleCellAction = (player, diceRoll) => {
        const currentProperty = properties[player.position];

        if (currentProperty.type === "empty") return;

        if (currentProperty.type === "property" && !currentProperty.owner) {
            if (confirm(`${player.name}, buy ${currentProperty.name} for $${currentProperty.price}?`)) {
                if (player.money >= currentProperty.price) {
                    player.money -= currentProperty.price;
                    currentProperty.owner = player.name;
                    player.owned.push(currentProperty.name);
                    alert(`${player.name} bought ${currentProperty.name}`);
                } else {
                    alert("You don't have enough money to buy this property.");
                }
            }
        } else if (currentProperty.type === "property" && currentProperty.owner === player.name) {
            if (canBuildHouse(currentProperty, player)) {
                if (confirm(`Do you want to build a house on ${currentProperty.name} for $${currentProperty.houseCost}?`)) {
                    buildHouse(currentProperty, player);
                }
            }
        } else if (currentProperty.type === "property" && currentProperty.owner !== player.name) {
            const rent = currentProperty.rent[currentProperty.houses];
            const owner = players.find((p) => p.name === currentProperty.owner);
            if (owner) {
                player.money -= rent;
                owner.money += rent;
                alert(`${player.name} paid $${rent} rent to ${owner.name}.`);
            }
        } else if (currentProperty.type === "tax") {
            player.money -= currentProperty.price;
            alert(`${player.name} paid $${currentProperty.price} in taxes.`);
        } else if (currentProperty.type === "railroad" && !currentProperty.owner) {
            if (confirm(`${player.name}, buy ${currentProperty.name} for $${currentProperty.price}?`)) {
                if (player.money >= currentProperty.price) {
                    player.money -= currentProperty.price;
                    currentProperty.owner = player.name;
                    player.owned.push(currentProperty.name);
                    alert(`${player.name} bought ${currentProperty.name}`);
                } else {
                    alert("You don't have enough money to buy this railroad.");
                }
            }
        } else if (currentProperty.type === "utility" && !currentProperty.owner) {
            if (confirm(`${player.name}, buy ${currentProperty.name} for $${currentProperty.price}?`)) {
                if (player.money >= currentProperty.price) {
                    player.money -= currentProperty.price;
                    currentProperty.owner = player.name;
                    player.owned.push(currentProperty.name);
                    alert(`${player.name} bought ${currentProperty.name}`);
                } else {
                    alert("You don't have enough money to buy this utility.");
                }
            }
        }

        updatePlayerInfo();
    };

    const updatePlayerInfo = () => {
        players.forEach((player, index) => {
            const moneySpan = document.getElementById(`player${index + 1}-money`);
            const positionSpan = document.getElementById(`player${index + 1}-position`);
            const ownedList = document.getElementById(`player${index + 1}-owned`);
            if (moneySpan) moneySpan.textContent = `$${player.money}`;
            if (positionSpan) positionSpan.textContent =
                properties[player.position]?.name || "Unknown";
            if (ownedList) {
                ownedList.innerHTML = player.owned.map((prop) => `<li>${prop}</li>`).join("");
            }
        });
    };

    document.getElementById("roll-dice").addEventListener("click", handleRoll);

    players.forEach((player, index) => {
        player.token.classList.add("token");
        player.token.style.backgroundColor = index === 0 ? "red" : "blue";
        moveToken(player);
    });

    updatePlayerInfo();
});
