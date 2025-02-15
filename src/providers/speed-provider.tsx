import { useState } from "react";
import { SpeedType } from "../utils/types";
import { SpeedContext } from "../context/speed-context";

export const SpeedProvider = ({ children }: { children: React.ReactNode }) => {
	const [speed, setSpeed] = useState<SpeedType>(0.5);

	return (
		<SpeedContext.Provider value={{ speed, setSpeed }}>
			{children}
		</SpeedContext.Provider>
	);
};
