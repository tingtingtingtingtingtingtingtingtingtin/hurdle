import React from 'react';

const GuessInput = ({ currentGuess, setCurrentGuess, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        maxLength="5"
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
      />
      <input type="submit" hidden />
    </form>
  );
}

export default GuessInput;
