import { CONFIG } from '@/config/config'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { monitorUpdate, updateVersion } from './update'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'

export const mainnetUpdate = async () => {
  const version = CONFIG.MAINNET_SOLANA_VERSION
  updateSolvConfig({
    MAINNET_SOLANA_VERSION: version,
    SOLANA_VERSION: version,
  })
  updateVersion(version)
  Logger.normal(`✔️ Update to Solana Version ${chalk.green(version)}`)
  monitorUpdate(CONFIG.DELINQUENT_STAKE, true)
}
