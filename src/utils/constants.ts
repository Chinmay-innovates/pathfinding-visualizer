import { AlgorithmSelectType, MazeSelectType, SpeedSelectType } from "./types";

export const MAX_ROWS = 39;
export const MAX_COLS = 99;

export const START_TILE_CONFIG = {
	row: 7,
	col: 8,
	isEnd: false,
	isWall: false,
	isPath: false,
	distance: 0,
	isStart: false,
	isTraversed: false,
	parent: null,
	fScore: 0,
	gScore: 0,
};

export const END_TILE_CONFIG = {
	row: MAX_ROWS - 5,
	col: MAX_COLS - 5,
	isEnd: false,
	isWall: false,
	isPath: false,
	distance: 0,
	isStart: false,
	isTraversed: false,
	parent: null,
	fScore: 0,
	gScore: 0,
};

export const BASE_TILE_STYLE =
	"lg:w-[17px] md:w-[15px] xs:w-[8px] w-[7px] lg:h-[17px] md:h-[15px] xs:h-[8px] h-[7px] border-t border-r border-sky-200";
export const TRAVERSED_TILE_STYLE = BASE_TILE_STYLE + " bg-cyan-500";
export const START_TILE_STYLE = BASE_TILE_STYLE + " bg-green-500";
export const END_TILE_STYLE = BASE_TILE_STYLE + " bg-red-600";
export const WALL_TILE_STYLE = BASE_TILE_STYLE + " bg-gray-400";
export const PATH_TILE_STYLE = BASE_TILE_STYLE + " bg-yellow-300";

export const MAZES: MazeSelectType[] = [
	{ name: "No Maze", value: "NONE" },
	{ name: "Binary Tree", value: "BINARY_TREE" },
	{ name: "Recursive Division", value: "RECURSIVE_DIVISION" },
	{ name: "Kruskals Algorithm", value: "KRUSKALS_ALGORITHM" },
	{ name: "Prims Algorithm", value: "PRIMS_ALGORITHM" },
	{ name: "Wilsons Algorithm", value: "WILSONS_ALGORITHM" },
];

export const PATHFINDING_ALGORITHMS: AlgorithmSelectType[] = [
	{ name: "Dijkstra", value: "DIJKSTRA" },
	{ name: "A-Star", value: "A_STAR" },
	{ name: "J-Star", value: "J_STAR" },
	{ name: "Breath First Search", value: "BFS" },
	{ name: "Depth First Search", value: "DFS" },
	{ name: "Greedy Best First Search", value: "GBFS" },
	{ name: "Bidirectional BFS", value: "BIDIRECTIONAL_BFS" },
	{ name: "Bidirectional A-Star", value: "BIDIRECTIONAL_ASTAR" },
];

export const SPEEDS: SpeedSelectType[] = [
	{ name: "Slow", value: 2 },
	{ name: "Medium", value: 1 },
	{ name: "Fast", value: 0.5 },
];

export const SLEEP_TIME = 8;
export const EXTENDED_SLEEP_TIME = 80;

export const DEFAULT_SPEED = 2;
