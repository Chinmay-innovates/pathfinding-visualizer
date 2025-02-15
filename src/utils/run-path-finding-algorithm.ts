import { BFS } from "../lib/algorithms/path-finding/bfs";
import { DFS } from "../lib/algorithms/path-finding/dfs";
import { A_STAR } from "../lib/algorithms/path-finding/a-star";
import { DIJKSTRA } from "../lib/algorithms/path-finding/dijkstra";

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
		case "DIJKSTRA":
			return DIJKSTRA(grid, startTile, endTile);
		case "A_STAR":
			return A_STAR(grid, startTile, endTile);
		default:
			return BFS(grid, startTile, endTile);
	}
};
