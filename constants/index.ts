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
};

export enum PROGRAMMING_LANGUAGES {
	js = 'js',
	py = 'py',
}

export const ROOT = path.resolve(path.dirname(''));
