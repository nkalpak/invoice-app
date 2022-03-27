// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@rushstack/eslint-config/patch/modern-module-resolution");

module.exports = {
  extends: [
    "@rushstack/eslint-config/profile/web-app",
    "@rushstack/eslint-config/mixins/react",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { tsconfigRootDir: __dirname },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@rushstack/typedef-var": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/jsx-no-bind": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
      },
    },
  ],
};
