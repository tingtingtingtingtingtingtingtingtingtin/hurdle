import { useState, useEffect } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import Alert from "./components/Alert";
import wordBank from "./data/wordbank";
import expandedWordBank from "./data/expanded";
import SettingContext from "./components/SettingContext";

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [greens, setGreens] = useState(["", "", "", "", ""]);
  const [yellows, setYellows] = useState(new Set());
  const [gameState, setGameState] = useState("wait");
  const [alertMessage, setAlertMessage] = useState("");
  const [inputInvalid, setInputInvalid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [settings, setSettings] = useState({
    useExpanded: { label: "Use expanded word list (recommended)", value: true },
    hardMode: {
      label: "Use hard mode (recommended, for testing purposes)",
      value: true,
    },
    useTimer: { label: "Use timer", value: true },
  });

  const showAlert = (message) => {
    setAlertMessage(message);
    setInputInvalid(true);

    setTimeout(() => {
      setInputInvalid(false);
    }, 500);
  };
  const hideAlert = () => setAlertMessage("");

  useEffect(() => {
    if (settings.useTimer.value === false) {
      return;
    }
    let timer;
    if (gameState === "play" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setGameState("timeout");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, settings.useTimer.value]);

  useEffect(() => {
    const handleStart = (e) => {
      if (gameState === "play") {
        return;
      }
      if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        if (gameState === "guessed" || gameState === "timeout") {
          setGuesses([]);
          setCurrentGuess("");
          setTimeLeft(30);
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

  const API_URL =
    process.env.NODE_ENV === "production"
      ? "/api/wordle"
      : "http://localhost:3000/api/wordle";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentGuess.length < 5) {
      showAlert("Guesses must be 5 characters long!");
      return;
    } else if (guesses.some((data) => data.guess === currentGuess)) {
      showAlert("Word already guessed!");
      return;
    }
    if (settings.hardMode.value === true) {
      for (let idx = 0; idx < 5; idx++) {
        const letter = currentGuess[idx];
        if (greens[idx] !== "" && letter !== greens[idx]) {
          showAlert("Must use all hints!");
          return;
        }
      }
      for (const yellow of yellows) {
        if (!currentGuess.includes(yellow)) {
          showAlert("Must use all yellow hints!");
          return;
        }
      }
    }
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess: currentGuess }),
      });

      const data = await response.json();
      console.log("API Response:", data);
      // hints
      const newGreens = greens.slice();
      const newYellows = new Set(yellows);
      const all_green = data.was_correct;
      const feedback = all_green
        ? ["correct", "correct", "correct", "correct", "correct"]
        : data.character_info.map((info, idx) => {
            if (info.scoring.correct_idx) {
              newGreens[idx] = info.char.toUpperCase();
              return "correct";
            }
            if (info.scoring.in_word) {
              newYellows.add(info.char.toUpperCase());
              return "partial";
            }
            return "incorrect";
          });

      if (all_green) {
        setTimeout(() => setGameState("guessed"), 100);
      } else if (
        !wordBank.has(currentGuess.toLowerCase()) &&
        (settings.useExpanded.value === false ||
          !expandedWordBank.has(currentGuess.toLowerCase()))
      ) {
        showAlert("Not a valid word!");
        return;
      } else {
        setGreens(newGreens);
        setYellows(newYellows);
        setCurrentGuess("");
      }
      setGuesses([...guesses, { guess: currentGuess, result: feedback }]);
    } catch (error) {
      console.error("Error:", error);
      showAlert("Guess API error");
    }
  };

  return (
    <div className="game">
      <SettingContext.Provider value={{ settings, setSettings }}>
        <Header />
      </SettingContext.Provider>
      <h3 style={{ margin: "-1rem 0"}}> {settings.useTimer.value && `Time Left: ${timeLeft}`}</h3>
      {gameState !== "wait" ? (
        <h3>
          {gameState === "guessed" ? `You hit the hurdle! Your` : gameState === "timeout" ? 'You ran out of time! Your' : `Current`}{" "}
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
        inputInvalid={inputInvalid}
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
