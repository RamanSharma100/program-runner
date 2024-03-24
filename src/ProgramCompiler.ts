import RunLanguage from './RunLanguage';

import { DEFAULT_CONFIG } from '../constants';
import type { Config, Input } from '../types';

class ProgramCompiler {
	public static compile = async (
		inputs: Input[],
		config: Config = DEFAULT_CONFIG
	): Promise<any> => {
		return ProgramCompiler.compileProgram(inputs, config);
	};

	private static compileProgram = async (
		inputs: Input[],
		config: Config
	): Promise<any> => {
		const results = inputs.map(async (input: Input) => {
			const runLanguage = new RunLanguage(
				input.language === 'python'
					? 'py'
					: input.language === 'node'
					? 'js'
					: input.language === 'dart'
					? 'dart'
					: input.language === 'java'
					? 'java'
					: 'rust',
				input,
				config,
				true
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

export default ProgramCompiler;
