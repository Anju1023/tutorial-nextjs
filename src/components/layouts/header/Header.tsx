// src/components/layouts/header/Header.tsx
import Link from 'next/link';

export default function Header() {
	return (
		<header className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 shadow-lg">
			<div className="container mx-auto flex justify-between items-center">
				<Link
					href="/"
					className="text-2xl font-bold hover:text-pink-200 hover:scale-110 transition-all duration-300"
				>
					あんじゅのサイト♡
				</Link>

				<nav className="space-x-6">
					<Link
						href="/"
						className="hover:text-pink-200 hover:scale-105 transition-all duration-200 hover:drop-shadow-lg"
					>
						ホーム
					</Link>
					<Link
						href="/about"
						className="hover:text-pink-200 hover:scale-105 transition-all duration-200 hover:drop-shadow-lg"
					>
						About
					</Link>
					<Link
						href="/profile"
						className="hover:text-pink-200 hover:scale-105 transition-all duration-200 hover:drop-shadow-lg"
					>
						Profile
					</Link>
				</nav>
			</div>
		</header>
	);
}
