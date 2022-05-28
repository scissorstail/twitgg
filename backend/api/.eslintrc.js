module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'eslint-config-airbnb-base', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          [
            '@',
            './src',
          ],
        ],
      },
    },
  },
  rules: {
    'no-console': 'off',
    'linebreak-style': 'off',
    'global-require': 'off',
    'node/no-missing-require': 'off',
  },
};
