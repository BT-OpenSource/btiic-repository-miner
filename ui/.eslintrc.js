module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ["eslint:recommended", "plugin:jest/recommended"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 8,
        sourceType: "module"
    },
    plugins: ["react", "jest"],
    parser: "babel-eslint",
    rules: {
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "no-console": "off"
    }
};
