import license from "rollup-plugin-license";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";

const licenseBanner = license({
  banner: {
    content: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */",
    commentStyle: "none"
  }
});

export default {
  input: "src/main.js",
  plugins: [
    licenseBanner,
    json(),
    replace({
      "process.env.APP_ENV": JSON.stringify(process.env.APP_ENV || "prod")
    })
  ]
};