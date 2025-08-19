'use client';

import { useState } from 'react';

export default function Step1SimpleAPI() {
	// まずはひとつの文字だけ取ってくる
	const [message, setMessage] = useState<string>('まだボタンを押してないよ～');

	// ボタンを押したら実行される関数
	const getRandomJoke = () => {
		// 超シンプル：ランダムな挨拶を返すだけ
		const jokes = [
			'こんにちは～',
			'おつかれさま～',
			'がんばれ～',
			'最高～',
			'今日もかわいいね～',
		];

		// ランダムにひとつ選ぶ
		const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
		setMessage(randomJoke);
	};

	return (
		<div className="p-8 text-center">
			<h1 className="text-4xl font-bold mb-8 text-purple-600">
				ステップ1：超シンプルAPI体験
			</h1>

			{/* 今の状態を表示 */}
			<div className="bg-pink-100 p-6 rounded-lg mb-6">
				<p className="text-2xl text-pink-800">💬 {message}</p>
			</div>

			{/* ボタン */}
			<button
				onClick={getRandomJoke}
				className="bg-pink-500 text-white px-8 py-4 rounded-full text-xl hover:bg-pink-600 hover:scale-105 transition-all duration-300 shadow-lg"
			>
				ランダムメッセージをもらう
			</button>

			{/* 説明 */}
			<div className="mt-8 p-4 bg-gray-100 rounded">
				<h3 className="font-bold mb-2">今回覚えること</h3>
				<ul className="text-sm space-y-1 text-left max-w-md mx-auto">
					<li>✅ ボタンを押すと何かが変わる</li>
					<li>✅ useStateで状態管理</li>
					<li>✅ 配列からランダムに選ぶ</li>
					<li>🔜 次：本物のAPIを使う</li>
				</ul>
			</div>
		</div>
	);
}
