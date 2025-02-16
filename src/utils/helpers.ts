import { MAX_COLS, MAX_ROWS } from "./constants";
import { _ShuffleArray, GridType, TileType } from "./types";

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

export const checkIfDefault = (row: number, col: number) =>
	(row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2);

export const createNewGrid = (grid: GridType, row: number, col: number) => {
	const newGrid = grid.slice();
	const newTile = {
		...newGrid[row][col],
		isWall: !newGrid[row][col].isWall,
	};

	newGrid[row][col] = newTile;
	return newGrid;
};

export const isEqual = (tile1: TileType, tile2: TileType) =>
	tile1.row === tile2.row && tile1.col === tile2.col;

export const isRowColEqual = (row: number, col: number, tile: TileType) =>
	row === tile.row && col === tile.col;

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

export const dropFromQueue = (tile: TileType, queue: TileType[]) => {
	for (let i = 0; i < queue.length; i++) {
		if (isEqual(tile, queue[i])) {
			queue.splice(i, 1);
			break;
		}
	}
};

export const handleAnimationEnd = (
	element: HTMLElement,
	callback: () => void
) => {
	const onAnimationEnd = () => {
		element.removeEventListener("animationend", onAnimationEnd);
		callback();
	};
	element.addEventListener("animationend", onAnimationEnd);
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

export function shuffleArray(array: _ShuffleArray) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function getNeighbors(grid: GridType, tile: TileType): TileType[] {
	const neighbors: TileType[] = [];
	const { row, col } = tile;
	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid.length - 1) neighbors.push(grid[row][col + 1]);
	return neighbors;
}

export class MinHeap<T> {
	private heap: T[];
	private compare: (a: T, b: T) => number;

	constructor(compareFn: (a: T, b: T) => number) {
		this.heap = [];
		this.compare = compareFn;
	}

	private parent(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	private leftChild(index: number): number {
		return index * 2 + 1;
	}

	private rightChild(index: number): number {
		return index * 2 + 2;
	}

	private swap(i: number, j: number): void {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	private heapifyUp(): void {
		let index = this.heap.length - 1;
		while (
			index > 0 &&
			this.compare(this.heap[index], this.heap[this.parent(index)]) < 0
		) {
			this.swap(index, this.parent(index));
			index = this.parent(index);
		}
	}

	private heapifyDown(): void {
		let index = 0;
		while (this.leftChild(index) < this.heap.length) {
			let smallerChild = this.leftChild(index);
			if (
				this.rightChild(index) < this.heap.length &&
				this.compare(
					this.heap[this.rightChild(index)],
					this.heap[smallerChild]
				) < 0
			) {
				smallerChild = this.rightChild(index);
			}
			if (this.compare(this.heap[index], this.heap[smallerChild]) <= 0) break;
			this.swap(index, smallerChild);
			index = smallerChild;
		}
	}

	insert(value: T): void {
		this.heap.push(value);
		this.heapifyUp();
	}

	extractMin(): T | null {
		if (this.heap.length === 0) return null;
		if (this.heap.length === 1) return this.heap.pop()!;
		const min = this.heap[0];
		this.heap[0] = this.heap.pop()!;
		this.heapifyDown();
		return min;
	}

	isEmpty(): boolean {
		return this.heap.length === 0;
	}
}
