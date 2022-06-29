module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/valid-attribute-name': 'off',
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always'
    }],
    'vue/html-closing-bracket-spacing': 'error',
    'quotes': ['error', 'single'],
    'eqeqeq': ['error', 'always'],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-eval': 'error',
    'no-script-url': 'error',
    'no-useless-return': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'arrow-body-style': ['error', 'as-needed'],
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'object-curly-spacing': ['error', 'always'],
    'vue/no-use-v-if-with-v-for': 'warn',
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/require-direct-export': 'error',
    'vue/require-name-property': 'warn',
    'vue/v-on-function-call': ['error', 'never'],
  }
}
