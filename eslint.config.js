import hagemanto from "./lib/index.js";

export default [
	{ ignores: ["node_modules", "lib/**/*.ts", "eslint.config.js"] },

	...hagemanto.configs.recommended,

	{
		rules: {
			"@typescript-eslint/explicit-module-boundary-types": "warn",
			"@typescript-eslint/no-unsafe-assignment": "warn",
		}
	},
	{ files: ["./lib/**/*.js"] },
]