import { use } from 'react'
import { SettingsContext } from '../contexts/settings'

export default function Settings() {
  const { volume, setVolume, firstOctave, setFirstOctave } =
    use(SettingsContext)

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
      <div className='grid grid-cols-[auto_1fr_auto] gap-2'>
        <button
          className='bg-blue-900 hover:bg-blue-950 rounded px-2 py-1 text-white aspect-square'
          onClick={() => setFirstOctave(Math.max(0, firstOctave - 1))}>
          -
        </button>
        <div className='rounded bg-gray-700 px-2 py-1 text-center text-white'>
          {firstOctave}
        </div>
        <button
          className='bg-blue-900 hover:bg-blue-950 rounded px-2 py-1 text-white aspect-square'
          onClick={() => setFirstOctave(Math.min(3, firstOctave + 1))}>
          +
        </button>
      </div>
    </header>
  )
}
