import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from 'eslint-plugin-react-native';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['node_modules', '.env']
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.node
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				},
				project: './tsconfig.json'
			}
		},
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'react-native': reactNativePlugin,
			prettier: prettierPlugin
		},
		rules: {
			// React
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/prop-types': 'off',

			// Hooks
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// Reatc Native
			'react-native/no-unused-styles': 'warn',
			'react-native/split-platform-components': 'warn',
			'react-native/no-inline-styles': 'off',
			'react-native/no-color-literals': 'off',

			// Typescript
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-explicit-any': 'off',

			// Prettier formatting
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					semi: true,
					useTabs: true,
					tabWidth: 2,
					printWidth: 100,
					trailingComma: 'none',
					bracketSpacing: true,
					arrowParens: 'always'
				}
			]
		},
		settings: {
			react: {
				version: 'detect'
			}
		}
	}
];
