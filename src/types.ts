import { Node } from "@babel/types";
import { Complexity } from "./complexity";

export type WCOptions = {
    /**
     * whether or not to drop coefficients
     *
     * @default true
     */
    clean: boolean;
};

export type WCBlockResult = {
    space: Complexity;
    time: Complexity;
};

export type WCResult = {
    type: string;
    location: string;
    space: string;
    time: string;
    node: Node;
};

export type WCAnalysis = {
    results: WCResult[];
    overall: { space: string; time: string };
};
