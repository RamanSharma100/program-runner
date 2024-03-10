import { DEFAULT_CONFIG } from '../constants';
import type { Config, Input } from '../types';

import RunLanguage from './RunLanguage';

class ProgramRunner {
	public static run = (inputs: Input[], config: Config = DEFAULT_CONFIG) => {
		ProgramRunner.runProgram(inputs, config);
	};

	private static runProgram = (inputs: Input[], config: Config) => {
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
