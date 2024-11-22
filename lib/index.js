import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
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
			name: "hagemanto/plugins",
			plugins: {
				"@stylistic": stylistic,
				"@stylistic/ts": stylistic,
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
		},

		// (options.enablePrettier ? prettier : { name: "hagemanto/prettier", }),

		{
			name: "hagemanto/prettier",
			...options.enablePrettier ? prettier : { name: "hagemanto/prettier (disabled)" },
			rules: {
				...(options.enablePrettier ? {
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
				} : {}),
			}
		},

		{
			name: "hagemanto/eslint-js",
			...eslint.configs.recommended,
			rules: {
				// If a rule is commented out -> by default it already is
				// ===================================================
				// Possible Problems
				// These rules relate to possible logic errors in code
				// ===================================================

				"array-callback-return": "error",
				"no-await-in-loop": "warn",
				"no-constructor-return": "error",
				"no-duplicate-imports": "error",
				// "no-inner-declarations": "off",
				// "no-promise-executor-return": "off",
				"no-self-compare": "error",
				"no-template-curly-in-string": "error",
				"no-unmodified-loop-condition": "error",
				"no-unreachable-loop": "error",
				"no-use-before-define": "off",
				"require-atomic-updates": "warn",

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

		},

		{
			name: "hagemanto/stylistic-ts",
			rules: {
				...options.enablePrettier ? {} : {
					"@stylistic/array-bracket-spacing": ["warn", "never"],
					"@stylistic/arrow-parens": ["warn", "as-needed"],
					"@stylistic/arrow-spacing": ["warn", { before: true, after: true }],
					"@stylistic/block-spacing": ["warn", "always"],
					"@stylistic/brace-style": ["warn", "1tbs", { allowSingleLine: true }],
					"@stylistic/comma-dangle": ["warn", "never"],
					"@stylistic/comma-spacing": ["warn", { before: false, after: true }],
					"@stylistic/comma-style": ["warn", "last"],
					"@stylistic/computed-property-spacing": ["warn", "never"],
					"@stylistic/dot-location": ["warn", "property"],
					"@stylistic/eol-last": ["warn", "always"],
					"@stylistic/function-call-argument-newline": ["warn", "consistent"],
					"@stylistic/function-call-spacing": ["warn", "never"],
					"@stylistic/implicit-arrow-linebreak": ["warn", "beside"],
					"@stylistic/jsx-quotes": ["warn", "prefer-double"],
					"@stylistic/key-spacing": ["warn", { beforeColon: false, afterColon: true, mode: "strict" }],
					"@stylistic/keyword-spacing": ["warn", { before: true, after: true }],
					"@stylistic/linebreak-style": ["warn", "unix"],
					"@stylistic/lines-between-class-members": ["warn", "always", { exceptAfterSingleLine: true }],
					"@stylistic/multiline-ternary": ["warn", "always-multiline"],
					"@stylistic/new-parens": ["warn", "always"],
					"@stylistic/newline-per-chained-call": ["warn", { ignoreChainWithDepth: 2 }],
					"@stylistic/no-confusing-arrow": ["warn", { "allowParens": true, onlyOneSimpleParam: false }],
					"@stylistic/no-extra-parens": ["warn", "all", { conditionalAssign: false, nestedBinaryExpressions: false, returnAssign: false }],
					"@stylistic/no-extra-semi": "warn",
					"@stylistic/no-floating-decimal": "warn",
					"@stylistic/no-mixed-operators": "warn",
					"@stylistic/no-multi-spaces": "warn",
					"@stylistic/no-multiple-empty-lines": ["warn", { "max": 1, "maxBOF": 0, "maxEOF": 1 }],
					"@stylistic/no-trailing-spaces": "warn",
					"@stylistic/no-whitespace-before-property": "warn",
					"@stylistic/nonblock-statement-body-position": ["warn", "beside"],
					"@stylistic/object-curly-spacing": ["warn", "always"],
					"@stylistic/operator-linebreak": ["warn", "before"],
					"@stylistic/padded-blocks": ["warn", "never"],
					"@stylistic/quote-props": ["warn", "as-needed"],
					"@stylistic/quotes": ["warn", "double", { avoidEscape: true }],
					"@stylistic/rest-spread-spacing": ["warn", "never"],
					"@stylistic/semi": ["warn", "always"],
					"@stylistic/semi-spacing": ["warn", { "before": false, "after": true }],
					"@stylistic/semi-style": ["warn", "last"],
					"@stylistic/space-before-blocks": ["warn", "always"],
					"@stylistic/space-before-function-paren": ["warn", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
					"@stylistic/space-in-parens": ["warn", "never"],
					"@stylistic/space-infix-ops": ["warn", { int32Hint: false }],
					"@stylistic/space-unary-ops": ["warn", { words: true, nonwords: false }],
					"@stylistic/switch-colon-spacing": ["warn", { before: false, after: true }],
					"@stylistic/template-tag-spacing": ["warn", "never"],
					"@stylistic/wrap-iife": ["warn", "inside"],
					"@stylistic/wrap-regex": "warn",
					"@stylistic/yield-star-spacing": ["warn", "after"],

					// TS-specific
					"@stylistic/ts/member-delimiter-style": ["warn", { multiline: { delimiter: "semi", requireLast: true }, singleline: { delimiter: "semi", requireLast: false } }],
					"@stylistic/ts/type-annotation-spacing": ["warn", { before: false, after: true }],
				},
			},
		},


		...tseslint.configs.strictTypeChecked,
		...tseslint.configs.stylisticTypeChecked,
		{
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
