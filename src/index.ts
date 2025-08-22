import { ComplexityAnalyzer } from "./analyzer";
import type { WCAnalysis, WCOptions } from "./types";

/**
 * compute space and time complexity of the given piece of code
 * @param code javascript code to analyze
 * @param options configure the analyzer - _optional_ 
 * @returns block by block analysis and overall results
 */
export function analyzeComplexity(code: string, options?: Partial<WCOptions>): WCAnalysis {
    const ca = new ComplexityAnalyzer(options);
    return ca.analyze(code);
}

export type { WCOptions, WCAnalysis, WCResult } from "./types";
