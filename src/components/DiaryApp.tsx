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
		<div>
			<h1>今日の気分日記📓</h1>
			<div>
				<label htmlFor="feeling-select">今日の気分</label>
				<select
					id="feeling-select"
					value={inputFeeling}
					onChange={(e) => setInputFeeling(e.target.value)}
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
					value={inputComment}
					onChange={(e) => setInputComment(e.target.value)}
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
				>
					記録する
				</button>
			</div>

			{error && <p className="text-red-500">{error}</p>}

			<ul>
				{diaries.map((diary, index) => (
					<li
						key={index}
						onClick={() => setDiaries(diaries.filter((_, i) => i !== index))}
					>
						{diary.feeling} {diary.comment} ❌
					</li>
				))}
			</ul>
			<button onClick={() => setDiaries([])}>全部消去</button>
		</div>
	);
}
