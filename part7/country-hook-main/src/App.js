import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useField } from './hooks/useField'
import { Country } from './Country'

const useCountry = (name) => {
  const [country, setCountries] = useState(null)

  useEffect(() => {
    const getCountries = async () => {
      const response = await axios.get(
        `https://restcountries.eu/rest/v2/name/${name}?fullText=true`,
      )
      setCountries({ found: true, ...response.data[0] })
    }
    name && getCountries()
  }, [name])

  return country
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
