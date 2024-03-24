import path from 'node:path';

export const DEFAULT_CONFIG = {
	node: {
		default: true,
		path: 'node',
		venvPath: null,
	},
	python: {
		default: true,
		path: 'python',
		venPath: null,
	},
	dart: {
		default: false,
		path: 'dart',
		venvPath: null,
	},
};

export enum PROGRAMMING_LANGUAGES {
	js = 'js',
	py = 'py',
	dart = 'dart',
}

export const ROOT = path.resolve(path.dirname(''));
