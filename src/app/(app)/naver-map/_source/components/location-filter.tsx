'use client';

import { ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import { FC, useState } from 'react';

import { Button } from '@/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { cn } from '@/lib/utils';

interface Region {
	id: number;
	name: string;
	level: number;
	parent_id: number;
	code: string;
	created_at: string;
	updated_at: string;
}

interface LocationFilterProps {
	regions_1: Region[];
	regions_2: Region[];
}

const LocationFilter: FC<LocationFilterProps> = ({ regions_1, regions_2 }) => {
	const [selectedLevel1, setSelectedLevel1] = useState<Region | null>(null);
	const [selectedLevel2, setSelectedLevel2] = useState<Region | null>(null);

	const handleLevel1Click = (region: Region) => {
		setSelectedLevel1((prev) => ({ ...prev, ...region }));
	};

	const handleLevel2Click = (region: Region) => {
		setSelectedLevel2((prev) => ({ ...prev, ...region }));
	};

	const handleLevel1Reset = () => {
		setSelectedLevel1(null);
		setSelectedLevel2(null);
	};

	return (
		<>
			<div className='fixed left-1/2 -translate-x-1/2 mt-4 flex items-center gap-2'>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='secondary' className='bg-white'>
							<MapPin className='h-4 w-4 text-[#FF7E36]' />
							<span className='font-bold'>지역선택</span>
							<ChevronDown className='h-4 w-4 text-[#9E9E9E]' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-[300px] p-0' align='center'>
						<div className='px-2 py-2 border-b text-center flex justify-center items-center'>
							<Button variant='ghost' className='font-bold' onClick={handleLevel1Reset}>
								{selectedLevel1 ? selectedLevel1.name : '시/도'}
							</Button>

							{selectedLevel1 && (
								<>
									<ChevronRight className='size-4 text-muted-foreground' />
									<Button variant='ghost' className='font-bold'>
										{selectedLevel2 ? selectedLevel2.name : '시/군/구'}
									</Button>
								</>
							)}
						</div>
						<div className='p-2 border-b'>
							<div className='grid grid-cols-3 gap-1'>
								{!selectedLevel1 &&
									regions_1.map((region) => (
										<Button key={region.id} variant='ghost' className='w-full' onClick={() => handleLevel1Click(region)}>
											{region.name}
										</Button>
									))}
								{selectedLevel1 &&
									regions_2
										.filter((region) => region.parent_id === selectedLevel1.id)
										.map((region) => (
											<Button
												key={region.id}
												variant={selectedLevel2?.id === region.id ? 'destructive' : 'ghost'}
												onClick={() => handleLevel2Click(region)}
											>
												{region.name}
											</Button>
										))}
							</div>
						</div>
						{selectedLevel2 && (
							<div className='p-4'>
								<Button className='w-full'>{`${selectedLevel2.name} 이동`}</Button>
							</div>
						)}
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
};

export default LocationFilter;
