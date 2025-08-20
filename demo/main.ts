import "./style.css";
import { type WCAnalysis, analyzeComplexity } from "../src";
import { initSamples } from "./samples";

const el = <T extends HTMLElement>(selector: string): T =>
    document.querySelector(selector) as T;

const codeInput = el<HTMLTextAreaElement>("textarea");
const errorBox = el("#error");
const resultsBox = el("table");

function loadSample(code: string) {
    codeInput.value = code;
}

function analyzeCode(): void {
    const code = codeInput.value.trim();

    errorBox.style.display = "none";
    resultsBox.style.display = "none";

    if (!code) {
        showError("Please enter some JavaScript code to analyze.");
        return;
    }

    try {
        const analysis = analyzeComplexity(code);

        displayResults(analysis, code);

        resultsBox.style.display = "table";
    } catch (error) {
        showError(error.message);
    }
}

function h(tag: string, content?: string) {
    const element = document.createElement(tag);
    if (content) element.textContent = content;
    return element;
}

function displayResults(analysis: WCAnalysis, code: string): void {
    // top bar
    const header = h("thead");
    const headerRow = h("tr");
    const columns = ["Line", "Statement", "Space", "Time"];
    columns.forEach((col) => {
        headerRow.appendChild(h("th", col));
    });
    header.appendChild(headerRow);

    // body
    const body = h("tbody");
    analysis.results.forEach((result) => {
        console.log(result.node);

        if (result.type === "Program") return;

        const row = h("tr");
        const [_, line] = result.location.split(" ").map(Number);
        row.append(
            h("td", line.toString()),
            h("td", result.type),
            h("td", result.space),
            h("td", result.time)
        );
        body.appendChild(row);
    });

    // summary
    const footer = h("tfoot");
    const footerRow = h("tr");
    const cells = [
        "",
        "Overall Complexity",
        analysis.overall.space,
        analysis.overall.time
    ].map((value) => h("th", value));
    footerRow.append(...cells);
    footer.appendChild(footerRow);

    resultsBox.innerHTML = "";
    resultsBox.append(header, body, footer);

    resultsBox.scrollIntoView({ behavior: "smooth" });
}

function showError(message: string): void {
    errorBox.textContent = message;
    errorBox.style.display = "block";
}

// Load default sample
document.addEventListener("DOMContentLoaded", function () {
    el("#analyze-btn").addEventListener("click", analyzeCode);

    el("#sample-buttons").append(...initSamples(loadSample));
});
