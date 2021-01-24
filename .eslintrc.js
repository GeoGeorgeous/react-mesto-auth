module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/no-children-prop': 0,
    'react/button-has-type': 0,
    'no-unused-expressions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
  },
};
