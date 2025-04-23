import React from 'react';

import RegionsFilter from '@/app/(app)/regions/_source/components/RegionsFilter';
import RegionsFilterContainer from '@/app/(app)/regions/_source/components/RegionsFilterContainer';
import { RegionsTable } from '@/app/(app)/regions/_source/components/RegionsTable';

const RegionsPage = () => {
	return (
		<>
			<div>
				<h1 className='text-2xl font-bold mb-2'>후보 지역 탐색</h1>
				<p className='text-sm text-muted-foreground'>예산, 조건, 주요 접근지 등을 반영한 지역 스코어 기반 추천</p>
			</div>
			<RegionsFilterContainer />
			<RegionsTable />
		</>
	);
};

export default RegionsPage;
