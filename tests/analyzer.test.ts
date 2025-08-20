import { describe, test, expect } from "vitest";
import { ComplexityAnalyzer } from "../src/analyzer";

describe("complexity analyzer", () => {
    test("bubble sort complexity", () => {
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
        const ca = new ComplexityAnalyzer();
        const analysis = ca.analyze(code);

        expect(analysis.overall).toStrictEqual({
            space: "O(53)",
            time: "O(43n^2)"
        });
    });
});
