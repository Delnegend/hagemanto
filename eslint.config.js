const hagemanto = require("./lib/index.js").default;

module.exports = [
	{ files: ["src/*.*"] },
	{ ignores: ["lib/*.*", "tsconfig.json", "eslint.config.js"] },

	...hagemanto,

	{ languageOptions: { parserOptions: { project: "./tsconfig.json" } } },
];
