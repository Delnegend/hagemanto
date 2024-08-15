import type { Rule } from "eslint";
import type { Node } from "estree";

export const CaseBlocks: Rule.RuleModule = {
	create(context) {
		return {
			SwitchCase(node) {
				if (node.consequent.length === 0) {
					return;
				}

				const maybeBlockStatement = node.consequent[0];

				if (
					maybeBlockStatement.type === "BlockStatement" &&
					maybeBlockStatement.body.length === 1
				) {
					context.report({
						node,
						message: `Single-line case statements must not use code blocks.`,

						// autofixing this is hard, so we're just not going to.
					});
				}

				if (maybeBlockStatement.type !== "BlockStatement" && node.consequent.length > 1) {
					context.report({
						node,
						message: `Multi-line case statements must be followed by a code block.`,
						*fix(fixer) {
							yield fixer.insertTextBefore(node.consequent[0], "{");

							yield fixer.insertTextAfter(
								node.consequent[node.consequent.length - 1],
								"}"
							);
						},
					});
				}
			},
		};
	},
	meta: {
		fixable: "code",
	},
};

export const NoInstanceof: Rule.RuleModule = {
	create(context) {
		return {
			"[operator=instanceof]"(node: Node) {
				context.report({
					node,
					message: `Do not use the \`instanceof\` operator. It has many issues with TypeScript, and does not work as expected across files or environments. See https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work.`,
				});
			},
		};
	},
	meta: {},
};
