module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    jest: true
  },

  rules: {
    semi: [2, 'never'],
    'wrap-iife': [2, 'inside'],
    'no-unexpected-multiline': 2,
    'no-multiple-empty-lines': [2, { max: 3 }],
  },
}
