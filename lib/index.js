import eslint from "@eslint/js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import prettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import { CaseBlocks, NoInstanceof } from "./rules.js";

/**
 * @param {{ enablePrettier?: boolean }} options
 * @returns {Array<any>}
 * */
export default function hagemanto(options = {}) {
	return [
		{
			plugins: {
				"@stylistic/ts": stylisticTs,
				hagemanto: {
					rules: {
						"case-blocks": CaseBlocks,
						"no-instanceof": NoInstanceof,
					},
				},
			},
		},

		(options.enablePrettier ? prettier : {}),
		eslint.configs.recommended,
		stylisticTs.configs["all-flat"],
		...tseslint.configs.strictTypeChecked,
		...tseslint.configs.stylisticTypeChecked,

		{
			rules: {
				"hagemanto/case-blocks": "error",
				"hagemanto/no-instanceof": "error",

				...(options.enablePrettier ? [{
					"prettier/prettier": [
						"error",
						{
							printWidth: 100,
							tabWidth: 4,
							semi: true,
							singleQuote: false,
							trailingComma: "es5",
							bracketSpacing: true,
							endOfLine: "lf",
							useTabs: true,
						},
					],
				}] : []),

				"@stylistic/ts/padding-line-between-statements": [
					"error",
					{
						blankLine: "always",
						prev: "block-like",
						next: "*",
					},
				],
				// handled by prettier
				"@stylistic/ts/quotes": "off",
				"@stylistic/ts/indent": "off",
				"@stylistic/ts/quote-props": "off",
				"@stylistic/ts/object-curly-spacing": "off",
				"@stylistic/ts/space-before-function-paren": "off",
				"@stylistic/ts/comma-dangle": "off",
				"@stylistic/ts/object-property-newline": "off",

				"@typescript-eslint/array-type": ["error", { default: "generic" }],
				"@typescript-eslint/ban-ts-comment": [
					"error",
					{
						"ts-expect-error": "allow-with-description",
						minimumDescriptionLength: 3,
					},
				],
				"@typescript-eslint/ban-tslint-comment": "off", // we don't use
				"@typescript-eslint/class-methods-use-this": "error",
				"@typescript-eslint/consistent-type-assertions": [
					"error",
					{ assertionStyle: "as", objectLiteralTypeAssertions: "never" },
				],
				"@typescript-eslint/consistent-type-exports": "error",
				"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
				"@typescript-eslint/default-param-last": "error",
				"@typescript-eslint/dot-notation": "off", // use eslint dot-notation
				"@typescript-eslint/explicit-function-return-type": "off",
				"@typescript-eslint/explicit-member-accessibility": "off",
				"@typescript-eslint/explicit-module-boundary-types": "error",
				// "@typescript-eslint/init-declarations": "off", // handled by TS
				// "@typescript-eslint/max-params": "off", // handled by eslint
				// "@typescript-eslint/member-ordering"
				// "@typescript-eslint/method-signature-style"
				// "@typescript-eslint/naming-convention"
				"@typescript-eslint/no-dupe-class-members": "off", // handled by TS
				"@typescript-eslint/no-empty-interface": "error",
				"@typescript-eslint/no-explicit-any": "warn",
				// TODO: disable this rule when eslint-plugin-import migrates
				"@typescript-eslint/no-import-type-side-effects": "error",
				"@typescript-eslint/no-loop-func": "error",
				"no-loss-of-precision": "off",
				// "@typescript-eslint/no-magic-numbers": "off",
				"@typescript-eslint/no-misused-promises": [
					"error",
					{
						checksVoidReturn: false,
					},
				],
				"no-redeclare": "off",
				"@typescript-eslint/no-redeclare": "error",
				"@typescript-eslint/no-restricted-imports": "off",
				// "@typescript-eslint/no-restricted-types"
				"@typescript-eslint/no-shadow": "off",
				"@typescript-eslint/no-unnecessary-condition": [
					"error",
					{
						allowConstantLoopConditions: true,
					},
				],
				"@typescript-eslint/no-unnecessary-parameter-property-assignment": "error",
				"@typescript-eslint/no-unnecessary-qualifier": "error",
				"@typescript-eslint/no-unused-vars": [
					"warn",
					{
						varsIgnorePattern: "^_",
						argsIgnorePattern: "^_",
						destructuredArrayIgnorePattern: "^_",
						caughtErrorsIgnorePattern: "^_",
						caughtErrors: "all",
					},
				],
				"@typescript-eslint/no-use-before-define": "off",
				"@typescript-eslint/no-useless-empty-export": "error",
				"@typescript-eslint/parameter-properties": "warn",
				// "@typescript-eslint/prefer-destructuring"
				"@typescript-eslint/prefer-enum-initializers": "warn",
				"@typescript-eslint/prefer-readonly": "error",
				// too annoying
				"@typescript-eslint/prefer-readonly-parameter-types": "off",
				"@typescript-eslint/promise-function-async": "off", // unnecessary
				"@typescript-eslint/require-array-sort-compare": "error",
				"@typescript-eslint/restrict-template-expressions": "off",
				"@typescript-eslint/strict-boolean-expressions": [
					"error",
					{
						allowString: true,
						allowNumber: true,
						allowNullableObject: true,
						allowNullableBoolean: false,
						allowNullableString: true,
						allowNullableNumber: false,
						allowAny: false,
					},
				],
				"@typescript-eslint/switch-exhaustiveness-check": "error",
				"@typescript-eslint/triple-slash-reference": ["error", { types: "prefer-import" }],
				// "@typescript-eslint/typedef"
			}
		},
	]
}