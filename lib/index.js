import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwind from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";
import { CaseBlocks, NoInstanceof } from "./rules.js";

/**
 * @param {{
 *  styler?: "prettier" | "stylistic",
 *  enableJsx?: boolean,
 *  enableTs?: boolean,
 *  enableTailwind?: boolean,
 *  sortImports?: boolean,
 * }} options
 * @returns {Array<any>}
 * */
export default function hagemanto({
	styler = "stylistic",
	enableJsx = true,
	enableTs = true,
	enableTailwind = true,
	sortImports = true,
} = {}) {
	const stylisticCustomized = stylistic.configs.customize({
		indent: "tab",
		quotes: "double",
		semi: true,
		jsx: true,
	});

	const config = [];

	// hagemanto - base
	config.push({
		name: "hagemanto/base",
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

	if (styler === "prettier") config.push({
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

	// eslint - default
	config.push({
		name: "hagemanto/eslint/recommended",
		...eslint.configs.recommended
	})

	// eslint - fine-tuned
	config.push({
		name: "hagemanto/eslint/fine-tuned",
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

			// these 2 are too strict
			// "no-inner-declarations": "off",
			// "no-promise-executor-return": "off",

			"no-self-compare": "error",
			"no-template-curly-in-string": "error",
			"no-unmodified-loop-condition": "error",
			"no-unreachable-loop": "error",
			"require-atomic-updates": "error",

			// ==================================================
			// Suggestions
			// These rules suggest alternate ways of doing things
			// ==================================================

			"accessor-pairs": "error",

			"block-scoped-var": "error",
			"camelcase": ["error", { properties: "never" }],

			"class-methods-use-this": "error",
			"curly": "error",

			"default-case-last": "error",
			"default-param-last": "error",
			// Enforce dot notation. Although snake_case is legal as an object property,
			// the above camelCase rule rejects it. As such, we enforce that all snake
			// case variables end up in ["square_brackets"].
			"dot-notation": ["error", { allowPattern: "^[a-z]+(_[a-z]+)+$" }],
			"eqeqeq": "error",
			"func-name-matching": "error",
			"func-names": "error",
			"func-style": ["error", "declaration", { allowArrowFunctions: true }],
			"grouped-accessor-pairs": "error",

			"max-nested-callbacks": ["error", { max: 3 }], // default is 10

			"new-cap": ["error", { capIsNew: false }],
			"no-alert": "error",
			"no-array-constructor": "error",
			"no-bitwise": "error",
			"no-caller": "error",

			"no-div-regex": "error",
			"no-else-return": "error",

			"no-empty-function": "error",

			"no-eq-null": "error",
			"no-eval": "error",
			"no-extend-native": "error",
			"no-extra-bind": "error",

			"no-extra-label": "error",

			"no-implicit-coercion": ["error", { allow: ["!!"] }],

			"no-implied-eval": "error", // handled by typescript-eslint

			"no-iterator": "error",

			"no-labels": "error",
			"no-lone-blocks": "error",
			"no-lonely-if": "error",

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

			"no-proto": "error",

			"no-restricted-globals": [
				"error",
				{
					name: "parseInt",
					message: 'Use Number() to convert strings to numbers. parseInt is very liberal with what it considers a number. Number("4f") -> NaN, parseInt("4helloworld") -> // 4',
				},
				{
					name: "isNaN",
					message: 'Use Number.isNaN instead. isNaN does not check the input is of type number, and instead coerces input into a number. isNaN("foo") -> true, Number.isNaN("foo") -> false',
				},
				{
					name: "Boolean",
					message: 'Use !!variable instead of Boolean(variable).',
				},
			],

			"no-restricted-properties": [
				"error",
				{
					property: "forEach",
					message: "Use a for-of loop instead of Array.forEach.",
				},
				{
					object: "Number",
					property: "parseInt",
					message: 'Use Number() to convert strings to numbers. parseInt is very liberal with what it considers a number. Number("4f") -> NaN, parseInt("4helloworld") -> 4',
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

			"no-undef-init": "error",

			"no-unneeded-ternary": "error",

			"no-useless-call": "error",

			"no-useless-computed-key": "error",
			"no-useless-concat": "error",
			"no-useless-constructor": "error",

			"no-useless-rename": "error",
			"no-useless-return": "error",
			"no-var": "error",

			"object-shorthand": "error",

			"operator-assignment": "error",
			"prefer-arrow-callback": "error",
			"prefer-const": "error",

			"prefer-exponentiation-operator": "error",

			"prefer-numeric-literals": "error",
			"prefer-object-has-own": "error",
			"prefer-object-spread": "error",

			"prefer-regex-literals": "error",
			"prefer-rest-params": "error",
			"prefer-spread": "error",
			"prefer-template": "error",

			"require-await": "error",
			"require-unicode-regexp": "error",

			"sort-vars": "error",

			"symbol-description": "error",

			"yoda": "error",

			// =========================================
			// Layout & Formatting
			// These rules care about how the code looks
			// rather than how it executes
			// =========================================
		}
	});

	if (styler === "stylistic") {
		config.push({
			...stylisticCustomized,
			name: "hagemanto/stylistic/recommended",

		})

		config.push({
			name: "hagemanto/stylistic/fine-tuned",
			rules: {
				"@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
				"@stylistic/function-call-argument-newline": ["error", "consistent"],
				"@stylistic/function-call-spacing": "error",
				"@stylistic/generator-star-spacing": "error",
				"@stylistic/implicit-arrow-linebreak": "error",
				"@stylistic/linebreak-style": "error",
				"@stylistic/max-statements-per-line": ["error", { "max": 3 }],
				"@stylistic/newline-per-chained-call": "error",
				"@stylistic/no-confusing-arrow": "error",
				"@stylistic/no-extra-semi": "error",
				"@stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 1 }],
				"@stylistic/nonblock-statement-body-position": "error",
				"@stylistic/object-curly-newline": "error",
				"@stylistic/padded-blocks": ["error", "never", { "allowSingleLineBlocks": true }],

				"@stylistic/semi-style": "error",
				"@stylistic/space-before-function-paren": ["error", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
				"@stylistic/switch-colon-spacing": "error",
				"@stylistic/wrap-iife": ["error", "inside"],
				"@stylistic/wrap-regex": "error",

				...(enableTs ? {
					"@stylistic/type-annotation-spacing": ["error", { before: false, after: true }],
				} : {}),

				...(enableJsx ? {
					// off by default
					"@stylistic/jsx-child-element-spacing": "error",
					"@stylistic/jsx-pascal-case": "error",

					// we might want to add an empty line before the `{...props}` for readability
					// return <div
					// 	foo="a lot"
					// 	bar="of props"
					// 	baz="here"
					//
					// 	{...props}
					// 	/>
					"@stylistic/jsx-props-no-multi-spaces": "off",
					"@stylistic/jsx-self-closing-comp": "error",
					"@stylistic/jsx-max-props-per-line": ["error", { maximum: 3, when: "multiline" }],
					"@stylistic/jsx-one-expression-per-line": ["error", { "allow": "single-line" }],
				} : {}),
			},
		})
	}

	if (enableTs) {
		for (const c of tseslint.configs.strictTypeChecked) {
			config.push({ ...c, name: `hagemanto/${c.name?.replace("eslint-recommended", "recommended")}` });
		}

		for (const c of tseslint.configs.stylisticTypeChecked) {
			if (c.name && (c.name.endsWith("/base") || c.name.endsWith("recommended"))) continue;
			config.push({ ...c, name: `hagemanto/${c.name}` });
		}

		config.push({
			name: "hagemanto/typescript-eslint/fine-tuned",
			rules: {
				"@typescript-eslint/array-type": ["error", { default: "array-simple" }],

				"@typescript-eslint/ban-ts-comment": [
					"error",
					{
						"ts-expect-error": "allow-with-description",
						minimumDescriptionLength: 3,
					},
				],
				"@typescript-eslint/ban-tslint-comment": "off",

				"@typescript-eslint/class-methods-use-this": "error",

				"@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "as", objectLiteralTypeAssertions: "never" }],

				"@typescript-eslint/consistent-type-exports": "error",
				"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
				"@typescript-eslint/default-param-last": "error",

				"@typescript-eslint/explicit-function-return-type": "error",
				"@typescript-eslint/explicit-member-accessibility": "error",
				"@typescript-eslint/explicit-module-boundary-types": "error",

				"@typescript-eslint/no-import-type-side-effects": "error",

				"@typescript-eslint/no-loop-func": "error",

				"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],

				"@typescript-eslint/no-redeclare": "error",

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
				"@typescript-eslint/no-use-before-define": "error",

				"@typescript-eslint/no-useless-empty-export": "error",

				"@typescript-eslint/parameter-properties": "error",

				"@typescript-eslint/prefer-enum-initializers": "error",

				"@typescript-eslint/prefer-readonly": "error",

				"@typescript-eslint/require-array-sort-compare": "error",

				"@typescript-eslint/restrict-template-expressions": "off", // too strict & inconvenient

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
			}
		})
	}

	if (sortImports) {
		config.push({
			name: "hagemanto/sort-imports",
			plugins: {
				"simple-import-sort": simpleImportSort,
			},
			rules: {
				"simple-import-sort/imports": "error",
				"simple-import-sort/exports": "error",
			}
		});
	}

	if (enableTailwind) {
		for (const c of tailwind.configs["flat/recommended"]) {
			config.push({ ...c, name: `hagemanto/${c.name?.replace(":", "/")}` });
		}
	}

	return config;
}
