import React from 'react'
import Result from './Result'

const List = ({ guesses }) => {
  return (
    <div className="guesses-container">
      {guesses.slice(-5).map((data, index) => (
        <Result key={index} guess={data.guess} result={data.result} />
      ))}
    </div>
  )
}

export default List;