import React, { useState, useEffect } from 'react'
import './App.css'
import InputDePesquisa from './components/InputDePesquisa'
import Paginacao from './components/Paginacao'
import qs from 'qs'

const BASE_URL = 'https://kitsu.io/api/edge/'
const LIMITE = 8

function App () {
  const [text, setText] = useState('')
  const [info, setInfo] = useState({})
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    // setInfo({})

    const query = {
      page: {
        limit: LIMITE,
        offset
      }
    }

    if (text) {
      query.filter = {
        text
      }
    }

    fetch(`${BASE_URL}anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response)
      })
  }, [text, offset])

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

      {info.meta && (
      <Paginacao
        limite={LIMITE}
        total={info.meta.count}
        offset={offset}
        setOffset={setOffset}
      />
      )}
    </>
  )
}

export default App
