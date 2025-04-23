'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

import useKakaoLoader from './_source/hooks/useKakaoLoader';

const MapPage = () => {
	useKakaoLoader();

	return (
		<>
			<Map
				center={{ lat: 37.497, lng: 127.063 }}
				style={{ width: '100%', height: '100vh' }}
				level={6} // 지도 확대 레벨 조정
			>
				<MapMarker position={{ lat: 37.497175, lng: 127.027926 }}></MapMarker>
			</Map>
		</>
	);
};

export default MapPage;
