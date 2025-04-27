import MyMapClient from '@/app/(app)/naver-map/_source/components/my-map-client';
import { createServer } from '@/lib/supabase/server';

// GeoJSON 타입 정의
interface GeoJsonData {
	type: string;
	features: Array<{
		type: string;
		id: number;
		properties: {
			sig_cd: number;
			name: string;
			name_en: string;
			[key: string]: unknown;
		};
		geometry: {
			type: string;
			coordinates: Array<Array<[number, number]>> | Array<Array<Array<[number, number]>>>;
		};
	}>;
}

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

async function getSiggnsGeoData(): Promise<GeoJsonData | null> {
	const supabase = await createServer();

	// PostGIS 함수를 사용해 GeoJSON 형식으로 데이터 가져오기
	const { data, error } = await supabase.rpc('get_districts_as_geojson');

	if (error) {
		console.error('Error fetching geo data:', error);
		return null;
	}

	return data as GeoJsonData;
}

async function getDistrictsFromGeoData(geoData: GeoJsonData): Promise<District[]> {
	const processedDistricts = geoData.features.map((feature) => {
		const polygons: Coordinate[][] = [];

		switch (feature.geometry.type) {
			case 'Polygon': {
				const polygonCoords = feature.geometry.coordinates as Array<Array<[number, number]>>;
				polygonCoords.forEach((ring) => {
					const coordinates = ring.map((coord) => ({
						lat: coord[1],
						lng: coord[0],
					}));
					polygons.push(coordinates);
				});
				break;
			}
			case 'MultiPolygon': {
				const multiPolygonCoords = feature.geometry.coordinates as Array<Array<Array<[number, number]>>>;
				multiPolygonCoords.forEach((poly) => {
					poly.forEach((ring) => {
						const coordinates = ring.map((coord) => ({
							lat: coord[1],
							lng: coord[0],
						}));
						polygons.push(coordinates);
					});
				});
				break;
			}
		}

		return {
			id: feature.id,
			name: feature.properties.name,
			nameEn: feature.properties.name_en,
			polygons,
		};
	});

	return processedDistricts;
}

const MyMapLoader = async () => {
	const geoData = await getSiggnsGeoData();
	const districts = geoData ? await getDistrictsFromGeoData(geoData) : [];

	return (
		<>
			<MyMapClient districts={districts} />
		</>
	);
};

export default MyMapLoader;
