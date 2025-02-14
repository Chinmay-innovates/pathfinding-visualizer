import { BFS } from "../lib/algorithms/path-finding/bfs";
import { AlgorithmType, GridType, TileType } from "./types";

export const runPathFindingAlgorithm = ({
	algorithm,
	grid,
	startTile,
	endTile,
}: {
	algorithm: AlgorithmType;
	grid: GridType;
	startTile: TileType;
	endTile: TileType;
}) => {
	switch (algorithm) {
		case "BFS":
			return BFS(grid, startTile, endTile);
		default:
			return BFS(grid, startTile, endTile);
	}
};
