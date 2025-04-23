'use client';

import { PopoverTrigger } from '@radix-ui/react-popover';
import { ChevronDown, MapPin } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/button';
import { Popover, PopoverContent } from '@/components/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { supabase } from '@/lib/supabase';

const RegionsFilter = () => {
	const [level1Filter, setLevel1Filter] = useState<string>('전체');
	const [level2Filter, setLevel2Filter] = useState<string | null>(null);
	const [level3Filter, setLevel3Filter] = useState<string | null>(null);

	// 레벨 2 옵션 계산
	const level2Options = null;

	// 레벨 3 옵션 계산
	const level3Options = null;

	return (
		<div className='flex items-center gap-2'>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='outline' className='h-9 border-[#EEEEEE] rounded-[8px] flex items-center gap-2'>
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
						지역 선택
						<ChevronDown className='h-4 w-4 text-[#9E9E9E]' />
					</Button>
				</PopoverTrigger>
				{/* <PopoverContent className='w-[300px] p-0' align='start'>
					<div className='p-4 border-b border-[#EEEEEE]'>
						<h4 className='font-medium text-[#212124]'>지역 선택</h4>
					</div>
					<div className='p-4 space-y-4'>
						<div className='space-y-2'>
							<label className='text-sm font-medium text-[#4D4D4D]'>시/도</label>
							<Select value={level1Filter} onValueChange={setLevel1Filter}>
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
							</Select>
						</div>

						{level1Filter !== '전체' && (
							<div className='space-y-2'>
								<label className='text-sm font-medium text-[#4D4D4D]'>구/군/시</label>
								<Select value={level2Filter || 'all'} onValueChange={(value) => setLevel2Filter(value === 'all' ? null : value)}>
									<SelectTrigger className='w-full border-[#EEEEEE]'>
										<SelectValue placeholder='전체' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>전체</SelectItem>
										{level2Options.map((region) => (
											<SelectItem key={region} value={region}>
												{region}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{level2Filter && (
							<div className='space-y-2'>
								<label className='text-sm font-medium text-[#4D4D4D]'>동/읍/면</label>
								<Select value={level3Filter || 'all'} onValueChange={(value) => setLevel3Filter(value === 'all' ? null : value)}>
									<SelectTrigger className='w-full border-[#EEEEEE]'>
										<SelectValue placeholder='전체' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>전체</SelectItem>
										{level3Options.map((region) => (
											<SelectItem key={region} value={region}>
												{region}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}
					</div>
				</PopoverContent> */}
			</Popover>
		</div>
	);
};

export default RegionsFilter;
