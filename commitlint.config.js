export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']],
    'scope-enum': [2, 'always', ['release', 'core', 'cli', 'docs', 'examples', 'lint', 'test', 'deps', 'config', 'i18n', 'infra', 'other']]
  }
}