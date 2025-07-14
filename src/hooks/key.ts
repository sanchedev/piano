import { use, useEffect, useRef } from 'react'
import { getNoteFrequency, type Notes, type SharpNotes } from '../lib/notes'
import { SettingsContext } from '../contexts/settings'

export function useKeyNote(
  note: keyof typeof Notes | keyof typeof SharpNotes,
  octave: number
) {
  const audioContext = useRef<AudioContext | null>(null)
  const oscillator = useRef<OscillatorNode | null>(null)
  const gainNode = useRef<GainNode | null>(null)
  const fadeTimeout = useRef<number | null>(null)

  useEffect(() => {
    audioContext.current = new AudioContext()
    return () => {
      oscillator.current?.stop()
      oscillator.current?.disconnect()
      gainNode.current?.disconnect()
      audioContext.current?.close()
    }
  }, [])

  const frequency = Math.round(getNoteFrequency(note, octave) * 1000) / 1000
  const settings = use(SettingsContext)

  const play = () => {
    if (!audioContext.current) {
      console.error('AudioContext no está inicializado.')
      return
    }

    if (oscillator.current) {
      oscillator.current.stop()
      oscillator.current.disconnect()
    }
    if (gainNode.current) {
      gainNode.current.disconnect()
    }

    oscillator.current = audioContext.current.createOscillator()
    gainNode.current = audioContext.current.createGain()

    oscillator.current.type = settings.oscillatorType
    oscillator.current.frequency.value = frequency

    oscillator.current.connect(gainNode.current)
    gainNode.current.connect(audioContext.current.destination)

    const now = audioContext.current.currentTime
    const attackTime = 0.02

    gainNode.current.gain.setValueAtTime(0, now)
    gainNode.current.gain.linearRampToValueAtTime(
      settings.volume,
      now + attackTime
    )

    gainNode.current.gain.value = settings.volume
    gainNode.current.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.current.currentTime + attackTime + settings.fadeOutDuration
    )

    fadeTimeout.current = window.setTimeout(() => {
      fadeTimeout.current = null
      stop(true)
    }, (settings.fadeOutDuration + attackTime) * 1000)

    oscillator.current.start()
  }

  const stop = (deleteHowever: boolean = false) => {
    if (settings.pianoPedal && !deleteHowever) return

    if (fadeTimeout.current) {
      window.clearTimeout(fadeTimeout.current)
      fadeTimeout.current = null
      if (audioContext.current != null && gainNode.current != null) {
        const releaseTime = 0.05
        const now = audioContext.current.currentTime
        gainNode.current.gain.exponentialRampToValueAtTime(
          0.0001,
          now + releaseTime
        )

        setTimeout(clear, releaseTime * 1000)
      } else {
        clear()
      }
    } else {
      clear()
      console.log('no timeout')
    }
  }

  const clear = () => {
    if (oscillator.current) {
      oscillator.current.stop()
      oscillator.current.disconnect()
      oscillator.current = null
    }
    if (gainNode.current) {
      gainNode.current.disconnect()
      gainNode.current = null
    }
  }

  return { play, stop }
}
