function setVisited(node) {
    if (node !== startNode && node !== endNode) {
        node.element.classList.add('visited');
    }
}

function setPath(node) {
    if (node !== startNode && node !== endNode) {
        node.element.classList.remove('visited');
        node.element.classList.add('path');
    }
}