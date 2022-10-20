const fs = require('fs')
const chalk = require('chalk')
const { parseConfig } = require('../src/parseConfig')
const runLinter = require('../src/runLinter')

jest.mock('fs')
fs.lstatSync.mockImplementation((path) => {
  return {
    isDirectory: () => !path.includes('.'),
  }
})

jest.spyOn(process, 'cwd').mockReturnValue('cwd')
jest.spyOn(process, 'exit').mockImplementation(() => {})

jest.mock('../src/parseConfig')

jest.spyOn(global.console, 'log')

const ERROR_MESSAGE = `${chalk.red(
  'error'
)}  Directory is not allowed by config`

const SUCCESS_MESSAGE = '✅ All checked directories are allowed by config'

beforeEach(() => {
  console.log.mockReset()
})

test('should accept files with direct pathes in config', () => {
  parseConfig.mockReturnValue({
    root: 'src',
    rules: ['components', 'pages/components'],
  })

  runLinter([
    'cwd/src/components',
    'cwd/src/components/Component.js',
    'cwd/src/pages',
    'cwd/src/pages/index.js',
    'cwd/src/pages/components',
    'cwd/src/pages/components/Component.js',
  ])

  expect(process.exit).not.toHaveBeenCalled()
  expect(console.log).toHaveBeenCalledWith(SUCCESS_MESSAGE)
})

test('should accept files with * in config', () => {
  parseConfig.mockReturnValue({
    root: 'src',
    rules: ['components/*', 'pages/*/components'],
  })

  runLinter([
    'cwd/src/components',
    'cwd/src/components/index.js',
    'cwd/src/components/Input',
    'cwd/src/components/Input/index.js',
    'cwd/src/pages',
    'cwd/src/pages/index.js',
    'cwd/src/pages/Main',
    'cwd/src/pages/Main/index.js',
    'cwd/src/pages/Main/components',
    'cwd/src/pages/Main/components/index.js',
  ])

  expect(process.exit).not.toHaveBeenCalled()
  expect(console.log).toHaveBeenCalledWith(SUCCESS_MESSAGE)
})

test('should accept files with * and ** in the same rule', () => {
  parseConfig.mockReturnValue({
    root: 'src',
    rules: ['pages/*/components/**'],
  })

  runLinter([
    'cwd/src/pages/Main/components',
    'cwd/src/pages/Main/components/Input/BaseInput',
    'cwd/src/pages/Main/components/Input/BaseInput/index.js',
    'cwd/src/pages/SignUp/components',
    'cwd/src/pages/SignUp/components/Select/BaseSelect',
    'cwd/src/pages/SignUp/components/Select/BaseSelect/index.js',
  ])

  expect(process.exit).not.toHaveBeenCalled()
  expect(console.log).toHaveBeenCalledWith(SUCCESS_MESSAGE)
})

test('should not accept files with direct pathes in config', () => {
  parseConfig.mockReturnValue({
    root: 'src',
    rules: ['components', 'pages/components'],
  })

  runLinter([
    'cwd/src/components/Input',
    'cwd/src/components/Input/index.js',
    'cwd/src/hooks',
    'cwd/src/pages/components',
    'cwd/src/pages/utils',
  ])

  expect(process.exit).toHaveBeenLastCalledWith(1)

  expect(console.log).toHaveBeenNthCalledWith(
    1,
    chalk.underline('cwd/src/components/Input')
  )
  expect(console.log).toHaveBeenNthCalledWith(2, ERROR_MESSAGE)
  expect(console.log).toHaveBeenNthCalledWith(
    3,
    chalk.underline('cwd/src/hooks')
  )
  expect(console.log).toHaveBeenNthCalledWith(4, ERROR_MESSAGE)
  expect(console.log).toHaveBeenNthCalledWith(
    5,
    chalk.underline('cwd/src/pages/utils')
  )
  expect(console.log).toHaveBeenNthCalledWith(6, ERROR_MESSAGE)
  expect(console.log).toHaveBeenNthCalledWith(7, '')
  expect(console.log).toHaveBeenNthCalledWith(
    8,
    'folderslint: 3 error(s) found'
  )
})

test('should not accept files with * in config', () => {
  parseConfig.mockReturnValue({
    root: 'src',
    rules: ['components/*', 'pages/*/components'],
  })

  runLinter([
    'cwd/src/components',
    'cwd/src/components/Input/utils',
    'cwd/src/hooks',
    'cwd/src/pages/Main/utils',
  ])

  expect(process.exit).toHaveBeenLastCalledWith(1)

  expect(console.log).toHaveBeenNthCalledWith(
    1,
    chalk.underline('cwd/src/components/Input/utils')
  )
  expect(console.log).toHaveBeenNthCalledWith(2, ERROR_MESSAGE)
  expect(console.log).toHaveBeenNthCalledWith(
    3,
    chalk.underline('cwd/src/hooks')
  )
  expect(console.log).toHaveBeenNthCalledWith(4, ERROR_MESSAGE)
  expect(console.log).toHaveBeenNthCalledWith(
    5,
    chalk.underline('cwd/src/pages/Main/utils')
  )
  expect(console.log).toHaveBeenNthCalledWith(6, ERROR_MESSAGE)
  expect(console.log).toHaveBeenNthCalledWith(7, '')
  expect(console.log).toHaveBeenNthCalledWith(
    8,
    'folderslint: 3 error(s) found'
  )
})

test('should not accept files with * and ** in the same rule', () => {
  parseConfig.mockReturnValue({
    root: 'src',
    rules: ['pages/*/components/**'],
  })

  runLinter([
    'cwd/src/pages/Main/test/components',
    'cwd/src/pages/Main/components/Input/BaseInput',
    'cwd/src/pages/Main/components/Input/BaseInput/index.js',
    'cwd/src/pages/SignUp/SignUpBase/components',
    'cwd/src/pages/SignUp/components/Select/BaseSelect',
    'cwd/src/pages/SignUp/components/Select/BaseSelect/index.js',
  ])

  expect(process.exit).toHaveBeenLastCalledWith(1)

  expect(console.log).toHaveBeenNthCalledWith(
    1,
    chalk.underline('cwd/src/pages/Main/test/components')
  )
  expect(console.log).toHaveBeenNthCalledWith(2, ERROR_MESSAGE)
  expect(console.log).toHaveBeenNthCalledWith(
    3,
    chalk.underline('cwd/src/pages/SignUp/SignUpBase/components')
  )
  expect(console.log).toHaveBeenNthCalledWith(4, ERROR_MESSAGE)
  expect(console.log).toHaveBeenNthCalledWith(5, '')
  expect(console.log).toHaveBeenNthCalledWith(
    6,
    'folderslint: 2 error(s) found'
  )
})

test('should not accept files with ! (negation) in the beginning of the rule ', () => {
  parseConfig.mockReturnValue({
    root: 'src',
    rules: ['!pages/*'],
  })

  runLinter(['cwd/src/pages/components'])

  expect(process.exit).toHaveBeenLastCalledWith(1)

  expect(console.log).toHaveBeenNthCalledWith(
    1,
    chalk.underline('cwd/src/pages/components')
  )
  expect(console.log).toHaveBeenNthCalledWith(2, ERROR_MESSAGE)
})
