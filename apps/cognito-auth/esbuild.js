const esbuild = require("esbuild");
const path = require("path");

esbuild.build({
  sourcemap: true,
  entryPoints: [path.resolve(__dirname, "lib", "index.js")],
  bundle: true,
  outfile: path.resolve(__dirname, "build", "index.js"),
  minify: true,
  platform: "node",
  target: "node14",
});
