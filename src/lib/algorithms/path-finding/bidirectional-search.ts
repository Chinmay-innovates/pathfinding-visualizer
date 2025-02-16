import { getNeighbors } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const BIDIRECTIONAL_BFS = (
	grid: GridType,
	startTile: TileType,
	endTile: TileType
) => {
	const visitedTiles: TileType[] = [];
	const forwardQueue: TileType[] = [];
	const backwardQueue: TileType[] = [];
	const forwardVisited = new Map<TileType, boolean>();
	const backwardVisited = new Map<TileType, boolean>();
	const forwardParents = new Map<TileType, TileType | null>();
	const backwardParents = new Map<TileType, TileType | null>();

	const startNode = grid[startTile.row][startTile.col];
	const endNode = grid[endTile.row][endTile.col];

	// Initialize forward BFS
	forwardQueue.push(startNode);
	forwardVisited.set(startNode, true);
	forwardParents.set(startNode, null);

	// Initialize backward BFS
	backwardQueue.push(endNode);
	backwardVisited.set(endNode, true);
	backwardParents.set(endNode, null);

	let meetingNode: TileType | null = null;

	while (forwardQueue.length > 0 || backwardQueue.length > 0) {
		// Expand forward BFS
		if (forwardQueue.length > 0) {
			const currentForward = forwardQueue.shift()!;
			currentForward.isTraversed = true; // Mark as traversed
			visitedTiles.push(currentForward);

			// Check if backward search has visited this node
			if (backwardVisited.has(currentForward)) {
				meetingNode = currentForward;
				break;
			}

			const forwardNeighbors = getNeighbors(grid, currentForward);
			for (const neighbor of forwardNeighbors) {
				if (!forwardVisited.has(neighbor) && !neighbor.isWall) {
					forwardVisited.set(neighbor, true);
					forwardParents.set(neighbor, currentForward);
					forwardQueue.push(neighbor);
				}
			}
		}

		// Expand backward BFS
		if (backwardQueue.length > 0) {
			const currentBackward = backwardQueue.shift()!;
			currentBackward.isTraversed = true; // Mark as traversed
			visitedTiles.push(currentBackward);

			// Check if forward search has visited this node
			if (forwardVisited.has(currentBackward)) {
				meetingNode = currentBackward;
				break;
			}

			const backwardNeighbors = getNeighbors(grid, currentBackward);
			for (const neighbor of backwardNeighbors) {
				if (!backwardVisited.has(neighbor) && !neighbor.isWall) {
					backwardVisited.set(neighbor, true);
					backwardParents.set(neighbor, currentBackward);
					backwardQueue.push(neighbor);
				}
			}
		}
	}

	// No path found: return all visited tiles
	if (!meetingNode) {
		return { path: [], visitedTiles };
	}

	// Reconstruct path from meeting node
	const pathFromStart: TileType[] = [];
	let node: TileType | null = meetingNode;
	while (node !== null) {
		pathFromStart.push(node);
		node = forwardParents.get(node) || null;
	}
	pathFromStart.reverse();

	const pathFromEnd: TileType[] = [];
	node = backwardParents.get(meetingNode) || null;
	while (node !== null) {
		pathFromEnd.push(node);
		node = backwardParents.get(node) || null;
	}

	const fullPath = [...pathFromStart, ...pathFromEnd];
	fullPath.forEach((tile) => (tile.isPath = true));

	return { path: fullPath, visitedTiles };
};
