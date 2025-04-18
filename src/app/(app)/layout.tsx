import React from 'react';

import { Button } from '@/components/button';
import MainNav from '@/components/main-nav';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-1 flex-col min-h-screen'>
			<div className='bg-background sticky inset-x-0 top-0 z-10 h-15 border-b' id='jibnadri_global_navigation_bar'>
				<nav className='flex items-center justify-between relative isolate w-full h-full px-5' data-section-name='navigation_bar'>
					<div>
						<span className='font-bold'>집나들이</span>
					</div>
					<MainNav />
					<Button size='sm'>로그인</Button>
				</nav>
			</div>
			<main className='main-container'>{children}</main>
		</div>
	);
};

export default AppLayout;
