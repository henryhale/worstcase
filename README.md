<div align=center>
<img width="40" src="https://github.com/henryhale/worstcase/raw/master/public/logo.svg" />
<h1>worstcase</h1>
<p>Automatically analyze time and space complexity of JavaScript code without relying on pattern matching</p>
<img alt="npm" src="https://img.shields.io/npm/v/worstcase">
<img alt="GitHub" src="https://img.shields.io/github/license/henryhale/worstcase">
</div>

## Overview

Ever wondered if your JavaScript code is secretly harboring a performance monster? You know that feeling when you write a seemingly innocent nested loop and later discover it's grinding your application to a halt with a million users.

This project attempts to solve that problem by automatically analyzing your JavaScript code and computing approximate Big O complexity for both time and space through static code analysis.

## Motivation

The motivation is simple yet ambitious: to bring algorithmic analysis directly into the development workflow. Instead of manually reasoning through loops and recursive calls, or waiting for performance issues to surface in production, this analyzer examines your code structure and provides instant complexity estimates. It's like having a computer science professor looking over your shoulder, but one who never gets tired and works at the speed of light.

## Features

- **Automated Complexity Analysis**: Computes Big O notation for time and space complexity
- **Block-level Analysis**: Granular complexity computation for each code block
- **AST-Based Parsing**: Uses Acorn parser for accurate JavaScript code parsing
- **No Pattern Matching**: Pure algorithmic analysis without relying on pre-known patterns
- **Conservative Estimates**: Provides reasonable defaults for unknown code
- **Built-in Method Knowledge**: Knows complexity of basic Array/Object methods

## Quick Start

### Installation

```bash
npm install acorn worstcase
```

### Basic Usage

```js
import { analyzeComplexity } from "worstcase";

const code = `
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
`;

const analysis = analyzeComplexity(code);
console.log(analysis.overall.time); // O(n^2)
console.log(analysis.overall.space); // O(1)
```

## API Reference

### `analyzeComplexity(code)`

Analyzes JavaScript code and returns complexity information.

**Parameters:**

- `code` (string): JavaScript source code to analyze

**Returns:**

```js
{
    overall: {
        time: string,           // overall time complexity
        space: string           // overall space complexity
    },
    results: [                  // per-block analysis results
        {
            type: string,       // AST node type
            node: acorn.Node    // AST node
            location: string,   // code location
            time: string,       // time complexity
            space: string,      // space complexity
        }
    ]
}
```

## Limitations

This tool provides **approximations**, not perfect mathematical analysis. Current limitations:

- **Dynamic behavior**: Cannot analyze runtime-dependent complexity
- **External dependencies**: Unknown functions assumed to be `O(1)`
- **Complex algorithms**: May not recognize advanced algorithmic patterns
- **Halting problem**: Cannot guarantee termination analysis

## Use Cases

This project aimed at providing automated complexity analysis that:

- Helps developers understand the performance implications of their code
- Catches potential performance bottlenecks during development
- Serves as an educational tool for learning complexity analysis
- Gives instant feedback without requiring manual calculation
- Gives real-time complexity hints via IDE integration

## Contributing

Thank you for checking out this awesome project.
Contributions are welcome! Areas for improvement:

- **Language features**: ES6+, TypeScript, async/await complexity
- **Recursive pattern recognition**: Advanced recurrence relation solving

### Development

To get started with development, follow these steps:

1. Install [Node.js](https://nodejs.org) (>=22) and [pnpm](https://pnpm.io/) (>=10)
2. Clone this repository: `git clone https://github.com/henryhale/worstcase.git`
3. Navigate to the project directory: `cd worstcase`
4. Install dependencies: `pnpm install`
5. Start the development server: `pnpm dev`
6. Build the for production: `pnpm build`
7. Running tests: `pnpm test`

## Architecture

The analyzer uses a multi-step approach:

1. **Parsing**: Uses Acorn to generate Abstract Syntax Tree (AST)
2. **Traversal**: Visits each AST node with specific complexity rules
3. **Combination**: Applies mathematical rules for combining complexities
4. **Simplification**: Reduces to dominant terms in Big O notation

## License

Copyright (c) 2025-present [Henry Hale](https://github.com/henryhale/).

MIT License - see [LICENSE.txt](https://github.com/henryhale/worstcase/blob/master/LICENSE.txt) file for details.
