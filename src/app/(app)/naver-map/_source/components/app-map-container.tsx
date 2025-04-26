'use client';

import { useState } from 'react';
import { Container as MapDiv } from 'react-naver-maps';

import AppMap from '@/app/(app)/naver-map/_source/components/app-map';
import LocationFilter from '@/app/(app)/naver-map/_source/components/location-filter';

interface LocationPath {
	city: string | null;
	district: string | null;
}

const AppMapContainer = () => {
	const [location, setLocation] = useState<LocationPath>({
		city: '서울시',
		district: null,
	});

	const handleLocationChange = (newLocation: LocationPath) => {
		setLocation(newLocation);
	};

	return (
		<MapDiv className='h-[calc(100vh-56px)] w-full overflow-hidden relative'>
			<AppMap />
			<LocationFilter location={location} />
		</MapDiv>
	);
};

export default AppMapContainer;
