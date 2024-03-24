import { exec } from 'node:child_process';

import os from 'os';

import { PROGRAMMING_LANGUAGES } from '../constants';

class Availability {
	private static instance: Availability;

	public static getInstance = () => {
		if (!Availability.instance) {
			Availability.instance = new Availability();
		}
		return Availability.instance;
	};

	public getCommand = (language: string): string => {
		switch (language) {
			case PROGRAMMING_LANGUAGES.js:
				return 'node';
			case PROGRAMMING_LANGUAGES.py:
				return os.type() === 'Windows_NT' ? 'python' : 'python3';
			case PROGRAMMING_LANGUAGES.dart:
				return 'dart';
			case PROGRAMMING_LANGUAGES.java:
				return 'java';
			case PROGRAMMING_LANGUAGES.rust:
				return 'rustc';
			default:
				return '';
		}
	};

	public checkAvailability = async (language: string): Promise<any> => {
		const osType = os.type();
		switch (language) {
			case PROGRAMMING_LANGUAGES.js:
				return this.checkVersion('node');
			case PROGRAMMING_LANGUAGES.py:
				return this.checkVersion(
					osType === 'Windows_NT' ? 'python' : 'python3'
				);
			case PROGRAMMING_LANGUAGES.dart:
				return this.checkVersion('dart');
			case PROGRAMMING_LANGUAGES.java:
				return this.checkVersion('java');
			case PROGRAMMING_LANGUAGES.rust:
				return this.checkVersion('rustc');
			default:
				return false;
		}
	};

	private checkVersion = async (language: string): Promise<boolean> => {
		return new Promise(resolve => {
			exec(`${language} --version`, error => {
				if (error) {
					resolve(false);
				}
				resolve(true);
			});
		});
	};
}

export default Availability;
