import nextConfig from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  {
    ignores: [
      ".next/**",
      ".vercel/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...nextConfig,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // The hero illustrations stay as <img> for the View Transitions
      // preload to remain effective.
      "@next/next/no-img-element": "off",
      // The isomorphic-layout-effect pattern (useEffect on SSR,
      // useLayoutEffect on client) reads refs inside the effect, which
      // the new react-hooks/refs rule conservatively flags. Reading
      // refs inside an effect callback is the correct pattern.
      "react-hooks/refs": "off",
    },
  },
];

export default config;
