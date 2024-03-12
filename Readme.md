# Program Runner

A Library to run programs of any language in js (Node.js)

## Installation

RELEASING SOON (Currently in development)

Below will be the installation instructions for the library once it is released.

### NPM

```bash
npm install program-runner
```

### Yarn

```bash
yarn add program-runner

```

### PNPM

```bash
pnpm add program-runner
```

## Usage

```typescript
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
	{
		type: 'file',
		language: 'python',
		value: './example.py',
	},
];

const response = await ProgramRunner.run(Inputs);

console.log(response);

```

### Output

```json
[
  {
    input: {
      type: 'code',
      language: 'python',
      value: '\n' +
        'import os\n' +
        '\n' +
        'print("This Python code is Running!!")\n' +
        "print(f'Current Working Directory: {os.getcwd()}')\n" +
        '\n'
    },
    config: { node: [Object], python: [Object] },
    result: {
      message: 'This Python code is Running!!\n' +
        'Current Working Directory: /home/ramansharma/Desktop/program-runner/examples\n',
      error: false,
      result: 'This Python code is Running!!\n' +
        'Current Working Directory: /home/ramansharma/Desktop/program-runner/examples\n'
    }
  },
  {
    input: { type: 'file', language: 'python', value: './example.py' },
    config: { node: [Object], python: [Object] },
    result: {
      message: 'from example.py\n',
      error: false,
      result: 'from example.py\n'
    }
  }
]
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Raman Sharma](https://github.com/ramansharma100)


## Support

If you like the library, consider supporting the developer by starring the repository.

## Note

This library is currently in development and is not yet released. The above code is just an example of how the library will work once it is released.

## Release Date

The library will be released on 29 April 2024.


# Enjoy Program Runner!
