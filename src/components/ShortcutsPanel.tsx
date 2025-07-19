import { useEffect, useState } from 'react'
import { useShortcutsContext } from '../contexts/shortcuts'
import type { AllNotes } from '../lib/notes'

export default function ShortcutsPanel() {
  return (
    <div className='bg-gray-800 text-white grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] min-h-screen w-full h-full gap-4 p-4'>
      <ShortcutSection index={0} />
      <ShortcutSection index={1} />
      <ShortcutSection index={2} />
      <ShortcutSection index={3} />
      <ShortcutSection index={4} />
    </div>
  )
}

function ShortcutSection({ index }: { index: number }) {
  return (
    <section className='p-2 bg-gray-900 rounded-lg'>
      <ul className='flex flex-col gap-2'>
        <ShortcutItem note='DO' index={index} />
        <ShortcutItem note='DO#' index={index} />
        <ShortcutItem note='RE' index={index} />
        <ShortcutItem note='RE#' index={index} />
        <ShortcutItem note='MI' index={index} />
        <ShortcutItem note='FA' index={index} />
        <ShortcutItem note='FA#' index={index} />
        <ShortcutItem note='SOL' index={index} />
        <ShortcutItem note='SOL#' index={index} />
        <ShortcutItem note='LA' index={index} />
        <ShortcutItem note='LA#' index={index} />
        <ShortcutItem note='SI' index={index} />
      </ul>
    </section>
  )
}

function ShortcutItem({ note, index }: { note: AllNotes; index: number }) {
  return (
    <li className='grid grid-cols-[1fr_auto_auto] gap-2 px-2 py-1 min-w-72'>
      <span>
        {note} - {index + 1}
      </span>
      <KeyDetector note={note} index={index} />
    </li>
  )
}

function KeyDetector({ note, index }: { note: AllNotes; index: number }) {
  const { shortcuts, setShortcut, deleteShortcut } = useShortcutsContext()

  const [detectorActive, setDetectorActive] = useState(false)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!detectorActive) return
    event.preventDefault()
    event.stopPropagation()
    setShortcut(note, index, event.code)
    setDetectorActive(false)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <>
      <code
        onClick={() => setDetectorActive(!detectorActive)}
        className={
          'px-2 py-1 rounded select-none w-32 overflow-hidden text-nowrap whitespace-nowrap text-ellipsis ' +
          (detectorActive ? 'bg-gray-600' : 'bg-gray-800 hover:bg-gray-700')
        }>
        {detectorActive
          ? 'ESPERANDO...'
          : shortcuts[note][index] ?? 'NO ASIGNADA'}
      </code>
      <button
        className='w-6 h-6 bg-red-800 hover:bg-red-700 disabled:opacity-50 rounded'
        onClick={() => deleteShortcut(note, index)}
        disabled={shortcuts[note][index] == null}>
        X
      </button>
    </>
  )
}
