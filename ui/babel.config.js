const presets = [
    [
        "@babel/preset-env",
        {
            "corejs": "3",
            "targets": {
                "node": "10"
            },
            "useBuiltIns": "usage"
        }
    ],
    "@babel/preset-react",
];
const plugins = [
    "@babel/plugin-proposal-class-properties"
]

module.exports = { presets, plugins };
