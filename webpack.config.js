const path = require("path");

module.exports = {
    mode: "development",
    entry: "./game.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|mp3|wav|xml)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                    outputPath: 'assets'
                    }
                  }
            },
        ]
    },


    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3001
    }
}