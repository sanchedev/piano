import { use, useEffect, useState } from 'react'
import type { AllNotes } from '../lib/notes'
import { SettingsContext } from '../contexts/settings'
import { useShortcutsContext } from '../contexts/shortcuts'

export function useShortcuts(
  note: AllNotes,
  octave: number,
  play: () => void,
  stop: () => void
) {
  const { shortcuts } = useShortcutsContext()

  const key = shortcuts[note][octave]

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
