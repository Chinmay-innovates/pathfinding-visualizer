import { constructPath } from "../../../utils/construct-path";
import { getUnvisitedNeighbors } from "../../../utils/get-unvisited-neighbors";
import { isEqual } from "../../../utils/helpers";
import { initHeuristiCost } from "../../../utils/heuristic";
import { GridType, TileType } from "../../../utils/types";

export const GBFS = (
	grid: GridType,
	startTile: TileType,
	endTile: TileType
) => {
	const visitedTiles: TileType[] = [];
	const heuristicCost = initHeuristiCost(grid, endTile);

	const base = grid[startTile.row][startTile.col];
	base.distance = 0;
	base.isTraversed = true;

	const unTraversed = [base]; // Priority queue

	while (unTraversed.length > 0) {
		// Sort by heuristic cost
		unTraversed.sort(
			(a, b) => heuristicCost[a.row][a.col] - heuristicCost[b.row][b.col]
		);
		const currTile = unTraversed.shift() as TileType;

		if (currTile.isWall) continue;

		visitedTiles.push(currTile);

		if (isEqual(currTile, endTile)) break;

		const neighbors = getUnvisitedNeighbors(grid, currTile);

		for (const neighbor of neighbors) {
			if (!neighbor.isTraversed && !neighbor.isWall) {
				neighbor.isTraversed = true;
				neighbor.parent = currTile;
				unTraversed.push(neighbor);
			}
		}
	}

	return constructPath(grid, endTile, visitedTiles);
};
