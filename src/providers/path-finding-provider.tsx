import { ReactNode, useState } from "react";
import {
	END_TILE_CONFIG,
	MAX_COLS,
	START_TILE_CONFIG,
} from "../utils/constants.ts";
import { AlgorithmType, GridType, MazeType } from "../utils/types.ts";
import { createGrid } from "../utils/helpers.ts";
import { PathFindingContext } from "../context/path-finding-context.tsx";

export const PathFindingProvider = ({ children }: { children: ReactNode }) => {
	const [algorithm, setAlgorithm] = useState<AlgorithmType>("BFS");
	const [maze, setMaze] = useState<MazeType>("NONE");
	const [grid, setGrid] = useState<GridType>(
		createGrid(START_TILE_CONFIG, END_TILE_CONFIG)
	);
	const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);
	const [columns, setColumns] = useState(MAX_COLS);

	return (
		<PathFindingContext.Provider
			value={{
				algorithm,
				setAlgorithm,
				maze,
				setMaze,
				grid,
				setGrid,
				columns,
				setColumns,
				isGraphVisualized,
				setIsGraphVisualized,
			}}
		>
			{children}
		</PathFindingContext.Provider>
	);
};
