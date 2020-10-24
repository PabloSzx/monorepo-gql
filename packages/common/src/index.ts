import type { Config } from "@jest/types";

export const createJestConfig = (config: Config.InitialOptions = {}): Config.InitialOptions => {
  return {
    transform: {
      "^.+\\.tsx?$": "common/esbuild-jest.js"
    },
    testPathIgnorePatterns: ["/node_modules/", "lib", "dist"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    ...config
  };
};

const envName = "NODE_ENV";
export const NODE_ENV: "development" | "production" | "test" = (process.env[envName] as any) || "development";

export const IS_TEST = NODE_ENV === "test";
export const IS_NOT_TEST = !IS_TEST;

export const IS_PRODUCTION = NODE_ENV === "production";

export const IS_DEVELOPMENT = NODE_ENV === "development";
