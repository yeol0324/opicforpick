import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),

  /**
   * 공통 룰: TS/React + import 정렬
   */
  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      import: importPlugin,
    },

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      /**
       * 기존 import/order 유지
       */
      'import/order': [
        'error',
        {
          groups: ['external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@pages/**', group: 'internal', position: 'before' },
            { pattern: '@features/**', group: 'internal', position: 'before' },
            { pattern: '@entities/**', group: 'internal', position: 'before' },
            { pattern: '@shared/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],

      /**
       * entities는 public API로만 import
       * - @entities/sentence
       */
      'import/no-internal-modules': [
        'error',
        {
          forbid: [
            '@entities/*/api/**',
            '@entities/*/model/**',
            '@entities/*/ui/**',
          ],
        },
      ],
    },
  },

  /**
   * shared 계층: 상위 계층 import 금지
   */
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@pages/**', '@features/**', '@entities/**', '@app/**'],
            },
          ],
        },
      ],
    },
  },

  reactHooks.configs.flat.recommended,
]);
