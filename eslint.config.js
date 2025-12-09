import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{ts,tsx}"],

    plugins: {
      import: importPlugin,
    },

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "external", // 외부 라이브러리 (예: react, axios)
            "internal", // 프로젝트 내부 import (@/components 등)
            ["parent", "sibling", "index"], // 상대경로 import (../, ./)
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "@pages/**", group: "internal", position: "before" },
            { pattern: "@features/**", group: "internal", position: "before" },
            { pattern: "@entities/**", group: "internal", position: "before" },
            { pattern: "@shared/**", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  reactHooks.configs.flat.recommended,
]);
