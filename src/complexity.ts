/**
 * A data structure to manage terms of a space or time complexity expression
 */
export class Complexity {
    public terms: string[];
    private leadingIndex: number;
    private leadingValue: number;

    constructor(initial: string = "1") {
        this.terms = [];
        this.leadingIndex = 0;
        this.leadingValue = 0;

        if (initial) this.terms.push(initial);
    }

    /**
     * concatenate both complexity expressions:
     *  (1 + 2) + (3 + 4) = (1 + 2 + 3 + 4)
     *
     * the result is represented as:
     * [1, 2, 3, 4]
     */
    public add(other: Complexity): Complexity {
        const result = new Complexity();

        result.terms.push(...this.terms, ...other.terms);

        result.normalize();

        return result;
    }

    /**
     * like maths, multiply each term of one bracket with
     * every term in the other bracket and concatenate them:
     * (1 + 2) * (3 + 4)
     *   = 1(3 + 4) + 2(3 + 4)
     *   = (1)(3) + (1)(4) + (2)(3) + (2)(4)
     *
     * the result is represented as:
     * ['1*3', '1*4', '2*3', '2*4']
     */
    public multiply(other: Complexity): Complexity {
        const result = new Complexity();

        for (const left of this.terms) {
            for (const right of other.terms) {
                result.terms.push(`${left}*${right}`);
            }
        }

        result.normalize();

        return result;
    }

    /**
     * optimize complexity terms while tracking leading term
     */
    private normalize() {
        // first simplify terms
        this.simplifyTerms();
        // then compute growth rate function
        this.computeLeadingTerm();
    }

    /**
     * simplify terms:
     * - for example: ['n', '3*n', 'n*n', '2*n*n']
     * - should be: ['4*n', '3*n*n']
     */
    private simplifyTerms() {
        // key: term = value: coefficient
        const map: Record<string, number> = {};

        for (const term of this.terms) {
            const segs = term.split("*").sort();
            const coeff: string[] = [];

            // extract and simplify coefficients
            let i = 0;
            while (/^\d+$/.test(segs[i])) {
                coeff.push(segs[i]);
                i++;
            }
            let coeffNumber: number = 1;
            if (coeff.length) {
                segs.splice(0, i);
                coeffNumber = coeff.reduce((r, k) => r * Number(k), 1);
            }

            // simplify unknowns
            const unknown = segs.join("*") || "none";
            if (map[unknown]) {
                map[unknown] += coeffNumber;
            } else {
                map[unknown] = coeffNumber;
            }
        }

        // construct simplified terms from term-coefficient map
        const simplifiedTerms: string[] = [];
        for (const term in map) {
            const coefficient = map[term];
            simplifiedTerms.push(
                term === "none"
                    ? coefficient.toString()
                    : coefficient === 1
                      ? term
                      : `${coefficient}*${term}`
            );
        }

        this.terms = simplifiedTerms;
    }

    /**
     * Compute growth rate term
     *
     * - lazy evaluate the terms
     * - locate the index of the highest term
     * - set that to the `leadingTerm`
     *
     * for example: ['n*n', 'n*2', 'n*3', '1']
     * - use n = 1000
     * - value: [1000_000, 2000, 3000, 1]
     * - leading term - with maximum value = index 0
     *
     * thus
     * - `leadingIndex` = 0
     * - `leadingValue` = 1000_000
     * - `leadingTerm` = 'n*n'
     */
    private computeLeadingTerm() {
        const testValue = 1_000_000_000;
        let maxValue = -Infinity;
        for (let i = 0; i < this.terms.length; i++) {
            const term = this.terms[i];
            const fn = new Function(
                "n",
                `return ${term.replaceAll("log", "Math.log10")}`
            );
            const value = fn(testValue);
            if (value > maxValue) {
                maxValue = value;
                this.leadingIndex = i;
            }
        }
        this.leadingValue = maxValue;
    }

    /**
     * compare this term and another - return the term with
     * a higher growth rate
     *
     * don't compute again:
     * - use the pre-calculated `leadingValue`
     */
    public max(other: Complexity): Complexity {
        return this.leadingValue > other.leadingValue ? this : other;
    }

    /**
     * access the raw term that makes the complexity expression grow faster
     */
    private get leadingTerm() {
        return this.terms[this.leadingIndex];
    }

    /**
     * get the leading term in the standard form
     */
    public toString() {
        const term = this.leadingTerm || "1";

        // transform: 'n*n' into 'n^2'
        const cleanTerm = term
            .split("*")
            .join("")
            .replace(/n+/g, (m) =>
                m.length === 1 ? m : `${m[0]}^${m.length}`
            );

        return `O(${cleanTerm})`;
    }
}
