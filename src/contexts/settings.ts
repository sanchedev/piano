import { createContext } from 'react'

export interface SettingsContext {
  volume: number
  setVolume: (volume: number) => void
  pianoPedal: boolean
  setPianoPedal: (pianoPedal: boolean) => void
}

const defaultSettings: SettingsContext = {
  volume: 0.5,
  setVolume: () => {},
  pianoPedal: false,
  setPianoPedal: () => {},
}

export const SettingsContext = createContext<SettingsContext>(defaultSettings)
