'use client';

import { NavermapsProvider } from 'react-naver-maps';

const MapProvider = ({ children }: { children: React.ReactNode }) => {
	return <NavermapsProvider ncpClientId={process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID!}>{children}</NavermapsProvider>;
};

export default MapProvider;
