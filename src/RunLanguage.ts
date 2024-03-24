import os from 'node:os';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { exec } from 'node:child_process';
import { writeFile, mkdir, unlink } from 'node:fs/promises';

import { generateUniqueId } from './utils';
import type { Config, Input } from '../types';
import { PROGRAMMING_LANGUAGES, DEFAULT_CONFIG } from '../constants';

const __dirname = path.resolve(path.dirname(''));

import Getters from './Getters';
import Availability from './Availaiblity';

const NEED_COMPILATION_LANGUAGES = [PROGRAMMING_LANGUAGES.rust];
const COMPLIED_PROGRAMMING_LANGUAGES = [
	PROGRAMMING_LANGUAGES.java,
	PROGRAMMING_LANGUAGES.rust,
];

class RunLanguage {
	private availability: Availability = Availability.getInstance();
	private command: string = '';
	private fileName: string = '';

	public constructor(
		private readonly language: 'js' | 'py' | 'java' | 'dart' | 'rust',
		private readonly input: Input,
		private config: Config = DEFAULT_CONFIG,
		private readonly isCompile: boolean = false
	) {}

	private compile = async (): Promise<any> => {
		return new Promise((resolve, reject) => {
			if (!COMPLIED_PROGRAMMING_LANGUAGES.includes(this.language as any)) {
				return resolve({
					input: this.input,
					config: this.config,
					result: {
						message: 'This language does not need compilation',
						error: true,
						result: null,
					},
				});
			}
			try {
				const command = `${this.command}`;
				exec(command, async (error: any, stdout: any, stderr: any) => {
					await unlink(
						path.join(__dirname, `../code_files_data/${this.fileName}`)
					);
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
							result: {
								message: stdout
									? stdout
									: path.join(
											__dirname,
											`../code_files_data/${
												this.language === 'java'
													? this.fileName.replace('.java', '.class')
													: this.fileName.replace('.rs', '')
											}`
									  ),

								error: false,
								result: stdout,
							},
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

	public checkCompile = async (): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			if (!COMPLIED_PROGRAMMING_LANGUAGES.includes(this.language as any)) {
				reject(false);
			} else {
				resolve(true);
			}
		});
	};

	private runCode = async (fileName?: string): Promise<any> => {
		return new Promise((resolve, reject) => {
			try {
				const command = fileName ? fileName : `${this.command}`;
				exec(command, async (error: any, stdout: any, stderr: any) => {
					await unlink(fileName ? fileName : `${this.command.split(' ')[1]}`);
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

	private getCompileCommand = (language: string, fileName: string): string => {
		switch (language) {
			case PROGRAMMING_LANGUAGES.rust:
				return (
					this.availability.getCommand(this.language) +
					' ' +
					path.join(__dirname, `../code_files_data/${fileName}`) +
					' -o ' +
					path.join(
						__dirname,
						`../code_files_data/${fileName.replace('./', '').split('.')[0]}`
					)
				);
			case PROGRAMMING_LANGUAGES.java:
				return (
					'javac ' +
					path.join(__dirname, `../code_files_data/${fileName}`) +
					' -d ' +
					path.join(__dirname, `../code_files_data/`)
				);

			default:
				return '';
		}
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
						const fileName = `output_${
							new Date().toLocaleString().split(' ').join('_') +
							generateUniqueId()
						}.${this.language === 'rust' ? 'rs' : this.language}`.replace(
							/[\s,:\/]/g,
							'_'
						);

						if (this.isCompile) {
							this.command = this.getCompileCommand(this.language, fileName);
						} else if (
							NEED_COMPILATION_LANGUAGES.includes(this.language as any)
						) {
							this.command = this.getCompileCommand(this.language, fileName);
						} else {
							this.command =
								this.availability.getCommand(this.language) +
								' ' +
								path.join(__dirname, `../code_files_data/${fileName}`);
						}
						let code = await Getters.getCode(this.input.value);
						if (!existsSync(path.join(__dirname, `../code_files_data`))) {
							await mkdir(path.join(__dirname, `../code_files_data`));
						}
						if (
							PROGRAMMING_LANGUAGES.java === this.language &&
							this.isCompile
						) {
							if (this.input.type === 'file') {
								code = code.replace(
									'public class ' +
										this.input.value.replace('./', '').replace('.java', ''),
									'class ' + fileName.replace('.java', '')
								);
							} else {
								const index = code.indexOf('class');
								const className = code.slice(
									index + 5,
									code.indexOf('{', index)
								);
								code = code
									.replace(
										'public class ' + className,
										'class ' + fileName.replace('.java', '')
									)
									.replace(className, ' ' + fileName.replace('.java', ''));
							}
						}

						this.fileName = fileName;
						await writeFile(
							path.join(__dirname, `../code_files_data/${fileName}`),
							code,
							'utf-8'
						);
						switch (this.language) {
							case PROGRAMMING_LANGUAGES.js:
								if (this.isCompile) {
									resolve({
										input: this.input,
										config: this.config,
										result: {
											message: 'This language does not need compilation',
											error: true,
											result: null,
										},
									});
								} else {
									resolve(this.runCode());
								}
								break;
							case PROGRAMMING_LANGUAGES.py:
								if (this.isCompile) {
									resolve({
										input: this.input,
										config: this.config,
										result: {
											message: 'This language does not need compilation',
											error: true,
											result: null,
										},
									});
								} else {
									resolve(this.runCode());
								}

								break;
							case PROGRAMMING_LANGUAGES.dart:
								if (this.isCompile) {
									resolve({
										input: this.input,
										config: this.config,
										result: {
											message: 'This language does not need compilation',
											error: true,
											result: null,
										},
									});
								} else {
									resolve(this.runCode());
								}
								break;
							case PROGRAMMING_LANGUAGES.java:
								if (this.isCompile) {
									resolve(this.compile());
								} else {
									resolve(this.runCode());
								}
								break;
							case PROGRAMMING_LANGUAGES.rust:
								try {
									const compileResult = await this.compile();
									if (compileResult.error) {
										reject({
											input: this.input,
											config: this.config,
											result: compileResult.result,
										});
									} else {
										if (this.isCompile) {
											resolve(compileResult);
										} else {
											resolve(this.runCode(this.command.split(' ')[3]));
										}
									}

									break;
								} catch (e: any) {
									reject({
										input: this.input,
										config: this.config,
										result: {
											message: e.message || e,
											error: true,
											result: null,
										},
									});
									break;
								}
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
