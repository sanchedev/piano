import { useEffect, useState } from 'react'
import { AudioContext } from '../../contexts/audioContext'

const LA_SAMPLES_URLS = [
  '/notes/la0.mp3',
  '/notes/la1.mp3',
  '/notes/la2.mp3',
  '/notes/la3.mp3',
  '/notes/la4.mp3',
  '/notes/la5.mp3',
  '/notes/la6.mp3',
  '/notes/la7.mp3',
]

export default function AudioContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [audioContext, setAudioContext] =
    useState<globalThis.AudioContext | null>(null)
  const [laNotes, setLaNotes] = useState<AudioBuffer[]>([])

  useEffect(() => {
    const audioContext = new window.AudioContext()
    setAudioContext(audioContext)

    const loadAllSamples = async () => {
      const promises = Array.from({ length: 8 }, (_, i) => i).map(
        async (oct) => {
          const octNum = oct
          const response = await fetch(LA_SAMPLES_URLS[octNum])
          const arrayBuffer = await response.arrayBuffer()
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
          return audioBuffer
        }
      )
      setLaNotes(await Promise.all(promises))
    }

    loadAllSamples()

    return () => {
      audioContext.close()
      setAudioContext(null)
    }
  }, [])

  if (laNotes.length === 0 || audioContext == null) return <>Loading...</>

  return (
    <AudioContext.Provider
      value={{ audioContext: audioContext, laNotes: laNotes }}>
      {children}
    </AudioContext.Provider>
  )
}
