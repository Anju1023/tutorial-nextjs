'use client';

import { useState } from 'react';

export default function FoodApp() {
	const [food, setFood] = useState<string>('');

	return (
		<div className="mb-8 p-8 text-center">
			<h1 className="text-4xl mb-4">好きな食べ物を選んでね</h1>
			<div className="text-2xl font-bold text-pink-600 mb-4">
				{food ? `今日は${food}を食べたい気分〜〜〜` : 'まだ選ばれてないよ〜'}
			</div>
			<div className="grid grid-cols-3 gap-6 justify-center">
				<button
					onClick={() => setFood('りんご')}
					className="bg-red-500 text-white font-bold rounded px-4 py-6"
				>
					りんご🍎
				</button>
				<button
					onClick={() => setFood('ケーキ')}
					className="bg-yellow-500 text-white font-bold rounded px-4 py-6"
				>
					ケーキ🍰
				</button>
				<button
					onClick={() => setFood('ラーメン')}
					className="bg-purple-500 text-white font-bold rounded px-4 py-6"
				>
					ラーメン🍜
				</button>
			</div>
		</div>
	);
}
