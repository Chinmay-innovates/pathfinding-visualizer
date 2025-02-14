import { useState } from "react";
import { usePathfinding } from "../hooks/use-path-finding";
import { twMerge } from "tailwind-merge";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./tile";
import { checkIfDefault, createNewGrid } from "../utils/helpers";

export function Grid({
	isVizRunningRef,
}: {
	isVizRunningRef: React.MutableRefObject<boolean>;
}) {
	const { grid, setGrid } = usePathfinding();
	const [isMouseDown, setIsMouseDown] = useState(false);

	const handleMouseDown = (row: number, col: number) => {
		if (isVizRunningRef.current || checkIfDefault(row, col)) return;

		setIsMouseDown(true);
		const newGrid = createNewGrid(grid, row, col);
		setGrid(newGrid);
	};

	const handleMouseUp = (row: number, col: number) => {
		if (isVizRunningRef.current || checkIfDefault(row, col)) return;

		setIsMouseDown(false);
	};
	const handleMouseEnter = (row: number, col: number) => {
		if (isVizRunningRef.current || checkIfDefault(row, col)) return;

		if (isMouseDown) {
			const newGrid = createNewGrid(grid, row, col);
			setGrid(newGrid);
		}
	};

	return (
		<div
			className={twMerge(
				"flex items-center flex-col justify-center border-sky-300 mt-8",
				`lg:min-h-[${MAX_ROWS * 17}px]  md:min-h-[${
					MAX_ROWS * 15
				}px] sm:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,

				`lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] sm:w-[${
					MAX_COLS * 8
				}px] w-[${MAX_COLS * 7}px]`
			)}
		>
			{grid.map((r, rowIndex) => (
				<div key={rowIndex} className="flex">
					{r.map((tile, tileIndex) => {
						const { row, col, isEnd, isStart, isPath, isTraversed, isWall } =
							tile;
						return (
							<Tile
								key={tileIndex}
								row={row}
								col={col}
								isEnd={isEnd}
								isPath={isPath}
								isStart={isStart}
								isTraversed={isTraversed}
								isWall={isWall}
								handleMouseUp={handleMouseUp}
								handleMouseDown={handleMouseDown}
								handleMouseEnter={handleMouseEnter}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
}
