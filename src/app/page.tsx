'use client';

import DiaryApp from '@/components/DiaryApp';
import FoodApp from '@/components/FoodApp';
import ItemListApp from '@/components/ItemListApp';
import LightApp from '@/components/LightApp';
import NameApp from '@/components/NameApp';

export default function Home() {
	return (
		<div>
			<main className="mx-w-200">
				<LightApp />
				<NameApp />
				<FoodApp />
				<ItemListApp />
				<DiaryApp />
			</main>
		</div>
	);
}
