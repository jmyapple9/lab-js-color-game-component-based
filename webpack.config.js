// var path = require('path'); 

// module.exports = {
//     context: path.resolve(__dirname, './src'),
//     entry: {
//         main: './main.js'
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].bundle.js'
//     },
// }

const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        main: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                // use: [
                //     {
                //         loader: 'babel-loader',
                //         options: {
                //             presets: [
                //                 [
                //                     '@babel/preset-env', {
                //                         modules: false
                //                     }
                //                 ]
                //             ]
                //         }
                //     }
                // ]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
