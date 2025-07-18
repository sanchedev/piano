import { useState } from 'react'
import { SettingsContext } from '../contexts/settings'
import Octave from './Octave'
import Settings from './Settings'

export default function Board() {
  const [volume, setVolume] = useState<number>(0.5)
  const [pianoPedal, setPianoPedal] = useState<boolean>(false)

  return (
    <SettingsContext
      value={{
        volume,
        setVolume,
        pianoPedal,
        setPianoPedal,
      }}>
      <main className='p-4 flex gap-2 flex-col rounded bg-gray-900'>
        <Settings />
        <div
          className='flex select-none'
          onContextMenu={(e) => e.preventDefault()}>
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
