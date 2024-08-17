# Hagemanto

Write TS with self-discipline.

## Qu'est-ce que c'est ?

A very opinionated ESLint rules and config, containing

| Plugin | Config preset |
| ---------- | ------------ |
| [ESLint](https://github.com/eslint/eslint) | `@eslint/js.configs.recommended.rules` |
| [typescript-eslint](https://typescript-eslint.io/) | `strictTypeChecked`, `stylisticTypeChecked` |
| [@stylistic/eslint-plugin-ts](https://eslint.style/packages/ts) | `default.configs["all-flat"]` |
| [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) | `prettier` |
| [@cadencejs/eslint-plugin](https://www.npmjs.com/package/@cadencejs/eslint-plugin) | `cadence` |

with many more rules I've manually configured that aren't included in those presets, considering the following sources:

- [eslint.org/docs/latest/rules](https://eslint.org/docs/latest/rules)
- [typescript-eslint.io/rules](https://typescript-eslint.io/rules/)
- [github.com/CadenceJS/Cadence](https://github.com/CadenceJS/Cadence)

## Usage
```bash
pnpm i -D eslint github:Delnegend/hagemanto
```

```javascript
// eslint.config.js
import hagemanto from "eslint-plugin-hagemanto";

export default [
    // ...
	...hagemanto,
    // ,,,
]
```

## Development

There's no build step, just run `pnpm lint` and expect linting errors from eslint.