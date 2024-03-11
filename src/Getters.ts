import type { Type } from '../types';

import { readFileSync, writeFileSync } from 'fs';
import DetectCodeType from './DetectCodeType';

class Getters {
	public static getCode = async (value: string): Promise<string> => {
		const codeType: Type = DetectCodeType.detect(value);

		try {
			if (codeType === 'file') {
				return readFileSync(value, 'utf-8');
			} else if (codeType === 'url') {
				const file = await fetch(value).then(response => response.text());
				return file;
			} else {
				return value;
			}
		} catch (e: any) {
			throw new Error(e.message || e);
		}
	};
}

export default Getters;
