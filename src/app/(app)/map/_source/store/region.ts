import { atom } from 'jotai';

export interface Region {
	id: number;
	name: string;
	level: number;
	parent_id: number;
	code: string;
}

export interface CurrentRegion {
	region_1: Region | null;
	region_2: Region | null;
}

export const currentRegionAtom = atom<CurrentRegion>({
	region_1: null,
	region_2: null,
});

export const handleCurrentRegionAtom = atom(
	(get) => get(currentRegionAtom),
	(get, set, region: CurrentRegion) => {
		set(currentRegionAtom, (prev) => ({ ...prev, ...region }));
	}
);
