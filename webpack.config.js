module.exports = {
    entry: "./dist/index.js",
    mode: "production",
    output: {
        filename: "index.js",
        library: "ContrastRatioChecker",
        libraryTarget: "umd",
        globalObject: "this",
    },
}
