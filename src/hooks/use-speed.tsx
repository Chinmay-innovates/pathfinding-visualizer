import { useContext } from "react";
import { SpeedContext } from "../context/speed-context";

export const useSpeed = () => {
	const context = useContext(SpeedContext);

	if (!context) {
		throw new Error("useSpeed must be used within a PathfindingProvider");
	}

	return context;
};
