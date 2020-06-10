module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'google', 'prettier'],
  rules: {
    'require-jsdoc': 'off',
  },
};
