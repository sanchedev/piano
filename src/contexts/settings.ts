import { createContext } from 'react'

export interface SettingsContext {
  volume: number
  setVolume: (volume: number) => void
  pianoPedal: boolean
  setPianoPedal: (pianoPedal: boolean) => void
  firstOctave: number
  setFirstOctave: (firstOctave: number) => void
}

const defaultSettings: SettingsContext = {
  volume: 0.5,
  setVolume: () => {},
  pianoPedal: false,
  setPianoPedal: () => {},
  firstOctave: 2,
  setFirstOctave: () => {},
}

export const SettingsContext = createContext<SettingsContext>(defaultSettings)
