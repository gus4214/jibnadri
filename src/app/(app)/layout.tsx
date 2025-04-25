import { MapPinCheckInside } from 'lucide-react';
import { ReactNode } from 'react';

import AuthBar from '@/app/(app)/_source/components/auth-bar';
import MainNav from '@/app/(app)/_source/components/main-nav';

const AppLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex flex-1 flex-col min-h-screen'>
			<div className='bg-background sticky inset-x-0 top-0 z-10 h-14 border-b' id='jibnadri_global_navigation_bar'>
				<nav className='flex items-center justify-between relative isolate w-full h-full px-5' data-section-name='navigation_bar'>
					<div className='flex items-center space-x-1'>
						<MapPinCheckInside className='size-5 text-primary' />
						<span className='font-bold text-primary'>집나들이</span>
					</div>
					<MainNav />
					<AuthBar />
				</nav>
			</div>
			<main className='main-container'>{children}</main>
		</div>
	);
};

export default AppLayout;
