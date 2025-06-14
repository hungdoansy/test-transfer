module.exports = {
    plugins: ["prettier-plugin-svelte"],
    semi: false,
    tabWidth: 4,
    printWidth: 120,
    singleQuote: false,
    trailingComma: "es5",
    bracketSameLine: false,
    arrowParens: "avoid",
    endOfLine: "auto",
    overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
}
