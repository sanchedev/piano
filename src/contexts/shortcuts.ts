import { createContext, useContext } from 'react'
import type { AllNotes } from '../lib/notes'

interface ShortcutsContext {
  shortcuts: Shortcuts
  setShortcut(note: AllNotes, octave: number, key: string): void
  deleteShortcut(note: AllNotes, octave: number): void
}

export type Shortcuts = { [T in AllNotes]: { [x: number]: string | null } }

export const ShortcutsContext = createContext<ShortcutsContext>({
  shortcuts: {
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
  },
  setShortcut: () => {},
  deleteShortcut: () => {},
})

export function useShortcutsContext() {
  return useContext(ShortcutsContext)
}
