module.exports = {
  transform: {
    "^.+\\.tsx?$": "./esbuild-jest.js"
  },
  testPathIgnorePatterns: ["/node_modules/", "lib", "dist"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
