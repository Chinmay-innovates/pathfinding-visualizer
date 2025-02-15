import { getUnvisitedNeighbors } from "../../../utils/get-unvisited-neighbors";
import { isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const DFS = (grid: GridType, startTile: TileType, endTile: TileType) => {
	const visitedTiles: TileType[] = [];
	const base = grid[startTile.row][startTile.col];

	base.distance = 0;
	base.isTraversed = true;

	const unvisitedTiles = [base]; // Initialize the queue with the start tile

	if (isEqual(startTile, endTile)) {
		base.isPath = true;
		return {
			visitedTiles: [base],
			path: [base],
		};
	}

	while (unvisitedTiles.length > 0) {
		const currTile = unvisitedTiles.pop() as TileType;

		if (currTile) {
			if (currTile.isWall) continue;
			if (currTile.distance === Infinity) break;

			currTile.isTraversed = true;
			visitedTiles.push(currTile);

			if (isEqual(currTile, endTile)) break;

			const neighbors = getUnvisitedNeighbors(grid, currTile);
			for (const neighbor of neighbors) {
				if (!neighbor.isTraversed && !neighbor.isWall) {
					neighbor.distance = currTile.distance + 1;
					neighbor.parent = currTile;
					unvisitedTiles.push(neighbor);
				}
			}
		}
	}

	const path: TileType[] = [];
	let curr = grid[endTile.row][endTile.col];

	while (curr != null) {
		curr.isPath = true;
		path.unshift(curr);
		curr = curr.parent as TileType;
	}

	return {
		visitedTiles,
		path,
	};
};
