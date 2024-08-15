import hagemanto from "./lib/index.js";

export default [
	{ ignores: ["node_modules", "lib/**/*.*", "eslint.config.js", "postinstall.js"] },
	{ files: ["./src/**/*.ts"] },

	...hagemanto.configs.recommended,

	{ languageOptions: { parserOptions: { project: "./tsconfig.json" } } },
]