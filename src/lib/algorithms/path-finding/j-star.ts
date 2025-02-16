import { constructPath } from "../../../utils/construct-path";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { initFunctionCost, initHeuristiCost } from "../../../utils/heuristic";
import { GridType, TileType } from "../../../utils/types";

const jump = (
	grid: GridType,
	currTile: TileType,
	direction: { row: number; col: number },
	endTile: TileType
): TileType | null => {
	let nextRow = currTile.row + direction.row;
	let nextCol = currTile.col + direction.col;

	// Check boundaries to prevent out-of-bounds access
	if (
		nextRow < 0 ||
		nextCol < 0 ||
		nextRow >= grid.length ||
		nextCol >= grid[0].length
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
	const heuristicCost = initHeuristiCost(grid, endTile);
	const functionCost = initFunctionCost();

	const base = grid[startTile.row][startTile.col];
	base.distance = 0;
	functionCost[base.row][base.col] =
		base.distance + heuristicCost[base.row][base.col];
	base.isTraversed = true;

	const unTraversed = [base]; // Initialize the queue with the start tile

	console.log("Start tile:", startTile);

	while (unTraversed.length > 0) {
		// Sorting by function cost (f = g + h)
		unTraversed.sort((a, b) => {
			if (functionCost[a.row][a.col] === functionCost[b.row][b.col])
				return b.distance - a.distance;
			return functionCost[a.row][a.col] - functionCost[b.row][b.col];
		});

		// Check if the queue is empty before accessing
		if (unTraversed.length === 0) {
			console.error("Untraversed queue is empty!");
			break; // Exit if the queue is empty unexpectedly
		}

		const currTile: TileType = unTraversed.shift() as TileType;
		if (currTile) {
			console.log(`Processing tile: ${currTile.row}, ${currTile.col}`);

			if (currTile.isWall) continue;
			if (currTile.distance === Infinity) break;

			currTile.isTraversed = true;
			visitedTiles.push(currTile);

			console.log(`Visited: ${currTile.row}, ${currTile.col}`); // Debug log for visited nodes

			// If we found the end tile, break
			if (isEqual(currTile, endTile)) break;

			// Directions to move (right, down, left, up, and diagonal directions)
			const directions = [
				{ row: -1, col: 0 }, // Up
				{ row: 1, col: 0 }, // Down
				{ row: 0, col: -1 }, // Left
				{ row: 0, col: 1 }, // Right
				{ row: -1, col: -1 }, // Up-left (diagonal)
				{ row: -1, col: 1 }, // Up-right (diagonal)
				{ row: 1, col: -1 }, // Down-left (diagonal)
				{ row: 1, col: 1 }, // Down-right (diagonal)
			];

			for (let dir of directions) {
				const jumpedTile = jump(grid, currTile, dir, endTile);

				if (jumpedTile) {
					const distance = currTile.distance + 1;

					// If the new distance is shorter, update the tile's cost and add it to the queue
					if (distance < jumpedTile.distance) {
						dropFromQueue(jumpedTile, unTraversed);
						jumpedTile.distance = distance;
						functionCost[jumpedTile.row][jumpedTile.col] =
							jumpedTile.distance +
							heuristicCost[jumpedTile.row][jumpedTile.col];
						jumpedTile.parent = currTile;

						// Debug log for queue updates
						console.log(
							`Adding tile to queue: ${jumpedTile.row}, ${jumpedTile.col}`
						);

						unTraversed.push(jumpedTile);
					}
				}
			}
		}
	}

	// Ensure animation is triggered after pathfinding
	const path = constructPath(grid, endTile, visitedTiles);
	return path;
};
