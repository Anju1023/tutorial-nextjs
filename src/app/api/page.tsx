import Step3Loading from '@/components/api/Step3Loading';
import Step1SimpleAPI from '../../components/api/Step1SimpleAPI';
import Step2RealAPI from '../../components/api/Step2RealAPI';

export default function APIApp() {
	return (
		<div className="p-8">
			<Step1SimpleAPI />
			<Step2RealAPI />
			<Step3Loading />
		</div>
	);
}
