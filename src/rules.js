const posixSeparatedCwd = require("./posixSeparatedCwd");

const getExtendedRules = (root = "", rules) => {
  const extendedRules = rules;
  rules.forEach((rule) => {
    const splittedRule = rule.split("/");
    let extendedRule = "";
    splittedRule.forEach((rulePart) => {
      extendedRule += (extendedRule ? "/" : "") + rulePart;
      if (!extendedRules.includes(extendedRule)) {
        extendedRules.push(extendedRule);
      }
    });
  });

  const hasRootConfigured = root && root !== ".";
  const extendedRoot = `${posixSeparatedCwd()}${
    hasRootConfigured ? `/${root}` : ""
  }`;
  const extendedRulesWithRoot = extendedRules.map(
    (rule) => (extendedRoot ? `${extendedRoot}/` : "") + rule
  );

  return {
    root: extendedRoot,
    rules: [...extendedRulesWithRoot, extendedRoot],
  };
};

const isPathMatchRule = (path, rule) => {
  const splittedPath = path.split("/");
  const splittedRule = rule.split("/");

  if (rule.includes("**")) {
    const [specifiedPath] = rule.split("/**");
    return path.substr(0, specifiedPath.length) === specifiedPath;
  }

  if (splittedPath.length !== splittedRule.length) {
    return false;
  }
  return splittedRule.reduce((acc, rulePart, i) => {
    const isPermitted = rulePart !== "*" ? rulePart === splittedPath[i] : true;
    return acc && isPermitted;
  }, true);
};

const checkPath = (path, rules) => {
  const isPermitted = rules.reduce((acc, rule) => {
    return acc || isPathMatchRule(path, rule);
  }, false);
  return isPermitted;
};

module.exports = {
  getExtendedRules,
  checkPath,
};
