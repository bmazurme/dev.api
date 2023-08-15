import path from 'path';
import { config as dotEnvConfig } from 'dotenv';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import ESLintPlugin from 'eslint-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';

dotEnvConfig();

type Environment = 'development' | 'production' | 'none' | undefined;

const common = {
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules'],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

const server = merge<Configuration>(common, {
  name: 'server',
  target: 'node',
  entry: ['./src/index.ts'],
  mode: process.env.NODE_ENV as Environment ?? 'development',
  externals: [
    nodeExternals({ allowlist: [/\.(?!(?:ts?|json)$).{1,5}$/i] }),
  ],
  plugins: [
    new NodemonPlugin({
      script: './dist/server',
      watch: ['./dist'],
      delay: 1000,
      verbose: true,
      env: {
        NODE_ENV: 'development',
      },
    }),
  ],
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist'),
  },
});

export default [server];
