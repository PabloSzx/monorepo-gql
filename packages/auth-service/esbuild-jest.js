const { transformSync } = require("esbuild");
const { extname } = require("path");

exports.process = function process(content, filename) {
  const result = transformSync(content, {
    loader: extname(filename).slice(1),
    sourcefile: filename,
    format: "cjs",
    target: "es2020",
    sourcemap: true
  });

  return {
    code: result.js,
    map: {
      ...JSON.parse(result.jsSourceMap),
      sourcesContent: null
    }
  };
};
