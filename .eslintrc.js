module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
      },
    ],
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Domain
          {
            from: './src/UseCase/**/*',
            target: './src/Domain/**/!(*.spec.ts|*.test.ts)',
            message:
              'You should not import the UseCase layer in the Domain layer.',
          },
          {
            from: './src/Presentation/**/*',
            target: './src/Domain/**/!(*.spec.ts|*.test.ts)',
            message:
              'You should not import the Presentation layer in the Domain layer.',
          },
          {
            from: './src/Infrastructure/**/*',
            target: './src/Domain/**/!(*.spec.ts|*.test.ts)',
            message:
              'You should not import the Infrastructure layer in the Domain layer.',
          },
          // UseCase
          {
            from: './src/Presentation/**/*',
            target: './src/UseCase/**/!(*.spec.ts|*.test.ts)',
            message:
              'You should not import the Presentation layer in the UseCase layer.',
          },
          {
            from: './src/Infrastructure/**/*',
            target: './src/UseCase/**/!(*.spec.ts|*.test.ts)',
            message:
              'You should not import the Infrastructure layer in the UseCase layer.',
          },
        ],
      },
    ],
  },
}
