const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    // Multiple entries.
    entry: {
        background: './src/background.ts',
        popup: {
            import: './src/popup/popup.ts',
            filename: 'popup/[name].js', // Customize the path in output folder.
        },
        options: {
            import: './src/options/options.ts',
            filename: 'options/[name].js', // Customize the path in output folder.
        },
        'content-script': {
            import: './src/content-script/content-script.ts',
            filename: 'content-script/[name].js', // Customize the path in output folder.
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json' },
                { from: './**/*.html', context: './src' },
                { from: './**/*.css', context: './src' },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            '...', // Use the existing minimizers (`terser-webpack-plugin`).
            new HtmlMinimizerPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    devtool: 'cheap-module-source-map',
};
