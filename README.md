# StructLint
### 📁 Project directory structure linter

## Why

Directory structure rules are important part of any project. These rules help to raise clarity of the project and reduce its complexity. Having a clearly defined structure make developers always know where to put files and where to find them. If the project is big enough, it is necessary to avoid chaos in it.

`structlint` let you configure directory structure rules and check if existed or new files fit these rules.

## Quick Overview

Install `structlint` globally:

```sh
npm install -g structlint
```

Setup a config file `structlint.json` in the root of the project.
Run `structlint` to check the whole project or a directory (i.e. `/components`):

```sh
structlint components
```

## Configuration
`structlint` needs configuration file named `structlint.json` in the root of the project.

The example of the config:

```json
{
  "root": "src",
  "rules": ["components/*", "pages/components/*", "data"]
}
```

`root` is the directory the structure of which should be checked.

`rules` is an array of rules which define permitted directory pathes.

### Rules syntax

## Usage with [lint-staged](https://github.com/okonet/lint-staged)
It is handy to use `structlint` together with `lint-staged`. In this case `structlint` checks only the files which were modified for a commit.

For that, add `structlint` to the `lint-staged` section of your `package.json`.

For example, this is how `package.json` can look like if you want to run `structlint` as a pre-commit hook via [husky](https://github.com/typicode/husky) tool:

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
  }
},
"lint-staged": {
  "*.{js,ts,tsx}": [
    "structlint"
  ]
}
  ```
