function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clearPath() {
    for (let row of grid) {
        for (let cell of row) {
            if (cell.element.classList.contains('visited') || 
                cell.element.classList.contains('path')) {
                cell.element.classList.remove('visited', 'path');
            }
        }
    }
}

let stopAlgorithm = false;

function requestStop() {
    stopAlgorithm = true;
}

function resetStop() {
    stopAlgorithm = false;
}

function shouldStop() {
    return stopAlgorithm;
}