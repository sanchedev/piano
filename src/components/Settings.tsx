import { use } from 'react'
import { SettingsContext } from '../contexts/settings'

export default function Settings() {
  const {
    oscillatorType,
    setOscillatorType,
    volume,
    setVolume,
    fadeOutDuration,
    setFadeOutDuration,
  } = use(SettingsContext)

  return (
    <header className='w-full flex flex-col gap-2 justify-center'>
      <input
        type='range'
        min='0'
        max='1'
        step='0.05'
        className='text-gray-400 accent-current'
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        value={volume}
      />
      <select
        className='text-gray-400 accent-current bg-gray-700 rounded px-2 py-1'
        value={oscillatorType}
        onChange={(e) => setOscillatorType(e.target.value as OscillatorType)}>
        <option value='square'>Square</option>
        <option value='sawtooth'>Sawtooth</option>
        <option value='triangle'>Triangle</option>
        <option value='sine'>Sine</option>
      </select>
      <input
        type='number'
        min='1'
        max='20'
        className='text-gray-400 accent-current bg-gray-700 rounded px-2 py-1'
        onChange={(e) => setFadeOutDuration(parseInt(e.target.value))}
        value={fadeOutDuration}
      />
    </header>
  )
}
