import { GridType, SpeedType, TileType } from "../../../utils/types";
import { horizontalDivision } from "./horizontal-division";
import { verticalDivision } from "./vertical-division";

export const recursiveDivision = async ({
	grid,
	startTile,
	endTile,
	row,
	col,
	height,
	width,
	setIsDisabled,
	speed,
}: {
	grid: GridType;
	startTile: TileType;
	endTile: TileType;
	row: number;
	col: number;
	height: number;
	width: number;
	setIsDisabled: (disabled: boolean) => void;
	speed: SpeedType;
}) => {
	if (height <= 1 || width <= 1) {
		return; // Base case: if the section is too small, stop recursion
	}

	if (height > width) {
		// Divide horizontally if height is greater than width
		await horizontalDivision({
			grid,
			startTile,
			endTile,
			row,
			col,
			height,
			width,
			setIsDisabled,
			speed,
		});
	} else {
		// Divide vertically if width is greater than or equal to height
		await verticalDivision({
			grid,
			startTile,
			endTile,
			row,
			col,
			height,
			width,
			setIsDisabled,
			speed,
		});
	}
};
