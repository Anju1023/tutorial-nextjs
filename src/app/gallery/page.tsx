// 新しいページでも作ってみる？
// app/gallery/page.tsx
export default function Gallery() {
	return (
		<div className="p-8">
			<h1 className="text-4xl font-bold mb-8 animate-fade-in">ギャラリー🎨</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{['🌸', '🌺', '🌻', '🌷', '🌹', '💐'].map((flower, index) => (
					<div
						key={index}
						className="bg-white p-6 rounded-lg shadow-lg text-center text-6xl
                       hover:scale-110 hover:-translate-y-2 hover:rotate-6
                       transition-all duration-300 cursor-pointer
                       hover:shadow-2xl hover:bg-pink-50"
						style={{
							animationDelay: `${index * 0.1}s`, // 順番に表示♡
						}}
					>
						{flower}
					</div>
				))}
			</div>
		</div>
	);
}
