import { useAtom } from 'jotai';

import { getRegionCenter } from '@/app/(app)/map/_source/lib/region';
import { handleCenterCoordinateAtom, handleZoomAtom } from '@/app/(app)/map/_source/store/mapPropsStorage';

export const useMapPropsStorage = () => {
	const [centerCoordinate, handleCenterCoordinate] = useAtom(handleCenterCoordinateAtom);
	const [zoom, handleZoom] = useAtom(handleZoomAtom);

	const saveCenterCoordinate = (centerCoordinate: { lat: number; lng: number }) => {
		handleCenterCoordinate(centerCoordinate);
	};

	const saveCenterCoordinateForMoveRegion = async (sigCd: number) => {
		const data = await getRegionCenter(sigCd);
		if (data) {
			handleCenterCoordinate({ lat: data.center_lat, lng: data.center_lng });
		}
	};

	const saveZoom = (zoom: number) => {
		handleZoom(zoom);
	};

	return { centerCoordinate, zoom, saveCenterCoordinate, saveCenterCoordinateForMoveRegion, saveZoom };
};
