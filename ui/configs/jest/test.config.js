module.exports = {
    // NOTE: if you don't set this correctly then when you reference
    // it later in a path string you'll get a confusing error message.
    // It says something like' Module <rootDir>/config/polyfills.js in
    // the setupFiles option was not found.'
    rootDir: "./../../",
    resetMocks: true,
    collectCoverage: process.env.SKIP_COVERAGE === "true" ? false : true,
    collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/index.js"],
    testMatch: ["**/?(*.)(spec|test).js"],
    testURL: "http://example.org",
    setupFiles: ["<rootDir>/configs/jest/polyfills.js", "<rootDir>/configs/jest/setupTests"],
    transform: {
        "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.css$": "<rootDir>/configs/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/configs/jest/fileTransform.js"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(ol|antd|rc-.*|css-animation|graphviz-react)/)"
    ],
    coverageReporters: ["html", "text", "lcov"],
    moduleFileExtensions: ["web.js", "js", "json", "web.jsx", "jsx", "node"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/configs/jest/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/configs/jest/__mocks__/styleMock.js"
    }
};
