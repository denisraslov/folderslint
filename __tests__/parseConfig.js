const { validateParsedConfig } = require('../src/parseConfig')

jest.mock('fs')

jest.spyOn(process, 'exit').mockImplementation(() => {})

jest.spyOn(global.console, 'error')

beforeEach(() => {
  console.error.mockReset()
  process.exit.mockReset()
})

test('should not accept ** at the middle of the rule', () => {
  validateParsedConfig({
    root: 'src',
    rules: ['components/**/utils', 'pages/components'],
  })

  expect(process.exit).toHaveBeenLastCalledWith(1)
  expect(console.error).toHaveBeenNthCalledWith(
    1,
    'Invalid rule: components/**/utils'
  )
  expect(console.error).toHaveBeenNthCalledWith(
    2,
    'A rule can have ** only at the end'
  )
})

test('should accept ** at the end of the rule', () => {
  validateParsedConfig({
    root: 'src',
    rules: ['components/**', 'pages/components'],
  })

  expect(process.exit).not.toHaveBeenCalled()
})
