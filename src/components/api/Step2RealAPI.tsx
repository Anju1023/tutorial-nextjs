'use client';

import { useState } from 'react';

export default function Step2RealAPI() {
	// APIから取ってきたデータを入れる箱
	const [catFact, setCatFact] = useState<string>('まだボタンを押してないよ～');

	// 本物のAPIを呼ぶ関数
	const getCatFact = async () => {
		console.log('猫の豆知識を取りに行くよ～');

		// 取りに行ってる最中を表示
		setCatFact('猫の豆知識を取ってきてる最中～');

		// 本物のAPIにお願い
		const response = await fetch('https://catfact.ninja/fact');
		const data = await response.json();

		console.log('取得したデータ:', data);

		// 表示
		setCatFact(`🐱 猫の豆知識だよ～\n\n${data.fact}`);
	};

	return (
		<div className="p-8 text-center">
			<h1 className="text-4xl font-bold mb-8 text-purple-600">
				ステップ2: 本物のAPI体験 🌐
			</h1>

			{/* APIから取得したデータを表示 */}
			<div className="bg-blue-100 p-6 rounded-lg mb-6 min-h-2/4">
				<p className="text-lg text-blue-800 whitespace-pre-line">{catFact}</p>
			</div>

			{/* APIを呼ぶボタン */}
			<button
				onClick={getCatFact}
				className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-lg"
			>
				猫の豆知識をもらう～
			</button>

			{/* 説明 */}
			<div className="mt-8 bg-gray-100 rounded">
				<h3 className="font-bold mb-2">今回覚える事</h3>
				<ul className="text-sm space-y-1 text-left max-w-md mx-auto">
					<li>
						✅ <code>fetch()</code>で本物のAPIを呼ぶ
					</li>
					<li>
						✅ <code>await</code>で結果を待つ
					</li>
					<li>
						✅ <code>response.json()</code>でデータ取得
					</li>
					<li>✅ インターネットから情報をもらう体験</li>
					<li>🔜 次: ローディング状態の管理</li>
				</ul>
			</div>

			{/* APIの説明 */}
			<div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
				<h4 className="font-bold text-yellow-800 mb-2">🌐 使用しているAPI:</h4>
				<p className="text-sm text-yellow-700">
					Cat Facts API: <code>https://catfact.ninja/fact</code>
					<br />
					無料のAPI
				</p>
			</div>
		</div>
	);
}
