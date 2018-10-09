function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        } else {
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


var board = new Board(size = 16);
board.printArray();
document.getElementById('board-1').innerHTML = createTable(board.getArray());

// var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// var board2 = new Board(a);
// board2.printArray();

var b = ["R", "R", "R", "D", "D", "L", "L"];

async function simulate(dirs) {
    for (let i = 0; i < dirs.length; i++) {
        // TODO: add reloading div without refreshing page
        board.moveBlank(b[i]);
        board.printArray();
        document.getElementById('board-1').innerHTML = createTable(board.getArray());
        await sleep(2000);
    }
}

simulate(b);








