'use client';

import { useState } from 'react';

export default function Step4MultiAPIpractice() {
	// データを入れる箱
	const [data, setData] = useState<string>('まだボタンを押してないよ～');

	// ローディング状態の箱
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// エラー状態の箱
	const [error, setError] = useState<string>('');

	// 選択されたAPIを管理
	const [selectedAPI, setSelectedAPI] = useState<string>('dog');

	// 成功回数と失敗回数を数える箱
	const [successCount, setSuccessCount] = useState<number>(0);
	const [errorCount, setErrorCount] = useState<number>(0);

	// 利用可能なAPIリスト
	const apiList = [
		{
			id: 'dog',
			name: '🐶 わんちゃんの写真',
			url: 'https://dog.ceo/api/breeds/image/random',
			description: 'かわいいわんちゃんの写真をランダムで取得',
			dataKey: 'message',
		},
		{
			id: 'cat',
			name: '🐱 ねこちゃんの事実',
			url: 'https://catfact.ninja/fact',
			description: '猫に関する豆知識を取得',
			dataKey: 'fact',
		},
		{
			id: 'advice',
			name: '💭 人生のアドバイス',
			url: 'https://api.adviceslip.com/advice',
			description: '人生に役立つアドバイスを取得',
			dataKey: 'slip.advice',
		},
		{
			id: 'joke',
			name: '😂 プログラマージョーク',
			url: 'https://official-joke-api.appspot.com/random_joke',
			description: 'プログラマー向けのジョークを取得',
			dataKey: 'both', // setup + punchline
		},
		{
			id: 'quote',
			name: '✨ 名言',
			url: 'https://api.quotable.io/random',
			description: '有名人の名言を取得',
			dataKey: 'both', // content + author
		},
		{
			id: 'weather',
			name: '⛅ お天気情報',
			url: 'https://wttr.in/Tokyo?format=j1',
			description: '東京のお天気情報を取得',
			dataKey: 'weather',
		},
	];

	// 選択されたAPIの情報を取得
	const currentAPI = apiList.find((api) => api.id === selectedAPI);

	// データを取得する関数
	const fetchData = async () => {
		if (!currentAPI) return;

		console.log(`${currentAPI.name}のデータを取りに行くよ～`);

		// 全ての状態をリセット
		setIsLoading(true);
		setError('');
		setData('');

		try {
			// APIからデータを取得
			const response = await fetch(currentAPI.url);

			// レスポンスが成功かチェック
			if (!response.ok) {
				throw new Error(`APIエラー: ${response.status} ${response.statusText}`);
			}

			const result = await response.json();
			console.log('✅ 取得成功', result);

			// 少し待つ
			await new Promise((resolve) => setTimeout(resolve, 500));

			// APIの種類に応じてデータを整形
			let formattedData = '';

			switch (selectedAPI) {
				case 'dog':
					formattedData = `🐶 わんちゃんの写真だよ～！\n\n画像URL: ${result.message}`;
					break;
				case 'cat':
					formattedData = `🐱 猫の豆知識:\n\n${result.fact}`;
					break;
				case 'advice':
					formattedData = `💭 人生のアドバイス:\n\n${result.slip.advice}`;
					break;
				case 'joke':
					formattedData = `😂 ジョーク:\n\nQ: ${result.setup}\nA: ${result.punchline}`;
					break;
				case 'quote':
					formattedData = `✨ 名言:\n\n"${result.content}"\n- ${result.author}`;
					break;
				case 'weather':
					const weather = result.current_condition[0];
					const temp = weather.temp;
					const desc = weather.weatherDesc[0].value;
					formattedData = `⛅ 東京の天気:\n\n気温: ${temp}℃\n天気: ${desc}`;
					break;

				default:
					formattedData = JSON.stringify(result, null, 2);
			}

			setData(formattedData);
			setSuccessCount((prev) => prev + 1);
		} catch (error) {
			console.log('❌ エラー発生:', error);

			let errorMessage = '';

			if (error instanceof Error) {
				if (error.message.includes('Failed to fetch')) {
					errorMessage = '❌ インターネット接続を確認してね～';
				} else if (error.message.includes('APIエラー')) {
					errorMessage = `❌ ${currentAPI.name}のサーバーでエラーが発生したよ～\n${error.message}`;
				} else if (error.message.includes('timeout')) {
					errorMessage = '❌ タイムアウトしちゃった～もう一度試してみて';
				} else {
					errorMessage = `❌ エラーが発生したよ～: ${error.message}`;
				}
			} else {
				errorMessage = '❌ 謎のエラーが発生したよ～';
			}

			setError(errorMessage);
			setErrorCount((prev) => prev + 1);
		} finally {
			setIsLoading(false);
		}
	};

	// 統計をリセットする関数
	const resetStats = () => {
		setSuccessCount(0);
		setErrorCount(0);
		setData('まだボタンを押してないよ～');
		setError('');
	};

	return (
		<div className="p-8 text-center">
			<h1 className="text-4xl font-bold mb-8 text-purple-600">
				ステップ4改: いろいろなAPIで練習しよう！ 🌐
			</h1>

			{/* API選択ボタン */}
			<div className="mb-8">
				<h3 className="text-lg font-bold mb-4">どのAPIで練習する？</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
					{apiList.map((api) => (
						<button
							key={api.id}
							onClick={() => setSelectedAPI(api.id)}
							className={`p-4 rounded-lg border-2 transition-all duration-300 ${
								selectedAPI === api.id
									? 'border-purple-500 bg-purple-100 scale-105'
									: 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
							}`}
						>
							<div className="text-lg font-bold mb-1">{api.name}</div>
							<div className="text-sm text-gray-600">{api.description}</div>
						</button>
					))}
				</div>
				{currentAPI && (
					<div className="mt-4 bg-blue-50 rounded border border-blue-200 max-w-md mx-auto">
						<p className="text-sm text-blue-700">
							<strong>選択中:</strong> {currentAPI.name}
							<br />
							<strong>URL:</strong>
							<code className="text-xs">{currentAPI.url}</code>
						</p>
					</div>
				)}
			</div>

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
			<div className="bg-gray-100 p-6 rounded-lg mb-6 min-h-48 flex items-center justify-center">
				{isLoading ? (
					// ローディング中
					<div className="text-center">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mb-4"></div>
						<p className="text-lg text-purple-800">
							{currentAPI?.name}のデータを取ってきてる最中～
						</p>
					</div>
				) : error ? (
					// エラー時の表示
					<div className="text-center">
						<div className="text-6xl mb-4">😱</div>
						<p className="text-lg text-red-600 mb-4 whitespace-pre-line">
							{error}
						</p>
						<button
							onClick={fetchData}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							もう一度試す
						</button>
					</div>
				) : data && data !== 'まだボタンを押してないよ～' ? (
					// 成功時の表示
					<div className="text-center max-w-2xl">
						<div className="text-4xl mb-4">✨</div>
						{selectedAPI === 'dog' && data.includes('画像URL') ? (
							// 犬の画像の場合は実際の画像を表示
							<div>
								<img
									src={data.split('画像URL: ')[1]}
									alt="わんちゃん"
									className="max-w-sm mx-auto rounded-lg mb-4"
									onError={(e) => {
										e.currentTarget.style.display = 'none';
									}}
								/>
								<p className="text-lg text-gray-800 whitespace-pre-line">
									{data}
								</p>
							</div>
						) : (
							<p className="text-lg text-gray-800 whitespace-pre-line">
								{data}
							</p>
						)}
					</div>
				) : (
					// 初期状態
					<p className="text-lg text-gray-600">
						{currentAPI
							? `${currentAPI.name}を取得してみよう～`
							: 'APIを選んでね～'}
					</p>
				)}
			</div>

			{/* ボタンエリア */}
			<div className="space-x-4 mb-6">
				<button
					onClick={fetchData}
					disabled={isLoading || !currentAPI}
					className={`px-8 py-4 rounded-full text-xl transition-all duration-300 shadow-lg ${
						isLoading || !currentAPI
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-105'
					}`}
				>
					{isLoading
						? '⌛ 取得中...'
						: `🚀 ${currentAPI?.name || 'データ'}を取得～`}
				</button>

				<button
					onClick={resetStats}
					className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-all duration-300"
				>
					🔄️ 統計リセット
				</button>
			</div>

			{/* 今回学ぶこと */}
			<div className="mt-8 p-4 bg-gray-100 rounded">
				<h3 className="font-bold mb-2">📚 今回学ぶこと</h3>
				<ul className="text-sm space-y-1 text-left max-w-md mx-auto">
					<li>✅ 複数のAPIを切り替えて使用</li>
					<li>✅ APIレスポンスの構造の違いを理解</li>
					<li>✅ switch文での条件分岐</li>
					<li>✅ 画像データの表示方法</li>
					<li>✅ 実際のAPIの呼び出し体験</li>
					<li>✅ 様々なエラーパターンの対処</li>
				</ul>
			</div>

			{/* デバッグ情報 */}
			<div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
				<h4 className="font-bold text-blue-800 mb-2">🔍 現在の状態:</h4>
				<ul className="text-sm text-blue-700 space-y-1">
					<li>選択API: {currentAPI?.name || '未選択'}</li>
					<li>ローディング中: {isLoading ? '✅ はい' : '❌ いいえ'}</li>
					<li>エラー状態: {error ? '❌ エラーあり' : '✅ エラーなし'}</li>
					<li>
						データ有無:{' '}
						{data && data !== 'まだボタンを押してないよ～' && !error
							? '✅ あり'
							: '❌ なし'}
					</li>
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

			{/* API説明 */}
			<div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
				<h4 className="font-bold text-yellow-800 mb-2">🌐 練習用APIリスト:</h4>
				<div className="text-sm text-yellow-700 space-y-2">
					<p>
						<strong>無料で使えるAPIで練習してるよ～</strong>
					</p>
					<ul className="text-xs space-y-1">
						<li>・Dog CEO API: 犬の写真</li>
						<li>・Cat Facts API: 猫の豆知識</li>
						<li>・Advice Slip API: 人生のアドバイス</li>
						<li>・Official Joke API: ジョーク</li>
						<li>・Quotable API: 名言</li>
						<li>・wttr.in: 天気情報</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
