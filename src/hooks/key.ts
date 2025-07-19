import { use, useEffect, useRef } from 'react'
import { getNoteFrequency, type AllNotes } from '../lib/notes'
import { SettingsContext } from '../contexts/settings'
import { useAudioContext } from '../contexts/audioContext'

export function useKeyNote(note: AllNotes, octave: number) {
  const audioContext = useAudioContext()
  const sourceNode = useRef<AudioBufferSourceNode | null>(null)
  const gainNode = useRef<GainNode | null>(null)
  const fadeTimeout = useRef<number | null>(null)

  const releaseTimeout = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      sourceNode.current?.stop()
      sourceNode.current?.disconnect()
      gainNode.current?.disconnect()
    }
  }, [])

  const settings = use(SettingsContext)

  const targetFrequency =
    Math.round(getNoteFrequency(note, octave) * 1000) / 1000
  const laFrequencyOfThisOctave = getNoteFrequency('LA', octave)

  // Ahora, la función `play` es asíncrona
  const play = () => {
    if (releaseTimeout.current) {
      window.clearTimeout(releaseTimeout.current)
      releaseTimeout.current = null
    }

    if (!audioContext) {
      console.error('AudioContext no está inicializado.')
      return
    }

    const bufferToUse = audioContext.laNotes[octave]

    // Limpia cualquier nodo anterior si la nota se reproduce rápidamente de nuevo
    if (sourceNode.current) {
      sourceNode.current.stop()
      sourceNode.current.disconnect()
    }
    if (gainNode.current) {
      gainNode.current.disconnect()
    }

    sourceNode.current = audioContext.audioContext.createBufferSource()
    sourceNode.current.buffer = bufferToUse // Asigna el AudioBuffer correcto

    gainNode.current = audioContext.audioContext.createGain()

    const playbackRate = targetFrequency / laFrequencyOfThisOctave
    sourceNode.current.playbackRate.value = playbackRate

    sourceNode.current.connect(gainNode.current)
    gainNode.current.connect(audioContext.audioContext.destination)

    gainNode.current.gain.value = settings.volume

    sourceNode.current.start(0)
  }

  const stop = (deleteAnyway: boolean = false) => {
    if (settings.pianoPedal && !deleteAnyway) return

    if (fadeTimeout.current) {
      window.clearTimeout(fadeTimeout.current)
      fadeTimeout.current = null
    }

    if (audioContext?.audioContext && gainNode.current) {
      const releaseTime = 0.25
      const now = audioContext.audioContext.currentTime

      if (gainNode.current.gain.value < 0.001) {
        clear()
        return
      }

      gainNode.current.gain.cancelScheduledValues(now)
      gainNode.current.gain.linearRampToValueAtTime(0.001, now + releaseTime)

      releaseTimeout.current = setTimeout(clear, releaseTime * 1000)
    } else {
      clear()
    }
  }

  const clear = () => {
    if (sourceNode.current) {
      try {
        sourceNode.current.stop()
      } catch (e) {
        console.error('Error al detener la nota:', e)
      }
      sourceNode.current.disconnect()
      sourceNode.current = null
    }
    if (gainNode.current) {
      gainNode.current.disconnect()
      gainNode.current = null
    }
  }

  return { play, stop }
}
