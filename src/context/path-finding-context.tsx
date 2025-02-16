import { createContext } from "react";
import { AlgorithmType, GridType, MazeType } from "../utils/types.ts";

interface IPathFindingContext {
	algorithm: AlgorithmType;
	setAlgorithm: (algorithm: AlgorithmType) => void;
	maze: MazeType;
	setMaze: (maze: MazeType) => void;
	grid: GridType;
	setGrid: (grid: GridType) => void;
	columns: number;
	setColumns: (columns: number) => void;
	isGraphVisualized: boolean;
	setIsGraphVisualized: (isGraphVisualized: boolean) => void;
}

export const PathFindingContext = createContext<
	IPathFindingContext | undefined
>(undefined);

PathFindingContext.displayName = "PathFindingContext";
