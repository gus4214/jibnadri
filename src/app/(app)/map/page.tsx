'use client';

import { useEffect, useState } from 'react';
import { Map as KakaoMap, MapMarker, Polygon } from 'react-kakao-maps-sdk';

import useKakaoLoader from './_source/hooks/useKakaoLoader';

interface Coordinate {
	lat: number;
	lng: number;
}

interface District {
	id: number;
	name: string;
	coordinates: Coordinate[][];
	center: Coordinate;
}

interface GeoJsonFeature {
	type: string;
	properties: {
		sggnm: string;
		adm_cd: string;
		[key: string]: unknown;
	};
	geometry: {
		type: string;
		coordinates: number[][][][];
	};
}

const MapPage = () => {
	const [seoulDistricts, setSeoulDistricts] = useState<District[]>([]);
	const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);
	useKakaoLoader();

	useEffect(() => {
		// GeoJSON 파일 불러오기
		fetch('/hangjeongdong_서울특별시.geojson')
			.then((response) => response.json())
			.then((data) => {
				// 구 단위로 데이터 가공
				const districts: District[] = [];
				const districtMap: Record<string, District> = {};

				data.features.forEach((feature: GeoJsonFeature) => {
					const sggnm = feature.properties.sggnm; // 구 이름 (ex: 강남구, 서초구)
					const adm_cd = feature.properties.adm_cd.substring(0, 5); // 구 코드

					if (!districtMap[adm_cd]) {
						// 새로운 구 정보 추가
						const district: District = {
							id: parseInt(adm_cd),
							name: sggnm,
							coordinates: [],
							center: { lat: 0, lng: 0 },
						};
						districtMap[adm_cd] = district;
						districts.push(district);
					}

					// 각 구에 폴리곤 좌표 추가
					const district = districtMap[adm_cd];
					if (district && feature.geometry.type === 'MultiPolygon') {
						// 좌표계 변환: Kakao Maps API는 [lat, lng]로 사용하지만 GeoJSON은 [lng, lat]로 저장
						const coordinates = feature.geometry.coordinates[0][0].map((coord: number[]) => ({
							lat: coord[1],
							lng: coord[0],
						}));
						district.coordinates.push(coordinates);

						// 구의 중심점 계산을 위한 임시 누적 데이터
						const sum = coordinates.reduce(
							(acc: Coordinate, coord: Coordinate) => ({
								lat: acc.lat + coord.lat,
								lng: acc.lng + coord.lng,
							}),
							{ lat: 0, lng: 0 }
						);

						const center = {
							lat: sum.lat / coordinates.length,
							lng: sum.lng / coordinates.length,
						};

						// 이미 계산된 중심점이 있다면 평균 내기
						if (district.center.lat !== 0) {
							district.center = {
								lat: (district.center.lat + center.lat) / 2,
								lng: (district.center.lng + center.lng) / 2,
							};
						} else {
							district.center = center;
						}
					}
				});

				setSeoulDistricts(districts);
			})
			.catch((error) => console.error('서울특별시 GeoJSON 로딩 오류:', error));
	}, []);

	return (
		<>
			<KakaoMap
				center={{ lat: 37.566, lng: 126.978 }} // 서울시청 좌표로 변경
				style={{ width: '100%', height: '100vh' }}
				level={9} // 지도 확대 레벨 조정
			>
				{seoulDistricts.map((district) => (
					<MapMarker
						key={district.id}
						position={district.center}
						onMouseOver={() => setHoveredDistrict(district)}
						onMouseOut={() => setHoveredDistrict(null)}
					>
						<div className='text-sm text-black border-none'>{district.name}</div>
					</MapMarker>
				))}

				{/* 호버된 구의 폴리곤 표시 */}
				{hoveredDistrict &&
					hoveredDistrict.coordinates.map((polygon, index) => (
						<Polygon
							key={`${hoveredDistrict.id}-${index}`}
							path={polygon}
							strokeWeight={1}
							strokeColor='oklch(0.705 0.213 47.604)'
							strokeOpacity={0.8}
							strokeStyle='dashed'
							fillColor='oklch(0.705 0.213 47.604)'
							fillOpacity={0.3}
						/>
					))}
			</KakaoMap>
		</>
	);
};

export default MapPage;
