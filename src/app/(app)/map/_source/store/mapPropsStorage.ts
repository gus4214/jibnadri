import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const centerCoordinateAtom = atomWithStorage<{ lat: number; lng: number }>('centerCoordinate', {
	lat: 37.566,
	lng: 126.978,
});

export const zoomAtom = atomWithStorage<number>('zoom', 8);

export const handleCenterCoordinateAtom = atom(
	(get) => get(centerCoordinateAtom),
	(get, set, centerCoordinate: { lat: number; lng: number }) => {
		set(centerCoordinateAtom, (prev) => ({ ...prev, ...centerCoordinate }));
	}
);

export const handleZoomAtom = atom(
	(get) => get(zoomAtom),
	(get, set, zoom: number) => {
		set(zoomAtom, zoom);
	}
);
