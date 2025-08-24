import { parse } from "acorn";
import type {
    Statement,
    Program,
    Expression,
    BlockStatement,
    FunctionDeclaration,
    ForStatement,
    WhileStatement,
    CallExpression,
    VariableDeclaration,
    DoWhileStatement,
    Node,
    IfStatement
} from "acorn";
import { Complexity } from "./complexity";
import type { WCAnalysis, WCBlockResult, WCOptions, WCResult } from "./types";

// Complexity analyzer
export class ComplexityAnalyzer {
    private results: WCResult[];
    private functionStack: string[];
    private options: WCOptions;

    constructor(options: Partial<WCOptions> = {}) {
        this.results = [];
        this.functionStack = [];

        this.options = {
            clean: true,
            ...options
        };
    }

    /**
     * compute space and time complexity of the given piece of code
     * @param code program to analyze
     * @returns block by block analysis and overall results
     */
    public analyze(code: string): WCAnalysis {
        try {
            this.results = [];

            const ast = parse(code, {
                ecmaVersion: 2020,
                locations: true,
                sourceType: "module"
            });

            const { space, time } = this.visit(ast);

            return {
                results: this.results,
                overall: {
                    space: space.toString(this.options.clean),
                    time: time.toString(this.options.clean)
                }
            };
        } catch (error) {
            throw new Error(`Parse error: ${error.message}`);
        }
    }

    /**
     * analyze a node's space and time complexity
     */
    private visit(node: Statement | Program | Expression): WCBlockResult {
        if (!node) {
            return { space: new Complexity(), time: new Complexity() };
        }

        switch (node.type) {
            case "Program":
                return this.visitProgram(node);
                break;
            case "BlockStatement":
                return this.visitBlockStatement(node);
                break;
            case "FunctionDeclaration":
                return this.visitFunctionDeclaration(node);
                break;
            case "ForStatement":
                return this.visitForStatement(node);
                break;
            case "WhileStatement":
                return this.visitWhileStatement(node);
                break;
            case "IfStatement":
                return this.visitIfStatement(node);
                break;
            case "CallExpression":
                return this.visitCallExpression(node);
                break;
            case "VariableDeclaration":
                return this.visitVariableDeclaration(node);
                break;

            default:
                return this.visitGeneric(node);
                break;
        }
    }

    private visitProgram(node: Program): WCBlockResult {
        return this.visitBlockStatement(node as unknown as BlockStatement);
    }

    private visitBlockStatement(node: BlockStatement): WCBlockResult {
        let timeComplexity = new Complexity();
        let spaceComplexity = new Complexity();

        for (const stmt of node.body) {
            const stmtComplexity = this.visit(stmt);
            timeComplexity = timeComplexity.add(
                stmtComplexity.time || stmtComplexity
            );
            spaceComplexity = spaceComplexity.add(
                stmtComplexity.space || new Complexity()
            );
        }

        this.addResult("BlockStatement", node, timeComplexity, spaceComplexity);

        return { time: timeComplexity, space: spaceComplexity };
    }

    private visitFunctionDeclaration(node: FunctionDeclaration): WCBlockResult {
        this.functionStack.push(node.id.name);
        const bodyComplexity = this.visit(node.body);
        this.functionStack.pop();

        this.addResult(
            "FunctionDeclaration",
            node,
            bodyComplexity.time,
            bodyComplexity.space
        );

        return bodyComplexity;
    }

    private visitForStatement(node: ForStatement): WCBlockResult {
        // analyze loop bounds
        const iterations = this.analyzeLoopBounds(node);
        const bodyComplexity = this.visit(node.body);

        const timeComplexity = iterations.multiply(
            bodyComplexity.time || bodyComplexity
        );
        const spaceComplexity = bodyComplexity.space || new Complexity();

        this.addResult("ForStatement", node, timeComplexity, spaceComplexity);

        return { time: timeComplexity, space: spaceComplexity };
    }

    private visitWhileStatement(node: WhileStatement): WCBlockResult {
        // conservative estimate: assume O(n) iterations unless obvious
        const iterations = new Complexity("n");
        const bodyComplexity = this.visit(node.body);

        const timeComplexity = iterations.multiply(
            bodyComplexity.time || bodyComplexity
        );
        const spaceComplexity = bodyComplexity.space || new Complexity();

        this.addResult("WhileStatement", node, timeComplexity, spaceComplexity);

        return { time: timeComplexity, space: spaceComplexity };
    }

