import React from 'react';
import { useAppContext } from './context';
import QuestionCard from './components/QuestionCard';
import { RingLoader } from 'react-spinners';

const App = () => {
  const { state, isLoading, startGame } = useAppContext();
  return (
    <div className="container">
      <h1 className="heading">React Typescript Quiz Game</h1>
      {(state?.gameOver ||
        state?.userAnswers.length === state?.questions.length) && (
        <button className="btn btn-lg" onClick={startGame}>
          Start
        </button>
      )}
      {isLoading && (
        <div className="loading-wrapper">
          <RingLoader color="#0d6efd" size={150} />
        </div>
      )}

      {!isLoading && !state?.gameOver && <QuestionCard />}
    </div>
  );
};

export default App;
