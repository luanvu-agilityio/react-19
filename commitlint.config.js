export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Formatting, no code change
        'refactor', // Code change, no feature or bug fix
        'test', // Adding or updating tests
        'chore', // Maintenance tasks
        'revert', // Revert a commit
        'ci', // CI/CD changes
        'perf', // Performance improvements
      ],
    ],
    'subject-max-length': [2, 'always', 72],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
  },
};
