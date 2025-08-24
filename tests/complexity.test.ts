import { describe, test, expect } from "vitest";
import { Complexity } from "../src/complexity";

describe("complexity", () => {
    test("adding basic expressions", () => {
        const c1 = new Complexity("n");
        const c2 = new Complexity("2");
        expect(c1.add(c2).terms).toStrictEqual(["3", "n"]);
    });

    test("adding complex expressions", () => {
        const c1 = new Complexity();
        c1.terms = ["2*n", "3"];

        const c2 = new Complexity();
        c2.terms = ["n*n", "2", "n"];

        expect(c1.add(c2).terms).toStrictEqual(["6", "3*n", "n*n"]);
    });

    test("multiplying basic expressions", () => {
        const c1 = new Complexity("n");
        const c2 = new Complexity("2");
        expect(c1.multiply(c2).terms).toStrictEqual(["1", "2*n"]);

        c1.terms.push("3");
        expect(c1.multiply(c2).terms).toStrictEqual(["7", "2*n"]);
    });

    test("multiplying complex expressions", () => {
        const c1 = new Complexity();
        c1.terms = ["n*n", "2*n"];

        const c2 = new Complexity("2");
        c2.terms = ["n", "2"];

        expect(c1.multiply(c2).terms).toStrictEqual([
            "1",
            "n*n*n",
            "4*n*n",
            "4*n"
        ]);
    });

    test("simplify terms", () => {
        const c1 = new Complexity();
        c1.terms = ["n", "3*n", "n*n", "2*n*n"];

        const c2 = new Complexity();
        c2.terms = ["1", "2", "n*n", "n"];

        expect(c1.add(c2).toString(true)).toBe("O(n^2)");
        expect(c1.add(c2).toString(false)).toBe("O(4n^2)");
    });

    test("leading term string", () => {
        const c1 = new Complexity("1");
        expect(c1.toString()).toStrictEqual("O(1)");

        c1.terms = ["2*n"];
        expect(c1.toString(true)).toStrictEqual("O(n)");
        expect(c1.toString(false)).toStrictEqual("O(2n)");

        const c2 = new Complexity();
        c2.terms = ["3*n*n", "2^n", "log(n)", "n"];
        expect(c2.toString(true)).toStrictEqual("O(n^2)");
        expect(c2.toString(false)).toStrictEqual("O(3n^2)");
    });
});
