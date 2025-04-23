'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MapPin, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

import { Button } from '@/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { supabase } from '@/lib/supabase';

// 이전 하드코딩된 데이터 주석 처리
// const data = [...]

export type District = {
	// data에 맞는 타입
	id: number;
	name: string;
	city: string;
	price24: string;
	price34: string;
	population: string;
	apartmentCount: string;
	gangnamAccess: string;
	tradingVolume: string;
	tradingIncrease: string;
	jeonseVolume: string;
	jeonseIncrease: string;
	unsoldResolution: string;
	newSupply: string;
	jeonseRatio: string;
	priceChangeRate: string;
	score: number;
	isFavorite: boolean;
	infrastructure: number;
	schoolDistrict: string;
	neighborhoods: Neighborhood[];
};

export type Neighborhood = {
	id: number;
	name: string;
	price24: string;
	price34: string;
	population: string;
	apartmentCount: string;
	gangnamAccess: string;
	tradingVolume: string;
	tradingIncrease: string;
	jeonseVolume: string;
	jeonseIncrease: string;
	unsoldResolution: string;
	newSupply: string;
	jeonseRatio: string;
	priceChangeRate: string;
	score: number;
};

export const columns: ColumnDef<District>[] = [
	{
		accessorKey: 'name',
		header: '지역명',
		cell: ({ row }) => (
			<div className='flex items-center gap-2'>
				<MapPin className='h-4 w-4 text-[#FF7E36]' />
				<div>
					<div className='font-medium'>{row.getValue('name')}</div>
					{/* <div className='text-xs text-[#9E9E9E]'>{row.getValue('city')}</div> */}
				</div>
			</div>
		),
	},
	{
		accessorKey: 'price24',
		header: ({ column }) => {
			return (
				<Button variant='ghost' className='p-0 m-0' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					24평 매매가
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div>{row.getValue('price24')}</div>,
	},
	{
		accessorKey: 'price34',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					34평 매매가
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div>{row.getValue('price34')}</div>,
	},
	{
		accessorKey: 'tradingVolume',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					매매 거래량
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div>{row.getValue('tradingVolume')}</div>,
	},
	{
		accessorKey: 'tradingIncrease',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					매매 거래량
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='flex items-center'>
				<span className={`${(row.getValue('tradingIncrease') as string).startsWith('+') ? 'text-[#4A7DFF]' : 'text-[#FF5252]'}`}>
					{row.getValue('tradingIncrease')}
				</span>
				{/* <span className='mx-1'>/</span>
				<span className={`${(row.getValue('jeonseIncrease') as string).startsWith('+') ? 'text-[#4A7DFF]' : 'text-[#FF5252]'}`}>
					{row.getValue('jeonseIncrease')}
				</span> */}
			</div>
		),
	},
	{
		accessorKey: 'jeonseRatio',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					전세가율
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div>{row.getValue('jeonseRatio')}</div>,
	},
];

export function RegionsTable() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [data, setData] = useState<District[]>([]);

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className='w-full'>
			<div className='rounded-md'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
