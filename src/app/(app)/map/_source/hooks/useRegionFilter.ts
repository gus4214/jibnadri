import { useAtom } from 'jotai';

import { CurrentRegion, handleCurrentRegionAtom } from '@/app/(app)/map/_source/store/region';

// zoom, centerLatitude, centerLongitude 로컬스토리지 저장 필요

export const useRegionFilter = () => {
	const [currentRegion, handleCurrentRegion] = useAtom(handleCurrentRegionAtom);

	const saveCurrentRegion = (currentRegion: CurrentRegion) => {
		handleCurrentRegion(currentRegion);
	};

	return { currentRegion, saveCurrentRegion };
};
