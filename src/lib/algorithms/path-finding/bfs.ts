import { constructPath } from "../../../utils/construct-path";
import { getUnvisitedNeighbors } from "../../../utils/get-unvisited-neighbors";
import { isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const BFS = (grid: GridType, startTile: TileType, endTile: TileType) => {
	const visitedTiles: TileType[] = [];
	const base = grid[startTile.row][startTile.col];
	base.distance = 0;
	base.isTraversed = true;

	const queue: TileType[] = [base];
	const visited = new Set<TileType>();

	while (queue.length > 0) {
		const tile = queue.shift() as TileType;
		if (tile.isWall || visited.has(tile)) continue;

		visited.add(tile);
		visitedTiles.push(tile);
		tile.isTraversed = true;

		if (isEqual(tile, endTile)) break;

		for (const neighbor of getUnvisitedNeighbors(grid, tile)) {
			if (!neighbor.isTraversed && !neighbor.isWall) {
				neighbor.isTraversed = true;
				neighbor.distance = tile.distance + 1;
				neighbor.parent = tile;
				queue.push(neighbor);
			}
		}
	}

	return constructPath(grid, endTile, visitedTiles);
};
