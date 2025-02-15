import { getUnvisitedNeighbors } from "../../../utils/get-unvisited-neighbors";
import { isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const BFS = (grid: GridType, startTile: TileType, endTile: TileType) => {
	const visitedTiles: TileType[] = [];
	const base = grid[startTile.row][startTile.col];
	base.distance = 0;
	base.isTraversed = true;
	const unTraversed = [base]; // Initialize the queue with the start tile

	while (unTraversed.length > 0) {
		const tile = unTraversed.shift() as TileType;
		if (tile.isWall) continue;
		if (tile.distance === Infinity) break;

		tile.isTraversed = true;
		visitedTiles.push(tile);
		if (isEqual(tile, endTile)) break;

		const neighbors = getUnvisitedNeighbors(grid, tile);
		for (const neighbor of neighbors) {
			if (!neighbor.isTraversed && !neighbor.isWall) {
				neighbor.isTraversed = true;
				neighbor.distance = tile.distance + 1;
				neighbor.parent = tile;
				unTraversed.push(neighbor);
			}
		}
	}

	const path: TileType[] = [];
	let tile = grid[endTile.row][endTile.col];
	while (tile !== null) {
		// Backtrack until the start tile
		tile.isPath = true;
		path.unshift(tile);
		tile = tile.parent as TileType;
	}
	return { visitedTiles, path };
};
