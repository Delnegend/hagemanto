import externalRules from "./externalRules.js";
import { CaseBlocks, NoInstanceof } from "./internalRules.js";

export default {
	// did you know that we can declare this however we want?
	meta: {
		// idk but this just to satisfy ESLint
		name: "hagemanto",
		version: "1.0.4",
		docs: {
			description: "A very opinionated ESLint config.",
			category: "recommended",
			recommended: true,
			url: "https://github.com/Delnegend/hagemanto",
		},
	},

	configs: {
		// I name this however I want
		recommended: [
			// I name this however I want
			{
				plugins: {
					// ESLint flat-config plugins declaration
					hagemanto: {
						// the config name, later to be used as `hagemanto/rule-name`
						rules: {
							// ESLint only requires a rules object to be a "plugin" object
							"case-blocks": CaseBlocks,
							"no-instanceof": NoInstanceof,
						},
					},
				},
			},
			...externalRules, // pre-configured rules from other plugins
			{
				// pre-configured rules from this plugin
				rules: {
					"hagemanto/case-blocks": "error",
					"hagemanto/no-instanceof": "error",
				},
			},
		],
	},
};
