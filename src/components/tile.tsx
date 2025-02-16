import { twMerge } from "tailwind-merge";
import {
	END_TILE_STYLE,
	MAX_ROWS,
	PATH_TILE_STYLE,
	START_TILE_STYLE,
	BASE_TILE_STYLE,
	TRAVERSED_TILE_STYLE,
	WALL_TILE_STYLE,
} from "../utils/constants";

interface MouseFunction {
	(row: number, col: number): void;
}
export const Tile = ({
	row,
	col,
	isStart,
	isEnd,
	isTraversed,
	isWall,
	isPath,
	handleMouseDown,
	handleMouseUp,
	handleMouseEnter,
}: {
	row: number;
	col: number;
	isStart: boolean;
	isEnd: boolean;
	isTraversed: boolean;
	isWall: boolean;
	isPath: boolean;
	handleMouseDown: MouseFunction;
	handleMouseUp: MouseFunction;
	handleMouseEnter: MouseFunction;
}) => {
	// const tileTyleStyle = isStart
	// 	? START_TILE_STYLE
	// 	: isEnd
	// 	? END_TILE_STYLE
	// 	: isWall
	// 	? WALL_TILE_STYLE
	// 	: isPath
	// 	? PATH_TILE_STYLE
	// 	: isTraversed
	// 	? TRAVERSED_TILE_STYLE
	// 	: BASE_TILE_STYLE;

	// const borderStyle =
	// 	row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "";
	// const edgeStyle = row === MAX_ROWS - 1 && col === 0 ? "border-l" : "";

	const className = twMerge(
		BASE_TILE_STYLE,
		isTraversed && TRAVERSED_TILE_STYLE,
		isPath && PATH_TILE_STYLE,
		isWall && WALL_TILE_STYLE,
		isStart && START_TILE_STYLE,
		isEnd && END_TILE_STYLE,
		row === MAX_ROWS - 1 ? "border-b" : col === 0 ? "border-l" : "", // border styles
		row === MAX_ROWS - 1 && col === 0 ? "border-l" : "" // edge styles
	);
	return (
		<div
			className={className}
			id={`${row}-${col}`}
			onMouseDown={() => handleMouseDown(row, col)}
			onMouseUp={() => handleMouseUp(row, col)}
			onMouseEnter={() => handleMouseEnter(row, col)}
		/>
	);
};
