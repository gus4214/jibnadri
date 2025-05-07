'use client';

import { FC, useState } from 'react';
import { Map as KakaoMap, Polygon } from 'react-kakao-maps-sdk';

import { District } from '@/app/(app)/map/_source/components/map-loader';
import useKakaoLoader from '@/app/(app)/map/_source/hooks/useKakaoLoader';
import { useMapPropsStorage } from '@/app/(app)/map/_source/hooks/useMapPropsStorage';
import { Button } from '@/components/button';

interface MapProps {
	districts: District[];
}

const Map: FC<MapProps> = ({ districts }) => {
	const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);
	const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
	const [isMeasuring, setIsMeasuring] = useState(false);

	useKakaoLoader();
	const { centerCoordinate, zoom, saveZoom } = useMapPropsStorage();

	const handleMouseOver = (district: District) => {
		setHoveredDistrict(district);
	};

	const handleMouseOut = () => {
		setHoveredDistrict(null);
	};

	const handleDistrictClick = (district: District) => {
		setSelectedDistrict(district);
	};

	return (
		<>
			<KakaoMap
				center={centerCoordinate}
				style={{ width: '100%', height: '100vh' }}
				level={zoom}
				onZoomChanged={(target) => {
					saveZoom(target.getLevel());
				}}
			>
				{districts.map((district, index) => {
					const isHovered = hoveredDistrict?.id === district.id;
					const isSelected = selectedDistrict?.id === district.id;

					return (
						<Polygon
							key={`${district.id}-${index}`}
							path={district.polygons}
							fillColor={isHovered ? 'oklch(0.705 0.213 47.604)' : '#ffffff'}
							fillOpacity={0.1}
							strokeColor={isSelected ? 'oklch(0.705 0.213 47.604)' : isHovered ? 'oklch(0.705 0.213 47.604)' : '#ffffff'}
							strokeWeight={isSelected ? 2 : 1.5}
							strokeOpacity={isSelected ? 1 : isHovered ? 0.8 : 0}
							strokeStyle='solid'
							onClick={() => handleDistrictClick(district)}
							onMouseover={() => handleMouseOver(district)}
							onMouseout={handleMouseOut}
						/>
					);
				})}
			</KakaoMap>
			<div className='fixed bottom-8 left-1/2 -translate-x-1/2 z-10'>
				<Button size='lg' className='rounded-full font-bold' onClick={() => setIsMeasuring(!isMeasuring)}>
					{isMeasuring ? '그리기 취소' : '나들이 경로 그리기'}
				</Button>
			</div>
		</>
	);
};

export default Map;
