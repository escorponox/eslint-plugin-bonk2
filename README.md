# eslint-plugin-bonk2
ESLint rules

## Usage

Add this plugin to your ESLint plugins:

```js
plugins: [
  "bonk2"
]

```

Add your rules to the rules section

```js
rules: {
  "bonk2/no-smart-import-rename": "error",
  "bonk2/no-untyped-apollo-hooks": "error
}

```

## Rules

- `bonk2/no-smart-import-rename`: blocks Apollo hooks renaming so you can't cheat
- `bonk2/no-untyped-apollo-hooks`: forces Apollo hooks to be typed with result and variables
