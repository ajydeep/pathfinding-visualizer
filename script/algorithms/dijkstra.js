async function dijkstra(start, end, delay) {
    resetStop();
    const distances = new Map();
    const prev = new Map();
    const pq = [];
    
    for (let row of grid) {
        for (let node of row) {
            distances.set(node, Infinity);
        }
    }
    distances.set(start, 0);
    pq.push({ node: start, dist: 0 });

    while (pq.length > 0 && !shouldStop()) {
        pq.sort((a, b) => a.dist - b.dist);
        const { node } = pq.shift();
        setVisited(node);
        await sleep(delay);

        if (node === end) break;

        for (let neighbor of getNeighbors(node)) {
            const alt = distances.get(node) + 1;
            if (alt < distances.get(neighbor)) {
                distances.set(neighbor, alt);
                prev.set(neighbor, node);
                pq.push({ node: neighbor, dist: alt });
            }
        }
    }

    if (!shouldStop()) {
        await reconstructPath(end, prev, delay);
    }
}