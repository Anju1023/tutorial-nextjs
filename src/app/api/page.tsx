'use client';

import { useState } from 'react';
import Step3Loading from '@/components/api/Step3Loading';
import Step4ErrorHandling from '@/components/api/Step4ErrorHandling';
import Step1SimpleAPI from '../../components/api/Step1SimpleAPI';
import Step2RealAPI from '../../components/api/Step2RealAPI';
import Step4MultiAPIpractice from '@/components/api/Step4MultiAPIpractice';
import Step5UseEffectPractice from '@/components/api/Step5UseEffectPractice';
import Step6TranslationFeature from '@/components/api/Step6TranslationFeature';

export default function APIApp() {
	const [currentView, setCurrentView] = useState<'summary' | 'practice'>(
		'summary'
	);
	const [selectedStep, setSelectedStep] = useState<number>(1);

	// 学習ステップのデータ
	const learningSteps = [
		{
			id: 1,
			title: 'ステップ1: シンプルAPI体験',
			emoji: '🎯',
			description: 'ボタンを押すと配列からランダムメッセージを表示',
			level: '初心者',
			color: 'green',
			skills: [
				'useState の基本使い方',
				'ボタンクリックイベントの処理',
				'配列からランダム要素を取得',
				'Math.floor() と Math.random() の活用',
				'条件分岐での表示制御',
			],
			codeExample: `const [message, setMessage] = useState('初期メッセージ');

const getRandomMessage = () => {
  const messages = ['こんにちは〜', 'がんばれ〜', '最高〜'];
  const random = messages[Math.floor(Math.random() * messages.length)];
  setMessage(random);
};`,
			whatLearned: 'Reactの基本的な状態管理とイベント処理',
			nextLevel: '本物のAPIに挑戦！',
		},
		{
			id: 2,
			title: 'ステップ2: 本物のAPI呼び出し',
			emoji: '🌐',
			description: '実際のAPIから猫の豆知識を取得',
			level: '初級',
			color: 'blue',
			skills: [
				'fetch() でAPI呼び出し',
				'async/await の基本理解',
				'response.json() でデータ取得',
				'インターネットからリアルタイムデータ取得',
				'APIレスポンスの構造理解',
			],
			codeExample: `const getCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  const data = await response.json();
  setCatFact(data.fact);
};`,
			whatLearned: '非同期処理と外部APIとの連携',
			nextLevel: 'ローディング状態の管理',
		},
		{
			id: 3,
			title: 'ステップ3: ローディング状態管理',
			emoji: '⏰',
			description: 'データ取得中のローディング表示とボタン無効化',
			level: '中級',
			color: 'yellow',
			skills: [
				'useStateでローディング状態管理',
				'条件分岐でのUI制御',
				'disabled属性でボタン制御',
				'CSSアニメーション (animate-spin)',
				'ユーザー体験の向上設計',
			],
			codeExample: `const [isLoading, setIsLoading] = useState(false);

const fetchData = async () => {
  setIsLoading(true);
  try {
    // データ取得処理
  } finally {
    setIsLoading(false);
  }
};`,
			whatLearned: 'プロフェッショナルなUI/UX設計の基本',
			nextLevel: 'エラー対応の実装',
		},
		{
			id: 4,
			title: 'ステップ4: エラーハンドリング',
			emoji: '🛡️',
			description: 'エラー時の適切なメッセージ表示とリトライ機能',
			level: '中級',
			color: 'red',
			skills: [
				'try-catch-finally文の活用',
				'response.ok でAPI成功判定',
				'エラーの種類別メッセージ表示',
				'リトライボタンの実装',
				'成功/失敗統計の表示',
			],
			codeExample: `try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`APIエラー: \${response.status}\`);
  }
  // 成功処理
} catch (error) {
  setError('適切なエラーメッセージ');
}`,
			whatLearned: '堅牢なアプリケーションの作り方',
			nextLevel: '自動実行機能の追加',
		},
		{
			id: 5,
			title: 'ステップ5: useEffectで自動データ取得',
			emoji: '⚡',
			description: 'ページ表示時の自動取得と定期更新機能',
			level: '中級+',
			color: 'purple',
			skills: [
				'useEffect でライフサイクル管理',
				'依存配列の理解と活用',
				'setInterval での定期実行',
				'clearInterval でのメモリリーク防止',
				'クリーンアップ関数の重要性',
			],
			codeExample: `useEffect(() => {
  fetchData(); // ページ表示時に実行
}, []); // 空配列 = 1回だけ

useEffect(() => {
  const timer = setInterval(fetchData, 5000);
  return () => clearInterval(timer); // クリーンアップ
}, [autoRefresh]);`,
			whatLearned: 'Reactのライフサイクルと副作用の管理',
			nextLevel: '翻訳機能の実装',
		},
		{
			id: 6,
			title: 'ステップ6: 翻訳機能付きアプリ',
			emoji: '🌍',
			description: '英語の名言を取得して日本語に翻訳',
			level: '上級',
			color: 'pink',
			skills: [
				'複数API の順次呼び出し',
				'フォールバック処理の実装',
				'POST リクエストでのAPI呼び出し',
				'国際化対応の基本',
				'複雑な状態管理',
			],
			codeExample: `// 複数APIを順番に試す
for (const api of apiList) {
  try {
    const result = await api();
    return result; // 成功したら即座に返す
  } catch (error) {
    // 次のAPIを試す
  }
}`,
			whatLearned: 'エンタープライズレベルのアプリケーション設計',
			nextLevel: 'プロフェッショナル開発者🚀',
		},
	];

	const currentStep =
		learningSteps.find((step) => step.id === selectedStep) || learningSteps[0];

	const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
		const colorMap = {
			green: {
				bg: 'bg-green-100',
				text: 'text-green-800',
				border: 'border-green-200',
			},
			blue: {
				bg: 'bg-blue-100',
				text: 'text-blue-800',
				border: 'border-blue-200',
			},
			yellow: {
				bg: 'bg-yellow-100',
				text: 'text-yellow-800',
				border: 'border-yellow-200',
			},
			red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
			purple: {
				bg: 'bg-purple-100',
				text: 'text-purple-800',
				border: 'border-purple-200',
			},
			pink: {
				bg: 'bg-pink-100',
				text: 'text-pink-800',
				border: 'border-pink-200',
			},
		};
		return colorMap[color as keyof typeof colorMap]?.[type] || 'bg-gray-100';
	};

	return (
		<div className="p-8">
			<h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
				🚀 あんじゅのAPI学習ページ 🚀
			</h1>

			{/* ビュー切り替えボタン */}
			<div className="flex justify-center mb-8">
				<div className="bg-white rounded-full p-1 shadow-lg border">
					<button
						onClick={() => setCurrentView('summary')}
						className={`px-6 py-3 rounded-full transition-all duration-300 ${
							currentView === 'summary'
								? 'bg-purple-500 text-white shadow-md'
								: 'text-purple-500 hover:bg-purple-50'
						}`}
					>
						📚 学習まとめ
					</button>
					<button
						onClick={() => setCurrentView('practice')}
						className={`px-6 py-3 rounded-full transition-all duration-300 ${
							currentView === 'practice'
								? 'bg-pink-500 text-white shadow-md'
								: 'text-pink-500 hover:bg-pink-50'
						}`}
					>
						🚀 実習モード
					</button>
				</div>
			</div>

			{currentView === 'summary' ? (
				// 学習まとめビュー
				<div>
					{/* 全体進捗 */}
					<div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg mb-8">
						<h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
							🎉 あんじゅの成長記録 🎉
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
							<div className="bg-white p-4 rounded-lg shadow">
								<div className="text-2xl font-bold text-green-600">6</div>
								<div className="text-sm text-gray-600">学習ステップ完了</div>
							</div>
							<div className="bg-white p-4 rounded-lg shadow">
								<div className="text-2xl font-bold text-blue-600">20+</div>
								<div className="text-sm text-gray-600">習得技術</div>
							</div>
							<div className="bg-white p-4 rounded-lg shadow">
								<div className="text-2xl font-bold text-purple-600">上級</div>
								<div className="text-sm text-gray-600">現在のレベル</div>
							</div>
						</div>
					</div>

					{/* ステップ選択 */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
						{learningSteps.map((step) => (
							<button
								key={step.id}
								onClick={() => setSelectedStep(step.id)}
								className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
									selectedStep === step.id
										? `${getColorClasses(
												step.color,
												'border'
										  )} ${getColorClasses(
												step.color,
												'bg'
										  )} scale-105 shadow-lg`
										: 'border-gray-200 bg-white hover:shadow-md'
								}`}
							>
								<div className="text-2xl mb-2">{step.emoji}</div>
								<h3
									className={`font-bold text-sm mb-1 ${
										selectedStep === step.id
											? getColorClasses(step.color, 'text')
											: 'text-gray-800'
									}`}
								>
									{step.title}
								</h3>
								<p className="text-xs text-gray-600">{step.description}</p>
								<div
									className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
										selectedStep === step.id
											? getColorClasses(step.color, 'bg')
											: 'bg-gray-100'
									}`}
								>
									{step.level}
								</div>
							</button>
						))}
					</div>

					{/* 選択されたステップの詳細 */}
					<div
						className={`${getColorClasses(
							currentStep.color,
							'bg'
						)} p-8 rounded-lg ${getColorClasses(
							currentStep.color,
							'border'
						)} border-2`}
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{/* 左側：スキルと説明 */}
							<div>
								<div className="flex items-center mb-4">
									<span className="text-4xl mr-4">{currentStep.emoji}</span>
									<div>
										<h2
											className={`text-2xl font-bold ${getColorClasses(
												currentStep.color,
												'text'
											)}`}
										>
											{currentStep.title}
										</h2>
										<p className="text-gray-700">{currentStep.description}</p>
									</div>
								</div>

								<div className="mb-6">
									<h3
										className={`text-lg font-bold mb-3 ${getColorClasses(
											currentStep.color,
											'text'
										)}`}
									>
										📚 習得したスキル:
									</h3>
									<ul className="space-y-2">
										{currentStep.skills.map((skill, index) => (
											<li key={index} className="flex items-start">
												<span className="text-green-500 mr-2 mt-1">✅</span>
												<span className="text-gray-700 text-sm">{skill}</span>
											</li>
										))}
									</ul>
								</div>

								<div className="bg-white p-4 rounded-lg shadow border">
									<h4 className="font-bold text-gray-800 mb-2">
										🎯 このステップで学んだこと:
									</h4>
									<p className="text-gray-700 text-sm">
										{currentStep.whatLearned}
									</p>
									<div className="mt-3 text-sm">
										<span className="font-semibold text-purple-600">
											次のレベル:{' '}
										</span>
										<span className="text-gray-600">
											{currentStep.nextLevel}
										</span>
									</div>
								</div>
							</div>

							{/* 右側：コード例 */}
							<div>
								<h3
									className={`text-lg font-bold mb-3 ${getColorClasses(
										currentStep.color,
										'text'
									)}`}
								>
									💻 コード例:
								</h3>
								<div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
									<pre className="text-sm">
										<code>{currentStep.codeExample}</code>
									</pre>
								</div>
							</div>
						</div>
					</div>

					{/* 全体まとめ */}
					<div className="mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-8 rounded-lg">
						<h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
							🌟 あんじゅの技術スタック 🌟
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h3 className="font-bold text-indigo-700 mb-4">
									🎯 フロントエンド技術:
								</h3>
								<div className="space-y-2">
									{[
										'React Hooks (useState, useEffect)',
										'TypeScript 型安全性',
										'Tailwind CSS アニメーション',
										'条件分岐レンダリング',
										'イベントハンドリング',
									].map((tech, index) => (
										<div key={index} className="flex items-center">
											<span className="text-green-500 mr-2">✅</span>
											<span className="text-sm text-indigo-700">{tech}</span>
										</div>
									))}
								</div>
							</div>
							<div>
								<h3 className="font-bold text-purple-700 mb-4">
									🌐 API・非同期処理:
								</h3>
								<div className="space-y-2">
									{[
										'fetch() でのHTTPリクエスト',
										'async/await 非同期処理',
										'エラーハンドリング (try-catch)',
										'複数API フォールバック',
										'ローディング状態管理',
									].map((tech, index) => (
										<div key={index} className="flex items-center">
											<span className="text-green-500 mr-2">✅</span>
											<span className="text-sm text-purple-700">{tech}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				// 実習モードビュー
				<div>
					{/* 学習ステップの概要 */}
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
						{learningSteps.map((step) => (
							<div
								key={step.id}
								className={`${getColorClasses(
									step.color,
									'bg'
								)} p-4 rounded-lg text-center border ${getColorClasses(
									step.color,
									'border'
								)}`}
							>
								<div className="text-2xl mb-2">{step.emoji}</div>
								<h3
									className={`font-bold text-xs ${getColorClasses(
										step.color,
										'text'
									)}`}
								>
									ステップ{step.id}
								</h3>
								<p className="text-xs text-gray-600">
									{step.title.split(': ')[1]}
								</p>
							</div>
						))}
					</div>

					{/* 各ステップの実習 */}
					<div className="space-y-12">
						<Step1SimpleAPI />
						<hr className="border-2 border-gray-200" />

						<Step2RealAPI />
						<hr className="border-2 border-gray-200" />

						<Step3Loading />
						<hr className="border-2 border-gray-200" />

						<Step4ErrorHandling />
						<hr className="border-2 border-gray-200" />

						<Step4MultiAPIpractice />
						<hr className="border-2 border-gray-200" />

						<Step5UseEffectPractice />
						<hr className="border-2 border-gray-200" />

						<Step6TranslationFeature />
					</div>

					{/* 学習の進歩表示 */}
					<div className="mt-12 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
						<h2 className="text-2xl font-bold mb-4 text-center text-purple-800">
							🚀 次のステップ候補 🚀
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="font-bold text-purple-700 mb-2">🎯 上級機能:</h3>
								<ul className="text-sm space-y-1 text-purple-600">
									<li>• お気に入り機能 (localStorage)</li>
									<li>• 無限スクロール</li>
									<li>• リアルタイム通知</li>
									<li>• PWA (Progressive Web App)</li>
									<li>• Service Worker</li>
								</ul>
							</div>
							<div>
								<h3 className="font-bold text-pink-700 mb-2">
									🏗️ アーキテクチャ:
								</h3>
								<ul className="text-sm space-y-1 text-pink-600">
									<li>• カスタムフック設計</li>
									<li>• Context API でグローバル状態</li>
									<li>• Next.js Server Actions</li>
									<li>• データベース連携</li>
									<li>• 認証機能実装</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
