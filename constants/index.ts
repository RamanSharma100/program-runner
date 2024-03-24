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
	javaPath: {
		default: false,
		path: 'java',
		venvPath: null,
	},
	rust: {
		default: false,
		path: 'rustc',
		venvPath: null,
	},
};

export enum PROGRAMMING_LANGUAGES {
	js = 'js',
	py = 'py',
	dart = 'dart',
	java = 'java',
	rust = 'rust',
}

export const ROOT = path.resolve(path.dirname(''));
