import Result from "./Result";

const List = ({ guesses }) => {
  return (
    <div className="guesses-container">
      {guesses.slice(-5).map((data) => (
        <Result key={data.guess} guess={data.guess} result={data.result} />
      ))}
    </div>
  );
};

export default List;
