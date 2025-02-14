import {
	BASE_TILE_STYLE,
	MAX_COLS,
	MAX_ROWS,
	SPEEDS,
} from "../../../utils/constants";
import { createWall } from "../../../utils/create-wall";
import { isEqual, sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";

export const primsMaze = async (
	grid: GridType,
	startTile: TileType,
	endTile: TileType,
	setIsDisabled: (isDisabled: boolean) => void,
	speed: SpeedType
) => {
	createWall(startTile, endTile, speed);
	await sleep(MAX_ROWS * MAX_COLS);

	for (const row of grid) {
		for (const tile of row) {
			if (tile.row % 2 === 0 || tile.col % 2 === 0) {
				if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
					tile.isWall = true;
				}
			}
		}
	}

	const startRow =
		Math.floor(Math.random() * Math.floor((MAX_ROWS - 1) / 2)) * 2 + 1;
	const startCol =
		Math.floor(Math.random() * Math.floor((MAX_COLS - 1) / 2)) * 2 + 1;

	const frontier: [number, number, number, number][] = [];
	const mazeCells = new Set<string>();
	const speedValue = SPEEDS.find((s) => s.value === speed)!.value;

	mazeCells.add(`${startRow}-${startCol}`);
	grid[startRow][startCol].isWall = false;

	const addToFrontier = (row: number, col: number) => {
		const directions = [
			[row - 2, col, row - 1, col], // Up
			[row + 2, col, row + 1, col], // Down
			[row, col - 2, row, col - 1], // Left
			[row, col + 2, row, col + 1], // Right
		];

		for (const [nRow, nCol, wRow, wCol] of directions) {
			if (nRow < 0 || nRow >= MAX_ROWS || nCol < 0 || nCol >= MAX_COLS)
				continue;

			// Only add if neighbor cell isn't in maze and wall exists
			if (!mazeCells.has(`${nRow}-${nCol}`) && grid[wRow][wCol].isWall) {
				const exists = frontier.some(
					([fRow, fCol]) => fRow === nRow && fCol === nCol
				);
				if (!exists) {
					frontier.push([nRow, nCol, wRow, wCol]);
				}
			}
		}
	};

	// Initialize with starting cell's neighbors
	addToFrontier(startRow, startCol);

	while (frontier.length > 0) {
		const randomIndex = Math.floor(Math.random() * frontier.length);
		const [nRow, nCol, wRow, wCol] = frontier[randomIndex];
		frontier.splice(randomIndex, 1);

		// Connect to maze if neighbor not already connected
		if (!mazeCells.has(`${nRow}-${nCol}`)) {
			grid[wRow][wCol].isWall = false;

			document.getElementById(
				`${wRow}-${wCol}`
			)!.className = `${BASE_TILE_STYLE} animate-wall-removal`;
			await sleep(10 * speedValue);

			// Add new cell to maze
			mazeCells.add(`${nRow}-${nCol}`);
			grid[nRow][nCol].isWall = false;

			// Add new frontier walls
			addToFrontier(nRow, nCol);
		}
	}

	setIsDisabled(false);
};
