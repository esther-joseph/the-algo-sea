module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: { react: { version: '18.2' } },
  rules: {
    'react/react-in-jsx-scope': 'off',   // not needed with Vite
    'react/prop-types': 'off',           // using JSDoc instead
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
