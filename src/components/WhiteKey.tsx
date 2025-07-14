import { useKeyNote } from '../hooks/key'
import { useShortcuts } from '../hooks/shortcuts'
import type { Notes } from '../lib/notes'

interface WhiteKeyProps {
  note: keyof typeof Notes
  octave: number
}

export default function WhiteKey({ note, octave }: WhiteKeyProps) {
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
      className='relative w-8 h-40 rounded-b flex flex-col justify-end items-center text-xs font-bold bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-300 hover:text-gray-400 active:text-gray-500 [[data-active=true]]:bg-gray-300 [[data-active=true]]:text-gray-500 [[data-active=true]]:hover:bg-gray-300 [[data-active=true]]:hover:text-gray-500'
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onPointerLeave={handleUp}
      data-active={active}>
      <span
        className='block origin-right text-end rotate-90 absolute bottom-6 right-4'
        hidden={/Mobi|Android|iPhone/i.test(navigator.userAgent)}>
        {key?.toUpperCase()}
      </span>
      <span className='block'>{note}</span>
    </button>
  )
}
