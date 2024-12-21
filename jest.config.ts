import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  modulePathIgnorePatterns: ["<rootDir>/.next/"],
  verbose: true,
};

export default config;
