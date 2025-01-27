import { CONFIG, CONFIG_TYPE, FILES } from '@/config/config'
import { LocaleParams } from '@/locales/localeParams'
import readLocale from '@/locales/readLocale'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import os from 'os'

export type ConfigParams = {
  config: CONFIG_TYPE
  locale: LocaleParams
}

export const readOrCreateDefaultConfig = () => {
  const homeDir = os.homedir()
  const configPath = `${homeDir}/${FILES.CONFIG}`
  if (existsSync(configPath)) {
    const config = JSON.parse(readFileSync(configPath, 'utf-8')) as CONFIG_TYPE
    let locale = readLocale(config.LANG)
    return {
      config,
      locale,
    } as ConfigParams
  }
  writeFileSync(configPath, JSON.stringify(CONFIG, null, 2))
  console.log(`Created default config file at ${configPath}`)
  let locale = readLocale(CONFIG.LANG)
  return { config: CONFIG, locale } as ConfigParams
}
