'use client';

import { useState } from 'react';
import { NaverMap, Polygon, useNavermaps } from 'react-naver-maps';

import { Button } from '@/components/button';

interface Coordinate {
	lat: number;
	lng: number;
}

interface District {
	id: number;
	name: string;
	nameEn?: string;
	polygons: Coordinate[][];
}

interface MyMapClientProps {
	districts: District[];
}

const MyMapClient = ({ districts }: MyMapClientProps) => {
	const navermaps = useNavermaps();
	const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);
	const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

	const [isMeasuring, setIsMeasuring] = useState(false);

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
			<NaverMap
				defaultCenter={new navermaps.LatLng(37.566, 126.978)} // 한국 중심점
				defaultZoom={11}
				mapTypeId={navermaps.MapTypeId.NORMAL}
			>
				{districts.map((district) =>
					district.polygons.map((polygon, polyIndex) => {
						const isHovered = hoveredDistrict?.id === district.id;
						const isSelected = selectedDistrict?.id === district.id;
						return (
							<Polygon
								key={`${district.id}-${polyIndex}`}
								paths={polygon.map((coord) => new navermaps.LatLng(coord.lat, coord.lng))}
								fillColor={isHovered ? 'oklch(0.705 0.213 47.604)' : '#ffffff'}
								fillOpacity={isHovered ? 0.3 : 0}
								strokeColor={isSelected ? 'oklch(0.705 0.213 47.604)' : isHovered ? 'oklch(0.705 0.213 47.604)' : '#ffffff'}
								strokeWeight={isSelected ? 2 : 1.5}
								strokeOpacity={isSelected ? 1 : isHovered ? 0.8 : 0}
								strokeStyle='solid'
								clickable={true}
								onMouseover={() => handleMouseOver(district)}
								onMouseout={handleMouseOut}
								onClick={() => handleDistrictClick(district)}
							/>
						);
					})
				)}
			</NaverMap>
			<div className='fixed bottom-8 left-1/2 -translate-x-1/2'>
				<Button size='lg' className='rounded-full font-bold' onClick={() => setIsMeasuring(!isMeasuring)}>
					{isMeasuring ? '그리기 취소' : '나들이 경로 그리기'}
				</Button>
			</div>
		</>
	);
};

export default MyMapClient;
