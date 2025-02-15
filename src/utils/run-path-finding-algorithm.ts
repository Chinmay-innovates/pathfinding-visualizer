import { BFS } from "../lib/algorithms/path-finding/bfs";
import { DFS } from "../lib/algorithms/path-finding/dfs";
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
		case "DFS":
			return DFS(grid, startTile, endTile);
		default:
			return BFS(grid, startTile, endTile);
	}
};
