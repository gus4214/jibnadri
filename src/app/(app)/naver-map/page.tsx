import AppMapContainer from '@/app/(app)/naver-map/_source/components/app-map-container';
import LocationFilter from '@/app/(app)/naver-map/_source/components/location-filter';
import MyMapLoader from '@/app/(app)/naver-map/_source/components/my-map-loader';
import { createServer } from '@/lib/supabase/server';

const NaverMapPage = async () => {
	const supabase = await createServer();

	const [{ data: regions_1 }, { data: regions_2 }] = await Promise.all([
		supabase.from('regions').select('*').eq('level', 1),
		supabase.from('regions').select('*').eq('level', 2).in('parent_id', [1, 9]),
	]);

	return (
		<AppMapContainer>
			<MyMapLoader />
			<LocationFilter regions_1={regions_1 || []} regions_2={regions_2 || []} />
		</AppMapContainer>
	);
};

export default NaverMapPage;
