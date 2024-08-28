import hagemanto from "./lib/index.js";

export default [
	{ files: ["test.ts"] },
	{ ignores: ["eslint.config.js", "lib/index.js", "lib/rules.js"] },

	...hagemanto({typescript: false, stylisticTs: false}),
	{ languageOptions: { parserOptions: { project: "./tsconfig.json" } } },
];
