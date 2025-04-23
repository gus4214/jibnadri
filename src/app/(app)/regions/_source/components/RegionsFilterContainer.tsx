import React from 'react';

import RegionsFilter from '@/app/(app)/regions/_source/components/RegionsFilter';
import { supabase } from '@/lib/supabase';

const RegionsFilterContainer = async () => {
	const { data: regionsData, error } = await supabase.from('regions').select('id, name, code').eq('level', 1).in('code', [11, 41]).order('name');

	if (error) {
		return <div>에러 발생: {error.message}</div>;
	}

	return <RegionsFilter />;
};

export default RegionsFilterContainer;
