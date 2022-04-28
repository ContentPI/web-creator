import {
  ConfigArgs,
  getWebpackCommonConfig,
  getWebpackDevelopmentConfig,
  getWebpackProductionConfig
} from '@web-creator/devtools'
import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

// Mode Config
const getModeConfig = {
  development: getWebpackDevelopmentConfig,
  production: getWebpackProductionConfig
}

// Mode Configuration (development/production)
const modeConfig: (args: ConfigArgs) => Configuration = ({ mode, type, packageName }) => {
  const getWebpackConfiguration = getModeConfig[mode]
  return getWebpackConfiguration({ configType: type, packageName })
}

// Merging all configurations
const webpackConfig: (args: ConfigArgs) => Promise<Configuration> = async (
  { mode, type, packageName } = {
    mode: 'production',
    type: 'package',
    packageName: 'utils'
  }
) => {
  const commonConfiguration = getWebpackCommonConfig({
    configType: type,
    packageName,
    mode
  })

  // Mode Configuration
  const modeConfiguration = mode && type ? modeConfig({ mode, type, packageName }) : {}

  // Merging all configurations
  const webpackConfiguration = merge(commonConfiguration, modeConfiguration)

  // Logging Webpack Configuration
  console.log(webpackConfiguration)

  return webpackConfiguration
}

export default webpackConfig
