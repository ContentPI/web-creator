export type WebpackMode = 'production' | 'development'
export type ConfigType = 'api' | 'package'
export type Package = 'backend' | 'frontend' | 'utils'
export type ConfigArgs = {
  mode: WebpackMode
  type: ConfigType
  packageName: Package
}
export type ModeArgs = {
  configType: ConfigType
  packageName: Package
  mode?: WebpackMode
  port?: number
}
