import {
	EXTENDED_SLEEP_TIME,
	PATH_TILE_STYLE,
	SLEEP_TIME,
	SPEEDS,
	TRAVERSED_TILE_STYLE,
} from "./constants";
import { SpeedType, TileType } from "./types";
import { handleAnimationEnd, isEqual } from "./helpers";

export const animatePath = (
	visitedTiles: TileType[],
	path: TileType[],
	startTile: TileType,
	endTile: TileType,
	speed: SpeedType
): Promise<void> => {
	return new Promise((resolve) => {
		const speedMultiplier = SPEEDS.find((s) => s.value === speed)!.value;
		const visitedDelay = SLEEP_TIME * speedMultiplier; //per tile
		const pathDelay = EXTENDED_SLEEP_TIME * speedMultiplier; //per tile

		let completedAnimations = 0;
		const totalAnimations = visitedTiles.length + path.length;

		const checkCompletion = () => {
			completedAnimations++;
			if (completedAnimations === totalAnimations) {
				resolve();
			}
		};

		// Animate visited tiles
		visitedTiles.forEach((tile, i) => {
			setTimeout(() => {
				if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
					const element = document.getElementById(`${tile.row}-${tile.col}`);
					element!.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
					handleAnimationEnd(element!, checkCompletion);
				} else {
					checkCompletion();
				}
			}, visitedDelay * i);
		});

		// Animate path tiles after visited tiles
		const pathStartDelay = visitedDelay * visitedTiles.length;
		path.forEach((tile, i) => {
			setTimeout(() => {
				if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
					const element = document.getElementById(`${tile.row}-${tile.col}`);
					element!.className = `${PATH_TILE_STYLE} animate-path`;
					handleAnimationEnd(element!, checkCompletion);
				} else {
					checkCompletion();
				}
			}, pathStartDelay + pathDelay * i);
		});

		//  empty animation case
		if (totalAnimations === 0) resolve();
	});
};
