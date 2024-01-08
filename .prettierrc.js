/**
 * @type {import('prettier').Options}
 */
module.exports = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: false,
  printWidth: 80,
  arrowParens: "always",
  importOrder: ["^@/(.*)$", "^~/(.*)$", "^[./]"],
  importOrderSeparation: true,
  pluginSearchDirs: false,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}
