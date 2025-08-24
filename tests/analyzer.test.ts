import { describe, test, expect } from "vitest";
import { ComplexityAnalyzer } from "../src/analyzer";

const code = `function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`;

describe("complexity analyzer", () => {
    test("without coefficients - clean: true", () => {
        const ca = new ComplexityAnalyzer({ clean: true });
        const analysis = ca.analyze(code);

        expect(analysis.overall).toStrictEqual({
            space: "O(1)",
            time: "O(n^2)"
        });
    });

    test("with coefficients - clean: false", () => {
        const ca = new ComplexityAnalyzer({ clean: false });
        const analysis = ca.analyze(code);

        expect(analysis.overall).toStrictEqual({
            space: "O(53)",
            time: "O(43n^2)"
        });
    });
});
