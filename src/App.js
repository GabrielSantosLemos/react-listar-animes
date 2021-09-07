import React, { useState, useEffect } from 'react'
import './App.css'
import InputDePesquisa from './components/InputDePesquisa'

const BASE_URL = 'https://kitsu.io/api/edge/'

function App () {
  const [text, setText] = useState('')
  const [info, setInfo] = useState({})

  useEffect(() => {
    if (text) {
      setInfo({})
      fetch(`${BASE_URL}anime?filter[text]=${text}&page[limit]=12`)
        .then((response) => response.json())
        .then((response) => { setInfo(response) })
    }

    console.log(text)
  }, [text])

  return (
    <>
      <div className="pesquisa">
        <h1>Animes</h1>
        <InputDePesquisa
          value={text}
          onchange={(str) => setText(str)}
        />
        {text && !info.data && (<span>Carregando...</span>)}
      </div>

      <div>
        {info.data && (
        <ul className="lista-animes">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
        )}
      </div>
    </>
  )
}

export default App
