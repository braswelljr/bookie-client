module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/no-unused-vars': 'warn',
    'vue/multi-word-component-names': 0,
    'vue/operator-linebreak': 0,
    'vue/first-attribute-linebreak': [
      'warn',
      {
        singleline: 'ignore',
        multiline: 'below'
      }
    ],
    'prettier/prettier': [
      'warn',
      {},
      {
        usePrettierrc: true,
        ignoreFiles: ['**/node_modules/**', '**/dist/**']
      }
    ]
  }
}
