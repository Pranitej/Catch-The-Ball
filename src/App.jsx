import { useEffect, useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [totalBalls, setTotalBalls] = useState(0);
  const [potatoPos, setPotatoPos] = useState({ top: "50%", left: "50%" });
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (!isGameStarted || gameOver) return;

    if (timeLeft === 0) {
      setGameOver(true);
      setIsGameStarted(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isGameStarted, gameOver]);

  useEffect(() => {
    if (!isGameStarted || gameOver) return;

    const moveInterval = setInterval(() => {
      const top = Math.random() * 80 + 10;
      const left = Math.random() * 80 + 10;
      setPotatoPos({ top: `${top}%`, left: `${left}%` });

      // Increase total balls count
      setTotalBalls((prev) => prev + 1);
    }, 1500);

    return () => clearInterval(moveInterval);
  }, [isGameStarted, gameOver]);

  const handleSlap = () => {
    setScore((prev) => prev + 1);
  };

  const startGame = () => {
    setScore(0);
    setTotalBalls(0);
    setTimeLeft(30);
    setGameOver(false);
    setIsGameStarted(true);
  };

  return (
    <div className="h-screen bg-yellow-100 flex flex-col items-center justify-center text-center font-mono relative">
      <h1 className="text-3xl font-bold mb-4">⚾ Catch the Ball 🧤</h1>

      {!isGameStarted && !gameOver && (
        <button
          onClick={startGame}
          className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-700 mb-4"
        >
          Start Game
        </button>
      )}

      {(isGameStarted || gameOver) && (
        <>
          <p className="text-lg mb-2">Time Left: {timeLeft}s</p>
          <p className="text-lg mb-2">Score: {score}</p>
        </>
      )}

      {isGameStarted && !gameOver && (
        <div
          onClick={handleSlap}
          className="absolute w-16 h-16 bg-red-500 rounded-full cursor-pointer transition-transform hover:scale-110 duration-200"
          style={{
            top: potatoPos.top,
            left: potatoPos.left,
            backgroundImage: `url("https://emoji.slack-edge.com/T024J3Q2V/potato/2a25a11fcfab69ed.png")`,
            backgroundSize: "cover",
          }}
        />
      )}

      {gameOver && (
        <div className="mt-8">
          <h2 className="text-xl mb-2">Game Over 😵</h2>
          <p className="mb-1">Balls Appeared: {totalBalls}</p>
          <p className="mb-4">Balls Caught: {score}</p>
          <button
            onClick={startGame}
            className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
