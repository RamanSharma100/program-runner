import RunLanguage from './RunLanguage';

import { DEFAULT_CONFIG } from '../constants';
import type { Config, Input } from '../types';

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
			try {
				return runLanguage.run();
			} catch (e: any) {
				return {
					input: input,
					config: config,
					result: { message: e.message || e, error: true, result: null },
				};
			}
		});

		const response = await Promise.all(results);

		return response;
	};
}

export default ProgramRunner;
