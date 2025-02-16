import { BFS } from "../lib/algorithms/path-finding/bfs";
import { DFS } from "../lib/algorithms/path-finding/dfs";
import { A_STAR } from "../lib/algorithms/path-finding/a-star";
import { DIJKSTRA } from "../lib/algorithms/path-finding/dijkstra";

import { GBFS } from "../lib/algorithms/path-finding/gbfs";
import { J_STAR } from "../lib/algorithms/path-finding/j-star";
import { BIDIRECTIONAL_A_STAR } from "../lib/algorithms/path-finding/bidirectional-a-star";
import { BIDIRECTIONAL_BFS } from "../lib/algorithms/path-finding/bidirectional-search";

import { AlgorithmType, GridType, TileType } from "./types";
import { resetGrid } from "./reset-grid";

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
	resetGrid(grid);
	switch (algorithm) {
		case "BFS":
			return BFS(grid, startTile, endTile);
		case "DFS":
			return DFS(grid, startTile, endTile);
		case "DIJKSTRA":
			return DIJKSTRA(grid, startTile, endTile);
		case "A_STAR":
			return A_STAR(grid, startTile, endTile);
		case "GBFS":
			return GBFS(grid, startTile, endTile);
		case "BIDIRECTIONAL_BFS":
			return BIDIRECTIONAL_BFS(grid, startTile, endTile);
		case "BIDIRECTIONAL_ASTAR":
			return BIDIRECTIONAL_A_STAR(grid, startTile, endTile);
		case "J_STAR":
			return J_STAR(grid, startTile, endTile);
		default:
			return BFS(grid, startTile, endTile);
	}
};
