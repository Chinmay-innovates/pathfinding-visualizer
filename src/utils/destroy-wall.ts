import { BASE_TILE_STYLE, DEFAULT_SPEED, SPEEDS } from "./constants";
import { sleep } from "./helpers";
import { GridType, SpeedType } from "./types";

const updateTile = (grid: GridType, row: number, col: number) => {
	grid[row][col].isWall = false;
	document.getElementById(
		`${row}-${col}`
	)!.className = `${BASE_TILE_STYLE} animate-wall-removal`;
};

export const destroyWall = async (
	grid: GridType,
	row: number,
	col: number,
	isRight: number,
	speed: SpeedType
) => {
	const speedValue =
		SPEEDS.find((s) => s.value === speed)?.value ?? DEFAULT_SPEED;
	const delay = 20 * speedValue - 5;

	if (isRight && col + 1 < grid[row].length) updateTile(grid, row, col + 1);
	else if (row + 1 < grid.length) updateTile(grid, row + 1, col);
	else updateTile(grid, row, col);

	await sleep(delay);
};
