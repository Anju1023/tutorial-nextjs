'use client';

import DiaryApp from '@/components/DiaryApp';
import FoodApp from '@/components/FoodApp';
import ItemListApp from '@/components/ItemListApp';
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
				<ItemListApp />
				<DiaryApp />
			</main>
			<Footer />
		</div>
	);
}
