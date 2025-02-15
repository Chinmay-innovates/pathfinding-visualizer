import {
	EXTENDED_SLEEP_TIME,
	PATH_TILE_STYLE,
	SLEEP_TIME,
	SPEEDS,
	TRAVERSED_TILE_STYLE,
} from "./constants";

import { isEqual } from "./helpers";
import { SpeedType, TileType } from "./types";

export const animatePath = (
	visitedTiles: TileType[],
	path: TileType[],
	startTile: TileType,
	endTile: TileType,
	speed: SpeedType
) => {
	const speedMultiplier = SPEEDS.find((s) => s.value === speed)!.value;
	const visitedDelayPerTile = SLEEP_TIME * speedMultiplier;
	const pathDelayPerTile = EXTENDED_SLEEP_TIME * speedMultiplier;

	// Animate visited tiles
	for (let i = 0; i < visitedTiles.length; i++) {
		setTimeout(() => {
			const tile = visitedTiles[i];

			if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
				document.getElementById(
					`${tile.row}-${tile.col}`
				)!.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
			}
		}, visitedDelayPerTile * i);
	}

	// Delay the start of the path animation by the total time of the visited animation
	setTimeout(() => {
		for (let i = 0; i < path.length; i++) {
			setTimeout(() => {
				const tile = path[i];

				if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
					document.getElementById(
						`${tile.row}-${tile.col}`
					)!.className = `${PATH_TILE_STYLE} animate-path`;
				}
			}, pathDelayPerTile * i);
		}
	}, visitedDelayPerTile * visitedTiles.length);
};
