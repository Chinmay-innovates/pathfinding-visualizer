import { constructPath } from "../../../utils/construct-path";
import { getUnvisitedNeighbors } from "../../../utils/get-unvisited-neighbors";
import { isEqual, MinHeap } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const DIJKSTRA = (
	grid: GridType,
	startTile: TileType,
	endTile: TileType
) => {
	const visitedTiles: TileType[] = [];
	const base = grid[startTile.row][startTile.col];
	base.distance = 0;
	base.isTraversed = true;

	const priorityQueue = new MinHeap<TileType>(
		(a, b) => a.distance - b.distance
	);
	priorityQueue.insert(base);

	while (!priorityQueue.isEmpty()) {
		const currTile = priorityQueue.extractMin() as TileType;
		if (currTile.isWall) continue;
		if (currTile.distance === Infinity) break;

		visitedTiles.push(currTile);
		currTile.isTraversed = true;

		if (isEqual(currTile, endTile)) break;

		for (const neighbor of getUnvisitedNeighbors(grid, currTile)) {
			const newDistance = currTile.distance + 1;
			if (newDistance < neighbor.distance) {
				neighbor.distance = newDistance;
				neighbor.parent = currTile;
				priorityQueue.insert(neighbor);
			}
		}
	}

	return constructPath(grid, endTile, visitedTiles);
};
