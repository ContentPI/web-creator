import path from 'path'
import createStyledComponentsTransformer from 'typescript-plugin-styled-components'
import { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'

import { ModeArgs } from './webpack.types'

const getWebpackCommonConfig = (args: ModeArgs): Configuration => {
  const { configType, packageName } = args

  // Client Entry
  const entry = path.resolve(__dirname, `../../../${packageName}/src/index.ts`)

  // Resolve
  const resolve = {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      buffer: false,
      crypto: false,
      stream: false,
      querystring: false,
      os: false,
      path: path.resolve('path-browserify')
    }
  }

  // Output
  const output = {
    path: path.resolve(__dirname, `../../../${packageName}/dist`),
    filename: '[name].js',
    ...(configType === 'package' && {
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'lib',
      umdNamedDefine: true,
      globalObject: 'this'
    })
  }

  // Rules
  const rules = [
    {
      test: /\.(tsx|ts)$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [
            createStyledComponentsTransformer({
              displayName: true,
              ssr: true,
              minify: true
            })
          ]
        })
      }
    }
  ]

  const webpackConfig = {
    entry,
    externals: [nodeExternals()],
    output,
    resolve,
    module: {
      rules
    },
    target: 'node'
  }

  return webpackConfig as Configuration
}

export default getWebpackCommonConfig
