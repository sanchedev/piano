import { useEffect, useState } from 'react'
import { ShortcutsContext, type Shortcuts } from '../../contexts/shortcuts'
import type { AllNotes } from '../../lib/notes'
import z from 'zod'

const defaultShortcuts: Shortcuts = {
  DO: {},
  RE: {},
  MI: {},
  FA: {},
  SOL: {},
  LA: {},
  SI: {},
  'DO#': {},
  'RE#': {},
  'FA#': {},
  'SOL#': {},
  'LA#': {},
}

const shortcutsObj = z.record(
  z.enum([
    'DO',
    'RE',
    'MI',
    'FA',
    'SOL',
    'LA',
    'SI',
    'DO#',
    'RE#',
    'FA#',
    'SOL#',
    'LA#',
  ]),
  z.record(z.number(), z.string().nullable())
)

export function ShortcutsProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const [shortcuts, setShortcuts] = useState<Shortcuts | null>(null)

  useEffect(() => {
    const storedShortcuts = localStorage.getItem('shortcuts')
    const { data } = shortcutsObj.safeParse(storedShortcuts)
    setShortcuts(data ?? defaultShortcuts)

    if (!data) {
      localStorage.removeItem('shortcuts')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts))
  }, [shortcuts])

  if (!shortcuts) return <></>

  const setShortcut = (note: AllNotes, octave: number, key: string) => {
    setShortcuts({
      ...shortcuts,
      [note]: { ...shortcuts[note], [octave]: key },
    })
  }

  const deleteShortcut = (note: AllNotes, octave: number) => {
    setShortcuts({
      ...shortcuts,
      [note]: { ...shortcuts[note], [octave]: null },
    })
  }

  return (
    <ShortcutsContext
      value={{
        shortcuts,
        setShortcut,
        deleteShortcut,
      }}>
      {children}
    </ShortcutsContext>
  )
}
