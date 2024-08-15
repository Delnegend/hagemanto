import recommended from "./configs/recommended.js";
import { CaseBlocks, NoInstanceof } from "./rules.js";

export default {
	meta: {
		name: "hagemanto",
		version: "1.0.0",
		docs: {
			description: "A very opinionated ESLint config.",
			category: "recommended",
			recommended: true,
			url: "https://github.com/Delnegend/hagemanto",
		},
	},
	plugins: {
		hagemanto: {
			rules: {
				"case-blocks": CaseBlocks,
				"no-instanceof": NoInstanceof,
			},
		},
	},
	rules: {
		recommended: [
			...recommended,
			{
				rules: {
					"hagemanto/case-blocks": "error",
					"hagemanto/no-instanceof": "error",
				},
			},
		],
	},
};
