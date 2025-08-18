import Image from 'next/image';

export default function Gallery() {
	// 写真データ
	const photos = [
		{
			id: 1,
			src: '/images/s0024_27_0.png',
			alt: 'あんじゅのおきに1',
			title: 'かわいい牛さん',
		},
		{
			id: 2,
			src: '/images/s0030_17_0.png',
			alt: 'あんじゅのおきに1',
			title: 'それは残像だ！！',
		},
		{
			id: 3,
			src: '/images/s0046_20_0.png',
			alt: 'あんじゅのおきに1',
			title: 'ちらっ',
		},
		{
			id: 4,
			src: '/images/s0046_21_0.png',
			alt: 'あんじゅのおきに1',
			title: 'おはようございます！！',
		},
	];

	return (
		<div className="p-8">
			<h1 className="text-4xl font-bold mb-8 text-center animate-fade-in">
				あんじゅのギャラリー 📷
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{photos.map((photo, index) => (
					<div
						key={photo.id}
						className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fade-in"
						style={{ animationDelay: `${index * 0.2}s` }}
					>
						<div className="relative h-64 w-full">
							<Image
								src={photo.src}
								alt={photo.alt}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</div>
						<div className="p-4">
							<h3 className="text-lg font-semibold text-gray-800">
								{photo.title}
							</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
