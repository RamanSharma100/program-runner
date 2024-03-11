import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { exec } from 'node:child_process';
import type { Config, Type, Input } from '../types';
import { PROGRAMMING_LANGUAGES, DEFAULT_CONFIG } from '../constants';

const __dirname = path.resolve(path.dirname(''));

import Getters from './Getters';
import Availability from './Availaiblity';
import { existsSync } from 'node:fs';

class RunLanguage {
	private availability: Availability = Availability.getInstance();
	private command: string = '';

	public constructor(
		private readonly language: 'js' | 'py' | 'java',
		private readonly input: Input,
		private config: Config = DEFAULT_CONFIG
	) {}

	private runCode = async (): Promise<any> => {
		return new Promise((resolve, reject) => {
			try {
				console.log(this.command);
				const command = `${this.command}`;
				exec(command, (error: any, stdout: any, stderr: any) => {
					if (error) {
						reject({
							input: this.input,
							config: this.config,
							result: { message: error, error: true, result: null },
						});
					} else {
						resolve({
							input: this.input,
							config: this.config,
							result: { message: stdout, error: false, result: stdout },
						});
					}
				});
			} catch (e: any) {
				reject({
					input: this.input,
					config: this.config,
					result: { message: e.message || e, error: true, result: null },
				});
			}
		});
	};

	public run = async (): Promise<any> => {
		return new Promise((resolve, reject) => {
			try {
				(async () => {
					const isAvailable = await this.availability.checkAvailability(
						this.language
					);

					if (!isAvailable) {
						return reject({
							input: this.input,
							config: this.config,
							result: {
								message: `${this.language} is not available`,
								error: true,
								result: null,
							},
						});
					} else {
						const fileName = `output_${new Date()
							.toLocaleString()
							.split(' ')
							.join('_')}.${this.language}`.replace(/[\s,:\/]/g, '_');
						this.command =
							this.availability.getCommand(this.language) + ' ' + fileName;
						const code = await Getters.getCode(this.input.value);
						if (!existsSync(path.join(__dirname, `../code_files_data`))) {
							await mkdir(path.join(__dirname, `../code_files_data`));
						}
						await writeFile(
							path.join(__dirname, `../code_files_data/${fileName}`),
							code,
							'utf-8'
						);
						switch (this.language) {
							case PROGRAMMING_LANGUAGES.js:
								this.runCode();

								break;
							case PROGRAMMING_LANGUAGES.py:
								this.runCode();
								break;
							default:
								resolve({
									input: this.input,
									config: this.config,
									result: {
										message: 'This programming language is not available',
										error: true,
										result: null,
									},
								});
								break;
						}
					}
				})();
			} catch (e: any) {
				reject({
					input: this.input,
					config: this.config,
					result: { message: e.message || e, error: true, result: null },
				});
			}
		});
	};
}

export default RunLanguage;
