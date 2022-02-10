module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "jest": true
  },
  "extends": [
      "plugin:react/recommended",
      "airbnb",
      "plugin:@typescript-eslint/recommended",
      "prettier"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "react-hooks",
      "@typescript-eslint",
      "simple-import-sort",
      "prettier"
  ],
  "rules": {
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-function-return-type": ["off", {"allowExpressions": true}],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "_" }
    ],
    "arrow-parens": "off",
    "camelcase": "off",
    "class-methods-use-this": "off",
    "global-require": "off",
    "import/prefer-default-export": "off",
    "import/no-duplicates": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never"
      }
    ],
    "no-restricted-syntax": "off",
    "no-underscore-dangle": "off",
    "no-unused-expressions": "off",
    "no-use-before-define": "off",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-continue": "off",
    "object-curly-newline": "off",
    "operator-linebreak": "off",
    "prefer-const": "off",
    "prettier/prettier": "warn",
    "react/jsx-one-expression-per-line": "off",
    "react-native/no-raw-text": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".ts"] }],
    "react/destructuring-assignment": "off",
    "react/no-array-index-key": "off",
    "react/function-component-definition": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-newline": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src"
      },
      "typescript": {}
    }
  }
}
