import { TileType } from "./types";

export const constructBiPath = (
	forwardParents: Map<TileType, TileType | null>,
	backwardParents: Map<TileType, TileType | null>,
	meetingNode: TileType,
	visitedTiles: TileType[]
) => {
	// Reconstruct path from start to meeting node
	const pathFromStart: TileType[] = [];
	let node: TileType | null = meetingNode;
	while (node !== null) {
		pathFromStart.push(node);
		node.isPath = true;
		node = forwardParents.get(node) || null;
	}
	pathFromStart.reverse();

	// Reconstruct path from end to meeting node
	const pathFromEnd: TileType[] = [];
	node = backwardParents.get(meetingNode) || null;
	while (node !== null) {
		pathFromEnd.push(node);
		node.isPath = true;
		node = backwardParents.get(node) || null;
	}

	// Combine paths
	const fullPath = [...pathFromStart, ...pathFromEnd];

	return { path: fullPath, visitedTiles };
};
