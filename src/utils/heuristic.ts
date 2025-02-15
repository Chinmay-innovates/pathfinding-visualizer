import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const retrieveHeuristiCost = (currTile: TileType, endTile: TileType) => {
	return (
		Math.abs(currTile.row - endTile.row) + Math.abs(currTile.col - endTile.col)
	);
};

export const initHeuristiCost = (grid: GridType, endTile: TileType) => {
	return grid.map((row) =>
		row.map((tile) => retrieveHeuristiCost(tile, endTile))
	);
};

export const initFunctionCost = () => {
	return Array.from({ length: MAX_ROWS }, () => Array(MAX_COLS).fill(Infinity));
};
