import baseConfig from './rollup.base';

export default {
  ...baseConfig,
  output: {
    file: "demo/src/main.js",
    format: "esm"
  },
  watch: {
    include: "src/**"
  }
};
