import RegionFilter from '@/app/(app)/map/_source/components/region-filter';
import { createServer } from '@/lib/supabase/server';

const MapTopBar = async () => {
	const supabase = await createServer();

	const [{ data: regions_1 }, { data: regions_2 }] = await Promise.all([
		supabase.from('regions').select().eq('level', 1),
		supabase.from('regions').select().eq('level', 2).in('parent_id', [1, 9]),
	]);

	return (
		<div className='fixed top-14 w-full h-14 flex justify-center items-center z-10'>
			<RegionFilter regions_1={regions_1 || []} regions_2={regions_2 || []} />
		</div>
	);
};

export default MapTopBar;
