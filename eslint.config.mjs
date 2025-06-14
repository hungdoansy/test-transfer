import eslint from "@eslint/js"
import svelteParser from "svelte-eslint-parser"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"
import sveltePlugin from "eslint-plugin-svelte"
import prettier from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"
import globals from "globals"

export default [
    {
        ignores: [
            // Build output
            "dist/**",
            "build/**",

            // Dependencies
            "node_modules/**",
            ".pnpm-store/**",

            // Package files
            "package-lock.json",
            "pnpm-lock.yaml",
            "yarn.lock",

            // Cache
            ".cache/**",
            ".svelte-kit/**",

            // Environment files
            ".env",
            ".env.*",
            "!.env.example",

            // Editor directories and files
            ".vscode/**",
            "!.vscode/extensions.json",
            ".idea/**",
            "*.suo",
            "*.ntvs*",
            "*.njsproj",
            "*.sln",
            "*.sw?",

            // Generated files
            "*.d.ts",
            "*.generated.*",
            "*.min.js",

            // Coverage directory
            "coverage/**",
        ],
    },
    eslint.configs.recommended,
    {
        files: ["**/*.{js,ts}"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            svelte: sveltePlugin,
            prettier: prettier,
        },
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/no-explicit-any": "warn",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    ignoreRestSiblings: true,
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    args: "after-used",
                },
            ],
        },
    },
    {
        files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tsparser,
                ecmaVersion: 2020,
                sourceType: "module",
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            svelte: sveltePlugin,
            prettier: prettier,
        },
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/no-explicit-any": "warn",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    ignoreRestSiblings: true,
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    args: "after-used",
                },
            ],
        },
    },
    prettierConfig,
]
