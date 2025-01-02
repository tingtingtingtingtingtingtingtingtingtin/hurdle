import React, { useEffect } from "react";

const Input = ({
  currentGuess,
  setCurrentGuess,
  handleSubmit,
  gameState,
  setGameState,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== "play") {
        return;
      }
      if (e.key === "Enter") {
        handleSubmit(e);
        return;
      }
      if (e.key === "Escape") {
        setGameState("pause");
      }

      if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        setCurrentGuess((prev) =>
          prev.length < 5 ? prev + e.key.toUpperCase() : prev,
        );
      }

      if (e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCurrentGuess, handleSubmit]);

  return (
    <form onSubmit={handleSubmit} className="guess-input-container">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="letter input-box"
          style={{ color: `${gameState === "guessed" ? "#538d4e" : ""}` }}
        >
          {currentGuess[index] || ""}
        </div>
      ))}
    </form>
  );
};

export default Input;
