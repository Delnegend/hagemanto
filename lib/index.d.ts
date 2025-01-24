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

    /**
     * The `extraFileExtensions` in `laguageOptions.parserOptions`
     *
     * Default: `[]`
     */
    extraFileExtensions?: string[]
}

declare function hagemanto(options?: HagemantoOptions): Array<any>

export default hagemanto