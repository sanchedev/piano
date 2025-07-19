export const Notes = {
  DO: 0,
  RE: 2,
  MI: 4,
  FA: 5,
  SOL: 7,
  LA: 9,
  SI: 11,
}

export const SharpNotes = {
  'DO#': 1,
  'RE#': 3,
  'FA#': 6,
  'SOL#': 8,
  'LA#': 10,
}

export type AllNotes = keyof typeof Notes | keyof typeof SharpNotes

export function getNoteFrequency(note: AllNotes, octave: number) {
  const baseFrequency = 55 // la octave 1
  const relativeOctave = octave - 1

  let noteIndex: number
  noteIndex ??= Notes[note as keyof typeof Notes]
  noteIndex ??= SharpNotes[note as keyof typeof SharpNotes]

  const relativeNote = noteIndex - 9

  return (
    baseFrequency * Math.pow(2, relativeOctave) * Math.pow(2, relativeNote / 12)
  )
}
