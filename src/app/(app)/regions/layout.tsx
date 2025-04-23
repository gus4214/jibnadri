import React from 'react';

const RegionsLayout = ({ children }: { children: React.ReactNode }) => {
	return <section className='flex flex-col px-10 py-12 gap-5'>{children}</section>;
};

export default RegionsLayout;
