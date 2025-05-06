'use client';

import { ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import { FC, useState } from 'react';

import { useMapPropsStorage } from '@/app/(app)/map/_source/hooks/useMapPropsStorage';
import { useRegionFilter } from '@/app/(app)/map/_source/hooks/useRegionFilter';
import { Button } from '@/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';

interface Region {
	id: number;
	name: string;
	level: number;
	parent_id: number;
	code: string;
	created_at: string;
	updated_at: string;
}

interface RegionFilterProps {
	regions_1: Region[];
	regions_2: Region[];
}

const RegionFilter: FC<RegionFilterProps> = ({ regions_1, regions_2 }) => {
	const [level1, setLevel1] = useState<Region | null>(null);
	const [level2, setLevel2] = useState<Region | null>(null);

	const { currentRegion, saveCurrentRegion } = useRegionFilter();
	const { saveCenterCoordinateForMoveRegion, saveZoom } = useMapPropsStorage();

	const handleLevel1Click = (region: Region) => {
		setLevel1((prev) => ({ ...prev, ...region }));
	};

	const handleLevel2Click = (region: Region) => {
		setLevel2((prev) => ({ ...prev, ...region }));
	};

	const handleLevel1Reset = () => {
		setLevel1(null);
		setLevel2(null);
	};

	const handleRegionMoveClick = () => {
		if (level1 && level2) {
			saveCurrentRegion({ region_1: level1, region_2: level2 });
			saveCenterCoordinateForMoveRegion(Number(level2.code));
			saveZoom(5);
		}
	};

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='secondary' size='lg' className='bg-white'>
						<MapPin className='h-4 w-4 text-[#FF7E36]' />
						<span className='font-bold'>{`지역선택`}</span>
						<ChevronDown className='h-4 w-4 text-[#9E9E9E]' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[300px] p-0' align='center'>
					<div className='px-2 py-2 border-b text-center flex justify-center items-center'>
						<Button variant='ghost' className='font-bold' onClick={handleLevel1Reset}>
							{level1 ? level1.name : '시/도'}
						</Button>

						{level1 && (
							<>
								<ChevronRight className='size-4 text-muted-foreground' />
								<Button variant='ghost' className='font-bold'>
									{level2 ? level2.name : '시/군/구'}
								</Button>
							</>
						)}
					</div>
					<div className='p-2 border-b'>
						<div className='grid grid-cols-3 gap-1'>
							{!level1 &&
								regions_1.map((region) => (
									<Button key={region.id} variant='ghost' className='w-full' onClick={() => handleLevel1Click(region)}>
										{region.name}
									</Button>
								))}
							{level1 &&
								regions_2
									.filter((region) => region.parent_id === level1.id)
									.map((region) => (
										<Button key={region.id} variant={level2?.id === region.id ? 'destructive' : 'ghost'} onClick={() => handleLevel2Click(region)}>
											{region.name}
										</Button>
									))}
						</div>
					</div>
					{level2 && (
						<div className='p-4'>
							<Button onClick={handleRegionMoveClick} className='w-full'>
								{`${level2.name} 이동`}
							</Button>
						</div>
					)}
				</PopoverContent>
			</Popover>
		</>
	);
};

export default RegionFilter;
