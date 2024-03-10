import type { Config, Type, Input } from '../types';
import { PROGRAMMING_LANGUAGES, DEFAULT_CONFIG } from '../constants';

import Availability from './Availaiblity';

class RunLanguage {
	private availability: Availability = Availability.getInstance();

	public constructor(
		private readonly language: 'js' | 'py' | 'java',
		private readonly input: Input,
		private config: Config = DEFAULT_CONFIG
	) {}

	public run = async () => {
		console.log('Running program...');

		const isAvailable = await this.availability.checkAvailability(
			this.language
		);

		if (!isAvailable) {
			return Promise.reject({
				message: `${this.language} is not available`,
			});
		} else {
			console.log('input', this.input, this.config);
		}
	};
}

export default RunLanguage;
