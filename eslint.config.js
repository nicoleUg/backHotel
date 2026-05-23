const eslint = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');

module.exports = [
  eslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Code Smells: God Class / Long Method / Complex Method equivalents
      'max-lines': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 40, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', 10],
      
      // Code Smells: Magic Numbers
      'no-magic-numbers': ['warn', { ignore: [0, 1, -1, 2], enforceConst: true, ignoreArrayIndexes: true }],
      
      // Code Smells: Duplicate / Dead Code / Poor Naming
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'id-length': ['warn', { min: 2, exceptions: ['i', 'j', 'x', 'y', 'e', '_'] }],
      'no-console': 'warn',
    },
  },
];
