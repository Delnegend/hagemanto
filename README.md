# Hagemanto

> Discipline TS

A very opinionated ESLint rules and config, check [lib/index.js](./lib/index.js) for more info.

## Usage
```bash
pnpm i -D eslint github:Delnegend/hagemanto
```

```javascript
// eslint.config.js
import hagemanto from "eslint-plugin-hagemanto";

export default [
    // ...
    ...hagemanto({
        styler = "stylistic",
        enableJsx = true,
        enableTs = true,
        enableTailwind: true,
        sortImports = true,
        enableDefaultLanguageOptions = true,
        extraFileExtensions = [],
    }), // or just `...hagemanto()` if this is what you're using
    // ,,,
]
```

## Development

There's no build step, just run `pnpm lint` and expect linting errors from eslint.