module.exports = {
  hooks: {
    'pre-commit': 'npm run checkTs && lint-staged',
    'prepare-commit-msg': 'devmoji -e',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
};
