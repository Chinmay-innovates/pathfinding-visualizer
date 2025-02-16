import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType } from "./types";

export const resetGrid = (grid: GridType) => {
	for (let row = 0; row < MAX_ROWS; row++) {
		for (let col = 0; col < MAX_COLS; col++) {
			const tile = grid[row][col];

			// Reset ALL algorithm-related properties
			tile.isTraversed = false;
			tile.isPath = false;
			tile.distance = Infinity;
			tile.parent = null;
			tile.gScore = Infinity;
			tile.fScore = Infinity;

			// Preserve walls between runs
			// tile.isWall = false;
		}
	}
};
