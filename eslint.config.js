import hagemanto from "./lib/index.js";

export default [
	{ name: "hagemanto/test/include", files: ["test.ts"] },
	{ name: "hagemanto/test/exclude", ignores: ["eslint.config.js", "lib/index.js", "lib/rules.js"] },

	...hagemanto({styler: "stylistic", enableJsx: true, enableTs: true}),
	{ name: "hagemanto/test/parser-options", languageOptions: { parserOptions: { project: "./tsconfig.json" } } },
];
