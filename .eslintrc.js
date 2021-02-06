module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
     'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  "rules": {
    'semi': ['warn'],
    "max-len": [1, 80, 2, { "ignoreComments": true}]
  }
}
