export type ContextProps = {
  state?: State;
  dispatch?: React.Dispatch<Action>;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  startGame?: () => Promise<void>;
  nextQuestion?: () => void;
  checkAnswer?: (e: any) => void;
};

export type AppProviderProps = {
  children?: React.ReactNode;
};

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type Question = {
  question: string;
  correct_answer: string;
  difficulty: string;
  category: string;
  type: string;
  incorrect_answers: string[];
};

export type QuestionState = Question & {
  answers: string[];
};

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correct_answer: string;
};

export type State = {
  questions: QuestionState[];
  questionIndex: number;
  userAnswers: AnswerObject[];
  score: number;
  gameOver: boolean;
};

export type Action =
  | {
      type: 'START';
      payload: QuestionState[];
    }
  | {
      type: 'CHECK_ANSWER';
      payload: string;
    }
  | {
      type: 'NEXT_QUESTION';
    };
