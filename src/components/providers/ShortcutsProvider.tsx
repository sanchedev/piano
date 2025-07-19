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
  z.record(
    z.custom<string>((data) => {
      if (typeof data !== 'string') return false
      try {
        return !window.isNaN(Number(data))
      } catch {
        return false
      }
    }),
    z.string().nullable()
  )
)

export function ShortcutsProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const [shortcuts, setShortcuts] = useState<Shortcuts | null>(null)

  useEffect(() => {
    let data: Shortcuts | null = null

    try {
      const storedShortcuts = JSON.parse(
        localStorage.getItem('shortcuts') ?? ''
      )
      const result = shortcutsObj.parse(storedShortcuts)
      data = result ?? null
    } catch {
      // Do nothing
    }
    setShortcuts(data ?? defaultShortcuts)

    if (!data) {
      localStorage.removeItem('shortcuts')
    }
  }, [])

  useEffect(() => {
    if (!shortcuts) return
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
