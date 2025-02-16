import { BFS } from "../lib/algorithms/path-finding/bfs";
import { DFS } from "../lib/algorithms/path-finding/dfs";
import { A_STAR } from "../lib/algorithms/path-finding/a-star";
import { DIJKSTRA } from "../lib/algorithms/path-finding/dijkstra";

import { AlgorithmType, GridType, TileType } from "./types";
import { GBFS } from "../lib/algorithms/path-finding/gbfs";
import { BIDIRECTIONAL_BFS } from "../lib/algorithms/path-finding/bidirectional-search";
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
	switch (algorithm) {
		case "BFS":
			resetGrid(grid);
			return BFS(grid, startTile, endTile);
		case "DFS":
			resetGrid(grid);
			return DFS(grid, startTile, endTile);
		case "DIJKSTRA":
			resetGrid(grid);
			return DIJKSTRA(grid, startTile, endTile);
		case "A_STAR":
			resetGrid(grid);
			return A_STAR(grid, startTile, endTile);
		case "GBFS":
			resetGrid(grid);
			return GBFS(grid, startTile, endTile);
		case "BIDIRECTIONAL_BFS":
			resetGrid(grid);
			return BIDIRECTIONAL_BFS(grid, startTile, endTile);
		default:
			return BFS(grid, startTile, endTile);
	}
};
