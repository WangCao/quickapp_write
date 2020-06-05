import pkg from "./package.json";
import baseConfig from "./rollup.base";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";

export default [
  {
    ...baseConfig,
    output: {
      file: pkg.module,
      format: "esm"
    }
  },
  {
    ...baseConfig,
    output: {
      file: pkg.module.replace(".js", `_${pkg.version}.min.js`),
      format: "esm"
    },
    plugins: [...baseConfig.plugins, terser(), filesize()]
  }
];