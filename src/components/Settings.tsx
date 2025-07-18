import { use } from 'react'
import { SettingsContext } from '../contexts/settings'

export default function Settings() {
  const { volume, setVolume } = use(SettingsContext)

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
    </header>
  )
}
