import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const createRow = (row: number, startTile: TileType, endTile: TileType) => {
	const currentRow = [];
	for (let col = 0; col < MAX_COLS; col++) {
		currentRow.push({
			row,
			col,
			isEnd: row === endTile.row && col === endTile.col,
			isWall: false,
			isPath: false,
			distance: Infinity,
			isStart: row === startTile.row && col === startTile.col,
			isTraversed: false,
			parent: null,
		});
	}
	return currentRow;
};

export const createGrid = (startTile: TileType, endTile: TileType) => {
	const grid: GridType = [];
	for (let row = 0; row < MAX_ROWS; row++) {
		grid.push(createRow(row, startTile, endTile));
	}
	return grid;
};

export const checkIfDefault = (row: number, col: number) => {
	return (
		(row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
	);
};

export const createNewGrid = (grid: GridType, row: number, col: number) => {
	const newGrid = grid.slice();
	const newTile = {
		...newGrid[row][col],
		isWall: !newGrid[row][col].isWall,
	};

	newGrid[row][col] = newTile;
	return newGrid;
};

export const isEqual = (tile1: TileType, tile2: TileType) => {
	return tile1.row === tile2.row && tile1.col === tile2.col;
};
export const isRowColEqual = (row: number, col: number, tile: TileType) => {
	return row === tile.row && col === tile.col;
};

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const getRandInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min) + min);
};

export function formatUpper(str: string) {
	return str.replace(/_/g, " ").toUpperCase();
}

export const checkStack = (tile: TileType, stack: TileType[]) => {
	for (let i = 0; i < stack.length; i++) {
		if (isEqual(tile, stack[i])) return true;
	}
	return false;
};

export const dropFromQueue = (tile: TileType, queue: TileType[]) => {
	for (let i = 0; i < queue.length; i++) {
		if (isEqual(tile, queue[i])) {
			queue.splice(i, 1);
			break;
		}
	}
};

export class DSU {
	private parent: Map<string, string>;
	private rank: Map<string, number>;

	constructor() {
		this.parent = new Map();
		this.rank = new Map();
	}

	find(id: string): string {
		if (!this.parent.has(id)) {
			this.parent.set(id, id);
			this.rank.set(id, 1);
		}

		let p = this.parent.get(id)!;
		while (p !== this.parent.get(p)) {
			this.parent.set(p, this.parent.get(this.parent.get(p)!)!);
			p = this.parent.get(p)!;
		}
		return p;
	}

	union(x: string, y: string): void {
		const xRoot = this.find(x);
		const yRoot = this.find(y);

		if (xRoot === yRoot) return;

		const xRank = this.rank.get(xRoot)!;
		const yRank = this.rank.get(yRoot)!;

		if (xRank < yRank) {
			this.parent.set(xRoot, yRoot);
		} else {
			this.parent.set(yRoot, xRoot);
			if (xRank === yRank) {
				this.rank.set(xRoot, xRank + 1);
			}
		}
	}

	connected(x: string, y: string): boolean {
		return this.find(x) === this.find(y);
	}
}

export function shuffleArray(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