    private visitIfStatement(node: IfStatement): WCBlockResult {
        const consequentComplexity = this.visit(node.consequent);

        let alternateComplexity = {
            time: new Complexity(),
            space: new Complexity()
        };

        if (node.alternate) {
            alternateComplexity = this.visit(node.alternate);
        }

        // take maximum of both branches
        const timeComplexity = (
            consequentComplexity.time || consequentComplexity
        ).max(alternateComplexity.time || alternateComplexity);
        const spaceComplexity = (
            consequentComplexity.space || new Complexity()
        ).max(alternateComplexity.space || new Complexity());

        this.addResult("IfStatement", node, timeComplexity, spaceComplexity);

        return { time: timeComplexity, space: spaceComplexity };
    }

    /**
     * TODO:
     * - add more known & critical patterns for RegExp, Map, Set, DOM and more
     */
    private visitCallExpression(node: CallExpression): WCBlockResult {
        // default to O(1) for unknown functions
        let complexity = new Complexity();

        // check for known patterns
        if (node.callee.type === "MemberExpression") {
            const methodName = node.callee.property["name"];
            if (["push", "pop", "shift", "unshift"].includes(methodName)) {
                complexity = new Complexity("1");
            } else if (["indexOf", "includes", "find"].includes(methodName)) {
                complexity = new Complexity("n");
            } else if (["sort"].includes(methodName)) {
                complexity = new Complexity("n*log(n)");
            }
        }

        this.addResult("CallExpression", node, complexity, new Complexity());

        return { time: complexity, space: new Complexity() };
    }

    private visitVariableDeclaration(node: VariableDeclaration): WCBlockResult {
        let spaceComplexity = new Complexity(
            node.declarations.length.toString()
        );

        // analyze initializers
        for (const decl of node.declarations) {
            if (decl.init) {
                this.visit(decl.init);
                // if initializing with array/object, add space
                if (decl.init.type === "ArrayExpression") {
                    spaceComplexity = spaceComplexity.add(new Complexity("n"));
                }
            }
        }

        this.addResult(
            "VariableDeclaration",
            node,
            new Complexity(),
            spaceComplexity
        );

        return { time: new Complexity(), space: spaceComplexity };
    }

    private visitGeneric(node: Node): WCBlockResult {
        // default case: visit all child nodes and combine
        let timeComplexity = new Complexity();
        let spaceComplexity = new Complexity();

        if (node && typeof node === "object") {
            for (const key in node) {
                const child = node[key];
                if (Array.isArray(child)) {
                    for (const item of child) {
                        if (item && typeof item === "object" && item.type) {
                            const childComplexity = this.visit(item);
                            timeComplexity = timeComplexity.add(
                                childComplexity.time || childComplexity
                            );
                            spaceComplexity = spaceComplexity.add(
                                childComplexity.space || new Complexity()
                            );
                        }
                    }
                } else if (child && typeof child === "object" && child.type) {
                    const childComplexity = this.visit(child);
                    timeComplexity = timeComplexity.add(
                        childComplexity.time || childComplexity
                    );
                    spaceComplexity = spaceComplexity.add(
                        childComplexity.space || new Complexity()
                    );
                }
            }
        }

        return { time: timeComplexity, space: spaceComplexity };
    }

    /**
     * TODO:
     * - improve heuristics
     */
    private analyzeLoopBounds(
        node: WhileStatement | ForStatement | DoWhileStatement
    ): Complexity {
        // simple heuristic: look for common patterns
        if (node.test && node.test.type === "BinaryExpression") {
            // assume O(n) iterations for most loops
            return new Complexity("n");
        }
        return new Complexity("n");
    }

    private addResult(
        type: Node["type"],
        node: Node,
        timeComplexity: Complexity,
        spaceComplexity: Complexity
    ): void {
        this.results.push({
            type,
            location: `Line ${node.loc ? node.loc.start.line : "?"}`,
            time: timeComplexity.toString(this.options.clean),
            space: spaceComplexity.toString(this.options.clean),
            node
        });
    }
}
