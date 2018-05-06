const path = require('path')

const config = {
    context: path.resolve(__dirname, "../src"),
    entry: {
        app: './assets/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'assets/js/[name].bundle.js'
    }
};

module.exports = config;