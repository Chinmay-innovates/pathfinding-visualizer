import { MAX_COLS, MAX_ROWS } from "../../../utils/constants";
import { constructPath } from "../../../utils/construct-path";
import { chebyshevCost, dropFromQueue, isEqual } from "../../../utils/helpers";
import { initFunctionCost } from "../../../utils/heuristic";
import { GridType, TileType } from "../../../utils/types";

const jump = (
	grid: GridType,
	currTile: TileType,
	direction: { row: number; col: number },
	endTile: TileType
): TileType | null => {
	const nextRow = currTile.row + direction.row;
	const nextCol = currTile.col + direction.col;

	// Check boundaries to prevent out-of-bounds access
	if (
		nextRow < 0 ||
		nextCol < 0 ||
		nextRow >= MAX_ROWS ||
		nextCol >= MAX_COLS
	) {
		return null; // Prevent accessing out of bounds
	}

	const tile = grid[nextRow][nextCol];
	if (tile.isWall) return null;

	// Check if current tile is the end tile
	if (isEqual(tile, endTile)) return tile;

	// Check for forced neighbors in cardinal directions when moving diagonally
	if (direction.row !== 0 && direction.col !== 0) {
		// Diagonal movement: check for forced neighbors
		if (
			(grid[nextRow - direction.row]?.[nextCol]?.isWall &&
				!grid[nextRow]?.[nextCol - direction.col]?.isWall) ||
			(grid[nextRow]?.[nextCol - direction.col]?.isWall &&
				!grid[nextRow - direction.row]?.[nextCol]?.isWall)
		) {
			return tile;
		}
		// Recursively jump in both cardinal directions
		const verticalJump = jump(
			grid,
			tile,
			{ row: direction.row, col: 0 },
			endTile
		);
		const horizontalJump = jump(
			grid,
			tile,
			{ row: 0, col: direction.col },
			endTile
		);
		if (verticalJump || horizontalJump) {
			return tile;
		}
	} else {
		// Cardinal direction movement
		if (direction.row !== 0) {
			// Vertical movement
			if (
				(grid[nextRow]?.[nextCol + 1]?.isWall &&
					!grid[nextRow + direction.row]?.[nextCol + 1]?.isWall) ||
				(grid[nextRow]?.[nextCol - 1]?.isWall &&
					!grid[nextRow + direction.row]?.[nextCol - 1]?.isWall)
			) {
				return tile;
			}
		} else {
			// Horizontal movement
			if (
				(grid[nextRow + 1]?.[nextCol]?.isWall &&
					!grid[nextRow + 1]?.[nextCol + direction.col]?.isWall) ||
				(grid[nextRow - 1]?.[nextCol]?.isWall &&
					!grid[nextRow - 1]?.[nextCol + direction.col]?.isWall)
			) {
				return tile;
			}
		}
	}

	// Continue jumping recursively
	return jump(grid, tile, direction, endTile);
};

export const J_STAR = (
	grid: GridType,
	startTile: TileType,
	endTile: TileType
) => {
	const visitedTiles: TileType[] = [];
	const heuristicCost = chebyshevCost(grid, endTile); // init HeuristiCost
	const functionCost = initFunctionCost();

	const base = grid[startTile.row][startTile.col];
	base.distance = 0;
	functionCost[base.row][base.col] =
		base.distance + heuristicCost[base.row][base.col];
	base.isTraversed = true;

	const unTraversed = [base];

	while (unTraversed.length > 0) {
		unTraversed.sort((a, b) => {
			if (functionCost[a.row][a.col] === functionCost[b.row][b.col])
				return b.distance - a.distance;
			return functionCost[a.row][a.col] - functionCost[b.row][b.col];
		});

		const currTile: TileType = unTraversed.shift() as TileType;
		if (currTile) {
			if (currTile.isWall) continue;
			if (currTile.distance === Infinity) break;

			currTile.isTraversed = true;
			visitedTiles.push(currTile);

			if (isEqual(currTile, endTile)) break;

			const directions = [
				{ row: -1, col: 0 },
				{ row: 1, col: 0 },
				{ row: 0, col: -1 },
				{ row: 0, col: 1 },
				{ row: -1, col: -1 },
				{ row: -1, col: 1 },
				{ row: 1, col: -1 },
				{ row: 1, col: 1 },
			];

			for (const dir of directions) {
				const jumpedTile = jump(grid, currTile, dir, endTile);
				if (jumpedTile) {
					const dx = Math.abs(jumpedTile.row - currTile.row);
					const dy = Math.abs(jumpedTile.col - currTile.col);
					const distance = currTile.distance + Math.max(dx, dy);

					if (distance < jumpedTile.distance) {
						dropFromQueue(jumpedTile, unTraversed);
						jumpedTile.distance = distance;
						functionCost[jumpedTile.row][jumpedTile.col] =
							distance + heuristicCost[jumpedTile.row][jumpedTile.col];
						jumpedTile.parent = currTile;
						unTraversed.push(jumpedTile);
					}
				}
			}
		}
	}

	return constructPath(grid, endTile, visitedTiles);
};
