import ElectronStore from 'electron-store'
import { config } from './config'

export const persists = new ElectronStore({
  encryptionKey: config.storeEncryptionKey,
})

export const persistKeys = {
  launchAtLogin: 'launchAtLogin',
  recognitionEngine: 'recognizeEngine',
  muteScreenshotSound: 'muteScreenshotSound',

  baiduAuthInfo: 'baiduAuthInfo',
  tencentAuthInfo: 'tencentAuthInfo',
  googleAPIKey: 'googleAPIKey',

  lastRecognitionResult: 'lastRecognitionResult',
  recognitionResultWindowOptions: 'recognitionResultWindowOptions',
}

export function getStoredBooleanValue(key: string): boolean {
  return persists.get(key) as boolean
}

export function getStoredValue<T>(key: string): T {
  return persists.get(key) as T
}

export type RecognitionEngine = 'baidu' | 'google' | 'tencent' | ''

export interface BaiduAuthInfo {
  appKey: string,
  appSecret: string,
}

export function getBaiduAuthInfo(
  defaultValue: BaiduAuthInfo = config.baiduAuthInfo,
): BaiduAuthInfo {
  return persists.get(persistKeys.baiduAuthInfo, defaultValue)
}

export function setBaiduAuthInfo(value: BaiduAuthInfo): void {
  persists.set(persistKeys.baiduAuthInfo, value)
}

export interface TencentAuthInfo {
  secretId: string,
  secretKey: string,
}

export function getTencentAuthInfo(
  defaultValue: TencentAuthInfo = config.tencentAuthInfo,
): TencentAuthInfo {
  return persists.get(persistKeys.tencentAuthInfo, defaultValue)
}

export function setTencentAuthInfo(value: TencentAuthInfo): void {
  persists.set(persistKeys.tencentAuthInfo, value)
}

export function getGoogleAPIKey(defaultValue: string = config.googleAPIKey): string {
  return persists.get(persistKeys.googleAPIKey, defaultValue)
}

export function setGoogleAPIKey(value: string): void {
  return persists.set(persistKeys.googleAPIKey, value)
}

export function getRecognitionEngine(): RecognitionEngine {
  const engine = persists.get(persistKeys.recognitionEngine)
  if (engine) {
    return engine as RecognitionEngine
  }

  const baiduAuthInfo = getBaiduAuthInfo()
  if (baiduAuthInfo.appKey && baiduAuthInfo.appSecret) {
    return setRecognizeEngine('baidu')
  }

  const tencentAuthInfo = getTencentAuthInfo()
  if (tencentAuthInfo.secretId && tencentAuthInfo.secretKey) {
    return setRecognizeEngine('tencent')
  }

  const googleAPIKey = getGoogleAPIKey()
  if (googleAPIKey) {
    return setRecognizeEngine('google')
  }

  return ''
}

export function setRecognizeEngine(value: RecognitionEngine): RecognitionEngine {
  persists.set(persistKeys.recognitionEngine, value)
  return value
}

export interface RecognitionResult {
  path: string,
  result: string[],
}

export function getLastRecognitionResult(): RecognitionResult {
  return persists.get(persistKeys.lastRecognitionResult, {}) as RecognitionResult
}

export function setLastRecognitionResult(data: RecognitionResult) {
  return persists.set(persistKeys.lastRecognitionResult, data)
}

export function delLastRecognitionResult() {
  persists.delete(persistKeys.lastRecognitionResult)
}

export interface RecognitionResultWindowOptions {
  pinned?: boolean
  showImage?: boolean
}

export function getRecognitionResultWindowOptions(): RecognitionResultWindowOptions {
  return persists.get(persistKeys.recognitionResultWindowOptions, {})
}

export function setRecognitionResultWindowOptions(options: RecognitionResultWindowOptions) {
  persists.set(persistKeys.recognitionResultWindowOptions, options)
}


