import React from 'react'
import PropTypes from 'prop-types'

import styles from './Paginacao.module.scss'

const MAX_ITEMS = 9
const MAX_LEFT = (MAX_ITEMS - 1) / 2

export default function Paginacao ({ limite, total, offset, setOffset }) {
  const paginaAtual = offset ? (offset / limite) + 1 : 1
  const totalDePaginas = Math.ceil(total / limite)
  const primeiraPagina = Math.max(paginaAtual - MAX_LEFT, 1)

  function onTrocaDePagina (pagina) {
    setOffset((pagina - 1) * limite)
  }

  return (
    <nav>
      <ul className={styles.paginacao}>
        <li>
          <button
            onClick={() => onTrocaDePagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
         >
            Anterior
          </button>
        </li>
        {Array.from({ length: Math.min(MAX_ITEMS, totalDePaginas) })
          .map((_, index) => index + primeiraPagina)
          .map((pagina) => (
            <li key={pagina}>
              <button
                className={pagina === paginaAtual && styles.ativo}
                onClick={() => onTrocaDePagina(pagina)}
              >
                {pagina}
              </button>
            </li>
          ))
        }
        <li>
          <button
            onClick={() => onTrocaDePagina(paginaAtual + 1)}
            disabled={paginaAtual === totalDePaginas}
         >
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  )
}

Paginacao.propTypes = {
  limite: PropTypes.any,
  total: PropTypes.any,
  offset: PropTypes.any,
  setOffset: PropTypes.func
}
