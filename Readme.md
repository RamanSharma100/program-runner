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

## Features

- Compile and Run programs of any language in Node.js parallelly
- Compile and Run programs from code snippets, files and urls

## Prerequisites for Languages

- Node.js 
- Java 
- Rust
- Dart
- Python

**Note**: The above languages should be installed on the system to run or compile the programs of the respective languages.


## Supported Languages

- Python
- Node.js
- Dart
- Java
- Rust

## Methods

`ProgramRunner.run`
`ProgramCompiler.compile`


### ProgramRunner.run

```typescript
// Input
type Input = {
  type: 'code' | 'file' | 'url';
  language: 'python' | 'node' | 'dart' | 'java' | 'rust';
  value: string;
  commandOptions?: {
		[key: string]: string | null;
	};
};

// CONFIG

type Config = {
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

// Response

type Response = {
  input: Input;
  config: Config;
  result: {
    message: string;
    error: boolean;
    result: string;
  };
};

```

## Usage

```typescript
import ProgramRunner, { ProgramCompiler, type Input } from 'program-runner';

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


```

### Output

```bash
Running the code snippets...
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
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
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
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: 'from example.py\n',
      error: false,
      result: 'from example.py\n'
    }
  },
  {
    input: {
      type: 'code',
      language: 'node',
      value: '\n' +
        "import path from 'node:path';\n" +
        "const __dirname = path.resolve(path.dirname(''));\n" +
        '\n' +
        'console.log("This Node.js code is Running!!");\n' +
        'console.log(__dirname);\n'
    },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: 'This Node.js code is Running!!\n' +
        '/home/ramansharma/Desktop/program-runner/examples\n',
      error: false,
      result: 'This Node.js code is Running!!\n' +
        '/home/ramansharma/Desktop/program-runner/examples\n'
    }
  },
  {
    input: { type: 'file', language: 'node', value: './example.js' },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: 'Hello, world!\n',
      error: false,
      result: 'Hello, world!\n'
    }
  },
  {
    input: {
      type: 'code',
      language: 'dart',
      value: '\n' +
        "import 'dart:io';\n" +
        '\n' +
        'void main() {\n' +
        '  print("This Dart code is Running!!");\n' +
        '  print(Directory.current.path);\n' +
        '}\n'
    },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: 'This Dart code is Running!!\n' +
        '/home/ramansharma/Desktop/program-runner/examples\n',
      error: false,
      result: 'This Dart code is Running!!\n' +
        '/home/ramansharma/Desktop/program-runner/examples\n'
    }
  },
  {
    input: { type: 'file', language: 'dart', value: './example.dart' },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: 'Dart code running from file!\n' +
        'Current directory: /home/ramansharma/Desktop/program-runner/examples\n',
      error: false,
      result: 'Dart code running from file!\n' +
        'Current directory: /home/ramansharma/Desktop/program-runner/examples\n'
    }
  },
  {
    input: {
      type: 'code',
      language: 'java',
      value: '\n' +
        'public class Main {\n' +
        '\tpublic static void main(String[] args) {\n' +
        '\t\tSystem.out.println("This Java code is Running!!");\n' +
        '\t\tSystem.out.println(System.getProperty("user.dir"));\n' +
        '\t}\n' +
        '}\n'
    },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: 'This Java code is Running!!\n' +
        '/home/ramansharma/Desktop/program-runner/examples\n',
      error: false,
      result: 'This Java code is Running!!\n' +
        '/home/ramansharma/Desktop/program-runner/examples\n'
    }
  },
  {
    input: { type: 'file', language: 'java', value: './example.java' },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: 'Hello from example.java file!\n' +
        'Current directory: /home/ramansharma/Desktop/program-runner/examples\n',
      error: false,
      result: 'Hello from example.java file!\n' +
        'Current directory: /home/ramansharma/Desktop/program-runner/examples\n'
    }
  },
  {
    input: {
      type: 'code',
      language: 'rust',
      value: '\n' +
        'fn main() {\n' +
        '\tprintln!("This Rust code is Running!!");\n' +
        '\tprintln!("{:?}", std::env::current_dir());\n' +
        '}\n'
    },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: 'This Rust code is Running!!\n' +
        'Ok("/home/ramansharma/Desktop/program-runner/examples")\n',
      error: false,
      result: 'This Rust code is Running!!\n' +
        'Ok("/home/ramansharma/Desktop/program-runner/examples")\n'
    }
  },
  {
    input: { type: 'file', language: 'rust', value: './example.rs' },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: 'Hello from example.rs file!\n' +
        'Current directory: /home/ramansharma/Desktop/program-runner/examples\n',
      error: false,
      result: 'Hello from example.rs file!\n' +
        'Current directory: /home/ramansharma/Desktop/program-runner/examples\n'
    }
  }
]
Completed running the code snippets!!
--------------------------------------
Compiling the code snippets...
[
  {
    input: {
      type: 'code',
      language: 'java',
      value: '\n' +
        'public class Main {\n' +
        '\tpublic static void main(String[] args) {\n' +
        '\t\tSystem.out.println("This Java code is Running!!");\n' +
        '\t\tSystem.out.println(System.getProperty("user.dir"));\n' +
        '\t}\n' +
        '}\n'
    },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: '/home/ramansharma/Desktop/program-runner/code_files_data/output_24_3_2024__8_12_53_pmb137c015031261dd8ae67ef0b14ca35f.class',
      error: false,
      result: ''
    }
  },
  {
    input: { type: 'file', language: 'java', value: './example.java' },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: '/home/ramansharma/Desktop/program-runner/code_files_data/output_24_3_2024__8_12_53_pmaebc8f96ad6fa4c424d407884efe711d.class',
      error: false,
      result: ''
    }
  },
  {
    input: {
      type: 'code',
      language: 'rust',
      value: '\n' +
        'fn main() {\n' +
        '\tprintln!("This Rust code is Running!!");\n' +
        '\tprintln!("{:?}", std::env::current_dir());\n' +
        '}\n'
    },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: '/home/ramansharma/Desktop/program-runner/code_files_data/output_24_3_2024__8_12_53_pme417b4a6ae02a75aec4696699b7d3a6b',
      error: false,
      result: ''
    }
  },
  {
    input: { type: 'file', language: 'rust', value: './example.rs' },
    config: {
      node: [Object],
      python: [Object],
      dart: [Object],
      javaPath: [Object],
      rust: [Object]
    },
    result: {
      message: '/home/ramansharma/Desktop/program-runner/code_files_data/output_24_3_2024__8_12_53_pm9262ee53525b5dde8220375751015543',
      error: false,
      result: ''
    }
  }
]
Completed compiling the code snippets!!
Thank You!

```

## Changelog

- 0.1.0 - Initial Release

## Roadmap

- Make options and configurations available in the input
- Make Arguments available in the input
- Add more languages
- Add more features
- Make CLI
- Make cloud support available


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


# Enjoy Program Runner!
