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
shortcuts.push(new Shortcut('keya', 'DO', 1))
shortcuts.push(new Shortcut('keyw', 'DO#', 1))
shortcuts.push(new Shortcut('keys', 'RE', 1))
shortcuts.push(new Shortcut('keye', 'RE#', 1))
shortcuts.push(new Shortcut('keyd', 'MI', 1))
shortcuts.push(new Shortcut('keyf', 'FA', 1))
shortcuts.push(new Shortcut('keyt', 'FA#', 1))
shortcuts.push(new Shortcut('keyg', 'SOL', 1))
shortcuts.push(new Shortcut('keyy', 'SOL#', 1))
shortcuts.push(new Shortcut('keyh', 'LA', 1))
shortcuts.push(new Shortcut('keyu', 'LA#', 1))
shortcuts.push(new Shortcut('keyj', 'SI', 1))

// left hand
shortcuts.push(new Shortcut('keyk', 'DO', 2))
shortcuts.push(new Shortcut('keyo', 'DO#', 2))
shortcuts.push(new Shortcut('keyl', 'RE', 2))
shortcuts.push(new Shortcut('keyp', 'RE#', 2))
shortcuts.push(new Shortcut('semicolon', 'MI', 2))
shortcuts.push(new Shortcut('quote', 'FA', 2))
shortcuts.push(new Shortcut('backslash', 'SOL', 2))
