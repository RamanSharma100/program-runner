import type { Type } from '../types';

import { readFileSync } from 'fs';
import DetectCodeType from './DetectCodeType';

class Getters {
	public static getCode = async (value: string): Promise<string> => {
		const codeType: Type = DetectCodeType.detect(value);
		try {
			if (codeType === 'file') {
				try {
					return readFileSync(value, 'utf-8');
				} catch (e) {
					return '';
				}
			} else if (codeType === 'url') {
				try {
					const file = await fetch(value).then(response => response.text());
					return file;
				} catch (e) {
					return '';
				}
			} else {
				return value;
			}
		} catch (e: any) {
			throw new Error(e.message || e);
		}
	};
}

export default Getters;
