import { useRef } from "react";
import { Grid } from "./components/grid";
import { PathFindingProvider } from "./providers/path-finding-provider";
import { SpeedProvider } from "./providers/speed-provider";
import { Nav } from "./components/Nav";
import { TileProvider } from "./providers/tile-provider";

function App() {
	const isVizRunningRef = useRef<boolean>(false);
	return (
		<PathFindingProvider>
			<TileProvider>
				<SpeedProvider>
					<div className="h-screen w-screen flex flex-col bg-[#131416]">
						<Nav isVizRunningRef={isVizRunningRef} />
						<Grid isVizRunningRef={isVizRunningRef} />
					</div>
				</SpeedProvider>
			</TileProvider>
		</PathFindingProvider>
	);
}

export default App;
