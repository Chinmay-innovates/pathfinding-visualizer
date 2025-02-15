import {
	BASE_TILE_STYLE,
	MAX_COLS,
	MAX_ROWS,
	SPEEDS,
} from "../../../utils/constants";
import { createWall } from "../../../utils/create-wall";
import { isEqual, sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";

export const wilsonsMaze = async (
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

	const mazeCells = new Set<string>();
	const speedValue = SPEEDS.find((s) => s.value === speed)!.value;
	const totalCells =
		Math.floor((MAX_ROWS - 1) / 2) * Math.floor((MAX_COLS - 1) / 2);

	const validRowsCount = Math.floor((MAX_ROWS - 1) / 2);
	const validColsCount = Math.floor((MAX_COLS - 1) / 2);

	const initialRow = 1 + 2 * Math.floor(Math.random() * validRowsCount);
	const initialCol = 1 + 2 * Math.floor(Math.random() * validColsCount);
	mazeCells.add(`${initialRow}-${initialCol}`);
	grid[initialRow][initialCol].isWall = false;

	while (mazeCells.size < totalCells) {
		// Find random unvisited valid cell
		let current: [number, number];
		do {
			const randomRow = 1 + 2 * Math.floor(Math.random() * validRowsCount);
			const randomCol = 1 + 2 * Math.floor(Math.random() * validColsCount);
			current = [randomRow, randomCol];
		} while (mazeCells.has(`${current[0]}-${current[1]}`));

		const path: [number, number][] = [current];
		const visited = new Map<string, number>();
		visited.set(`${current[0]}-${current[1]}`, 0);

		// Perform loop-erased random walk
		while (!mazeCells.has(`${current[0]}-${current[1]}`)) {
			const neighbors: [number, number][] = [];
			const directions = [
				[current[0] - 2, current[1]], // Up
				[current[0] + 2, current[1]], // Down
				[current[0], current[1] - 2], // Left
				[current[0], current[1] + 2], // Right
			];

			for (const [nr, nc] of directions) {
				// Check if neighbor is within grid bounds
				if (nr >= 1 && nr < MAX_ROWS && nc >= 1 && nc < MAX_COLS) {
					neighbors.push([nr, nc]);
				}
			}

			if (neighbors.length === 0) break;

			const next = neighbors[Math.floor(Math.random() * neighbors.length)]; // Random neighbor

			if (visited.has(`${next[0]}-${next[1]}`)) {
				// Erase loop
				const loopIndex = visited.get(`${next[0]}-${next[1]}`)!;
				path.splice(loopIndex + 1);
				visited.forEach((v, k) => {
					if (v > loopIndex) visited.delete(k);
				});
				current = next;
			} else {
				visited.set(`${next[0]}-${next[1]}`, path.length);
				path.push(next);
				current = next;
			}
		}

		// Add path to maze
		for (let i = 0; i < path.length - 1; i++) {
			const [r1, c1] = path[i];
			const [r2, c2] = path[i + 1];

			// Remove wall between cells
			const wallRow = (r1 + r2) / 2;
			const wallCol = (c1 + c2) / 2;

			if (
				!isEqual(grid[wallRow][wallCol], startTile) &&
				!isEqual(grid[wallRow][wallCol], endTile)
			) {
				grid[wallRow][wallCol].isWall = false;

				document.getElementById(
					`${wallRow}-${wallCol}`
				)!.className = `${BASE_TILE_STYLE} animate-wall-removal`;
				await sleep(10 * speedValue);
			}

			// Add cell to maze
			if (!mazeCells.has(`${r1}-${c1}`)) {
				mazeCells.add(`${r1}-${c1}`);
				grid[r1][c1].isWall = false;
			}
		}
	}

	setIsDisabled(false);
};
