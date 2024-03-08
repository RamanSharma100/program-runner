import type { Config, Type, Input } from '../types';
import { PROGRAMMING_LANGUAGES, DEFAULT_CONFIG } from '../constants';

class RunLanguage {
	public constructor(
		private readonly language: 'js' | 'py' | 'java',
		private readonly input: Input,
		private config: Config = DEFAULT_CONFIG
	) {}

	public run = async (input: Input, config: Config) => {
		console.log('Running program...');
	};
}

export default RunLanguage;
