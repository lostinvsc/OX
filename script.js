let start = document.body.querySelector(".start");

start.addEventListener("click", () => {
    const createButton = (className, text) => {
        let button = document.createElement("div");
        button.className = className;
        button.innerHTML = text;
        return button;
    };

   
    const multiplayer = createButton("multiplayer", "Multi player");

    start.remove();
    document.body.append(multiplayer);

    multiplayer.addEventListener("click", () => {
       
        multiplayer.remove();

        const field = document.createElement("div");
        field.className = "field";
        document.body.append(field);

        const ref = document.createElement("div");
        ref.innerHTML = "player1( &nbsp O &nbsp ) &nbsp &nbsp player2( &nbsp X &nbsp )";
        ref.style.marginTop = "50px";
        document.body.append(ref);

        const createColumn = () => {
            let column = document.createElement("div");
            column.style.display = "flex";
            column.style.flexDirection = "column";
            column.style.width = "33.33%";
            column.style.height = "100%";
            column.style.cursor = "pointer";
            return column;
        };

        const createCell = () => {
            let cell = document.createElement("div");
            cell.style.width = "100%";
            cell.style.height = "33.333%";
            cell.style.display = "flex";
            cell.style.justifyContent = "center";
            cell.style.alignItems = "center";
            return cell;
        };

        let columns = Array.from({ length: 3 }, createColumn);
        let cells = Array.from({ length: 9 }, createCell);

        cells.forEach((cell, i) => {
            columns[Math.floor(i / 3)].append(cell);
            if (i % 3 !== 2) cell.style.borderBottom = "5px solid black";
            if (i < 6) cell.style.borderRight = "5px solid black";
        });

        columns.forEach(column => field.append(column));

        let currentPlayer = 0;
        cells.forEach(cell => {
            let img = document.createElement("img");
            cell.append(img);
            cell.addEventListener("click", () => {
                if (img.src) return;
                img.style.width = "90%";
                img.src = currentPlayer % 2 === 0 ? "circle-svgrepo-com.svg" : "cross-svgrepo-com.svg";
                img.className = currentPlayer % 2 === 0 ? "circle" : "cross";
                currentPlayer++;
                checkVictory();
            });
        });

        const checkLine = (a, b, c) => {
            return a.firstElementChild.className === b.firstElementChild.className &&
                b.firstElementChild.className === c.firstElementChild.className &&
                (a.firstElementChild.className === "circle" || a.firstElementChild.className === "cross");
        };

        const announceResult = (result) => {
            setTimeout(() => {
                let announcement = document.createElement("div");
                announcement.innerHTML = result;
                field.remove();
                document.body.append(announcement);
            }, 500);
        };

        const checkVictory = () => {
            const winningCombinations = [
                [cells[0], cells[1], cells[2]],
                [cells[3], cells[4], cells[5]],
                [cells[6], cells[7], cells[8]],
                [cells[0], cells[3], cells[6]],
                [cells[1], cells[4], cells[7]],
                [cells[2], cells[5], cells[8]],
                [cells[0], cells[4], cells[8]],
                [cells[2], cells[4], cells[6]]
            ];

            for (let combination of winningCombinations) {
                if (checkLine(...combination)) {
                    announceResult(combination[0].firstElementChild.className === "circle" ? "Player 1 wins" : "Player 2 wins");
                    return;
                }
            }

            if (cells.every(cell => cell.firstElementChild.src)) {
                announceResult("It's a tie!");
            }
        };
    });
});
