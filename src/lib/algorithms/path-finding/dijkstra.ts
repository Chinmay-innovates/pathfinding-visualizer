import { getUnvisitedNeighbors } from "../../../utils/get-unvisited-neighbors";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
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

	const unvisitedTiles = [base]; // Initialize the queue with the start tile

	while (unvisitedTiles.length > 0) {
		unvisitedTiles.sort((a, b) => a.distance - b.distance);
		const currTile = unvisitedTiles.shift() as TileType;

		if (currTile) {
			if (currTile.isWall) continue;
			if (currTile.distance === Infinity) break;

			currTile.isTraversed = true;
			visitedTiles.push(currTile);

			if (isEqual(currTile, endTile)) break;

			const neighbors = getUnvisitedNeighbors(grid, currTile);

			for (let i = 0; i < neighbors.length; i++) {
				if (currTile.distance + 1 < neighbors[i].distance) {
					dropFromQueue(neighbors[i], unvisitedTiles);
					neighbors[i].distance = currTile.distance + 1;
					neighbors[i].parent = currTile;
					unvisitedTiles.push(neighbors[i]);
				}
			}
		}
	}

	const path: TileType[] = [];
	let curr = grid[endTile.row][endTile.col];
	while (curr !== null) {
		curr.isPath = true;
		path.unshift(curr);
		curr = curr.parent as TileType;
	}
	return {
		visitedTiles,
		path,
	};
};
