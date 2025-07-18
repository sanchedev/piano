import { createContext, use } from 'react'

interface AudioContext {
  audioContext: globalThis.AudioContext
  laNotes: AudioBuffer[] // 0 - 7
}

export const AudioContext = createContext<AudioContext | null>(null)

export function useAudioContext() {
  return use(AudioContext)
}
