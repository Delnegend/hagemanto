import hagemanto from "./lib/index.js";

export default [
	{ ignores: ["node_modules", "lib/**/*.*", "eslint.config.js", "postinstall.js"] },
	{ files: ["./src/**/*.ts"] },
	{
		plugins: {
			"hagemanto": hagemanto.plugins.hagemanto
		}
	},

	...hagemanto.rules.recommended,

	{ languageOptions: { parserOptions: { project: "./tsconfig.json" } } },
]