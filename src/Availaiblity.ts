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

	public checkAvailability = async (language: string): Promise<any> => {
		const osType = os.type();
		switch (language) {
			case PROGRAMMING_LANGUAGES.js:
				return this.checkJsAvailability(
					osType === 'Windows_NT' ? 'node' : 'node'
				);
			case PROGRAMMING_LANGUAGES.py:
				return this.checkPyAvailability(
					osType === 'Windows_NT' ? 'python' : 'python3'
				);
			default:
				return false;
		}
	};

	private checkJsAvailability = async (command: string): Promise<boolean> => {
		return new Promise(resolve => {
			exec(`${command} -v`, error => {
				if (error) {
					resolve(false);
				}
				resolve(true);
			});
		});
	};

	private checkPyAvailability = async (command: string): Promise<boolean> => {
		return new Promise(resolve => {
			exec(`${command} -V`, error => {
				if (error) {
					resolve(false);
				}
				resolve(true);
			});
		});
	};
}

export default Availability;
