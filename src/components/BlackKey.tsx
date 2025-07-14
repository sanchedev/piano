import { useKeyNote } from '../hooks/key'
import { useShortcuts } from '../hooks/shortcuts'
import type { SharpNotes } from '../lib/notes'

interface BlackKeyProps {
  note: keyof typeof SharpNotes
  octave: number
}

export default function BlackKey({ note, octave }: BlackKeyProps) {
  const playKeyNote = useKeyNote(note, octave)
  const { active, key } = useShortcuts(
    note,
    octave,
    playKeyNote.play,
    playKeyNote.stop
  )

  const handleDown = () => {
    playKeyNote.play()
  }

  const handleUp = () => {
    playKeyNote.stop()
  }

  return (
    <button
      className='w-6 h-24 -mx-3 rounded-b flex flex-col justify-end items-center text-center text-[.5rem] bg-gray-800 hover:bg-gray-900 active:bg-black text-gray-600 hover:text-gray-700 active:text-gray-600 [[data-active=true]]:bg-black [[data-active=true]]:text-gray-600 [[data-active=true]]:hover:bg-black [[data-active=true]]:hover:text-gray-600 z-10'
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onPointerLeave={handleUp}
      data-active={active}>
      <span className='block'>{key?.toUpperCase()}</span>
      <span className='block'>{note}</span>
    </button>
  )
}
