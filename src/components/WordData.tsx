import React from 'react'
import { Paper } from '@mui/material'

type Props = {
  defs: Word[]
}

type Word = {
  meanings: {
    partOfSpeech: string,
    definitions: {
      antonyms: string[],
      definition: string
    }[]
  }[],
  phonetic: string,
  word: string
}

function WordData({ defs }: Props) {
  return (
    <div>
      {defs?.map((elm: Word, i) => (
        <Paper key={i} elevation={3} className='word'>
          {i + 1}. {elm.word}{elm.meanings.map((meaning, i) => {
            return (
              <div key={i} className='word-defs'>
                - {meaning.partOfSpeech}{meaning.definitions.map((def, i) => {
                  return <div key={i} className='word-def'>{i + 1}. {def.definition}</div>
                })}
              </div>
            )
          })}
        </Paper>
      ))}
    </div>
  )
}

export default WordData