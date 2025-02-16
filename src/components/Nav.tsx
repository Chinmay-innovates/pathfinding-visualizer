import { ChangeEvent, useState } from "react";

import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { runMazeAlgorithm } from "../utils/run-maze-algorith";
import { resetGrid } from "../utils/reset-grid";
import { MAZES, PATHFINDING_ALGORITHMS, SPEEDS } from "../utils/constants";

import { usePathfinding } from "../hooks/use-path-finding";
import { useSpeed } from "../hooks/use-speed";
import { useTile } from "../hooks/use-tile";

import { Select } from "./select";
import { PlayButton } from "./play";
import { runPathFindingAlgorithm } from "../utils/run-path-finding-algorithm";
import { animatePath } from "../utils/animate-path";

export const Nav = ({
	isVizRunningRef,
}: {
	isVizRunningRef: React.MutableRefObject<boolean>;
}) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const {
		maze,
		setMaze,
		grid,
		setGrid,
		isGraphVisualized,
		setIsGraphVisualized,
		columns,
		setColumns,
		algorithm,
		setAlgorithm,
	} = usePathfinding();
	const { startTile, endTile } = useTile();
	const { speed, setSpeed } = useSpeed();

	const handleGenerateMaze = (maze: MazeType) => {
		if (maze === "NONE") {
			const newGrid = grid.map((row) =>
				row.map((tile) => ({
					...tile,
					isWall: false,
					isVisited: false,
					isPath: false,
				}))
			);
			setMaze(maze);
			setGrid(newGrid); // Update grid with new references
			setIsGraphVisualized(false);
			setIsDisabled(false); // Enable UI if needed
			return;
		}

		setMaze(maze);
		setIsDisabled(true);
		runMazeAlgorithm({
			maze,
			grid,
			startTile,
			endTile,
			setIsDisabled,
			speed,
		});
		//  create a new grid to avoid mutation
		const newGrid = grid.map((row) => [...row]); // Shallow copy rows if necessary
		setGrid(newGrid);
		setIsGraphVisualized(false);
	};

	const handleRunVisualization = () => {
		if (isGraphVisualized) {
			setIsGraphVisualized(false);
			resetGrid(grid);
			return;
		}

		const sanitizedGrid = grid.map((row) => row.map((tile) => ({ ...tile })));

		const { path, visitedTiles } = runPathFindingAlgorithm({
			algorithm,
			grid: sanitizedGrid,
			startTile,
			endTile,
		});

		setIsDisabled(true);
		isVizRunningRef.current = true;

		animatePath(visitedTiles, path, startTile, endTile, speed).then(() => {
			setGrid(sanitizedGrid);
			setIsGraphVisualized(true);
			setIsDisabled(false);
			isVizRunningRef.current = false;
		});
	};

	return (
		<div className="flex - items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
			<h1 className="pl-1 lg:flex hidden text-2xl font-semibold hover:text-emerald-500 transition ease-in">
				Path Finding Visualizer
			</h1>

			<div className="flex items-center justify-center flex-1 space-x-4">
				<Select
					label="Graph"
					value={algorithm}
					isDisabled={isDisabled}
					onChange={(e: ChangeEvent<HTMLSelectElement>) => {
						setAlgorithm(e.target.value as AlgorithmType);
					}}
					options={PATHFINDING_ALGORITHMS}
				/>
				<PlayButton
					isDisabled={isDisabled}
					isGraphVisualized={isGraphVisualized}
					handleRunVisualization={handleRunVisualization}
				/>
				<Select
					label="Maze"
					value={maze}
					isDisabled={isDisabled}
					onChange={(e: ChangeEvent<HTMLSelectElement>) => {
						handleGenerateMaze(e.target.value as MazeType);
					}}
					options={MAZES}
				/>
			</div>
			<div className="flex items-center space-x-2 text-white">
				<label>Columns:</label>
				<input
					type="range"
					min="49"
					max="99"
					value={columns}
					onChange={(e) => setColumns(Number(e.target.value))}
					disabled={isDisabled}
					className="w-24"
				/>
				<span>{columns}</span>
			</div>
			<Select
				label="Speed"
				value={speed}
				isDisabled={isDisabled}
				onChange={(e: ChangeEvent<HTMLSelectElement>) => {
					setSpeed(parseInt(e.target.value) as SpeedType);
				}}
				options={SPEEDS}
			/>
		</div>
	);
};
