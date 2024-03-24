export type Type = 'code' | 'file' | 'url';

export type RunType = 'parallel' | 'sequential';

export type Config = {
	node: {
		venvPath?: string | null;
		default?: boolean;
		path?: string | null;
	};
	javaPath: {
		venvPath?: string | null;
		default?: boolean;
		path?: string;
	};
	python: {
		venvPath?: string | null;
		default?: boolean;
		path?: string | null;
	};
	dart: {
		venvPath?: string | null;
		default?: boolean;
		path?: string | null;
	};
	rust: {
		venvPath?: string | null;
		default?: boolean;
		path?: string | null;
	};
};

export type Input = {
	type: Type;
	value: string;
	language: 'node' | 'python' | 'java' | 'dart' | 'rust';
	commandOptions?: {
		[key: string]: string | null;
	};
};
