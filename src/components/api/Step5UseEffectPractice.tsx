'use client';

import { useEffect, useState } from 'react';

export default function Step5UseEffectPractice() {
	// いろんな箱を用意
	const [data, setData] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
	const [refreshInterval, setRefreshInterval] = useState<number>(10);
	const [lastUpdated, setLastUpdated] = useState<string>('');

	const fetchQuote = async () => {
		console.log('名言を自動取得中...');

		setIsLoading(true);
		setError('');

		try {
			// 複数の名言APIを試して、どれか成功すればOK
			const apis = [
				'https://api.quotable.io/random',
				'https://api.adviceslip.com/adcie',
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
						break;
					}
				} catch (apiError) {
					console.log(`API ${apiUrl}でエラー:`, apiError);
					// 次のAPIを試す
				}
			}

			if (!success) {
				throw new Error('すべてのAPIでエラーが発生');
			}

			setLastUpdated(new Date().toLocaleTimeString('ja-JP'));
		} catch (error) {
			console.log('❌ 全APIでエラー:', error);
			setError(
				'❌ データの取得に失敗したよ～ 少し待ってからもう一度試してみて'
			);
		} finally {
			setIsLoading(false);
		}
	};

	// useEffect: ページが表示されたときに1回だけ実行(新機能！)
	useEffect(() => {
		console.log('ページが表示されたよ～ 自動でデータを取得するね');
		fetchQuote(); // 最初のデータ取得
	}, []); // 空の配列 = ページ表示時に1回だけ

	// useEffect: 自動更新のタイマー管理(新機能！)
	useEffect(() => {
		if (!autoRefresh) return; // 自動更新がOFFなら何もしない

		console.log(`⏰ ${refreshInterval}秒ごとに自動更新を開始`);

		const timer = setInterval(() => {
			console.log('🔄️ 自動更新中...');
			fetchQuote();
		}, refreshInterval * 1000); // 秒をミリ秒に変換

		// クリーンアップ関数: コンポーネントが消えるときやautoRefreshが変わる時にタイマーを停止
		return () => {
			console.log('⏹️ 自動更新タイマーを停止');
			clearInterval(timer);
		};
	}, [autoRefresh, refreshInterval]); // autoRefreshかrefreshIntervalが変わったら再実行

	// 手動でデータを更新
	const manualRefresh = () => {
		console.log('🔄️ 手動更新');
		fetchQuote();
	};

	return (
		<div>
			<h1>ステップ5: useEffectで自動データ取得 ⚡</h1>

			{/* 自動更新設定 */}
			<div>
				<h3>🔧 自動更新設定</h3>

				{/* 自動更新ON/OFF */}
				<div>
					<span>自動更新:</span>
					<button onClick={() => setAutoRefresh(!autoRefresh)}>
						{autoRefresh ? '✅ ON' : '❌ OFF'}
					</button>
				</div>

				{/* 更新間隔設定 */}
				<div>
					<span>更新間隔:</span>
					<select
						value={refreshInterval}
						onChange={(e) => setRefreshInterval(Number(e.target.value))}
						disabled={!autoRefresh}
					>
						<option value={5}>5秒</option>
						<option value={10}>10秒</option>
						<option value={30}>30秒</option>
						<option value={60}>1分</option>
					</select>
				</div>

				{/* 最後の更新時刻 */}
				{lastUpdated && <div>最後の更新: {lastUpdated}</div>}
			</div>

			{/* メイン表示エリア */}
			<div>
				{isLoading ? (
					// ローディング中
					<div>
						<div></div>
						<p>{data ? '新しいデータを取得中～' : '初回データを取得中～'}</p>
					</div>
				) : error ? (
					// エラー時の表示
					<div>
						<div>😱</div>
						<p>{error}</p>
						<button onClick={manualRefresh}>もう一度試す</button>
					</div>
				) : data ? (
					// 成功時の表示
					<div>
						<div>✨</div>
						<p>{data}</p>
						{autoRefresh && (
							<p>🔄️ {refreshInterval}秒後に自動更新されるよ～</p>
						)}
					</div>
				) : (
					// 何もない状態 (通常は起こらない)
					<p>データを読み込み中...</p>
				)}
			</div>

			{/* ボタンエリア */}
			<div>
				<button onClick={manualRefresh} disabled={isLoading}>
					{isLoading ? '⌛ 更新中...' : '🔄️ 手動で更新'}
				</button>
			</div>

			{/* 今回学ぶこと */}
			<div>
				<h3>📚 今回学ぶこと:</h3>
				<ul>
					<li>
						✅ <code>useEffect</code>でページ表示時の自動実行
					</li>
					<li>
						✅ <code>useEffect</code>で依存配列の使い方
					</li>
					<li>
						✅ <code>setInterval</code>での定期実行
					</li>
					<li>
						✅ <code>clearInterval</code>でのタイマー停止
					</li>
					<li>✅ クリーンアップ関数の重要性</li>
					<li>✅ 複数APIのフォールバック処理</li>
					<li>✅ 条件付きuseEffectの実行制御</li>
				</ul>
			</div>

			{/* useEffectの説明 */}
			<div>
				<h4>⚡ ueEffectとは？</h4>
				<div>
					<p>
						<strong>useEffectは「副作用」を管理するReactフック</strong>
					</p>
					<ul>
						<li>
							・ <code>useEffect(() =&gt; {}, [])</code>:
							ページ表示時に1回だけ実行
						</li>
						<li>
							・ <code>useEffect(() =&gt; {}, [state])</code>:
							stateが変わったときに実行
						</li>
						<li>
							・ <code>return () =&gt; {}</code>: クリーンアップ関数(重要！)
						</li>
						<li>・ API呼び出し、タイマー、イベントリスナーの管理に使用</li>
					</ul>
				</div>
			</div>

			{/* デバッグ情報 */}
			<div>
				<h4>🔍 現在の状態:</h4>
				<ul>
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
