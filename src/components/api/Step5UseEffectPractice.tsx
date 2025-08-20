'use client';

import { useState, useEffect } from 'react'; // useEffectを追加！

export default function Step5UseEffectPractice() {
	// 1. データを入れる箱
	const [data, setData] = useState<string>('');

	// 2. ローディング状態の箱
	const [isLoading, setIsLoading] = useState<boolean>(true); // 最初からローディング中

	// 3. エラー状態の箱
	const [error, setError] = useState<string>('');

	// 4. 自動更新のON/OFF
	const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

	// 5. 更新間隔（秒）
	const [refreshInterval, setRefreshInterval] = useState<number>(10);

	// 6. 最後の更新時刻
	const [lastUpdated, setLastUpdated] = useState<string>('');

	// 7. データを取得する関数
	const fetchQuote = async () => {
		console.log('🌟 名言を自動取得中...');

		setIsLoading(true);
		setError('');

		try {
			// 複数の名言APIを試して、どれか成功すればOK
			const apis = [
				'https://api.quotable.io/random',
				'https://api.adviceslip.com/advice',
			];

			let success = false;
			let result;

			for (const apiUrl of apis) {
				try {
					const response = await fetch(apiUrl);
					if (response.ok) {
						result = await response.json();

						// APIによってデータ構造が違うので整形
						if (apiUrl.includes('quotable')) {
							setData(`"${result.content}" - ${result.author}`);
						} else if (apiUrl.includes('adviceslip')) {
							setData(`💡 ${result.slip.advice}`);
						}

						success = true;
						break; // 成功したらループを抜ける
					}
				} catch (apiError) {
					console.log(`API ${apiUrl} でエラー:`, apiError);
					// 次のAPIを試す
				}
			}

			if (!success) {
				throw new Error('全てのAPIでエラーが発生');
			}

			// 最後の更新時刻を記録
			setLastUpdated(new Date().toLocaleTimeString('ja-JP'));
		} catch (error) {
			console.log('❌ 全APIでエラー:', error);
			setError(
				'❌ データの取得に失敗したよ〜 少し待ってからもう一度試してみて'
			);
		} finally {
			setIsLoading(false);
		}
	};

	// 8. useEffect: ページが表示された時に1回だけ実行（新機能！）
	useEffect(() => {
		console.log('🚀 ページが表示されたよ〜 自動でデータを取得するね');
		fetchQuote(); // 最初のデータ取得
	}, []); // 空の配列 = ページ表示時に1回だけ

	// 9. useEffect: 自動更新のタイマー管理（新機能！）
	useEffect(() => {
		if (!autoRefresh) return; // 自動更新がOFFなら何もしない

		console.log(`⏰ ${refreshInterval}秒ごとに自動更新を開始`);

		const timer = setInterval(() => {
			console.log('🔄 自動更新中...');
			fetchQuote();
		}, refreshInterval * 1000); // 秒をミリ秒に変換

		// クリーンアップ関数: コンポーネントが消える時やautoRefreshが変わる時にタイマーを停止
		return () => {
			console.log('⏹️ 自動更新タイマーを停止');
			clearInterval(timer);
		};
	}, [autoRefresh, refreshInterval]); // autoRefreshかrefreshIntervalが変わったら再実行

	// 10. 手動でデータを更新
	const manualRefresh = () => {
		console.log('🔄 手動更新');
		fetchQuote();
	};

	return (
		<div className="p-8 text-center">
			<h1 className="text-4xl font-bold mb-8 text-purple-600">
				ステップ5: useEffect で自動データ取得 ⚡
			</h1>

			{/* 自動更新設定 */}
			<div className="bg-blue-50 p-6 rounded-lg mb-6 max-w-lg mx-auto">
				<h3 className="text-lg font-bold mb-4 text-blue-800">
					🔧 自動更新設定
				</h3>

				{/* 自動更新ON/OFF */}
				<div className="flex items-center justify-center space-x-4 mb-4">
					<span className="text-sm text-blue-700">自動更新:</span>
					<button
						onClick={() => setAutoRefresh(!autoRefresh)}
						className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
							autoRefresh
								? 'bg-green-500 text-white'
								: 'bg-gray-300 text-gray-700'
						}`}
					>
						{autoRefresh ? '✅ ON' : '❌ OFF'}
					</button>
				</div>

				{/* 更新間隔設定 */}
				<div className="flex items-center justify-center space-x-4 mb-4">
					<span className="text-sm text-blue-700">更新間隔:</span>
					<select
						value={refreshInterval}
						onChange={(e) => setRefreshInterval(Number(e.target.value))}
						className="px-3 py-1 border rounded text-sm"
						disabled={!autoRefresh}
					>
						<option value={5}>5秒</option>
						<option value={10}>10秒</option>
						<option value={30}>30秒</option>
						<option value={60}>1分</option>
					</select>
				</div>

				{/* 最後の更新時刻 */}
				{lastUpdated && (
					<div className="text-xs text-blue-600">最後の更新: {lastUpdated}</div>
				)}
			</div>

			{/* メイン表示エリア */}
			<div className="bg-gray-100 p-6 rounded-lg mb-6 min-h-40 flex items-center justify-center">
				{isLoading ? (
					// ローディング中
					<div className="text-center">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mb-4"></div>
						<p className="text-lg text-purple-800">
							{data ? '新しいデータを取得中〜' : '初回データを取得中〜'}
						</p>
					</div>
				) : error ? (
					// エラー時の表示
					<div className="text-center">
						<div className="text-6xl mb-4">😱</div>
						<p className="text-lg text-red-600 mb-4">{error}</p>
						<button
							onClick={manualRefresh}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							もう一度試す
						</button>
					</div>
				) : data ? (
					// 成功時の表示
					<div className="text-center max-w-2xl">
						<div className="text-4xl mb-4">✨</div>
						<p className="text-lg text-gray-800 italic">{data}</p>
						{autoRefresh && (
							<p className="text-sm text-green-600 mt-4">
								🔄 {refreshInterval}秒後に自動更新されるよ〜
							</p>
						)}
					</div>
				) : (
					// 何もない状態（通常は起こらない）
					<p className="text-lg text-gray-600">データを読み込み中...</p>
				)}
			</div>

			{/* ボタンエリア */}
			<div className="space-x-4 mb-6">
				<button
					onClick={manualRefresh}
					disabled={isLoading}
					className={`px-8 py-4 rounded-full text-xl transition-all duration-300 shadow-lg ${
						isLoading
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-105'
					}`}
				>
					{isLoading ? '⏳ 更新中...' : '🔄 手動で更新'}
				</button>
			</div>

			{/* 今回学ぶこと */}
			<div className="mt-8 p-4 bg-gray-100 rounded">
				<h3 className="font-bold mb-2">📚 今回学ぶこと:</h3>
				<ul className="text-sm space-y-1 text-left max-w-md mx-auto">
					<li>
						✅ <code>useEffect</code> でページ表示時の自動実行
					</li>
					<li>
						✅ <code>useEffect</code> の依存配列の使い方
					</li>
					<li>
						✅ <code>setInterval</code> での定期実行
					</li>
					<li>
						✅ <code>clearInterval</code> でのタイマー停止
					</li>
					<li>✅ クリーンアップ関数の重要性</li>
					<li>✅ 複数APIのフォールバック処理</li>
					<li>✅ 条件付きuseEffectの実行制御</li>
				</ul>
			</div>

			{/* useEffectの説明 */}
			<div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
				<h4 className="font-bold text-yellow-800 mb-2">⚡ useEffectとは？</h4>
				<div className="text-sm text-yellow-700 space-y-2 text-left">
					<p>
						<strong>useEffectは「副作用」を管理するReactフック</strong>
					</p>
					<ul className="text-xs space-y-1 ml-4">
						<li>
							• <code>useEffect(() =&gt; {}, [])</code>:
							ページ表示時に1回だけ実行
						</li>
						<li>
							• <code>useEffect(() =&gt; {}, [state])</code>:
							stateが変わった時に実行
						</li>
						<li>
							• <code>return () =&gt; {}</code>: クリーンアップ関数（重要！）
						</li>
						<li>• API呼び出し、タイマー、イベントリスナーの管理に使用</li>
					</ul>
				</div>
			</div>

			{/* デバッグ情報 */}
			<div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
				<h4 className="font-bold text-blue-800 mb-2">🔍 現在の状態:</h4>
				<ul className="text-sm text-blue-700 space-y-1">
					<li>自動更新: {autoRefresh ? '✅ ON' : '❌ OFF'}</li>
					<li>更新間隔: {refreshInterval}秒</li>
					<li>ローディング中: {isLoading ? '✅ はい' : '❌ いいえ'}</li>
					<li>エラー状態: {error ? '❌ エラーあり' : '✅ エラーなし'}</li>
					<li>データ有無: {data ? '✅ あり' : '❌ なし'}</li>
					<li>最終更新: {lastUpdated || '未更新'}</li>
				</ul>
			</div>
		</div>
	);
}
