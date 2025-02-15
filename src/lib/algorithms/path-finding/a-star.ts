import { constructPath } from "../../../utils/construct-path";
import { getUnvisitedNeighbors } from "../../../utils/get-unvisited-neighbors";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { initFunctionCost, initHeuristiCost } from "../../../utils/heuristic";
import { GridType, TileType } from "../../../utils/types";

export const A_STAR = (
	grid: GridType,
	startTile: TileType,
	endTile: TileType
) => {
	const visitedTiles: TileType[] = [];
	const heuristicCost = initHeuristiCost(grid, endTile);
	const functionCost = initFunctionCost();

	const base = grid[startTile.row][startTile.col];
	base.distance = 0;
	functionCost[base.row][base.col] =
		base.distance + heuristicCost[base.row][base.col];
	base.isTraversed = true;

	const unTraversed = [base]; // Initialize the queue with the start tile

	while (unTraversed.length > 0) {
		unTraversed.sort((a, b) => {
			if (functionCost[a.row][a.col] === functionCost[b.row][b.col])
				return b.distance - a.distance;

			return functionCost[a.row][a.col] - functionCost[b.row][b.col];
		});
		const currTile: TileType = unTraversed.shift() as TileType;
		if (currTile) {
			if (currTile.isWall) continue;
			if (currTile.distance === Infinity) break;

			currTile.isTraversed = true;
			visitedTiles.push(currTile);
			if (isEqual(currTile, endTile)) break;

			const neighbors = getUnvisitedNeighbors(grid, currTile);

			for (let i = 0; i < neighbors.length; i++) {
				const distance = currTile.distance + 1;

				if (distance < neighbors[i].distance) {
					dropFromQueue(neighbors[i], unTraversed);
					neighbors[i].distance = distance;
					functionCost[neighbors[i].row][neighbors[i].col] =
						neighbors[i].distance +
						heuristicCost[neighbors[i].row][neighbors[i].col];

					neighbors[i].parent = currTile;
					unTraversed.push(neighbors[i]);
				}
			}
		}
	}

	return constructPath(grid, endTile, visitedTiles);
};
