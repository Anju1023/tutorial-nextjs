'use client';

import DiaryApp from '@/components/DiaryApp';
import FoodApp from '@/components/FoodApp';
import ItemListApp from '@/components/ItemListApp';
import LightApp from '@/components/LightApp';
import NameApp from '@/components/NameApp';
import Step1SimpleAPI from '@/components/Step1SimpleAPI';
import Step2RealAPI from '@/components/Step2RealAPI';

export default function Home() {
	return (
		<div className="p-8">
			<h1 className="text-4xl font-bold mb-8">ホームページ</h1>

			{/* ふわふわボタン */}
			<button className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
				押してみて〜
			</button>

			{/* くるくる回るボタン */}
			<button className="bg-purple-500 text-white px-6 py-3 rounded-full ml-4 hover:bg-purple-600 hover:rotate-12 hover:scale-105 transition-all duration-300 shadow-lg">
				くるくる〜
			</button>
			<LightApp />
			<NameApp />
			<FoodApp />
			<ItemListApp />
			<DiaryApp />
			<Step1SimpleAPI />
			<Step2RealAPI />
		</div>
	);
}
