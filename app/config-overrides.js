module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...
    config.resolve.fallback = {
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "url": false,
        "crypto-browserify": require.resolve('crypto-browserify')
    };

    return config
}