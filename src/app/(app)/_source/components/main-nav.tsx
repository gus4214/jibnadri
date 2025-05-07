'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MAIN_NAV } from '@/config/docs';
import { cn } from '@/lib/utils';

const MainNav = () => {
	const pathname = usePathname();

	return (
		<div className='relative flex items-center'>
			<ul className='flex gap-5'>
				{MAIN_NAV.map((item) => (
					<li key={item.href}>
						<Link href={item.href} className={cn(pathname === item.href ? 'text-foreground font-bold' : 'text-foreground/80')}>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MainNav;
