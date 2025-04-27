'use client';

import { Container as MapDiv } from 'react-naver-maps';

import AppMap from '@/app/(app)/naver-map/_source/components/app-map';

const AppMapContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<MapDiv className='h-[calc(100vh-56px)] w-full overflow-hidden relative'>
			{/* <AppMap /> */}
			{children}
		</MapDiv>
	);
};

export default AppMapContainer;
