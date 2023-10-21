module.exports = {
    entry: "./dist/index.js",
    mode: "production",
    output: {
        filename: "index.js",
        library: {
            type: "umd",
            name: "ConstrastRatioChecker",
        },
        // prevent error: `Uncaught ReferenceError: self is not define`
        globalObject: "this",
    },
}
