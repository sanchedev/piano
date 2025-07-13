import { use, useEffect, useState } from 'react'
import type { Notes, SharpNotes } from '../lib/notes'
import { shortcuts } from '../lib/shortcuts'
import { SettingsContext } from '../contexts/settings'

export function useShortcuts(
  note: keyof typeof Notes | keyof typeof SharpNotes,
  octave: number,
  play: () => void,
  stop: () => void
) {
  const key = shortcuts.find(
    (shortcut) => shortcut.note === note && shortcut.octave === octave
  )?.key

  const [active, setActive] = useState(false)

  const settings = use(SettingsContext)

  useEffect(() => {
    if (key == null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault()
      event.stopPropagation()

      if (event.key === 'Shift') settings.setPianoPedal(true)

      if (event.code.toLowerCase() !== key.toLowerCase()) return
      if (active) return
      play()
      setActive(true)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault()
      event.stopPropagation()

      if (event.key === 'Shift') settings.setPianoPedal(false)

      if (event.code.toLowerCase() !== key.toLowerCase()) return
      if (!active) return
      stop()
      setActive(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [key, play, stop])

  return { active, key }
}
