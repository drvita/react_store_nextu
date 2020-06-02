module.exports = {
    entry: './src/App/index.jsx',
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'

    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.jsx$/,
                exclude: /node_modules/
            }
        ]
    }
}