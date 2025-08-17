'use client';

import LightApp from '@/components/LightApp';
import NameApp from '@/components/NameApp';
import { useState } from 'react';

export default function Home() {
	return (
		<div>
			<LightApp />
			<NameApp />
		</div>
	);
}
