import { ReactNode, createContext, useState } from "react";
import { TileType } from "../utils/types";
import { END_TILE_CONFIG, START_TILE_CONFIG } from "../utils/constants";

interface ITileContext {
	startTile: TileType;
	setStartTile: (startTile: TileType) => void;
	endTile: TileType;
	setEndTile: (endTile: TileType) => void;
}

export const TileContext = createContext<ITileContext | undefined>(undefined);

export const TileProvider = ({ children }: { children: ReactNode }) => {
	const [startTile, setStartTile] = useState<TileType>(START_TILE_CONFIG);
	const [endTile, setEndTile] = useState<TileType>(END_TILE_CONFIG);

	return (
		<TileContext.Provider
			value={{
				startTile,
				setStartTile,
				endTile,
				setEndTile,
			}}
		>
			{children}
		</TileContext.Provider>
	);
};
