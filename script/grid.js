const ROWS = 20;
const COLS = 40;
let grid = [];
let startNode = null;
let endNode = null;

function createGrid(container) {
    grid = [];
    container.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
        const rowArr = [];
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            container.appendChild(cell);
            rowArr.push({ row, col, element: cell });
        }
        grid.push(rowArr);
    }
}

function resetGrid(clearWalls = false) {
    for (let row of grid) {
        for (let cell of row) {
            if (clearWalls || !cell.element.classList.contains('wall')) {
                cell.element.className = 'cell';
            }
        }
    }
    if (clearWalls) {
        startNode = null;
        endNode = null;
    }
}

function getNeighbors(node) {
    const { row, col } = node;
    const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const neighbors = [];

    for (let [dr, dc] of deltas) {
        const r = row + dr, c = col + dc;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && !grid[r][c].element.classList.contains('wall')) {
            neighbors.push(grid[r][c]);
        }
    }
    return neighbors;
}