# 📁FoldersLint
### Project directory structure linter

![folderslint in action](https://raw.githubusercontent.com/denisraslov/folderslint/master/demo.png)

## Why

Directory structure rules are important part of any project. These rules help to raise clarity of the project and reduce its complexity. Having a clearly defined structure make developers always know where to put files and where to find them. If the project is big enough, it is necessary to avoid chaos in it.

`structlint` let you configure directory structure rules and check if existed or new files fit these rules.

## Quick Overview

Install `folderslint` globally:

```sh
npm install -g folderslint
```

Setup a config file `.folderslintrc` in the root of the project.

Run `folderslint` to check the whole project or a directory (i.e. `/components`):

```sh
folderslint components
```

## Configuration
`folderslint` needs configuration file named `.folderslintrc` in the root of the project.

The example of the config:

```json
{
  "root": "src",
  "rules": ["components/*", "pages/components/*/utils", "hooks"]
}
```

`root` is the directory the structure of which should be checked.

`rules` is an array of rules which define permitted directory pathes.

### Rules syntax

You can either specify the exact path of a directory or use `*` instead of a directory name if any directory accepted on that level. For example:

Rule | Meaning
--- | --- 
`hooks` | ✅The directory `hooks` (and files in it) are accepted. ❌Any nested directory is not accepted.
`components/*` | ✅The directory `components` are accepted. ✅Any *first level* nested directory is accepted. ❌Any *second level* nested directory is not accepted. 
`components/*/utils` | ✅The directory `components` are accepted. ✅Any *first level* nested directory is accepted. ✅The *second level* nested directory `utils` is accepted. ❌Any other *second level* nested directory is not accepted.

⚠️A rule like `components/*/utils` automatically make the `components` and `components/*` rules work. So, no need to specify a rule for every level directory. You need to specify the deepest path.


## Usage with [lint-staged](https://github.com/okonet/lint-staged)
It is handy to use `folderslint` together with `lint-staged`. In this case `folderslint` checks only the files which were modified for a commit.

For that, add `folderslint` to the `lint-staged` section of your `package.json`.

For example, this is how `package.json` can look like if you want to run `folderslint` as a pre-commit hook via [husky](https://github.com/typicode/husky) tool:

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
  }
},
"lint-staged": {
  "*.{js,ts,tsx}": [
    "folderslint"
  ]
}
  ```
