import { useState } from 'react'
import { SettingsContext } from '../contexts/settings'
import Octave from './Octave'
import Settings from './Settings'
import AudioContextProvider from './providers/AudioContextProvider'

export default function Board() {
  const [volume, setVolume] = useState<number>(0.5)
  const [pianoPedal, setPianoPedal] = useState<boolean>(false)
  const [firstOctave, setFirstOctave] = useState<number>(2)

  return (
    <SettingsContext
      value={{
        volume,
        setVolume,
        pianoPedal,
        setPianoPedal,
        firstOctave,
        setFirstOctave,
      }}>
      <AudioContextProvider>
        <main className='p-4 flex gap-2 flex-col rounded bg-gray-900'>
          <Settings />
          <div
            className='flex select-none'
            onContextMenu={(e) => e.preventDefault()}>
            <Octave octave={firstOctave} />
            <Octave octave={firstOctave + 1} />
            <Octave octave={firstOctave + 2} />
            <Octave octave={firstOctave + 3} />
            <Octave octave={firstOctave + 4} />
          </div>
        </main>
      </AudioContextProvider>
    </SettingsContext>
  )
}
