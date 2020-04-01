module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'comma-dangle': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'arrow-parens': 'off'
  }
};
