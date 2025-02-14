import { GridType, SpeedType, TileType } from "../../../utils/types";
import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import { createWall } from "../../../utils/create-wall";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import { destroyWall } from "../../../utils/destroy-wall";

export const binaryTree = async (
	grid: GridType,
	startTile: TileType,
	endTile: TileType,
	setIsDisabled: (isDisabled: boolean) => void,
	speed: SpeedType
) => {
	createWall(startTile, endTile, speed);
	await sleep(MAX_ROWS * MAX_COLS);

	for (const row of grid)
		for (const tile of row)
			if (tile.row % 2 === 0 || tile.col % 2 === 0)
				if (!isEqual(startTile, tile) && !isEqual(endTile, tile))
					tile.isWall = true;

	for (let row = 1; row < MAX_ROWS; row += 2)
		for (let col = 1; col < MAX_COLS; col += 2)
			if (row === MAX_ROWS - 2 && col === MAX_COLS - 2) continue;
			else if (row === MAX_ROWS - 2)
				await destroyWall(grid, row, col, 1, speed); // East
			else if (col === MAX_COLS - 2)
				await destroyWall(grid, row, col, 0, speed); // South (or North)
			else await destroyWall(grid, row, col, getRandInt(0, 2), speed);

	setIsDisabled(false);
};
