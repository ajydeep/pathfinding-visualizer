const gridContainer = document.getElementById('grid-container');
const algorithmSelector = document.getElementById('algorithm');
const runButton = document.getElementById('runBtn');
const stopButton = document.getElementById('stopBtn');
const clearButton = document.getElementById('clearBtn');
const speedSlider = document.getElementById('speedSlider');
const toolStart = document.getElementById('toolStart');
const toolEnd = document.getElementById('toolEnd');
const toolWall = document.getElementById('toolWall');

let selectedTool = 'wall';
let delay = 100 - speedSlider.value;

// Initialize grid
createGrid(gridContainer);

// Event listeners
speedSlider.addEventListener('input', () => {
    delay = 100 - speedSlider.value;
});

toolStart.addEventListener('click', () => selectedTool = 'start');
toolEnd.addEventListener('click', () => selectedTool = 'end');
toolWall.addEventListener('click', () => selectedTool = 'wall');

gridContainer.addEventListener('mousedown', (e) => {
    if (!e.target.classList.contains('cell')) return;
    handleCellClick(e.target);
    isMouseDown = true;
});

gridContainer.addEventListener('mouseover', (e) => {
    if (!isMouseDown || !e.target.classList.contains('cell')) return;
    handleCellClick(e.target);
});

document.addEventListener('mouseup', () => isMouseDown = false);

function handleCellClick(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const node = grid[row][col];

    switch (selectedTool) {
        case 'start':
            if (startNode) startNode.element.classList.remove('start');
            startNode = node;
            cell.className = 'cell start';
            break;
        case 'end':
            if (endNode) endNode.element.classList.remove('end');
            endNode = node;
            cell.className = 'cell end';
            break;
        case 'wall':
            if (node !== startNode && node !== endNode) {
                cell.classList.toggle('wall');
            }
            break;
    }
}

runButton.addEventListener('click', async () => {
    if (!startNode || !endNode) return alert('Please set start and end points');
    clearPath();
    
    const algorithm = algorithmSelector.value;
    switch (algorithm) {
        case 'bfs': await bfs(startNode, endNode, delay); break;
        case 'dfs': await dfs(startNode, endNode, delay); break;
        case 'dijkstra': await dijkstra(startNode, endNode, delay); break;
    }
});

stopButton.addEventListener('click', () => {
    requestStop();
});

clearButton.addEventListener('click', () => {
    resetGrid(true);
});