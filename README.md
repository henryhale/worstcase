<div align="center">
<img width="45" src="https://github.com/henryhale/worstcase/raw/master/public/logo.svg" />
<h1>worstcase</h1>
<p>Automatic time and space complexity analyzer for JavaScript code</p>
<p>
<a href="https://www.npmjs.com/package/worstcase"><img alt="npm" src="https://img.shields.io/npm/v/worstcase"></a>
<a href="https://github.com/henryhale/worstcase/blob/master/LICENSE.txt"><img alt="GitHub" src="https://img.shields.io/github/license/henryhale/worstcase"></a>
<a href="https://www.npmjs.com/package/worstcase"><img alt="npm downloads" src="https://img.shields.io/npm/dm/worstcase"></a>
</p>
</div>

## Overview

Ever wondered if your JavaScript code is secretly harboring a performance monster? `worstcase` is your solution! This powerful tool automatically analyzes your JavaScript code and computes approximate Big O complexity for both time and space through static code analysis.

## Motivation

The motivation is simple yet ambitious: to bring algorithmic analysis directly into the development workflow. Instead of manually reasoning through loops and recursive calls, or waiting for performance issues to surface in production, this analyzer examines your code structure and provides instant complexity estimates. It's like having a computer science professor looking over your shoulder, but one who never gets tired and works at the speed of light.

## Features

- **Automated Complexity Analysis**: Computes Big O notation for time and space complexity
- **Block-level Analysis**: Granular complexity computation for each code block
- **AST-Based Parsing**: Uses Acorn parser for accurate JavaScript code parsing
- **No Pattern Matching**: Pure algorithmic analysis without relying on pre-known patterns
- **Conservative Estimates**: Provides reasonable defaults for unknown code
- **Built-in Method Knowledge**: Knows complexity of basic Array/Object methods

## Live Demo

Check the Monaco Editor integration demo:
[View Repo](https://github.com/henryhale/worstcase-monaco-demo) |
[Launch Demo](https://henryhale.github.io/worstcase-monaco-demo)

## Quick Start

### Installation

```bash
# npm
npm install worstcase

# yarn
yarn add worstcase

# pnpm
pnpm add worstcase
```

## Basic Usage

```js
import { analyzeComplexity } from "worstcase";

// Example: Analyzing a bubble sort implementation
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

### `analyzeComplexity(code: string): AnalysisResult`

Analyzes JavaScript code and returns complexity information.

#### Parameters

| Parameter | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| `code`    | `string` | JavaScript source code to analyze |

#### Returns: `AnalysisResult`

```typescript
interface AnalysisResult {
    overall: {
        time: string; // Overall time complexity (e.g., "O(n^2)")
        space: string; // Overall space complexity (e.g., "O(1)")
    };
    results: Array<{
        type: string; // AST node type
        node: acorn.Node; // Acorn AST node
        location: string; // Code location
        time: string; // Time complexity
        space: string; // Space complexity
    }>;
}
```

#### Example Response

```js
{
    overall: {
        time: "O(n^2)",
        space: "O(1)"
    },
    results: [
        {
            type: "FunctionDeclaration",
            location: "Line 2",
            time: "O(n^2)",
            space: "O(1)",
            node: {...}
        }
        // ... more results
    ]
}
```

## Limitations

This tool provides **approximations**, not perfect mathematical analysis. Current limitations:

- **Dynamic behavior**: Cannot analyze runtime-dependent complexity
- **External dependencies**: Unknown functions assumed to be `O(1)`
- **Complex algorithms**: May not recognize advanced algorithmic patterns
- **Halting problem**: Cannot guarantee termination analysis

## Architecture

The analyzer uses a multi-step approach:

1. **Parsing**: Uses Acorn to generate Abstract Syntax Tree (AST)
2. **Traversal**: Visits each AST node with specific complexity rules
3. **Combination**: Applies mathematical rules for combining complexities
4. **Simplification**: Reduces to dominant terms in Big O notation

## Use Cases

`worstcase` is perfect for:

- Helps developers understand the performance implications of their code
- Catches potential performance bottlenecks during development
- Serves as an educational tool for learning complexity analysis
- Gives instant feedback without requiring manual calculation
- Gives real-time complexity hints via IDE integration

## Contributing

Thank you for checking out this awesome project.
Contributions are welcome!

**Areas for improvement**:

- **Language features**: ES6+, TypeScript, async/await complexity
- **Recursive pattern recognition**: Advanced recurrence relation solving

### Development Setup

1. Install [Node.js](https://nodejs.org) (>=22) and [pnpm](https://pnpm.io/) (>=10)
2. Clone this repository
    ```bash
    git clone https://github.com/henryhale/worstcase.git
    cd worstcase
    ```
3. Install dependencies
    ```bash
    pnpm install
    ```
4. Run development server
    ```bash
    pnpm dev
    ```
5. Run tests
    ```bash
    pnpm test
    ```
6. Build for production
    ```bash
    pnpm build
    ```

## Support

If you find this project useful, please consider giving it a star ⭐️ on GitHub!

## License

Copyright (c) 2025-present [Henry Hale](https://github.com/henryhale/).

MIT License - see [LICENSE.txt](https://github.com/henryhale/worstcase/blob/master/LICENSE.txt) file for details.
