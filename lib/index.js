import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import { CaseBlocks, NoInstanceof } from "./rules.js";

/**
 * @param {{
 *  enablePrettier?: boolean,
 *  enableJsx?: boolean,
 *  enableTs?: boolean
 * }} options
 * @returns {Array<any>}
 * */
export default function hagemanto({
	enablePrettier = false,
	enableJsx = true,
	enableTs = true
} = {}) {
	const stylisticCustomized = stylistic.configs.customize({
		indent: "tab",
		quotes: "double",
		semi: true,
		jsx: true,
	});

	const config = [];

	config.push({
		name: "hagemanto/plugins",
		plugins: {
			hagemanto: {
				rules: {
					"case-blocks": CaseBlocks,
					"no-instanceof": NoInstanceof,
				},
			},
		},
		rules: {
			"hagemanto/case-blocks": "error",
			"hagemanto/no-instanceof": "error",
		}
	});

	if (enablePrettier) config.push({
		name: "hagemanto/prettier",
		...prettier,
		rules: {
			...prettier.rules,
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
		}
	});

	config.push({
		name: "hagemanto/eslint-js",
		...eslint.configs.recommended,
		rules: {
			// If a rule is commented out -> by default it already is
			// ===================================================
			// Possible Problems
			// These rules relate to possible logic errors in code
			// ===================================================

			"array-callback-return": "error",
			"no-await-in-loop": "error",
			"no-constructor-return": "error",
			"no-duplicate-imports": "error",
			// "no-inner-declarations": "off",
			// "no-promise-executor-return": "off",
			"no-self-compare": "error",
			"no-template-curly-in-string": "error",
			"no-unmodified-loop-condition": "error",
			"no-unreachable-loop": "error",
			"no-use-before-define": "off",
			"require-atomic-updates": "error",

			// ==================================================
			// Suggestions
			// These rules suggest alternate ways of doing things
			// ==================================================

			"accessor-pairs": "error",
			// "arrow-body-style": "as-needed",
			"block-scoped-var": "error",
			camelcase: ["error", { properties: "never" }],
			"capitalized-comments": "off",
			"class-methods-use-this": "off", // handled by tseslint
			complexity: "off", // allow more flexible code
			"consistent-return": "off", // handled by TS
			"consistent-this": "off",
			curly: "error",
			"default-case": "off", // handled by TS
			"default-case-last": "error",
			"default-param-last": "error",
			// Enforce dot notation. Although snake_case is legal as an object property,
			// the above camelCase rule rejects it. As such, we enforce that all snake
			// case variables end up in ["square_brackets"].
			"dot-notation": ["error", { allowPattern: "^[a-z]+(_[a-z]+)+$" }],
			eqeqeq: "error",
			"func-name-matching": "error",
			"func-names": "error",
			"func-style": ["error", "declaration", { allowArrowFunctions: true }],
			"grouped-accessor-pairs": "error",
			"guard-for-in": "off", // prohibited by tseslint
			"id-denylist": "off", // allow generic names
			"id-length": "off", // allow 1-letter names
			"id-match": "off", // already enforced camelCase
			"init-declarations": "off", // handled by TS
			// "logical-assignment-operators"
			"max-classes-per-file": "off",
			// "max-depth": ["error", 4],
			"max-lines": "off",
			"max-lines-per-function": "off",
			"max-nested-callbacks": ["error", { max: 3 }], // default is 10
			"max-params": "off",
			"max-statements": "off",
			"new-cap": ["error", { capIsNew: false }],
			"no-alert": "error",
			// "no-array-constructor": "off", // handled by typescript-eslint
			"no-bitwise": "error",
			"no-caller": "error",
			"no-console": "error",
			"no-continue": "off",
			"no-div-regex": "error",
			"no-else-return": "error",
			"no-empty-function": "off", // handled by TS
			"no-eq-null": "error",
			"no-eval": "error",
			"no-extend-native": "error",
			"no-extra-bind": "error",
			"no-extra-label": "error",
			"no-implicit-coercion": ["error", { allow: ["!!"] }],
			// no-implicit-globals
			// "no-implied-eval": "error", // handled by typescript-eslint
			"no-inline-comments": "off",
			// "no-invalid-this": "error", // handled by TS
			"no-iterator": "error",
			// "no-label-var": "error", // redundant since no-labels below
			"no-labels": "error",
			"no-lone-blocks": "error",
			"no-lonely-if": "error",
			"no-loop-func": "off", // handled by TS
			"no-magic-numbers": "off",
			"no-multi-assign": "error",
			"no-multi-str": "error",
			"no-negated-condition": "error",
			"no-nested-ternary": "error",
			"no-new": "error",
			"no-new-func": "error",
			"no-new-wrappers": "error",
			"no-object-constructor": "error",
			"no-octal-escape": "error",
			"no-param-reassign": "error",
			"no-plusplus": "off",
			"no-proto": "error",
			// "no-restricted-exports": "off",
			"no-restricted-globals": [
				"error",
				{
					name: "parseInt",
					message: `Use Number() to convert strings to numbers. parseInt is very liberal with what it considers a number.
Number("4f") // NaN
parseInt("4helloworld") // 4`,
				},
				{
					name: "isNaN",
					message: `Use Number.isNaN instead. isNaN does not check the input is of type number, and instead coerces input into a number.
isNaN("foo"); // true
Number.isNaN("foo"); // false`,
				},
				{
					name: "Boolean",
					message: `Use !!variable instead of Boolean(variable).`,
				},
			],
			"no-restricted-imports": "off",
			"no-restricted-properties": [
				"error",
				{
					property: "forEach",
					message: "Use a for-of loop instead of Array.forEach.",
				},
				{
					object: "Number",
					property: "parseInt",
					message: `Use Number() to convert strings to numbers. parseInt is very liberal with what it considers a number.
Number("4f") // NaN
parseInt("4helloworld") // 4`,
				},
			],
			"no-restricted-syntax": [
				"error",
				{
					selector: "ForInStatement",
					message:
						"The use of 'for key in object' is potentially harmful, and can retrieve keys in prototypes in some environments. Use 'for key of Object.keys(object)' instead.",
				},
			],
			"no-return-assign": "error",
			"no-script-url": "error",
			"no-sequences": "error",
			"no-shadow": "off",
			// "no-ternary": "off",
			// "no-throw-literal": "off", // handled by typescript-eslint
			"no-undef-init": "error",
			"no-undefined": "off",
			"no-underscore-dangle": "off",
			"no-unneeded-ternary": "error",
			// "no-unused-expressions": "off", // handled by typescript-eslint
			"no-useless-call": "error",
			"no-useless-computed-key": "error",
			"no-useless-concat": "error",
			// "no-useless-constructor": "error", // handled by @eslint/js
			"no-useless-rename": "error",
			"no-useless-return": "error",
			"no-var": "error",
			"no-void": "off",
			"no-warning-comments": "off",
			"object-shorthand": ["error", "always"],
			"one-var": ["error", "never"],
			"operator-assignment": ["error", "never"],
			"prefer-arrow-callback": "error",
			"prefer-const": "error",
			"prefer-destructuring": "off",
			"prefer-exponentiation-operator": "error",
			"prefer-named-capture-group": "off",
			"prefer-numeric-literals": "error",
			"prefer-object-has-own": "error",
			"prefer-object-spread": "error",
			"prefer-promise-reject-errors": "off",
			"prefer-regex-literals": "error",
			"prefer-rest-params": "error",
			"prefer-spread": "error",
			"prefer-template": "error",
			radix: "off", // banned parseInt
			// "require-await": "error", // handled by TS
			"require-unicode-regexp": "error",
			// "sort-imports": "off", // TODO: wait for eslint-plugin-import to migrate
			"sort-vars": "error",
			strict: "off",
			"symbol-description": "error",
			"vars-on-top": "off", // banned vars
			yoda: "error",

			// =========================================
			// Layout & Formatting
			// These rules care about how the code looks
			// rather than how it executes
			// =========================================

			"unicode-bom": "off",
		}

	});

	if (!enablePrettier) config.push({
		name: "hagemanto/stylistic",
		...stylisticCustomized,
		rules: {
			...enablePrettier ? {} : {
				...stylisticCustomized.rules,
				"@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
				"@stylistic/function-call-argument-newline": ["error", "consistent"],
				"@stylistic/function-call-spacing": "error",
				"@stylistic/generator-star-spacing": "error",
				"@stylistic/implicit-arrow-linebreak": "error",
				"@stylistic/linebreak-style": "error",
				"@stylistic/max-statements-per-line": ["error", { "max": 3 }],
				"@stylistic/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
				"@stylistic/multiline-ternary": ["error", "always-multiline"],
				"@stylistic/newline-per-chained-call": "error",
				"@stylistic/no-confusing-arrow": "error",
				"@stylistic/no-extra-semi": "error",
				"@stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 1 }],
				"@stylistic/nonblock-statement-body-position": "error",
				"@stylistic/object-curly-newline": "error",
				"@stylistic/operator-linebreak": ["error", "before"],
				"@stylistic/padded-blocks": ["error", "never", { "allowSingleLineBlocks": true }],
				"@stylistic/quotes": ["error", "double", { avoidEscape: true }],
				"@stylistic/semi-style": "error",
				"@stylistic/space-before-function-paren": ["error", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
				"@stylistic/switch-colon-spacing": "error",
				"@stylistic/wrap-iife": ["error", "inside"],
				"@stylistic/wrap-regex": "error",

				...(enableTs ? {
					"@stylistic/member-delimiter-style": ["error", { multiline: { delimiter: "semi", requireLast: true }, singleline: { delimiter: "semi", requireLast: false } }],
					"@stylistic/type-annotation-spacing": ["error", { before: false, after: true }],
				} : {}),

				...(enableJsx ? {
					// off by default
					"@stylistic/jsx-child-element-spacing": "error",
					"@stylistic/jsx-pascal-case": "error",
					"@stylistic/jsx-props-no-multi-spaces": "error",
					"@stylistic/jsx-self-closing-comp": "error",
					"@stylistic/jsx-max-props-per-line": ["error", { maximum: 3, when: "multiline" }],
					"@stylistic/jsx-one-expression-per-line": ["error", { "allow": "single-line" }],

					// customized
					"@stylistic/jsx-wrap-multilines": "off",
					"@stylistic/jsx-closing-tag-location": "off", // because the above is off
					"@stylistic/jsx-curly-brace-presence": ["error", "never"],
				} : {}),
			},
		},

	})

	if (enableTs) {
		config.push(...tseslint.configs.strictTypeChecked);
		config.push(...tseslint.configs.stylisticTypeChecked);
		config.push({
			name: "hagemanto/typescript-eslint",
			rules: {
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
				"@typescript-eslint/no-explicit-any": "error",
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
					"error",
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
				"@typescript-eslint/parameter-properties": "error",
				// "@typescript-eslint/prefer-destructuring"
				"@typescript-eslint/prefer-enum-initializers": "error",
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
		})
	}

	return config;
}
