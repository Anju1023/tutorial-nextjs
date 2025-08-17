'use client';

import { useState } from 'react';

export default function LightApp() {
	const [isOn, setIsOn] = useState<boolean>(false);

	return (
		<div className="p-8 text-center">
			<h1 className="text-4xl mb-8">あんじゅの電気！！</h1>
			{/* ライトの見た目 */}
			<div
				className={`w-32 h-32 rounded-full mx-auto mb-8 ${
					isOn ? 'bg-yellow-400' : 'bg-gray-300'
				}`}
			>
				<div className="flex items-center justify-center h-full text-4xl">
					{isOn ? '💡' : '🌑'}
				</div>
			</div>

			<button
				onClick={() => setIsOn(!isOn)}
				className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-8"
			>
				{isOn ? 'OFF' : 'ON'}
			</button>
		</div>
	);
}
