import { createContext } from 'react'

export interface SettingsContext {
  oscillatorType: OscillatorType
  setOscillatorType: (oscillatorType: OscillatorType) => void
  volume: number
  setVolume: (volume: number) => void
  fadeOutDuration: number
  setFadeOutDuration: (fadeOutDuration: number) => void
  pianoPedal: boolean
  setPianoPedal: (pianoPedal: boolean) => void
}

const defaultSettings: SettingsContext = {
  oscillatorType: 'square',
  setOscillatorType: () => {},
  volume: 0.5,
  setVolume: () => {},
  fadeOutDuration: 4,
  setFadeOutDuration: () => {},
  pianoPedal: false,
  setPianoPedal: () => {},
}

export const SettingsContext = createContext<SettingsContext>(defaultSettings)
