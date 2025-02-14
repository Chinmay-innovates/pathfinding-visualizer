import { useContext } from "react";
import { TileContext } from "../context/tile-context";

export const useTile = () => {
	const context = useContext(TileContext);

	if (!context) {
		throw new Error("useTile must be used within a PathfindingProvider");
	}

	return context;
};
