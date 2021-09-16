module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:mdx/recommended",
  ],
  plugins: ["react-hooks"],
  rules: {
    // recommended from eslint-plugin-react-hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "@typescript-eslint/no-unused-vars": ["error"],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
    "mdx/code-blocks": true,
  },
  overrides: [
    {
      files: ["*.md"],
      rules: {
        "prettier/prettier": [
          2,
          {
            // unnecessary if you're not using `eslint-plugin-prettier`, but required if you are
            parser: "markdown",
          },
        ],
      },
    },
    {
      files: ["*.mdx"],
      extends: ["plugin:mdx/overrides"],
    },
    {
      files: "**/*.{md,mdx}/**",
      extends: "plugin:mdx/code-blocks",
    },
  ],
};
