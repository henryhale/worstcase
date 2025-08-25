import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    entries: ["./src/index"],
    outDir: "dist",
    clean: true,
    declaration: true,
    sourcemap: true,
    failOnWarn: true,
    rollup: {
        emitCJS: true,
        esbuild: {
            minify: true
        }
    },
    externals: ["@babel/parser", "@babel/types"]
});
