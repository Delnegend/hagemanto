export interface HagemantoOptions {
    /**
     * Use prettier or stylistic for code styling
     *
     * Default: `stylistic`
     */
    styler?: "prettier" | "stylistic"

    /**
     * Enable JSX support
     *
     * Default: `true`
     */
    enableJsx?: boolean

    /**
     * Enable typescript support
     *
     * Default: `true`
     */
    enableTs?: boolean

    /**
     * Enable tailwind support
     *
     * Default: `true`
     */
    enableTailwind?: boolean

    /**
     * Enable vue custom rules, requires [eslint-plugin-vue](https://eslint.vuejs.org/)
     *
     * Default: `false`
     */
    enableVue?: boolean

    /**
     * Enable sorting imports
     *
     * Default: `true`
     */
    sortImports?: boolean

    /**
     * Enable default languageOptions config from tseslint
     *
     * https://typescript-eslint.io/getting-started/typed-linting/
     *
     * Default: `true`
     */
    enableDefaultLanguageOptions?: boolean

}

declare function hagemanto(options?: HagemantoOptions): Array<any>

export default hagemanto