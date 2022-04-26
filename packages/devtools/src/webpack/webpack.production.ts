import { Configuration } from 'webpack'

import { ModeArgs } from './webpack.types'

const getWebpackProductionConfig = (args: ModeArgs): Configuration => {
  console.log(args)

  const webpackConfig = {
    mode: 'production',
    devtool: false
  }

  return webpackConfig as Configuration
}

export default getWebpackProductionConfig
