import { constructPath } from "../../../utils/construct-path";
import { getUnvisitedNeighbors } from "../../../utils/get-unvisited-neighbors";
import { isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const DFS = (grid: GridType, startTile: TileType, endTile: TileType) => {
	const visitedTiles: TileType[] = [];
	const stack: TileType[] = [grid[startTile.row][startTile.col]];
	const visited = new Set<TileType>();

	while (stack.length > 0) {
		const currTile = stack.pop() as TileType;
		if (currTile.isWall || visited.has(currTile)) continue;

		visited.add(currTile);
		visitedTiles.push(currTile);
		currTile.isTraversed = true;

		if (isEqual(currTile, endTile)) break;

		for (const neighbor of getUnvisitedNeighbors(grid, currTile)) {
			if (!visited.has(neighbor) && !neighbor.isWall) {
				neighbor.distance = currTile.distance + 1;
				neighbor.parent = currTile;
				stack.push(neighbor);
			}
		}
	}

	return constructPath(grid, endTile, visitedTiles);
};
