import type { Notes, SharpNotes } from './notes'

class Shortcut {
  key: string
  note: keyof typeof Notes | keyof typeof SharpNotes
  octave: number

  constructor(
    key: string,
    note: keyof typeof Notes | keyof typeof SharpNotes,
    octave: number
  ) {
    this.key = key
    this.note = note
    this.octave = octave
  }
}

export const shortcuts: Shortcut[] = []

// right hand
shortcuts.push(new Shortcut('keyq', 'DO', 3))
shortcuts.push(new Shortcut('Digit2', 'DO#', 3))
shortcuts.push(new Shortcut('keyw', 'RE', 3))
shortcuts.push(new Shortcut('Digit3', 'RE#', 3))
shortcuts.push(new Shortcut('keye', 'MI', 3))
shortcuts.push(new Shortcut('keyr', 'FA', 3))
shortcuts.push(new Shortcut('Digit5', 'FA#', 3))
shortcuts.push(new Shortcut('keyt', 'SOL', 3))
shortcuts.push(new Shortcut('Digit6', 'SOL#', 3))
shortcuts.push(new Shortcut('keyy', 'LA', 3))
shortcuts.push(new Shortcut('Digit7', 'LA#', 3))
shortcuts.push(new Shortcut('keyu', 'SI', 3))

// left hand
shortcuts.push(new Shortcut('keyv', 'DO', 4))
shortcuts.push(new Shortcut('keyg', 'DO#', 4))
shortcuts.push(new Shortcut('keyb', 'RE', 4))
shortcuts.push(new Shortcut('keyh', 'RE#', 4))
shortcuts.push(new Shortcut('keyn', 'MI', 4))
shortcuts.push(new Shortcut('keym', 'FA', 4))
shortcuts.push(new Shortcut('keyk', 'FA#', 4))
shortcuts.push(new Shortcut('comma', 'SOL', 4))
shortcuts.push(new Shortcut('keyl', 'SOL#', 4))
shortcuts.push(new Shortcut('period', 'LA', 4))
shortcuts.push(new Shortcut('semicolon', 'LA#', 4))
shortcuts.push(new Shortcut('slash', 'SI', 4))
