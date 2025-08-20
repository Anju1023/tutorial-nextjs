import Step3Loading from '@/components/api/Step3Loading';
import Step4ErrorHandling from '@/components/api/Step4ErrorHandling'; // 新しく追加！
import Step1SimpleAPI from '../../components/api/Step1SimpleAPI';
import Step2RealAPI from '../../components/api/Step2RealAPI';
import Step4MultiAPIpractice from '@/components/api/Step4MultiAPIpractice';
import Step5UseEffectPractice from '@/components/api/Step5UseEffectPractice';

export default function APIApp() {
	return (
		<div className="p-8">
			<h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
				🚀 あんじゅのAPI学習ページ 🚀
			</h1>

			{/* 学習ステップの概要 */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
				<div className="bg-green-100 p-4 rounded-lg text-center">
					<div className="text-2xl mb-2">🎯</div>
					<h3 className="font-bold text-green-800">ステップ1</h3>
					<p className="text-sm text-green-700">シンプルAPI体験</p>
				</div>
				<div className="bg-blue-100 p-4 rounded-lg text-center">
					<div className="text-2xl mb-2">🌐</div>
					<h3 className="font-bold text-blue-800">ステップ2</h3>
					<p className="text-sm text-blue-700">本物のAPI呼び出し</p>
				</div>
				<div className="bg-yellow-100 p-4 rounded-lg text-center">
					<div className="text-2xl mb-2">⏰</div>
					<h3 className="font-bold text-yellow-800">ステップ3</h3>
					<p className="text-sm text-yellow-700">ローディング管理</p>
				</div>
				<div className="bg-red-100 p-4 rounded-lg text-center">
					<div className="text-2xl mb-2">🛡️</div>
					<h3 className="font-bold text-red-800">ステップ4</h3>
					<p className="text-sm text-red-700">エラーハンドリング</p>
				</div>
			</div>

			{/* 各ステップ */}
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
			</div>

			{/* 学習の進歩表示 */}
			<div className="mt-12 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
				<h2 className="text-2xl font-bold mb-4 text-center text-purple-800">
					🎉 あんじゅの成長記録 🎉
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h3 className="font-bold text-purple-700 mb-2">
							✅ マスターしたこと:
						</h3>
						<ul className="text-sm space-y-1 text-purple-600">
							<li>• useState でシンプルな状態管理</li>
							<li>• fetch() で API呼び出し</li>
							<li>• async/await で非同期処理</li>
							<li>• ローディング状態の管理</li>
							<li>• エラーハンドリング ← NEW!</li>
							<li>• 条件分岐での表示制御</li>
							<li>• CSS アニメーション</li>
						</ul>
					</div>
					<div>
						<h3 className="font-bold text-pink-700 mb-2">🚀 次のステップ:</h3>
						<ul className="text-sm space-y-1 text-pink-600">
							<li>• useEffect でページ読み込み時の処理</li>
							<li>• 複数APIの同時呼び出し</li>
							<li>• カスタムフックで共通処理</li>
							<li>• TypeScript型安全性の向上</li>
							<li>• データのキャッシュ機能</li>
							<li>• 無限スクロール機能</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
