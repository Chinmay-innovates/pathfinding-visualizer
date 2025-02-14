import { useRef } from "react";
import { Grid } from "./components/grid";
import { PathFindingProvider } from "./context/path-finding-context";
import { SpeedProvider } from "./context/speed-context";
import { TileProvider } from "./context/tile-context";
import { Nav } from "./components/Nav";

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
