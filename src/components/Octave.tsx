import BlackKey from './BlackKey'
import WhiteKey from './WhiteKey'

export interface OctaveProps {
  octave: number
}
export default function Octave({ octave }: OctaveProps) {
  return (
    <article className='flex flex-row'>
      <WhiteKey
        note='DO'
        octave={octave}
        className={octave === 4 ? 'border-2 border-black/20' : ''}
      />
      <BlackKey note='DO#' octave={octave} />
      <WhiteKey note='RE' octave={octave} />
      <BlackKey note='RE#' octave={octave} />
      <WhiteKey note='MI' octave={octave} />
      <WhiteKey note='FA' octave={octave} />
      <BlackKey note='FA#' octave={octave} />
      <WhiteKey note='SOL' octave={octave} />
      <BlackKey note='SOL#' octave={octave} />
      <WhiteKey note='LA' octave={octave} />
      <BlackKey note='LA#' octave={octave} />
      <WhiteKey note='SI' octave={octave} />
    </article>
  )
}
