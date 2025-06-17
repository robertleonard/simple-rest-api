import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  // Base JavaScript rules from ESLint
  js.configs.recommended,

  // TypeScript-specific rules
  ...tseslint.configs.recommended,

  {
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      '.turbo/',
    ],
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    rules: {
      // ✅ Recommended common rules for TypeScript/NestJS
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
