const posixSeparatedCwd = require('./posixSeparatedCwd')

const getExtendedRules = (root = '', rules) => {
  const extendedRules = rules
  rules.forEach((rule) => {
    const splittedRule = rule.split('/')
    let extendedRule = ''
    splittedRule.forEach((rulePart) => {
      extendedRule += (extendedRule ? '/' : '') + rulePart
      if (!extendedRules.includes(extendedRule)) {
        extendedRules.push(extendedRule)
      }
    })
  })

  const hasRootConfigured = root && root !== '.'
  const extendedRoot = `${posixSeparatedCwd()}${
    hasRootConfigured ? `/${root}` : ''
  }`
  const extendedRulesWithRoot = extendedRules.map(
    (rule) => (extendedRoot ? `${extendedRoot}/` : '') + rule
  )

  return {
    root: extendedRoot,
    rules: [...extendedRulesWithRoot, extendedRoot],
  }
}

const isPathMatchRule = (path, rule) => {
  const splittedPath = path.split('/')

  const isNegation = rule.startsWith("!");
  const splittedRule = (isNegation ? rule.substring(1) : rule).split('/')

  const isValid = splittedPath.reduce((acc, pathPart, i) => {
    const rulePart = splittedRule[i]
    const isPermitted =
      rulePart !== '*' && rulePart !== '**' && rulePart !== undefined
        ? pathPart === rulePart
        : true
    return acc && isPermitted
  }, true)

  if (!isValid) {
    return isNegation
  }

  if (!rule.includes('**') && splittedPath.length > splittedRule.length) {
    return isNegation
  }

  return !isNegation
}

const checkPath = (path, rules) => {
  const isPermitted = rules.reduce((acc, rule) => {
    return acc || isPathMatchRule(path, rule)
  }, false)
  return isPermitted
}

module.exports = {
  getExtendedRules,
  checkPath,
}
