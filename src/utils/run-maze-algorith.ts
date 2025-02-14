import { binaryTree } from "../lib/algorithms/maze/binary-tree";
import { kruskalsMaze } from "../lib/algorithms/maze/kruskals-maze";
import { primsMaze } from "../lib/algorithms/maze/prims-maze";
import { recursiveDivision } from "../lib/algorithms/maze/recursive-division";
import { DEFAULT_SPEED, MAX_COLS, MAX_ROWS, SPEEDS } from "./constants";
import { ConstructBorder } from "./construct-border";
import { GridType, MazeType, SpeedType, TileType } from "./types";

export const runMazeAlgorithm = async ({
	maze,
	grid,
	startTile,
	endTile,
	setIsDisabled,
	speed,
}: {
	maze: MazeType;
	grid: GridType;
	startTile: TileType;
	endTile: TileType;
	setIsDisabled: (isDisabled: boolean) => void;
	speed: SpeedType;
}) => {
	if (maze === "BINARY_TREE") {
		await binaryTree(grid, startTile, endTile, setIsDisabled, speed);
	} else if (maze === "RECURSIVE_DIVISION") {
		const currSpeed =
			SPEEDS.find((s) => s.value === speed)!.value ?? DEFAULT_SPEED;

		await ConstructBorder(grid, startTile, endTile);

		await recursiveDivision({
			grid,
			startTile,
			endTile,
			row: 1,
			col: 1,
			height: Math.floor((MAX_ROWS - 1) / 2),
			width: Math.floor((MAX_COLS - 1) / 2),
			setIsDisabled,
			speed,
		});
		setTimeout(() => {
			setIsDisabled(false);
		}, 800 * currSpeed);
	} else if (maze === "KRUSKALS_ALGORITHM") {
		await kruskalsMaze(grid, startTile, endTile, setIsDisabled, speed);
	} else if (maze === "PRIMS_ALGORITHM") {
		await primsMaze(grid, startTile, endTile, setIsDisabled, speed);
	}
};
