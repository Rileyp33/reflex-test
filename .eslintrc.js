module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'standard',
    'plugin:react/recommended'
  ],
  'plugins': [
    'react',
    'react-native'
  ],
  'ecmaFeatures': {
    'jsx': true
  },
  'env': {
    'react-native/react-native': true
  },
  'rules': {
    'react/display-name': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 1,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react/prop-types': 0,
    'no-return-assign': 0,
    'no-debugger': 0,
    'react/no-unescaped-entities': 0
  }
}
