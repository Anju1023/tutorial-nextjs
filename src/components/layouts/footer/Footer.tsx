export default function Footer() {
	return (
		<footer className="bg-gray-800 text-white mt-auto">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* 左側 */}
					<div>
						<h3 className="text-lg font-bold mb-4 text-pink-300">
							あんじゅのサイト
						</h3>
						<p className="text-gray-300">Next.jsを勉強中〜</p>
					</div>

					{/* 中央 */}
					<div>
						<h3 className="text-lg font-bold mb-4 text-pink-300">リンク</h3>
						<ul className="space-y-2 text-gray-300">
							<li>
								<a href="/" className="hover:text-pink-300">
									ホーム
								</a>
							</li>
							<li>
								<a href="/about" className="hover:text-pink-300">
									About
								</a>
							</li>
							<li>
								<a href="/profile" className="hover:text-pink-300">
									Profile
								</a>
							</li>
							<li>
								<a href="/api" className="hover:text-pink-300">
									API
								</a>
							</li>
						</ul>
					</div>

					{/* 右側 */}
					<div>
						<h3 className="text-lg font-bold mb-4 text-pink-300">SNS</h3>
						<div className="flex space-x-4">
							<span className="text-2xl cursor-pointer hover:text-pink-300">
								📱
							</span>
							<span className="text-2xl cursor-pointer hover:text-pink-300">
								💻
							</span>
							<span className="text-2xl cursor-pointer hover:text-pink-300">
								✨
							</span>
						</div>
					</div>
				</div>

				{/* コピーライト */}
				<div className="border-t border-gray-600 mt-8 pt-4 text-center text-gray-400">
					<p>&copy; 2025 あんじゅのサイト. All rights reserved</p>
				</div>
			</div>
		</footer>
	);
}
