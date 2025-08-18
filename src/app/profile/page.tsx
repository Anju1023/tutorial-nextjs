export default function Profile() {
	return (
		<div className="p-8 bg-pink-50 min-h-screen">
			<h1 className="text-4xl font-bold text-pink-600 mb-6">
				あんじゅのプロフィール
			</h1>

			<div className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-2xl mb-4">好きなもの</h2>
				<ul className="space-y-2">
					<li>🍎 りんご</li>
					<li>🍰 ケーキ</li>
					<li>💻 プログラミング</li>
				</ul>
			</div>
		</div>
	);
}
