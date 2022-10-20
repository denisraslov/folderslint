const { readFileSync } = require('fs')

const CONFIG_PATH = '.folderslintrc'

const parseConfig = () => {
  try {
    const config = readFileSync(CONFIG_PATH, 'utf8')
    return validateParsedConfig(JSON.parse(config))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const validateParsedConfig = (config) => {
  config.rules.forEach((rule) => {
    if (rule.includes('**') && rule.substr(rule.length - 2, 2) !== '**') {
      console.error(`Invalid rule: ${rule}`)
      console.error('A rule can have ** only at the end')
      process.exit(1)
    }

    if (rule.includes("!") && rule.startsWith("!") && rule.split("!").length > 2) {
      console.error(`Invalid rule: ${rule}`)
      console.error('A rule can have at most one ! at the beginning')
      process.exit(1)
    }
  })
  return config
}

module.exports = { parseConfig, validateParsedConfig }
