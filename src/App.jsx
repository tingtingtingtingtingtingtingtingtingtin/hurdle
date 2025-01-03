import { useState, useEffect } from "react";
import Input from "./components/Input";
import List from "./components/List";
import Alert from "./components/Alert";
import wordBank from "./data/wordbank";

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState("wait");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message) => setAlertMessage(message);
  const hideAlert = () => setAlertMessage("");

  useEffect(() => {
    const handleStart = (e) => {
      if (gameState === "play") {
        return;
      }
      if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        if (gameState === "guessed") {
          setGuesses([]);
          setCurrentGuess("");
        }
        setGameState("play");
        setCurrentGuess(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleStart);
    return () => {
      window.removeEventListener("keydown", handleStart);
    };
  }, [gameState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentGuess.length < 5) {
      showAlert("Guesses must be 5 characters long!");
      return;
    } else if (guesses.some((data) => data.guess === currentGuess)) {
      showAlert("Word already guessed!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/wordle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess: currentGuess }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      const all_green = data.was_correct;
      const feedback = all_green
        ? ["correct", "correct", "correct", "correct", "correct"]
        : data.character_info.map((info) => {
            if (info.scoring.correct_idx) return "correct";
            if (info.scoring.in_word) return "partial";
            return "incorrect";
          });

      if (all_green) {
        showAlert("You hit the hurdle!");
        setTimeout(() => setGameState("guessed"), 100);
        setGuesses([...guesses, { guess: currentGuess, result: feedback }]);
        return;
      }
      if (!wordBank.has(currentGuess.toLowerCase())) {
        // console.log(currentGuess);
        showAlert("Not a valid word!");
      } else {
        setGuesses([...guesses, { guess: currentGuess, result: feedback }]);
        setCurrentGuess('');
      }
    } catch {
      throw new Error("Guess API error");
    }
  };

  return (
    <div className="game">
      <h1>HURDLE</h1>
      {gameState !== "wait" ? (
        <h3>
          {gameState === "guessed" ? `You hit the hurdle! Your` : `Current`}{" "}
          Score: {guesses.length}
        </h3>
      ) : (
        <h3>Start typing to begin!</h3>
      )}
      <Input
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        handleSubmit={handleSubmit}
        gameState={gameState}
        setGameState={setGameState}
      />
      {gameState === "pause" ? (
        <h3>Paused. Please start typing to continue.</h3>
      ) : (
        <List guesses={guesses} />
      )}
      <Alert message={alertMessage} onClose={hideAlert} />
    </div>
  );
}

export default App;
