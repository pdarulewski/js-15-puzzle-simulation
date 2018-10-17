class Board {

    constructor(obj) {
        if (!Array.isArray(obj)) {
            this._size = size;
            this._length = Math.sqrt(this._size);
            this._array1D = this.generateArray();
            this.shuffle();
            this._array1D.unshift("")
            this._array2D = this.make2D();
        } else {
            this._array1D = obj;
            this._array1D.unshift("")
            this._size = this._array1D.length
            this._length = Math.sqrt(this._size);
            this._array2D = this.make2D();
        }
    }

    generateArray() {
        var array = [];
        for (let i = 1; i < this._size; i++) {
            array.push(i);
        }
        return array;
    }

    shuffle() {
        for (let i = 0; i < this._array1D.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._array1D[i], this._array1D[j]] = [this._array1D[j], this._array1D[i]];
        }
    }

    make2D() {
        var array = [];
        var row = [];
        for (let i = 0; i < this._size; i++) {
            if ((i + 1) % this._length == 0) {
                row.push(this._array1D[i]);
                array.push(row);
                row = [];
            } else {
                row.push(this._array1D[i]);
            }
        }
        return array;
    }

    getArray() {
        return this._array2D;
    }

    printArray() {
        console.table(this._array2D);
    }

    moveBlank(step) {
        var U = -this._length;
        var D = this._length;
        var L = -1;
        var R = 1;

        function blank(element) {
            return element == "";
        }

        var where = this._array1D.findIndex(blank);

        if (step == "U") {
            [this._array1D[where], this._array1D[where + U]] = [this._array1D[where + U], this._array1D[where]];
        } else if (step == "D") {
            [this._array1D[where], this._array1D[where + D]] = [this._array1D[where + D], this._array1D[where]];
        } else if (step == "L") {
            [this._array1D[where], this._array1D[where + L]] = [this._array1D[where + L], this._array1D[where]];
        } else if (step == "R") {
            [this._array1D[where], this._array1D[where + R]] = [this._array1D[where + R], this._array1D[where]];
        }
        this._array2D = this.make2D();
    }
}

function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function (cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);
}

function getPuzzleFromUser() {
    var puzzle = document.getElementById('puzzle').value;
    puzzle = puzzle.slice(1, -1);
    return puzzle.split(", ")
}

function getDirectionsFromUser() {
    var dirs = document.getElementById('directions').value;
    return dirs.split(" ");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulate(board, dirs) {
    for (let i = 0; i <= dirs.length; i++) {
        board.printArray();

        document.getElementById('board').style.display = "none";                          // UNDEFINED
        document.getElementById('board').innerHTML = createTable(board.getArray());
        document.getElementsByTagName("table")[i].setAttribute("id", [i]);
        document.getElementById([i]).style.display = "block";

        if (i > 0) {
            document.getElementById([i-1]).style.display = "none";
        }
        if (i == dirs.length) {
            return
        }
        board.moveBlank(dirs[i]);
        console.log(dirs[i])
        await sleep(200);
    }
}

function start() {
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];
    // "R D D R D R U R D D D L R D R R"

    document.getElementById("button").disabled = true; 
    
    puzzle = getPuzzleFromUser();
    dirs = getDirectionsFromUser();

    var board = new Board(puzzle)

    var list = document.getElementsByTagName("table");

    for(let i = list.length - 1; i >= 0; i--) {
        list[i].remove();
    }

    simulate(board, dirs);

    document.getElementById("button").disabled = false;
}

