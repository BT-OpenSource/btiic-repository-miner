module.exports = {
    resetMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/registerServiceWorker.js", "!src/setupTests.js"],
    setupFiles: ["<rootDir>/src/setupTests"],
    testPathIgnorePatterns: [],
    testURL: "http://www.example.com:18090",
    coverageReporters: ["html", "text", "lcov"],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
