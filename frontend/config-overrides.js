const webpack = require("webpack")

const findWebpackPlugin = (plugins, pluginName) =>
  plugins.find((plugin) => plugin.constructor.name === pluginName)
const ENV_PREFIX = /^REACT_APP_/i

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
    path: require.resolve("path-browserify"),
    tty: require.resolve("tty-browserify"),
  }

  const plugin = findWebpackPlugin(config.plugins, "DefinePlugin")
  const processEnv = plugin.definitions["process.env"] || {}

  const transformedEnv = Object.keys(processEnv)
    .filter((key) => ENV_PREFIX.test(key))
    .reduce((env, key) => {
      const craKey = key.replace("REACT_APP_", "")
      env[craKey] = processEnv[key]
      return env
    }, {})

  plugin.definitions["process.env"] = {
    ...processEnv,
    ...transformedEnv,
  }

  const envKeys = {
    test: "hallo",
  }

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.DefinePlugin(envKeys),
  ]

  return config
}
