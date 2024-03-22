import ProgramRunner, { type Input } from '../src';

const pythonCode: string = `
import os

print("This Python code is Running!!")
print(f'Current Working Directory: {os.getcwd()}')

`;

const jsCode: string = `
import path from 'node:path';
const __dirname = path.resolve(path.dirname(''));

console.log("This Node.js code is Running!!");
console.log(__dirname);
`;

const Inputs: Input[] = [
	{
		type: 'code',
		language: 'python',
		value: pythonCode,
	},
	{
		type: 'file',
		language: 'python',
		value: './example.py',
	},
	{
		type: 'code',
		language: 'node',
		value: jsCode,
	},
	{
		type: 'file',
		language: 'node',
		value: './example.js',
	},
];

const response = await ProgramRunner.run(Inputs);

console.log(response);
