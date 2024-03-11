import ProgramRunner, { type Input } from '../src/index';

const pythonCode: string = `

    import os

    print("This Python code is Running!!")
    print(f'Current Working Directory: {os.getcwd()}')

`;

const Inputs: Input[] = [
	{
		type: 'code',
		language: 'python',
		value: pythonCode,
	},
];

const response = await ProgramRunner.run(Inputs);

console.log(response);
