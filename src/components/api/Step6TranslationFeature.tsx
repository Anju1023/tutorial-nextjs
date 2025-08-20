'use client';

import { useState, useEffect } from 'react';

export default function Step6TranslationFeature() {
	// 1. データを入れる箱
	const [originalData, setOriginalData] = useState<string>('');
	const [translatedData, setTranslatedData] = useState<string>('');

	// 2. ローディング状態の箱
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isTranslating, setIsTranslating] = useState<boolean>(false);

	// 3. エラー状態の箱
	const [error, setError] = useState<string>('');

	// 4. 翻訳設定
	const [autoTranslate, setAutoTranslate] = useState<boolean>(true);
	const [showOriginal, setShowOriginal] = useState<boolean>(false);

	// 5. 最後の更新時刻
	const [lastUpdated, setLastUpdated] = useState<string>('');

	// 6. 翻訳APIを使う関数（複数の翻訳サービスを試す）
	const translateText = async (text: string): Promise<string> => {
		console.log('🌍 翻訳中:', text);

		// 翻訳用のAPIリスト（無料で使えるもの）
		const translationMethods = [
			// Method 1: MyMemory API (無料、制限あり)
			async () => {
				const response = await fetch(
					`https://api.mymemory.translated.net/get?q=${encodeURIComponent(
						text
					)}&langpair=en|ja`
				);
				const data = await response.json();
				if (data.responseStatus === 200) {
					return data.responseData.translatedText;
				}
				throw new Error('MyMemory API failed');
			},

			// Method 2: LibreTranslate API (無料、オープンソース)
			async () => {
				const response = await fetch('https://libretranslate.de/translate', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						q: text,
						source: 'en',
						target: 'ja',
						format: 'text',
					}),
				});
				const data = await response.json();
				if (data.translatedText) {
					return data.translatedText;
				}
				throw new Error('LibreTranslate API failed');
			},

			// Method 3: 簡易翻訳（APIが全部失敗した時のフォールバック）
			async () => {
				// 基本的な英単語の辞書
				const dictionary: { [key: string]: string } = {
					the: '',
					is: 'は',
					and: 'と',
					or: 'または',
					but: 'しかし',
					if: 'もし',
					when: '時',
					life: '人生',
					love: '愛',
					time: '時間',
					success: '成功',
					failure: '失敗',
					dream: '夢',
					hope: '希望',
					happiness: '幸せ',
					wisdom: '知恵',
					courage: '勇気',
					believe: '信じる',
					achieve: '達成する',
					create: '創造する',
					never: '決して〜ない',
					always: 'いつも',
					best: '最高の',
					good: '良い',
					great: '素晴らしい',
					beautiful: '美しい',
					important: '重要な',
					possible: '可能な',
					impossible: '不可能な',
					you: 'あなた',
					your: 'あなたの',
					yourself: 'あなた自身',
					people: '人々',
					world: '世界',
					future: '未来',
				};

				let translated = text.toLowerCase();
				Object.entries(dictionary).forEach(([en, ja]) => {
					const regex = new RegExp(`\\b${en}\\b`, 'gi');
					translated = translated.replace(regex, ja);
				});

				return `🤖 簡易翻訳: ${translated}`;
			},
		];

		// 翻訳方法を順番に試す
		for (let i = 0; i < translationMethods.length; i++) {
			try {
				const result = await translationMethods[i]();
				console.log(`✅ 翻訳成功 (方法${i + 1}):`, result);
				return result;
			} catch (error) {
				console.log(`❌ 翻訳方法${i + 1}失敗:`, error);
				if (i === translationMethods.length - 1) {
					// 全ての方法が失敗した場合
					throw new Error('全ての翻訳方法が失敗しました');
				}
			}
		}

		return text; // フォールバック
	};

	// 7. データを取得する関数（複数API対応＋モックデータ）
	const fetchQuote = async () => {
		console.log('🌟 名言を取得中...');

		setIsLoading(true);
		setError('');
		setTranslatedData('');

		try {
			// 複数の名言APIを試す + モックデータのフォールバック
			const quoteAPIs = [
				// API 1: Quotable
				async () => {
					const response = await fetch('https://api.quotable.io/random');
					if (!response.ok) throw new Error('Quotable API failed');
					const result = await response.json();
					return { content: result.content, author: result.author };
				},

				// API 2: Advice Slip API
				async () => {
					const response = await fetch('https://api.adviceslip.com/advice');
					if (!response.ok) throw new Error('Advice API failed');
					const result = await response.json();
					return { content: result.slip.advice, author: 'Anonymous' };
				},

				// API 3: ZenQuotes API
				async () => {
					const response = await fetch('https://zenquotes.io/api/random');
					if (!response.ok) throw new Error('ZenQuotes API failed');
					const result = await response.json();
					return { content: result[0].q, author: result[0].a };
				},

				// フォールバック: モックデータ
				async () => {
					const mockQuotes = [
						{
							content: 'The only way to do great work is to love what you do',
							author: 'Steve Jobs',
						},
						{
							content:
								'Innovation distinguishes between a leader and a follower',
							author: 'Steve Jobs',
						},
						{
							content:
								"Life is what happens to you while you're busy making other plans",
							author: 'John Lennon',
						},
						{
							content:
								'The future belongs to those who believe in the beauty of their dreams',
							author: 'Eleanor Roosevelt',
						},
						{
							content:
								'It is during our darkest moments that we must focus to see the light',
							author: 'Aristotle',
						},
						{
							content: 'The only impossible journey is the one you never begin',
							author: 'Tony Robbins',
						},
						{
							content:
								'In the end, we will remember not the words of our enemies, but the silence of our friends',
							author: 'Martin Luther King Jr.',
						},
						{
							content:
								'Success is not final, failure is not fatal: it is the courage to continue that counts',
							author: 'Winston Churchill',
						},
						{
							content: 'Be yourself; everyone else is already taken',
							author: 'Oscar Wilde',
						},
						{
							content:
								"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe",
							author: 'Albert Einstein',
						},
					];

					const randomQuote =
						mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
					console.log('📚 モックデータから取得:', randomQuote);
					return randomQuote;
				},
			];

			let quoteData;
			let success = false;

			// APIを順番に試す
			for (let i = 0; i < quoteAPIs.length; i++) {
				try {
					console.log(`🔄 API ${i + 1} を試行中...`);
					quoteData = await quoteAPIs[i]();
					success = true;
					console.log(`✅ API ${i + 1} 成功:`, quoteData);
					break;
				} catch (apiError) {
					console.log(`❌ API ${i + 1} 失敗:`, apiError);
					if (i === quoteAPIs.length - 1) {
						throw new Error('全ての名言取得方法が失敗しました');
					}
				}
			}

			if (!success || !quoteData) {
				throw new Error('名言データの取得に失敗しました');
			}

			const quote = `"${quoteData.content}" - ${quoteData.author}`;
			setOriginalData(quote);
			console.log('✅ 原文取得成功:', quote);

			// 自動翻訳が有効な場合は翻訳を実行
			if (autoTranslate) {
				setIsTranslating(true);
				try {
					const translated = await translateText(quote);
					setTranslatedData(translated);
					console.log('✅ 翻訳成功:', translated);
				} catch (translationError) {
					console.log('❌ 翻訳失敗:', translationError);
					setTranslatedData('❌ 翻訳に失敗しました。原文をご覧ください。');
				} finally {
					setIsTranslating(false);
				}
			}

			setLastUpdated(new Date().toLocaleTimeString('ja-JP'));
		} catch (error) {
			console.log('❌ データ取得エラー:', error);
			setError(
				'❌ 名言の取得に失敗しました。しばらく待ってから再試行してください。'
			);
		} finally {
			setIsLoading(false);
		}
	};

	// 8. 手動翻訳
	const manualTranslate = async () => {
		if (!originalData || isTranslating) return;

		setIsTranslating(true);
		setError('');

		try {
			const translated = await translateText(originalData);
			setTranslatedData(translated);
		} catch (error) {
			console.log('❌ 手動翻訳失敗:', error);
			setError('❌ 翻訳に失敗しました。');
		} finally {
			setIsTranslating(false);
		}
	};

	// 9. useEffect: ページ表示時に初回データ取得
	useEffect(() => {
		console.log('🚀 ページ表示: 初回データ取得開始');
		fetchQuote();
	}, []);

	// 10. useEffect: 自動翻訳設定が変わった時の処理
	useEffect(() => {
		if (autoTranslate && originalData && !translatedData && !isTranslating) {
			console.log('🔄 自動翻訳ON: 既存データを翻訳');
			manualTranslate();
		}
	}, [autoTranslate]);

	return (
		<div className="p-8 text-center">
			<h1 className="text-4xl font-bold mb-8 text-purple-600">
				ステップ6: 翻訳機能付き名言アプリ 🌍
			</h1>

			{/* 翻訳設定パネル */}
			<div className="bg-blue-50 p-6 rounded-lg mb-6 max-w-lg mx-auto">
				<h3 className="text-lg font-bold mb-4 text-blue-800">🔧 翻訳設定</h3>

				{/* 自動翻訳ON/OFF */}
				<div className="flex items-center justify-center space-x-4 mb-4">
					<span className="text-sm text-blue-700">自動翻訳:</span>
					<button
						onClick={() => setAutoTranslate(!autoTranslate)}
						className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
							autoTranslate
								? 'bg-green-500 text-white'
								: 'bg-gray-300 text-gray-700'
						}`}
					>
						{autoTranslate ? '✅ ON' : '❌ OFF'}
					</button>
				</div>

				{/* 原文表示ON/OFF */}
				<div className="flex items-center justify-center space-x-4 mb-4">
					<span className="text-sm text-blue-700">原文も表示:</span>
					<button
						onClick={() => setShowOriginal(!showOriginal)}
						className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
							showOriginal
								? 'bg-blue-500 text-white'
								: 'bg-gray-300 text-gray-700'
						}`}
					>
						{showOriginal ? '✅ ON' : '❌ OFF'}
					</button>
				</div>

				{/* 最終更新時刻 */}
				{lastUpdated && (
					<div className="text-xs text-blue-600">最後の更新: {lastUpdated}</div>
				)}
			</div>

			{/* メイン表示エリア */}
			<div className="bg-gray-100 p-6 rounded-lg mb-6 min-h-48 flex items-center justify-center">
				{isLoading ? (
					// 初回ローディング中
					<div className="text-center">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mb-4"></div>
						<p className="text-lg text-purple-800">名言を取得中〜</p>
					</div>
				) : error ? (
					// エラー時の表示
					<div className="text-center">
						<div className="text-6xl mb-4">😱</div>
						<p className="text-lg text-red-600 mb-4">{error}</p>
						<button
							onClick={fetchQuote}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							もう一度試す
						</button>
					</div>
				) : (
					// 成功時の表示
					<div className="text-center max-w-2xl space-y-6">
						{/* 翻訳中表示 */}
						{isTranslating && (
							<div className="bg-yellow-100 p-4 rounded border border-yellow-300">
								<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mr-3"></div>
								<span className="text-yellow-800">🌍 翻訳中...</span>
							</div>
						)}

						{/* 翻訳済みデータ */}
						{translatedData &&
							translatedData !==
								'❌ 翻訳に失敗しました。原文をご覧ください。' && (
								<div className="bg-white p-6 rounded-lg shadow-lg border-2 border-green-200">
									<div className="text-2xl mb-2">🇯🇵</div>
									<p className="text-xl text-gray-800 font-medium leading-relaxed">
										{translatedData}
									</p>
									<div className="text-sm text-green-600 mt-2">日本語翻訳</div>
								</div>
							)}

						{/* 原文表示 */}
						{showOriginal && originalData && (
							<div className="bg-white p-6 rounded-lg shadow border-2 border-blue-200">
								<div className="text-2xl mb-2">🇺🇸</div>
								<p className="text-lg text-gray-700 italic leading-relaxed">
									{originalData}
								</p>
								<div className="text-sm text-blue-600 mt-2">原文 (English)</div>
							</div>
						)}

						{/* 原文のみ（翻訳失敗時または翻訳無効時） */}
						{!translatedData && originalData && (
							<div className="bg-white p-6 rounded-lg shadow border-2 border-gray-200">
								<div className="text-4xl mb-4">✨</div>
								<p className="text-lg text-gray-800 italic leading-relaxed">
									{originalData}
								</p>
							</div>
						)}
					</div>
				)}
			</div>

			{/* ボタンエリア */}
			<div className="space-x-4 mb-6">
				<button
					onClick={fetchQuote}
					disabled={isLoading}
					className={`px-8 py-4 rounded-full text-xl transition-all duration-300 shadow-lg ${
						isLoading
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-105'
					}`}
				>
					{isLoading ? '⏳ 取得中...' : '🌟 新しい名言を取得'}
				</button>

				{!autoTranslate && originalData && !isTranslating && (
					<button
						onClick={manualTranslate}
						className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300"
					>
						🌍 手動で翻訳
					</button>
				)}
			</div>

			{/* 今回学ぶこと */}
			<div className="mt-8 p-4 bg-gray-100 rounded">
				<h3 className="font-bold mb-2">📚 今回学ぶこと:</h3>
				<ul className="text-sm space-y-1 text-left max-w-md mx-auto">
					<li>✅ 複数の翻訳APIを順番に試すフォールバック処理</li>
					<li>
						✅ <code>encodeURIComponent()</code> でURL安全な文字列変換
					</li>
					<li>✅ POST リクエストでのAPI呼び出し</li>
					<li>✅ 自動翻訳と手動翻訳の切り替え</li>
					<li>✅ 原文と翻訳の両方表示機能</li>
					<li>✅ 翻訳中のローディング状態管理</li>
					<li>✅ 辞書を使った簡易翻訳フォールバック</li>
				</ul>
			</div>

			{/* 翻訳APIの説明 */}
			<div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
				<h4 className="font-bold text-yellow-800 mb-2">
					🌍 使用する翻訳API + 名言API:
				</h4>
				<div className="text-sm text-yellow-700 space-y-2 text-left">
					<p>
						<strong>名言取得:</strong>
					</p>
					<ul className="text-xs space-y-1 ml-4">
						<li>
							• <strong>Quotable API</strong>: 有名人の名言
						</li>
						<li>
							• <strong>Advice Slip API</strong>: 人生のアドバイス
						</li>
						<li>
							• <strong>ZenQuotes API</strong>: 禅の教え
						</li>
						<li>
							• <strong>モックデータ</strong>:
							APIが全部失敗した時のフォールバック
						</li>
					</ul>
					<p>
						<strong>翻訳:</strong>
					</p>
					<ul className="text-xs space-y-1 ml-4">
						<li>
							• <strong>MyMemory API</strong>: 無料翻訳API（制限あり）
						</li>
						<li>
							• <strong>LibreTranslate</strong>: オープンソース翻訳API
						</li>
						<li>
							• <strong>簡易翻訳</strong>: 基本単語辞書によるフォールバック
						</li>
					</ul>
				</div>
			</div>

			{/* デバッグ情報 */}
			<div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
				<h4 className="font-bold text-blue-800 mb-2">🔍 現在の状態:</h4>
				<ul className="text-sm text-blue-700 space-y-1">
					<li>自動翻訳: {autoTranslate ? '✅ ON' : '❌ OFF'}</li>
					<li>原文表示: {showOriginal ? '✅ ON' : '❌ OFF'}</li>
					<li>データ取得中: {isLoading ? '✅ はい' : '❌ いいえ'}</li>
					<li>翻訳中: {isTranslating ? '✅ はい' : '❌ いいえ'}</li>
					<li>エラー状態: {error ? '❌ エラーあり' : '✅ エラーなし'}</li>
					<li>原文: {originalData ? '✅ あり' : '❌ なし'}</li>
					<li>翻訳: {translatedData ? '✅ あり' : '❌ なし'}</li>
				</ul>
			</div>
		</div>
	);
}
