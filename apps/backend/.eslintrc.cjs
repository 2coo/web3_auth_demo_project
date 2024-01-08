/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
  ].map(require.resolve),
  parserOptions: {
    project: true,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ["only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["node_modules", "dist", "build", "**/*.config.ts"],
}
