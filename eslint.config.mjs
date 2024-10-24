import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    files: ["**/*.ts", "**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: typescriptEslintParser, // Utiliser l'objet du parseur importé
      globals: {
        jest: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': 'warn',
    },
  },
];
