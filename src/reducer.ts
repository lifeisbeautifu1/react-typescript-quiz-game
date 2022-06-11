import { State, Action } from './types';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'START': {
      return {
        ...state,
        gameOver: false,
        questions: action.payload,
        score: 0,
        questionIndex: 0,
        userAnswers: [],
      };
    }
    case 'NEXT_QUESTION': {
      if (state.questionIndex + 1 === state.questions?.length) {
        return {
          ...state,
          gameOver: true,
        };
      } else {
        return {
          ...state,
          questionIndex: state.questionIndex + 1,
        };
      }
    }
    case 'CHECK_ANSWER': {
      if (!state.gameOver) {
        const { questions, questionIndex } = state;
        const correct =
          questions[questionIndex].correct_answer === action.payload;
        let score = state.score;
        if (correct) score += 1;

        return {
          ...state,
          score,
          userAnswers: [
            ...state.userAnswers,
            {
              question: questions[questionIndex].question,
              correct,
              answer: action.payload,
              correct_answer: questions[questionIndex].correct_answer,
            },
          ],
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
