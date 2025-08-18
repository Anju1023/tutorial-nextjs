'use client';

import { useState } from 'react';

export default function ItemListApp() {
	const [items, setItems] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState<string>('');

	return (
		<div className="p-8">
			<h1 className="text-4xl mb-4">買うものを入れてね</h1>

			<div className="mb-4">
				<input
					type="text"
					placeholder="入力してね"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className="border p-2 rounded mr-2"
				/>
				<button
					onClick={() => {
						setItems([...items, inputValue]);
						setInputValue('');
					}}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					追加
				</button>
			</div>

			<ul className="mb-4">
				{items.map((item, index) => (
					<li
						key={index}
						onClick={() => setItems(items.filter((_, i) => i !== index))}
						className="bg-gray-100 p-2 mb-2 rounded cursor-pointer hover:bg-red-200"
					>
						{item} ❌
					</li>
				))}
			</ul>
			<button
				onClick={() => setItems([])}
				className="bg-red-500 text-white px-4 py-2 rounded"
			>
				全部クリア
			</button>
		</div>
	);
}
