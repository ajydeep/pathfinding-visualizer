async function bfs(start, end, delay) {
    resetStop();
    const queue = [start];
    const visited = new Set();
    const prev = new Map();
    visited.add(`${start.row},${start.col}`);

    while (queue.length > 0 && !shouldStop()) {
        const node = queue.shift();
        setVisited(node);
        await sleep(delay);

        if (node === end) break;

        for (let neighbor of getNeighbors(node)) {
            const key = `${neighbor.row},${neighbor.col}`;
            if (!visited.has(key)) {
                visited.add(key);
                prev.set(neighbor, node);
                queue.push(neighbor);
            }
        }
    }

    if (!shouldStop()) {
        await reconstructPath(end, prev, delay);
    }
}

async function reconstructPath(end, prev, delay) {
    let current = end;
    const path = [];
    
    while (prev.has(current)) {
        current = prev.get(current);
        if (current !== startNode) path.push(current);
    }

    for (let i = path.length - 1; i >= 0; i--) {
        setPath(path[i]);
        await sleep(delay/2);
    }
}