import ProgramRunner, { ProgramCompiler, type Input } from '../src';

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

const dartCode: string = `
import 'dart:io';

void main() {
  print("This Dart code is Running!!");
  print(Directory.current.path);
}
`;

const javaCode: string = `
public class Main {
	public static void main(String[] args) {
		System.out.println("This Java code is Running!!");
		System.out.println(System.getProperty("user.dir"));
	}
}
`;

const rustCode: string = `
fn main() {
	println!("This Rust code is Running!!");
	println!("{:?}", std::env::current_dir());
}
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
	{
		type: 'code',
		language: 'dart',
		value: dartCode,
	},
	{
		type: 'file',
		language: 'dart',
		value: './example.dart',
	},
	{
		type: 'code',
		language: 'java',
		value: javaCode,
	},
	{
		type: 'file',
		language: 'java',
		value: './example.java',
	},
	{
		type: 'code',
		language: 'rust',
		value: rustCode,
	},
	{
		type: 'file',
		language: 'rust',
		value: './example.rs',
	},
];

console.log('Running the code snippets...');

const response = await ProgramRunner.run(Inputs);

console.log(response);

console.log('Completed running the code snippets!!');

console.log('--------------------------------------');

console.log('Compiling the code snippets...');

const compileResponse = await ProgramCompiler.compile(
	Inputs.filter(input => input.language === 'java' || input.language === 'rust')
);

console.log(compileResponse);

console.log('Completed compiling the code snippets!!');

console.log('Thank You!');
