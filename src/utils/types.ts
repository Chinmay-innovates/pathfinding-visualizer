export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS" | "GBFS";
export interface AlgorithmSelectType {
	name: string;
	value: AlgorithmType;
}

export type MazeType =
	| "NONE"
	| "BINARY_TREE"
	| "RECURSIVE_DIVISION"
	| "KRUSKALS_ALGORITHM"
	| "PRIMS_ALGORITHM"
	| "WILSONS_ALGORITHM";
export interface MazeSelectType {
	name: string;
	value: MazeType;
}

export type TileType = {
	row: number;
	col: number;
	isEnd: boolean;
	isWall: boolean;
	isPath: boolean;
	distance: number;
	isTraversed: boolean;
	isStart: boolean;
	parent: TileType | null;
	cost?: number;
};

export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;
export interface SpeedSelectType {
	name: string;
	value: SpeedType;
}
