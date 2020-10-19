module.exports = {
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "lib", "dist"],
};
