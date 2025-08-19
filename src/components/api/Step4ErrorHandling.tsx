'use client';

import { useState } from 'react';

export default function Step4ErrorHandling() {
	// 1. データを入れる箱
	const [quote, setQuote] = useState<string>('まだボタンを押してないよ〜');

	// 2. ローディング状態の箱
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// 3. エラー状態の箱（新しい！）
	const [error, setError] = useState<string>('');

	// 4. 成功回数と失敗回数を数える箱（おまけ）
	const [successCount, setSuccessCount] = useState<number>(0);
	const [errorCount, setErrorCount] = useState<number>(0);

	// 5. 名言を取ってくる関数
	const getQuote = async () => {
		console.log('📖 名言を取りに行くよ〜');

		// 全ての状態をリセット
		setIsLoading(true);
		setError(''); // エラーメッセージをクリア
		setQuote(''); // 前のデータもクリア

		try {
			// APIから名言を取得
			const response = await fetch('https://api.quotable.io/random');

			// レスポンスが成功かチェック（新しい！）
			if (!response.ok) {
				throw new Error(`APIエラー: ${response.status}`);
			}

			const data = await response.json();
			console.log('✅ 取得成功:', data);

			// 1秒待つ（ローディング見せるため）
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// 成功時の処理
			setQuote(`"${data.content}" - ${data.author}`);
			setSuccessCount((prev) => prev + 1);
		} catch (error) {
			console.log('❌ エラー発生:', error);

			// エラーの種類に応じてメッセージを変える
			let errorMessage = '';

			if (error instanceof Error) {
				// ネットワークエラーかAPIエラーか判断
				if (error.message.includes('Failed to fetch')) {
					errorMessage = '❌ インターネット接続を確認してね〜';
				} else if (error.message.includes('APIエラー')) {
					errorMessage = '❌ サーバーが忙しいみたい...少し待ってね〜';
				} else {
					errorMessage = `❌ エラーが発生したよ〜: ${error.message}`;
				}
			} else {
				errorMessage = '❌ 謎のエラーが発生したよ〜';
			}

			setError(errorMessage);
			setErrorCount((prev) => prev + 1);
		} finally {
			// 成功でも失敗でもローディング終了
			setIsLoading(false);
		}
	};

	// 6. 統計をリセットする関数
	const resetStats = () => {
		setSuccessCount(0);
		setErrorCount(0);
		setQuote('まだボタンを押してないよ〜');
		setError('');
	};

	return (
		<div className="p-8 text-center">
			<h1 className="text-4xl font-bold mb-8 text-purple-600">
				ステップ4: エラーハンドリング 🛡️
			</h1>

			{/* 統計表示 */}
			<div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
				<div className="bg-green-100 p-4 rounded">
					<div className="text-2xl font-bold text-green-600">
						{successCount}
					</div>
					<div className="text-sm text-green-700">成功回数</div>
				</div>
				<div className="bg-red-100 p-4 rounded">
					<div className="text-2xl font-bold text-red-600">{errorCount}</div>
					<div className="text-sm text-red-700">エラー回数</div>
				</div>
			</div>

			{/* メイン表示エリア */}
			<div className="bg-gray-100 p-6 rounded-lg mb-6 min-h-40 flex items-center justify-center">
				{isLoading ? (
					// ローディング中
					<div className="text-center">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mb-4"></div>
						<p className="text-lg text-purple-800">名言を取ってきてる最中〜</p>
					</div>
				) : error ? (
					// エラー時の表示（新しい！）
					<div className="text-center">
						<div className="text-6xl mb-4">😱</div>
						<p className="text-lg text-red-600 mb-4">{error}</p>
						<button
							onClick={getQuote}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							もう一度試す
						</button>
					</div>
				) : quote ? (
					// 成功時の表示
					<div className="text-center">
						<div className="text-4xl mb-4">✨</div>
						<p className="text-lg text-gray-800 italic">{quote}</p>
					</div>
				) : (
					// 初期状態
					<p className="text-lg text-gray-600">
						ボタンを押して名言をもらおう〜♡
					</p>
				)}
			</div>

			{/* ボタンエリア */}
			<div className="space-x-4 mb-6">
				<button
					onClick={getQuote}
					disabled={isLoading}
					className={`px-8 py-4 rounded-full text-xl transition-all duration-300 shadow-lg ${
						isLoading
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-105'
					}`}
				>
					{isLoading ? '⏳ 取得中...' : '📖 素敵な名言をもらう〜'}
				</button>

				<button
					onClick={resetStats}
					className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-all duration-300"
				>
					🔄 統計リセット
				</button>
			</div>

			{/* 今回学ぶこと */}
			<div className="mt-8 p-4 bg-gray-100 rounded">
				<h3 className="font-bold mb-2">📚 今回学ぶこと:</h3>
				<ul className="text-sm space-y-1 text-left max-w-md mx-auto">
					<li>
						✅ <code>useState&lt;string&gt;</code> でエラーメッセージ管理
					</li>
					<li>
						✅ <code>response.ok</code> でAPIレスポンス判定
					</li>
					<li>
						✅ <code>throw new Error()</code> で手動エラー発生
					</li>
					<li>✅ エラーの種類別メッセージ表示</li>
					<li>✅ 「もう一度試す」ボタン</li>
					<li>✅ 成功/失敗の統計表示</li>
				</ul>
			</div>

			{/* デバッグ情報 */}
			<div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
				<h4 className="font-bold text-blue-800 mb-2">🔍 現在の状態:</h4>
				<ul className="text-sm text-blue-700 space-y-1">
					<li>ローディング中: {isLoading ? '✅ はい' : '❌ いいえ'}</li>
					<li>エラー状態: {error ? '❌ エラーあり' : '✅ エラーなし'}</li>
					<li>データ有無: {quote && !error ? '✅ あり' : '❌ なし'}</li>
					<li>
						成功率:{' '}
						{successCount + errorCount > 0
							? `${Math.round(
									(successCount / (successCount + errorCount)) * 100
							  )}%`
							: '未実行'}
					</li>
				</ul>
			</div>

			{/* APIの説明 */}
			<div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
				<h4 className="font-bold text-yellow-800 mb-2">🌐 使用API:</h4>
				<p className="text-sm text-yellow-700">
					Quotable API: <code>https://api.quotable.io/random</code>
					<br />
					有名人の名言をランダムで取得できる無料API
				</p>
			</div>
		</div>
	);
}
