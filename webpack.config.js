const webpack = require("webpack");
const path = require("path");
const {merge} = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {HtmlAddAssetWebpackPlugin} = require('html-add-asset-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env) => {
    console.log('env', env);

    const mode = env.mode || 'development';
    const app = env.app || 'myapp';
    const platform = env.platform || 'chrome';
    const analyzer = env.analyzer || false;
    const testing = env.test || false;

    const popup = env.popup || false;
    const sidebar = env.sidebar || false;
    const offscreen = env.offscreen || false;

    const sharedPublic = env.sp || false;

    const srcDir = path.join(__dirname, '.', 'src');
    const distDir = path.join(__dirname, '.', 'dist', app + '-' + platform);
    const appDir = path.join(srcDir, 'apps', app, 'src');

    const vendorScriptTags = [];

    const googleFontsTags = [
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com',
            },
        },
        {
            tagName: 'link',
            attributes: {
                crossorigin: true,
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
            },
        },
    ];

    switch (app) {
        default:
            googleFontsTags.push({
                tagName: 'link',
                attributes: {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
                },
            });

            break;
    }

    const publicHtml = {
        template: path.join(srcDir, 'html', 'public.html'),
        tags: [...vendorScriptTags, ...googleFontsTags],
    };

    let config = {
        mode,
        entry: {
            background: path.join(appDir, 'background'),
            content: path.join(appDir, 'content'),
            policy: path.join(appDir, 'policy'),
        },
        output: {
            path: distDir,
            filename: "js/[name].js",
            assetModuleFilename: "img/assets/[name]-[hash:4][ext]"
        },
        optimization: {
            splitChunks: {
                chunks(chunk) {
                    return !['background', 'content'].includes(chunk.name);
                },
                cacheGroups: {
                    react: {
                        name: 'react',
                        test: /[\\/]node_modules[\\/](react|@?react[^\\/]*|[^\\/]*@?react[^\\/]*)[\\/]/,
                        priority: -5,
                        reuseExistingChunk: true,
                        enforce: true,
                    },
                    shared: {
                        name: "shared",
                        test: /[\\/]src[\\/](shared[\\/](api|services|types|utils))[\\/]/,
                        priority: -5,
                        reuseExistingChunk: true,
                        enforce: true,
                    },
                    vendor: {
                        name: "vendor",
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    common: {
                        name: "common",
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: "[local]"
                                },
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass"),
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|apng|jpe?g|gif|webp|svg])$/i,
                    type: "asset/resource",
                },
            ],
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".scss"],
            fallback: {
                url: require.resolve("url"),
                buffer: require.resolve("buffer"),
                http: require.resolve("stream-http"),
                https: require.resolve("https-browserify"),
                timers: require.resolve("timers-browserify"),
                vm: require.resolve("vm-browserify"),
            },
            plugins: [new TsconfigPathsPlugin()]
        },
        plugins: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.EnvironmentPlugin({
                PLATFORM: platform,
                TESTING: testing,
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: ".",
                        to: distDir,
                        context: "src/apps/" + app + "/public",
                    },
                    {
                        from: ".",
                        to: distDir,
                        context: "src/apps/" + app + "/platform/" + platform,
                        force: true
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                ignoreOrder: true,
                filename: "css/[name].css",
                chunkFilename: "css/[id].css",
            }),
            new HtmlWebpackPlugin({
                title: 'Policy',
                filename: path.join(distDir, 'html', 'policy.html'),
                chunks: ['policy'],
                ...publicHtml,
            }),
            new HtmlAddAssetWebpackPlugin(),
        ],
    };

    if (sidebar || popup) {
        config = merge(config, {
            entry: {
                popup: path.join(appDir, 'popup'),
            },
        });
    }

    if (popup) {
        config = merge(config, {
            plugins: [
                new HtmlWebpackPlugin({
                    title: 'Popup',
                    filename: path.join(distDir, 'html', 'popup.html'),
                    chunks: ['popup'],
                    ...publicHtml,
                }),
            ]
        });
    }

    if (sidebar) {
        config = merge(config, {
            plugins: [
                new HtmlWebpackPlugin({
                    title: 'Sidebar',
                    filename: path.join(distDir, 'html', 'sidebar.html'),
                    chunks: ['popup'],
                    ...publicHtml,
                }),
            ]
        });
    }

    if (offscreen) {
        config = merge(config, {
            entry: {
                offscreen: path.join(appDir, 'offscreen'),
            },
            plugins: [
                new HtmlWebpackPlugin({
                    title: 'Offscreen',
                    filename: path.join(distDir, 'html', 'offscreen.html'),
                    chunks: ['offscreen'],
                }),
            ]
        });
    }

    if (sharedPublic) {
        config = merge(config, {
            plugins: [
                new CopyPlugin({
                    patterns: [
                        {
                            from: ".",
                            to: distDir,
                            context: "src/shared/public"
                        },
                    ]
                }),
            ]
        });
    }

    if (mode === 'development') {
        config = merge(config, {
            devtool: 'inline-source-map',
        });
    } else {
        config = merge(config, {
            plugins: [
                new CleanWebpackPlugin(),
            ],
        });

        if (analyzer) {
            config = merge(config, {
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            });
        }
    }

    return config;
};