import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

export const getUnvisitedNeighbors = (grid: GridType, tile: TileType) => {
	const { row, col } = tile;
	const neighbors: TileType[] = [];

	if (row > 0) neighbors.push(grid[row - 1][col]); // above tile
	if (row < MAX_ROWS - 1) neighbors.push(grid[row + 1][col]); // below tile
	if (col > 0) neighbors.push(grid[row][col - 1]); // left tile
	if (col < MAX_COLS - 1) neighbors.push(grid[row][col + 1]); // right tile

	return neighbors.filter((neighbor) => !neighbor.isTraversed);
};
