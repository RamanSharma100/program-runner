import { type Type } from '../types';

class DetectCodeType {
	public static detect = (value: string): Type => {
		const code = value.trim();

		if (code.startsWith('http') || code.startsWith('https')) {
			return 'url';
		} else if (/^(\.{0,2}[\\/])|([a-zA-Z]:[\\/])/.test(value)) {
			return 'file';
		} else {
			return 'code';
		}
	};
}

export default DetectCodeType;
