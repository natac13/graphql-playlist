const path = require('path')
const nodeExternals = require('webpack-node-externals')
const chalk = require('chalk')
const Dotenv = require('dotenv-webpack')

console.log(
  `Start Webpack build with process.env.NODE_ENV=${process.env.NODE_ENV}`
)

const plugins = []
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

if (isDev) {
  console.log(chalk.cyan(`Non-production environment. Set ENVs for .env`))
  plugins.push(
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
    })
  )
} else if (isProd) {
  console.log(
    chalk.cyan(`Production environment. ENVs are set with serverless.yml`)
  )
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: './src/app.ts',
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts', '.js'],
    symlinks: false,
    cacheWithContext: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/',
  },
  target: 'node',
  externals: [nodeExternals()],
  devServer: {
    static: './dist',
    port: 4000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins,
  optimization: {
    runtimeChunk: 'single',
  },
}
