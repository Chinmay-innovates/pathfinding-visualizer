import { getUnvisitedNeighbors } from "../../../utils/get-unvisited-neighbors";
import { isEqual } from "../../../utils/helpers";
import { isInQueue } from "../../../utils/is-in-queue";
import { GridType, TileType } from "../../../utils/types";

export const BFS = (grid: GridType, startTile: TileType, endTile: TileType) => {
	const visited: TileType[] = [startTile];
	const base = grid[startTile.row][startTile.col];
	base.distance = 0;
	base.isTraversed = true;

	const unvisited = [base];

	while (unvisited.length) {
		const tile = unvisited.shift() as TileType;
		if (tile.isWall) continue;
		if (tile.distance === Infinity) break;

		tile.isTraversed = true;
		visited.push(tile);

		if (isEqual(tile, endTile)) break;

		const neighbors = getUnvisitedNeighbors(grid, tile);

		for (let i = 0; i < neighbors.length; i++) {
			if (!isInQueue(neighbors[i], unvisited)) {
				const neighbor = neighbors[i];
				neighbor.distance = tile.distance + 1;
				neighbor.parent = tile;
				unvisited.push(neighbor);
			}
		}
	}

	const path = [];
	let tile = grid[endTile.row][endTile.col];

	while (tile !== null) {
		tile.isPath = true;
		path.unshift(tile);
		tile = tile.parent!;
	}

	return {
		path,
		visited,
	};
};
