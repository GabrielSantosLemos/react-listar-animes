import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useDebounce from '../hooks/useDebounce'

const InputDePesquisa = ({ value, onchange }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const debouncedChage = useDebounce(onchange, 500)

  function handlerChange (event) {
    setDisplayValue(event.target.value)
    debouncedChage(event.target.value)
  }

  return <input type="search" value={displayValue} onChange={handlerChange} />
}

export default InputDePesquisa

InputDePesquisa.propTypes = {
  value: PropTypes.any,
  onchange: PropTypes.func
}
