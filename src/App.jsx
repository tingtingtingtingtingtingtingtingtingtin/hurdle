import { useState } from 'react';
import Input from './components/Input'
import List from './components/List'

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentGuess.length < 5) {
      alert("Guesses must be 5 characters long!");
      return;
    } else if (guesses.some(data => data.guess === currentGuess)) {
      alert("Word already guessed!");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/wordle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess: currentGuess }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      const feedback = data.was_correct ? ['correct', 'correct', 'correct', 'correct', 'correct']
        : data.character_info.map(info => {
          if (info.scoring.correct_idx) return 'correct';
          if (info.scoring.in_word) return 'partial';
          return 'incorrect';
        });

      setGuesses([...guesses, { guess: currentGuess, result: feedback }]);
      console.log(guesses);
    } catch {
      throw new Error("Guess API error");
    }

    setCurrentGuess('');
  };

  return (
    <div className='game'>
      <h1>HURDLE</h1>
      <Input currentGuess={currentGuess} setCurrentGuess={setCurrentGuess} handleSubmit={handleSubmit}/>
      <List guesses={guesses}/>
    </div>
  );
}

export default App;
