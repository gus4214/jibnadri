'use client';

import { ChevronDown, ChevronRight, MapPin } from 'lucide-react';

import { Button } from '@/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';

interface LocationPath {
	city: string | null;
	district: string | null;
}

interface LocationFilterProps {
	location: LocationPath;
}

const LocationFilter = ({ location }: LocationFilterProps) => {
	return (
		<>
			<div className='fixed left-5 mt-4 flex items-center gap-2'>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='secondary' className='bg-white'>
							<MapPin className='h-4 w-4 text-[#FF7E36]' />
							{/* {level1Filter === '전체' && !level2Filter && !level3Filter ? (
								<span>지역 선택</span>
							) : (
								<span>
									{level1Filter !== '전체' ? level1Filter : ''}
									{level2Filter ? ` > ${level2Filter}` : ''}
									{level3Filter ? ` > ${level3Filter}` : ''}
								</span>
							)} */}
							{`서울시 > 강남구`}
							<ChevronDown className='h-4 w-4 text-[#9E9E9E]' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-[300px] p-0' align='start'>
						<div className='p-4 border-b border-[#EEEEEE]'>
							<h4 className='font-medium text-[#212124]'>지역 선택</h4>
						</div>
						<div className='p-4 space-y-4'>
							<div className='space-y-2'>
								<label className='text-sm font-medium text-[#4D4D4D]'>시/도</label>
								{/* <Select value={level1Filter} onValueChange={setLevel1Filter}>
									<SelectTrigger className='w-full border-[#EEEEEE]'>
										<SelectValue placeholder='시/도 선택' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='전체'>전체</SelectItem>
										{regionHierarchy['전체'].children.map((region) => (
											<SelectItem key={region} value={region}>
												{region}
											</SelectItem>
										))}
									</SelectContent>
								</Select> */}
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
};

export default LocationFilter;
