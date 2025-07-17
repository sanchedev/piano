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
shortcuts.push(new Shortcut('keya', 'DO', 3))
shortcuts.push(new Shortcut('keyw', 'DO#', 3))
shortcuts.push(new Shortcut('keys', 'RE', 3))
shortcuts.push(new Shortcut('keye', 'RE#', 3))
shortcuts.push(new Shortcut('keyd', 'MI', 3))
shortcuts.push(new Shortcut('keyf', 'FA', 3))
shortcuts.push(new Shortcut('keyt', 'FA#', 3))
shortcuts.push(new Shortcut('keyg', 'SOL', 3))
shortcuts.push(new Shortcut('keyy', 'SOL#', 3))
shortcuts.push(new Shortcut('keyh', 'LA', 3))
shortcuts.push(new Shortcut('keyu', 'LA#', 3))
shortcuts.push(new Shortcut('keyj', 'SI', 3))

// left hand
shortcuts.push(new Shortcut('keyk', 'DO', 4))
shortcuts.push(new Shortcut('keyo', 'DO#', 4))
shortcuts.push(new Shortcut('keyl', 'RE', 4))
shortcuts.push(new Shortcut('keyp', 'RE#', 4))
shortcuts.push(new Shortcut('semicolon', 'MI', 4))
shortcuts.push(new Shortcut('quote', 'FA', 4))
shortcuts.push(new Shortcut('backslash', 'SOL', 4))
