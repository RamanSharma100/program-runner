import { DEFAULT_CONFIG } from '../constants';
import type { Config, Input } from '../types';

import RunLanguage from './RunLanguage';

class ProgramRunner {
	public static run = async (
		inputs: Input[],
		config: Config = DEFAULT_CONFIG
	): Promise<any> => {
		return ProgramRunner.runProgram(inputs, config);
	};

	private static runProgram = async (
		inputs: Input[],
		config: Config
	): Promise<any> => {
		const results = inputs.map((input: Input) => {
			const runLanguage = new RunLanguage(
				input.language === 'python'
					? 'py'
					: input.language === 'node'
					? 'js'
					: 'java',
				input,
				config
			);
			return runLanguage.run();
		});

		return Promise.all(results);
	};
}

export default ProgramRunner;
