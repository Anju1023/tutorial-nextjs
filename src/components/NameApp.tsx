'use client';

import { useState } from 'react';

export default function NameApp() {
	const [name, setName] = useState<string>('');

	return (
		<div className="p-8">
			<h1>お名前教えて🫶</h1>

			<input
				type="text"
				value={name}
				placeholder="お名前を入力してねえ"
				onChange={(e) => setName(e.target.value)}
			/>

			<div>
				{name
					? `こんにちは！${name}ちゃん！！`
					: 'まだ入力されてないよおおおお；；'}
			</div>
		</div>
	);
}
