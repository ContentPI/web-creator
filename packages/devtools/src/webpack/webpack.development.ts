import { Configuration, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack'

const getWebpackDevelopmentConfig = (): Configuration => {
  const webpackConfig: Configuration = {
    mode: 'development',
    devtool: 'source-map',
    plugins: [new HotModuleReplacementPlugin(), new NoEmitOnErrorsPlugin()]
  }

  return webpackConfig
}

export default getWebpackDevelopmentConfig
