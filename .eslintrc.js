module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		indent: ['warn', 'tab'],
		'@typescript-eslint/strict-boolean-expressions': 'warn',
	},
}
