import { createContext } from "react";
import { TileType } from "../utils/types";

interface ITileContext {
	startTile: TileType;
	setStartTile: (startTile: TileType) => void;
	endTile: TileType;
	setEndTile: (endTile: TileType) => void;
}

export const TileContext = createContext<ITileContext | undefined>(undefined);

TileContext.displayName = "TileContext";
