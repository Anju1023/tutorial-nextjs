'use client';

import Footer from '@/components/layouts/footer/Footer';
import Header from '@/components/layouts/header/Header';
import LightApp from '@/components/LightApp';
import NameApp from '@/components/NameApp';

export default function Home() {
	return (
		<div>
			<Header />
			<LightApp />
			<NameApp />
			<Footer />
		</div>
	);
}
