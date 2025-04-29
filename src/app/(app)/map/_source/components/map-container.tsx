'use client';

const MapContainer = ({ children }: { children: React.ReactNode }) => {
	return <div className='h-[calc(100vh-56px)] w-full overflow-hidden relative'>{children}</div>;
};

export default MapContainer;
