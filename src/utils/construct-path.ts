import { GridType, TileType } from "./types";

export const constructPath = (
	grid: GridType,
	endTile: TileType,
	visitedTiles: TileType[]
) => {
	const path: TileType[] = [];
	let tile: TileType | null = grid[endTile.row][endTile.col];

	while (tile !== null) {
		tile.isPath = true;
		path.unshift(tile);
		tile = tile.parent as TileType;
	}

	return { visitedTiles, path };
};
