async function dfs(start, end, delay) {
    resetStop();
    const stack = [start];
    const visited = new Set();
    const prev = new Map();
    visited.add(`${start.row},${start.col}`);

    while (stack.length > 0 && !shouldStop()) {
        const node = stack.pop();
        setVisited(node);
        await sleep(delay);

        if (node === end) break;

        for (let neighbor of getNeighbors(node)) {
            const key = `${neighbor.row},${neighbor.col}`;
            if (!visited.has(key)) {
                visited.add(key);
                prev.set(neighbor, node);
                stack.push(neighbor);
            }
        }
    }

    if (!shouldStop()) {
        await reconstructPath(end, prev, delay);
    }
}