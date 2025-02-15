import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const retrieveHeuristiCost = (currTile: TileType, endTile: TileType) => {
	const manhattanDistance = 1;
	const row = Math.abs(currTile.row - endTile.row);
	const col = Math.abs(currTile.col - endTile.col);

	return manhattanDistance * (row + col);
};

export const initHeuristiCost = (grid: GridType, endTile: TileType) => {
	const heuristiCost = [];

	for (let i = 0; i < MAX_ROWS; i++) {
		const row = [];
		for (let j = 0; j < MAX_COLS; j++) {
			row.push(retrieveHeuristiCost(grid[i][j], endTile));
		}
		heuristiCost.push(row);
	}
	return heuristiCost;
};

export const initFunctionCost = () => {
	const functionCost = [];
	for (let i = 0; i < MAX_ROWS; i++) {
		const row = [];
		for (let j = 0; j < MAX_COLS; j++) {
			row.push(Infinity);
		}
		functionCost.push(row);
	}
	return functionCost;
};
