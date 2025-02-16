import { constructBiPath } from "../../../utils/construct-bi-path";
import { getNeighbors } from "../../../utils/helpers";
import { MinHeap } from "../../../utils/helpers";
import { initHeuristiCost } from "../../../utils/heuristic";
import { resetGrid } from "../../../utils/reset-grid";
import { GridType, TileType } from "../../../utils/types";

export const BIDIRECTIONAL_A_STAR = (
	grid: GridType,
	startTile: TileType,
	endTile: TileType
) => {
	resetGrid(grid);
	const visitedTiles: TileType[] = [];
	const forwardQueue = new MinHeap<TileType>((a, b) => a.fScore - b.fScore);
	const backwardQueue = new MinHeap<TileType>((a, b) => a.fScore - b.fScore);

	const forwardVisited = new Set<TileType>();
	const backwardVisited = new Set<TileType>();

	const forwardParents = new Map<TileType, TileType | null>();
	const backwardParents = new Map<TileType, TileType | null>();

	const startNode = grid[startTile.row][startTile.col];
	const endNode = grid[endTile.row][endTile.col];

	// Initialize forward search
	startNode.gScore = 0;
	startNode.fScore = initHeuristiCost(grid, endTile)[startNode.row][
		startNode.col
	];
	forwardQueue.insert(startNode);
	forwardVisited.add(startNode);
	forwardParents.set(startNode, null);

	// Initialize backward search
	endNode.gScore = 0;
	endNode.fScore = initHeuristiCost(grid, startTile)[endNode.row][endNode.col];
	backwardQueue.insert(endNode);
	backwardVisited.add(endNode);
	backwardParents.set(endNode, null);

	let meetingNode: TileType | null = null;

	while (!forwardQueue.isEmpty() && !backwardQueue.isEmpty()) {
		// Process forward search
		if (!forwardQueue.isEmpty()) {
			const currentForward = forwardQueue.extractMin()!;
			visitedTiles.push(currentForward);
			currentForward.isTraversed = true;

			if (backwardVisited.has(currentForward)) {
				meetingNode = currentForward;
				break;
			}

			const forwardNeighbors = getNeighbors(grid, currentForward).filter(
				(neighbor) => !neighbor.isWall
			);
			for (const neighbor of forwardNeighbors) {
				if (!forwardVisited.has(neighbor)) {
					const tentativeGScore = currentForward.gScore + 1;
					if (tentativeGScore < neighbor.gScore) {
						neighbor.gScore = tentativeGScore;
						neighbor.fScore =
							tentativeGScore +
							initHeuristiCost(grid, endTile)[neighbor.row][neighbor.col];
						forwardParents.set(neighbor, currentForward);
						forwardQueue.insert(neighbor);
						forwardVisited.add(neighbor);
					}
				}
			}
		}

		// Process backward search
		if (!backwardQueue.isEmpty()) {
			const currentBackward = backwardQueue.extractMin()!;
			visitedTiles.push(currentBackward);
			currentBackward.isTraversed = true;

			if (forwardVisited.has(currentBackward)) {
				meetingNode = currentBackward;
				break;
			}

			const backwardNeighbors = getNeighbors(grid, currentBackward).filter(
				(neighbor) => !neighbor.isWall
			);
			for (const neighbor of backwardNeighbors) {
				if (!backwardVisited.has(neighbor)) {
					const tentativeGScore = currentBackward.gScore + 1;
					if (tentativeGScore < neighbor.gScore) {
						neighbor.gScore = tentativeGScore;
						neighbor.fScore =
							tentativeGScore +
							initHeuristiCost(grid, startTile)[neighbor.row][neighbor.col];
						backwardParents.set(neighbor, currentBackward);
						backwardQueue.insert(neighbor);
						backwardVisited.add(neighbor);
					}
				}
			}
		}
	}

	if (!meetingNode) return { path: [], visitedTiles };

	return constructBiPath(
		forwardParents,
		backwardParents,
		meetingNode,
		visitedTiles
	);
};
