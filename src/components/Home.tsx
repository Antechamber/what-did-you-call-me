import React, { SyntheticEvent, useState } from 'react'
import { Paper, Button, TextField } from '@mui/material'
import WordData from './WordData'

function Home() {
  const [wordData, setWordData] = useState([])
  const [query, setQuery] = useState('')
  const [foundDef, setFoundDef] = useState(false)
  const [noResults, setNoResults] = useState(false)

  const handleSubmitForm = (e: SyntheticEvent) => {
    e.preventDefault()
    if (query === '') {
      setWordData([])
      setFoundDef(false)
      setNoResults(false)
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
      .then(async res => {
        const parsed = await res.json()
        if (res.ok) {
          setWordData(parsed)
          setFoundDef(true)
          setNoResults(false)
        } else {
          setWordData([])
          setFoundDef(false)
          setNoResults(true)
        }
      })
  }

  const handleChangeQuery = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement
    setQuery(target.value)
  }


  return (
    <div className='dictionaryData'>
      <form onSubmit={handleSubmitForm}>
        <TextField size='small' name="query" onChange={handleChangeQuery} value={query} autoComplete='off' />
        <Button variant='contained' type='submit'>Lookup Word!</Button>
      </form>
      <div>
        {foundDef ? <WordData defs={wordData} /> : noResults ? (
          <Paper elevation={3}>
            <p>No results...</p>
          </Paper>
        ) : (
          <></>
        )
        }
      </div>
    </div>
  )
}

export default Home