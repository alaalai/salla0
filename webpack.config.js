const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ThemeWatcher = require('@salla.sa/twilight/watcher.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const asset = file => path.resolve('src/assets', file || '');
const public = file => path.resolve("public", file || '');

module.exports = {
    entry  : {
        app     : [
            asset('styles/app.scss'), 
            asset('js/app.js'),
            asset('js/pages/wishlist.js'),
            asset('js/pages/blog.js')
        ],
        home    : asset('js/pages/home.js'),
        'product-card' : asset('js/partials/product-card.js'),
        'main-menu' : asset('js/partials/main-menu.js'),
        'mobile-menu' : asset('js/partials/mobile-menu.js'),
        'cart-drawer' : asset('js/partials/cart-drawer.js'),
        'search' : asset('js/partials/search.js'),
        'wishlist-card': asset('js/partials/wishlist-card.js'),
        checkout: [
            asset('js/pages/cart.js'), 
            asset('js/pages/thankyou.js')
        ],
        pages   : [
            asset('js/pages/loyalty.js'), 
            asset('js/pages/brands.js')
        ],
        product : [
            asset('js/pages/product.js'), 
            asset('js/pages/products.js')
        ],
        order   : asset('js/pages/order.js'),
        testimonials : asset('js/pages/testimonials.js')
    },
    output : {
        path: public(),
        clean: true,
        chunkFilename: "[name].[contenthash].js"
    },
    stats  : {
        modules: false, 
        assetsSort: "size", 
        assetsSpace: 50
    },
    module : {
        rules: [
            {
                test   : /\.js$/,
                exclude: [
                    /(node_modules)/,
                    asset('js/twilight.js')
                ],
                use    : {
                    loader : 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                          ["@babel/plugin-transform-runtime", {
                               "regenerator": true
                           }]
                        ],
                    }
                }
            },
            {
                test: /\.(s(a|c)ss)$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {url: false}},
                    "postcss-loader",
                    "sass-loader",
                ]
            },
        ],
    },
    plugins: [
        new ThemeWatcher(),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {from: asset('images'), to: public('images')}
            ]
        }),
    ],
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
};
