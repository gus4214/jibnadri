'use server';

import { createServer } from '@/lib/supabase/server';

export const getRegionCenter = async (sigCd: number): Promise<{ center_lat: number; center_lng: number } | null> => {
	const supabase = await createServer();
	const { data, error } = await supabase.from('siggns_geo').select('center_lat, center_lng').eq('sig_cd', sigCd).single();

	if (error) {
		console.error(error);
	}

	return data;
};
