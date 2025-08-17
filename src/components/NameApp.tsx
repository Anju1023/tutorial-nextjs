'use client';

import { useState } from 'react';

export default function NameApp() {
	const [name, setName] = useState<string>('');

	return (
		<div className="p-8">
			<h1 className="text-4xl mb-8">お名前教えて🫶</h1>

			<input
				type="text"
				value={name}
				placeholder="お名前を入力してねえ"
				onChange={(e) => setName(e.target.value)}
				className="border p-3 rounded mb-4 w-full"
			/>

			<div className="text-2xl">
				{name
					? `こんにちは！${name}ちゃん！！`
					: 'まだ入力されてないよおおおお；；'}
			</div>
		</div>
	);
}
