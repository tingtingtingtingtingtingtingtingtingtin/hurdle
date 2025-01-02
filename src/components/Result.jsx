import React from "react";

const Result = ({ guess, result }) => {
  const getColorForLetter = (result) => {
    if (result === "correct") return "#538d4e";
    if (result === "partial") return "#b59f3b";
    return "black";
  };

  return (
    <div className="guess">
      {guess.split("").map((letter, index) => (
        <div
          key={index}
          className={`flip letter ${result[index]}`}
          style={{
            animationDelay: `${index * 0.1}s`,
            backgroundColor: getColorForLetter(result[index]),
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default Result;
