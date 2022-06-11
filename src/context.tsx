import React from 'react';
import {
  AppProviderProps,
  ContextProps,
  Difficulty,
  Question,
  QuestionState,
  State,
} from './types';

import reducer from './reducer';

import { shuffleArray } from './utils';

const AppContext = React.createContext<ContextProps>({});

const initState: State = {
  questions: [],
  userAnswers: [],
  score: 0,
  questionIndex: 0,
  gameOver: true,
};

const TOTAL_QUESTIONS = 5;

const AppContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initState);
  const startGame = async () => {
    setIsLoading(true);
    const questions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    dispatch({ type: 'START', payload: questions });
    setIsLoading(false);
  };
  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };
  const checkAnswer = (e: any) => {
    dispatch({ type: 'CHECK_ANSWER', payload: e.currentTarget.value });
  };
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        isLoading,
        setIsLoading,
        startGame,
        nextQuestion,
        checkAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => React.useContext(AppContext);

export const fetchQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionState[]> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  );
  const data = await res.json();
  return data.results.map((question: Question) => {
    return {
      ...question,
      answers: shuffleArray<string>([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    };
  });
};
