# Hagemanto

> Discipline TS

A very opinionated ESLint rules and config, check [lib/index.js](./lib/index.js) for more info.

## Usage
```bash
pnpm i -D eslint eslint-plugin-hagemanto
```

```javascript
// eslint.config.js
import hagemanto from "eslint-plugin-hagemanto";

export default [
    // ...
    ...hagemanto({
        styler: "stylistic",
        enableJsx: true,
        enableTs: true,
        enableTailwind: true,
        enableVue: false,
        sortImports: true,
        enableDefaultLanguageOptions: true,
    }), // or just `...hagemanto()` if this is what you're using
    // ...
]
```

If you use Vue, you'll need to install [`eslint-plugin-vue`](https://eslint.vuejs.org/) and add it to your config separately.

```bash
pnpm i -D eslint-plugin-vue
```

```javascript
// eslint.config.js
import hagemanto from "eslint-plugin-hagemanto";
import vue from "eslint-plugin-vue";

export default [
    // ...
    ...vue.configs["flat/recommended"],
    ...hagemanto({ enableVue: true }),
    // ...
]
```
