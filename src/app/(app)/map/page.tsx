import MapContainer from '@/app/(app)/map/_source/components/map-container';
import MapLoader from '@/app/(app)/map/_source/components/map-loader';
import MapTopBar from '@/app/(app)/map/_source/components/map-top-bar';

const MapPage = () => {
	return (
		<MapContainer>
			<MapTopBar />
			<MapLoader />
		</MapContainer>
	);
};

export default MapPage;
