import {
	BASE_TILE_STYLE,
	MAX_COLS,
	MAX_ROWS,
	SPEEDS,
} from "../../../utils/constants";
import { createWall } from "../../../utils/create-wall";
import { DSU, isEqual, shuffleArray, sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";

export const kruskalsMaze = async (
	grid: GridType,
	startTile: TileType,
	endTile: TileType,
	setIsDisabled: (isDisabled: boolean) => void,
	speed: SpeedType
) => {
	createWall(startTile, endTile, speed);
	await sleep(MAX_ROWS * MAX_COLS);

	// Create initial grid pattern with cells and walls
	for (const row of grid) {
		for (const tile of row) {
			if (tile.row % 2 === 0 || tile.col % 2 === 0) {
				if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
					tile.isWall = true;
				}
			}
		}
	}

	const walls: {
		wallRow: number;
		wallCol: number;
		currCell: TileType;
		nextCell: TileType;
	}[] = [];

	for (let row = 1; row < MAX_ROWS; row += 2) {
		for (let col = 1; col < MAX_COLS; col += 2) {
			// Add walls to the east and south of each cell
			if (col + 2 < MAX_COLS) {
				walls.push({
					wallRow: row,
					wallCol: col + 1,
					currCell: grid[row][col],
					nextCell: grid[row][col + 2],
				});
			}
			if (row + 2 < MAX_ROWS) {
				walls.push({
					wallRow: row + 1,
					wallCol: col,
					currCell: grid[row][col],
					nextCell: grid[row + 2][col],
				});
			}
		}
	}

	// Randomize wall processing order
	shuffleArray(walls);
	const dsu = new DSU();
	const speedValue = SPEEDS.find((s) => s.value === speed)!.value;

	for (const { wallRow, wallCol, currCell, nextCell } of walls) {
		const currCellId = `${currCell.row}-${currCell.col}`;
		const nextCellId = `${nextCell.row}-${nextCell.col}`;

		if (!dsu.connected(currCellId, nextCellId)) {
			grid[wallRow][wallCol].isWall = false;

			document.getElementById(
				`${wallRow}-${wallCol}`
			)!.className = `${BASE_TILE_STYLE} animate-wall-removal`;
			await sleep(10 * speedValue);

			dsu.union(currCellId, nextCellId);

			setTimeout(() => {
				document.getElementById(`${wallRow}-${wallCol}`)!.className =
					BASE_TILE_STYLE;
			}, 300);
		}
	}

	setIsDisabled(false);
};
