import { MouseEventHandler } from "react";
import { GrPowerReset } from "react-icons/gr";
import { BsFillPlayFill } from "react-icons/bs";

import { usePathfinding } from "../hooks/use-path-finding";
import { formatUpper } from "../utils/helpers";

interface IPlay {
	isDisabled: boolean;
	isGraphVisualized: boolean;
	handleRunVisualization: MouseEventHandler<HTMLButtonElement>;
}
export const PlayButton = ({
	handleRunVisualization,
	isDisabled,
	isGraphVisualized,
}: IPlay) => {
	const { algorithm } = usePathfinding();

	return (
		<button
			disabled={isDisabled}
			onClick={handleRunVisualization}
			className="disabled:pointer-events-none disabled:opacity-50 transition ease-in rounded-full p-2.5 shadow-md bg-green-500 hover:bg-green-600 border-none active:ring-green-300 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-30"
		>
			<div className="flex items-center pr-2">
				{isGraphVisualized ? (
					<GrPowerReset className="size-5" />
				) : (
					<BsFillPlayFill className="size-5" />
				)}
				{formatUpper(algorithm)}
			</div>
		</button>
	);
};
