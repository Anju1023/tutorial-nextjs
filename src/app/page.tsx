'use client';

import FoodApp from '@/components/FoodApp';
import Footer from '@/components/layouts/footer/Footer';
import Header from '@/components/layouts/header/Header';
import LightApp from '@/components/LightApp';
import NameApp from '@/components/NameApp';

export default function Home() {
	return (
		<div>
			<Header />
			<main className="mx-w-200">
				<LightApp />
				<NameApp />
				<FoodApp />
			</main>
			<Footer />
		</div>
	);
}
