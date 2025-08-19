'use client';

import { useState } from 'react';

export default function Step3Loading() {
	// 1. データを入れる箱
	const [joke, setJoke] = useState<string>('まだボタンを押してないよ〜');

	// 2. ローディング状態を管理する箱（新しい！）
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// 3. ジョークを取ってくる関数
	const getJoke = async () => {
		console.log('😂 ジョークを取りに行くよ〜');

		// ローディング開始！
		setIsLoading(true);
		setJoke(''); // 前のデータをクリア

		try {
			// APIからジョークを取得（英語だけど面白い）
			const response = await fetch('https://api.chucknorris.io/jokes/random');
			const data = await response.json();

			console.log('📝 取得したジョーク:', data);

			// 2秒待つ（ローディングアニメーションを見やすくするため）
			await new Promise((resolve) => setTimeout(resolve, 2000));

			setJoke(data.value);
		} catch (error) {
			console.log('❌ エラー:', error);
			setJoke('ジョークの取得に失敗しちゃった💦');
		} finally {
			// 成功でも失敗でも、ローディング終了
			setIsLoading(false);
		}
	};

	return (
		<div className="p-8 text-center">
			<h1 className="text-4xl font-bold mb-8 text-purple-600">
				ステップ3: ローディング状態の管理 ⏰
			</h1>

			{/* ローディング中かどうかで表示を変える */}
			<div className="bg-yellow-100 p-6 rounded-lg mb-6 min-h-32 flex items-center justify-center">
				{isLoading ? (
					// ローディング中の表示
					<div className="text-center">
						{/* くるくる回るアニメーション */}
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mb-4"></div>
						<p className="text-lg text-purple-800 animate-pulse">
							ジョークを取ってきてる最中だよ〜♡
						</p>
						{/* 点々が増えるアニメーション */}
						<div className="mt-2 flex justify-center space-x-1">
							<span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></span>
							<span
								className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
								style={{ animationDelay: '0.2s' }}
							></span>
							<span
								className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
								style={{ animationDelay: '0.4s' }}
							></span>
						</div>
					</div>
				) : (
					// ローディングが終わった時の表示
					<p className="text-lg text-yellow-800">
						{joke || 'ボタンを押してジョークをもらおう〜♡'}
					</p>
				)}
			</div>

			{/* ボタン（ローディング中は無効化） */}
			<button
				onClick={getJoke}
				disabled={isLoading} // ローディング中はボタンを押せなくする
				className={`px-8 py-4 rounded-full text-xl transition-all duration-300 shadow-lg ${
					isLoading
						? 'bg-gray-400 cursor-not-allowed' // ローディング中のスタイル
						: 'bg-yellow-500 text-white hover:bg-yellow-600 hover:scale-105' // 普通のスタイル
				}`}
			>
				{isLoading ? '⏳ 取得中...' : '😂 面白いジョークをもらう〜'}
			</button>

			{/* 今回覚えること */}
			<div className="mt-8 p-4 bg-gray-100 rounded">
				<h3 className="font-bold mb-2">📚 今回覚えること:</h3>
				<ul className="text-sm space-y-1 text-left max-w-md mx-auto">
					<li>
						✅ <code>useState&lt;boolean&gt;</code> でローディング状態管理
					</li>
					<li>
						✅ <code>setIsLoading(true/false)</code> で状態切り替え
					</li>
					<li>
						✅ <code>disabled</code> でボタンの無効化
					</li>
					<li>
						✅ 条件分岐{' '}
						<code>{`{isLoading ? 'ローディング中' : '普通の表示'}`}</code>
					</li>
					<li>
						✅ CSSアニメーション <code>animate-spin</code>
					</li>
					<li>🔜 次: エラーハンドリング</li>
				</ul>
			</div>

			{/* デバッグ情報 */}
			<div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
				<h4 className="font-bold text-blue-800 mb-2">🔍 今の状態:</h4>
				<ul className="text-sm text-blue-700 space-y-1">
					<li>ローディング中: {isLoading ? '✅ はい' : '❌ いいえ'}</li>
					<li>ボタンの状態: {isLoading ? '無効' : '有効'}</li>
					<li>ジョークの長さ: {joke.length}文字</li>
				</ul>
			</div>
		</div>
	);
}
