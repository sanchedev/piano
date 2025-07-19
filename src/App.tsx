import { useState } from 'react'
import Board from './components/Board'
import ShortcutsPanel from './components/ShortcutsPanel'
import { ShortcutsProvider } from './components/providers/ShortcutsProvider'

export default function App() {
  const [page, setPage] = useState<'piano' | 'shortcuts'>('piano')
  return (
    <ShortcutsProvider>
      <button
        className='fixed top-2 right-2 bg-gray-600 hover:bg-gray-700 aspect-square text-white rounded-full p-2 z-10'
        onClick={() => setPage(page === 'piano' ? 'shortcuts' : 'piano')}>
        {page === 'shortcuts' ? '🎹' : '🅰'}
      </button>

      {page === 'piano' ? (
        <div className='min-h-screen flex justify-center items-center bg-gray-800 min-w-screen w-fit'>
          <Board />
        </div>
      ) : (
        <ShortcutsPanel />
      )}
    </ShortcutsProvider>
  )
}
