import {
	BASE_TILE_STYLE,
	END_TILE_CONFIG,
	START_TILE_CONFIG,
	MAX_COLS,
	MAX_ROWS,
} from "./constants";
import { isEqual } from "./helpers";
import { GridType, TileType } from "./types";

export const resetGrid = ({
	grid,
	startTile = START_TILE_CONFIG,
	endTile = END_TILE_CONFIG,
}: {
	grid: GridType;
	startTile?: TileType;
	endTile?: TileType;
}) => {
	for (let row = 0; row < MAX_ROWS; row++) {
		for (let col = 0; col < MAX_COLS; col++) {
			const tile = grid[row][col];

			tile.distance = Infinity;
			tile.isTraversed = false;
			tile.isPath = false;
			tile.parent = null;
			tile.isWall = false;

			if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
				const tileEl = document.getElementById(`${tile.row}-${tile.col}`);

				if (tileEl) tileEl.className = BASE_TILE_STYLE;

				if (tile.row === MAX_ROWS - 1) tileEl?.classList.add("border-b");

				if (tile.col === MAX_COLS - 1) tileEl?.classList.add("border-l");
			}
		}
	}
};
