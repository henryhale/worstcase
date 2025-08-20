import { ComplexityAnalyzer } from "./analyzer";
import type { WCAnalysis } from "./types";

/**
 * compute space and time complexity of the given piece of code
 * @param code javascript code to analyze
 * @returns block by block analysis and overall results
 */
export function analyzeComplexity(code: string): WCAnalysis {
    const ca = new ComplexityAnalyzer();
    return ca.analyze(code);
}

export type { WCAnalysis, WCResult } from "./types";
