import { constructBiPath } from "../../../utils/construct-bi-path";
import { getNeighbors, Queue } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const BIDIRECTIONAL_BFS = (
	grid: GridType,
	startTile: TileType,
	endTile: TileType
) => {
	const visitedTiles: TileType[] = [];
	let forwardQueue = new Queue<TileType>();
	let backwardQueue = new Queue<TileType>();

	let forwardVisited = new Set<TileType>();
	let backwardVisited = new Set<TileType>();

	let forwardParents = new Map<TileType, TileType | null>();
	let backwardParents = new Map<TileType, TileType | null>();

	const startNode = grid[startTile.row][startTile.col];
	const endNode = grid[endTile.row][endTile.col];

	// Initialize queues
	forwardQueue.enqueue(startNode);
	forwardVisited.add(startNode);
	forwardParents.set(startNode, null);

	backwardQueue.enqueue(endNode);
	backwardVisited.add(endNode);
	backwardParents.set(endNode, null);

	let meetingNode: TileType | null = null;

	while (!forwardQueue.isEmpty() && !backwardQueue.isEmpty()) {
		// Always process the smaller queue first
		if (forwardQueue.size() > backwardQueue.size()) {
			// Swap queues and associated data
			[forwardQueue, backwardQueue] = [backwardQueue, forwardQueue];
			[forwardVisited, backwardVisited] = [backwardVisited, forwardVisited];
			[forwardParents, backwardParents] = [backwardParents, forwardParents];
		}

		// Process entire level of the current queue
		const levelSize = forwardQueue.size();
		for (let i = 0; i < levelSize; i++) {
			const current = forwardQueue.dequeue()!;
			current.isTraversed = true;
			visitedTiles.push(current);

			// Check for intersection
			if (backwardVisited.has(current)) {
				meetingNode = current;
				break;
			}

			// Expand neighbors
			const neighbors = getNeighbors(grid, current);
			for (const neighbor of neighbors) {
				if (!forwardVisited.has(neighbor) && !neighbor.isWall) {
					forwardVisited.add(neighbor);
					forwardParents.set(neighbor, current);
					forwardQueue.enqueue(neighbor);
				}
			}
		}

		if (meetingNode) break;
	}

	if (!meetingNode) return { path: [], visitedTiles };

	return constructBiPath(
		forwardParents,
		backwardParents,
		meetingNode,
		visitedTiles
	);
};
