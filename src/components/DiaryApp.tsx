'use client';

import { useState } from 'react';

export default function DiaryApp() {
	type Diary = {
		feeling: string;
		comment: string;
		id: number;
	};

	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [inputComment, setInputComment] = useState<string>('');
	const [inputFeeling, setInputFeeling] = useState<string>('');
	const [error, setError] = useState<string>('');

	return (
		<div className="p-8">
			<h1 className="text-4xl mb-4">今日の気分日記📓</h1>

			{/* エラーメッセージ */}
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<div className="mb-4">
				<label htmlFor="feeling-select" className="block mb-2">
					今日の気分
				</label>
				<select
					id="feeling-select"
					value={inputFeeling}
					onChange={(e) => setInputFeeling(e.target.value)}
					className="border p-2 rounded mr-2"
				>
					<option value="">選んで〜！！</option>
					<option value="😭">😭</option>
					<option value="😞">😞</option>
					<option value="😐">😐</option>
					<option value="😊">😊</option>
					<option value="😍">😍</option>
				</select>
				<input
					type="text"
					placeholder="今日あったことを書いて〜〜"
					value={inputComment}
					onChange={(e) => setInputComment(e.target.value)}
					className="border p-2 rounded mr-2"
				/>
				<button
					onClick={() => {
						if (!inputFeeling || !inputComment.trim()) {
							setError('気分とコメント両方入力してね〜');
							return;
						}
						setError('');
						setDiaries([
							...diaries,
							{
								feeling: inputFeeling,
								comment: inputComment,
								id: Date.now(),
							},
						]);
						setInputComment('');
						setInputFeeling('');
					}}
					className="bg-pink-500 text-white px-4 py-2 rounded"
				>
					記録する
				</button>
			</div>

			<ul className="space-y-2">
				{diaries.map((diary, index) => (
					<li
						key={diary.id}
						onClick={() => setDiaries(diaries.filter((d) => d.id !== diary.id))}
						className="bg-gray-100 p-3 rounded cursor-pointer hover:bg-red-200"
					>
						{diary.feeling} {diary.comment} ❌
					</li>
				))}
			</ul>
			<button onClick={() => setDiaries([])}>全部消去</button>
		</div>
	);
}
