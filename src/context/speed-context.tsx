import { createContext } from "react";
import { SpeedType } from "../utils/types";

interface ISpeedContext {
	speed: SpeedType;
	setSpeed: (speed: SpeedType) => void;
}

export const SpeedContext = createContext<ISpeedContext | undefined>(undefined);

SpeedContext.displayName = "SpeedContext";