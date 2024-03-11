import { type Type } from '../types';

class DetectCodeType {
	public static detect = (value: string): Type => {
		const code = value.trim();

		if (code.startsWith('http') || code.startsWith('https')) {
			return 'url';
		} else if (
			code.includes('.py') ||
			code.includes('.js') ||
			code.includes('.java')
		) {
			return 'file';
		} else {
			return 'code';
		}
	};
}

export default DetectCodeType;
