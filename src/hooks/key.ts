import { use, useEffect, useRef, useState } from 'react'
import { getNoteFrequency, type Notes, type SharpNotes } from '../lib/notes'
import { SettingsContext } from '../contexts/settings'

const LA_SAMPLES_URLS: { [octave: number]: string } = {
  0: '/notes/la0.mp3',
  1: '/notes/la1.mp3',
  2: '/notes/la2.mp3',
  3: '/notes/la3.mp3',
  4: '/notes/la4.mp3',
  5: '/notes/la5.mp3',
  6: '/notes/la6.mp3',
  7: '/notes/la7.mp3',
}

export function useKeyNote(
  note: keyof typeof Notes | keyof typeof SharpNotes,
  octave: number
) {
  const audioContext = useRef<AudioContext | null>(null)
  const sourceNode = useRef<AudioBufferSourceNode | null>(null)
  const gainNode = useRef<GainNode | null>(null)
  const fadeTimeout = useRef<number | null>(null)

  const audioBuffers = useRef<Map<number, AudioBuffer>>(new Map())
  const loadingPromises = useRef<Map<number, Promise<AudioBuffer>>>(new Map())

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    audioContext.current = new AudioContext()
    return () => {
      sourceNode.current?.stop()
      sourceNode.current?.disconnect()
      gainNode.current?.disconnect()
      audioContext.current?.close()
      audioContext.current = null
    }
  }, [])

  const settings = use(SettingsContext)

  const targetFrequency =
    Math.round(getNoteFrequency(note, octave) * 1000) / 1000
  const laFrequencyOfThisOctave = getNoteFrequency('LA', octave)

  const loadLaSample = async (oct: number): Promise<AudioBuffer> => {
    // Si ya estamos cargando este sample, devuelve la promesa existente
    if (loadingPromises.current.has(oct)) {
      return loadingPromises.current.get(oct)!
    }

    // Si ya está en caché, devuélvelo directamente
    if (audioBuffers.current.has(oct)) {
      return Promise.resolve(audioBuffers.current.get(oct)!)
    }

    const sampleUrl = LA_SAMPLES_URLS[oct]
    if (!sampleUrl) {
      const error = new Error(
        `URL de sample no encontrada para la octava ${oct}.`
      )
      console.error(error)
      return Promise.reject(error)
    }

    const promise = (async () => {
      if (!audioContext.current) {
        throw new Error('AudioContext no está inicializado.')
      }
      try {
        const response = await fetch(sampleUrl)
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await audioContext.current.decodeAudioData(
          arrayBuffer
        )
        audioBuffers.current.set(oct, audioBuffer) // Almacena en caché
        loadingPromises.current.delete(oct) // Elimina la promesa una vez resuelta
        // console.log(`Sample La${oct} cargado bajo demanda.`);
        return audioBuffer
      } catch (error) {
        console.error(
          `Error cargando sample La${oct} desde ${sampleUrl}:`,
          error
        )
        loadingPromises.current.delete(oct) // Elimina la promesa en caso de error
        throw error
      }
    })()

    loadingPromises.current.set(oct, promise) // Almacena la promesa
    return promise
  }

  // Ahora, la función `play` es asíncrona
  const play = async () => {
    if (!audioContext.current) {
      console.error('AudioContext no está inicializado.')
      return
    }

    let bufferToUse: AudioBuffer
    try {
      bufferToUse = await loadLaSample(octave)
      setIsReady(true) // Marca que el sample de esta octava está listo
    } catch (e) {
      console.error(
        `No se pudo cargar el sample para la octava ${octave}. No se puede reproducir la nota.`,
        e
      )
      return
    }

    // Limpia cualquier nodo anterior si la nota se reproduce rápidamente de nuevo
    if (sourceNode.current) {
      sourceNode.current.stop()
      sourceNode.current.disconnect()
    }
    if (gainNode.current) {
      gainNode.current.disconnect()
    }

    sourceNode.current = audioContext.current.createBufferSource()
    sourceNode.current.buffer = bufferToUse // Asigna el AudioBuffer correcto

    gainNode.current = audioContext.current.createGain()

    const playbackRate = targetFrequency / laFrequencyOfThisOctave
    sourceNode.current.playbackRate.value = playbackRate

    sourceNode.current.connect(gainNode.current)
    gainNode.current.connect(audioContext.current.destination)

    const now = audioContext.current.currentTime
    const attackTime = 0.02

    gainNode.current.gain.setValueAtTime(0, now)
    gainNode.current.gain.linearRampToValueAtTime(
      settings.volume,
      now + attackTime
    )

    sourceNode.current.start(0)
  }

  const stop = (deleteAnyway: boolean = false) => {
    if (settings.pianoPedal && !deleteAnyway) return

    if (fadeTimeout.current) {
      window.clearTimeout(fadeTimeout.current)
      fadeTimeout.current = null
    }

    if (audioContext.current && gainNode.current) {
      const releaseTime = 0.05
      const now = audioContext.current.currentTime

      if (gainNode.current.gain.value < 0.001) {
        clear()
        return
      }

      gainNode.current.gain.cancelScheduledValues(now)
      gainNode.current.gain.exponentialRampToValueAtTime(
        0.0001,
        now + releaseTime
      )

      setTimeout(clear, releaseTime * 1000)
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

  return { play, stop, isReady }
}
