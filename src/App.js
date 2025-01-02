import './App.css'
import { useState } from 'react';

function App() {
  const [guesses, setGuesses] = useState(new Set());
  const [currentGuess, setCurrentGuess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentGuess.length < 5) {
      alert("Guesses must be 5 characters long!");
      return;
    } else if (guesses.has(currentGuess)) {
      alert("Word already guessed!");
      return;
    }

    try {
      const response = await fetch('https://wordle-api.vercel.app/api/wordle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess: currentGuess }),
      });

      const data = await response.json();
      console.log('API Response:', data);
    } catch {

    }

    const newGuesses = new Set(guesses);
    newGuesses.add(currentGuess);
    setGuesses(newGuesses);
    console.log(guesses);
  };

  return (
    <div className='game'>
      <h1>HURDLE</h1>
      <div>
        <form>
          <input 
            type="text"
            maxLength="5"
            value={currentGuess}
            onChange={(e) => {setCurrentGuess(e.target.value.toUpperCase())}}
          />
          <input type="submit" hidden onClick={handleSubmit}/>
        </form>
      </div>
    </div>
  );
}

export default App;
