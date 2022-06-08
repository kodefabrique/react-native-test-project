const ON = 2;

module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:prettier/recommended'],
  rules: {
    'react/destructuring-assignment': [ON],
    'react/jsx-no-bind': [ON],
    'react-native/no-inline-styles': ON,
    'react-native/no-color-literals': ON,
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'React' }],
  },
};
