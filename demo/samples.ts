import * as samples from "./snippets";

export function initSamples(fn: (code: string) => void) {
    const buttons: HTMLButtonElement[] = [];

    for (const key in samples) {
        const sample = samples[key];

        const btn = document.createElement("button");
        btn.textContent = sample.name;
        btn.classList.add("sample-btn");
        btn.onclick = () => fn(sample.code);

        buttons.push(btn);
    }

    // load last example immediately
    buttons.at(-1)?.click();

    return buttons;
}
