document.addEventListener("DOMContentLoaded", () => {
    const boardCells = Array.from(document.querySelectorAll(".cell"));
    const totalCells = boardCells.length;

    // Property Interface
    interface Property {
        name: string;
        type: string;
        price?: number;
        rent?: number[];
        owner?: string | null;
    }

    // Full Property List
    const properties: Property[] = [
        { name: "GO", type: "special" },
        { name: "Mediterranean Avenue", type: "property", price: 60, rent: [2, 10, 30, 90, 160, 250], owner: null },
        { name: "Community Chest", type: "special" },
        { name: "Baltic Avenue", type: "property", price: 60, rent: [4, 20, 60, 180, 320, 450], owner: null },
        { name: "Income Tax", type: "tax", price: 200 },
        { name: "Reading Railroad", type: "railroad", price: 200, rent: [25, 50, 100, 200], owner: null },
        { name: "Oriental Avenue", type: "property", price: 100, rent: [6, 30, 90, 270, 400, 550], owner: null },
        { name: "Chance", type: "special" },
        { name: "Vermont Avenue", type: "property", price: 100, rent: [6, 30, 90, 270, 400, 550], owner: null },
        { name: "Connecticut Avenue", type: "property", price: 120, rent: [8, 40, 100, 300, 450, 600], owner: null },
        { name: "Jail", type: "special" },
        { name: "St. Charles Place", type: "property", price: 140, rent: [10, 50, 150, 450, 625, 750], owner: null },
        { name: "Electric Company", type: "utility", price: 150 },
        { name: "States Avenue", type: "property", price: 140, rent: [10, 50, 150, 450, 625, 750], owner: null },
        { name: "Virginia Avenue", type: "property", price: 160, rent: [12, 60, 180, 500, 700, 900], owner: null },
        { name: "St. James Place", type: "property", price: 180, rent: [14, 70, 200, 550, 750, 950], owner: null },
        { name: "Tennessee Avenue", type: "property", price: 180, rent: [14, 70, 200, 550, 750, 950], owner: null },
        { name: "New York Avenue", type: "property", price: 200, rent: [16, 80, 220, 600, 800, 1000], owner: null },
        { name: "Free Parking", type: "special" },
        { name: "Kentucky Avenue", type: "property", price: 220, rent: [18, 90, 250, 700, 875, 1050], owner: null },
        { name: "Indiana Avenue", type: "property", price: 220, rent: [18, 90, 250, 700, 875, 1050], owner: null },
        { name: "Illinois Avenue", type: "property", price: 240, rent: [20, 100, 300, 750, 925, 1100], owner: null },
        { name: "B&O Railroad", type: "railroad", price: 200, rent: [25, 50, 100, 200], owner: null },
        { name: "Atlantic Avenue", type: "property", price: 260, rent: [22, 110, 330, 800, 975, 1150], owner: null },
        { name: "Ventnor Avenue", type: "property", price: 260, rent: [22, 110, 330, 800, 975, 1150], owner: null },
        { name: "Water Works", type: "utility", price: 150 },
        { name: "Marvin Gardens", type: "property", price: 280, rent: [24, 120, 360, 850, 1025, 1200], owner: null },
        { name: "Go to Jail", type: "special" },
        { name: "Pacific Avenue", type: "property", price: 300, rent: [26, 130, 390, 900, 1100, 1275], owner: null },
        { name: "North Carolina Avenue", type: "property", price: 300, rent: [26, 130, 390, 900, 1100, 1275], owner: null },
        { name: "Pennsylvania Avenue", type: "property", price: 320, rent: [28, 150, 450, 1000, 1200, 1400], owner: null },
        { name: "Short Line", type: "railroad", price: 200, rent: [25, 50, 100, 200], owner: null },
        { name: "Park Place", type: "property", price: 350, rent: [35, 175, 500, 1100, 1300, 1500], owner: null },
        { name: "Luxury Tax", type: "tax", price: 100 },
        { name: "Boardwalk", type: "property", price: 400, rent: [50, 200, 600, 1400, 1700, 2000], owner: null },
    ];

    interface Player {
        name: string;
        money: number;
        position: number;
        token: HTMLElement;
    }

    const players: Player[] = [
        { name: "Player 1", money: 1500, position: 0, token: document.createElement("div") },
        { name: "Player 2", money: 1500, position: 0, token: document.createElement("div") },
    ];

    let currentPlayerIndex = 0;

    const moveToken = (player: Player) => {
        boardCells.forEach((cell) => cell.contains(player.token) && cell.removeChild(player.token));
        const newCell = boardCells[player.position % totalCells];
        newCell?.appendChild(player.token);
    };

    const rollDice = (): number => Math.floor(Math.random() * 6) + 1;

    const handleRoll = () => {
        const currentPlayer = players[currentPlayerIndex];
        const diceRoll = rollDice();
        alert(`${currentPlayer.name} rolled a ${diceRoll}`);

        const oldPosition = currentPlayer.position;
        currentPlayer.position = (currentPlayer.position + diceRoll) % totalCells;

        if (oldPosition > currentPlayer.position) {
            currentPlayer.money += 200;
            alert(`${currentPlayer.name} passed GO and collected $200!`);
        }

        moveToken(currentPlayer);
        updatePlayerInfo();
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    };

    const updatePlayerInfo = () => {
        players.forEach((player, index) => {
            document.getElementById(`player${index + 1}-money`)!.textContent = `$${player.money}`;
            document.getElementById(`player${index + 1}-position`)!.textContent =
                properties[player.position]?.name || "Unknown";
        });
    };

    document.getElementById("roll-dice")?.addEventListener("click", handleRoll);

    players.forEach((player) => {
        player.token.classList.add("token");
        player.token.style.backgroundColor = player.name === "Player 1" ? "red" : "blue";
        moveToken(player);
    });

    updatePlayerInfo();
});
