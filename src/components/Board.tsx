import { useState } from 'react'
import { SettingsContext } from '../contexts/settings'
import Octave from './Octave'
import Settings from './Settings'

export default function Board() {
  const [oscillatorType, setOscillatorType] = useState<OscillatorType>('square')
  const [volume, setVolume] = useState<number>(0.5)
  const [fadeOutDuration, setFadeOutDuration] = useState<number>(4)
  const [pianoPedal, setPianoPedal] = useState<boolean>(false)

  return (
    <SettingsContext
      value={{
        oscillatorType,
        setOscillatorType,
        volume,
        setVolume,
        fadeOutDuration,
        setFadeOutDuration,
        pianoPedal,
        setPianoPedal,
      }}>
      <main className='p-4 flex gap-2 flex-col rounded bg-gray-900'>
        <Settings />
        <div className='flex'>
          <Octave octave={2} />
          <Octave octave={3} />
          <Octave octave={4} />
          <Octave octave={5} />
          <Octave octave={6} />
        </div>
      </main>
    </SettingsContext>
  )
}
