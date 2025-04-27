'use client';

import { useEffect, useRef, useState } from 'react';
import { NaverMap, Polygon, useNavermaps } from 'react-naver-maps';

interface Coordinate {
	lat: number;
	lng: number;
}

interface District {
	id: number;
	name: string;
	code: string;
	polygons: Coordinate[][]; // 각 구에 속한 다수의 폴리곤 배열
	center: Coordinate;
	focus?: boolean;
}

interface GeoJsonFeature {
	type: string;
	properties: {
		// 시/군/구 이름
		sggnm: string;
		// 시/군/구 코드
		adm_cd: string;
		[key: string]: unknown;
	};
	geometry: {
		type: string;
		coordinates: number[][][][];
	};
}

const AppMap = () => {
	const navermaps = useNavermaps();
	const [seoulDistricts, setSeoulDistricts] = useState<District[]>([]);
	const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

	// 서울시 구 데이터 로드
	useEffect(() => {
		fetch('/hangjeongdong_서울특별시.geojson')
			.then((response) => response.json())
			.then((data) => {
				// GeoJSON 데이터를 단순화하여 폴리곤 좌표 배열로 변환
				const districts = data.features
					.map((feature: GeoJsonFeature) => {
						if (feature.geometry.type !== 'MultiPolygon') return null;

						// 기본 정보 추출
						const district = {
							id: parseInt(feature.properties.adm_cd.substring(0, 5)),
							name: feature.properties.sggnm,
							code: feature.properties.adm_cd,
							polygons: [] as Coordinate[][],
							center: { lat: 0, lng: 0 },
							focus: false,
						};

						// 폴리곤 좌표 변환
						feature.geometry.coordinates.forEach((multiPoly) => {
							multiPoly.forEach((ring) => {
								const coordinates = ring.map((coord: number[]) => ({
									lat: coord[1],
									lng: coord[0],
								}));
								if (coordinates.length > 0) {
									district.polygons.push(coordinates);
								}
							});
						});

						return district;
					})
					.filter(Boolean) as District[];

				setSeoulDistricts(districts);
			})
			.catch((error) => console.error('서울특별시 GeoJSON 로딩 오류:', error));
	}, []);

	// 마우스 이벤트 핸들러
	const handleMouseOver = (district: District) => {
		setHoveredDistrict((prev) => ({ ...prev, ...district }));
	};

	const handleMouseOut = () => {
		setHoveredDistrict(null);
	};

	return (
		<NaverMap defaultCenter={new navermaps.LatLng(37.566, 126.978)} defaultZoom={11} mapTypeId={navermaps.MapTypeId.NORMAL}>
			{/* 호버/선택된 구역만 표시 */}
			{seoulDistricts.map((district) =>
				district.polygons.map((polygon, polyIndex) => {
					const isHovered = hoveredDistrict?.id === district.id;

					return (
						<Polygon
							key={`${district.id}-${polyIndex}`}
							paths={polygon.map((coord) => new navermaps.LatLng(coord.lat, coord.lng))}
							fillColor={isHovered ? 'oklch(0.705 0.213 47.604)' : '#ffffff'}
							fillOpacity={isHovered ? 0.3 : 0}
							strokeColor={isHovered ? 'oklch(0.705 0.213 47.604)' : '#ffffff'}
							strokeWeight={1}
							strokeOpacity={isHovered ? 0.3 : 0}
							strokeStyle='dash'
							clickable={true}
							onMouseover={(e) => handleMouseOver(district)}
							onMouseout={handleMouseOut}
						/>
					);
				})
			)}
		</NaverMap>
	);
};

export default AppMap;
