import React from 'react';
import { useAppContext } from '../context';

const QuestionCard = () => {
  const { state, checkAnswer, isLoading, nextQuestion } = useAppContext();
  return (
    <div className="question">
      {!state?.gameOver && (
        <p className="score">
          <span>Score: </span>
          <span>
            {state?.score} / {state?.questions?.length}
          </span>
        </p>
      )}
      <p
        className="current-question"
        dangerouslySetInnerHTML={{
          __html: `${state?.questionIndex! + 1}. ${state?.questions[
            state?.questionIndex
          ].question!}`,
        }}
      />
      <div className="answers-container">
        {state?.questions[state?.questionIndex!]?.answers.map(
          (answer, index) => {
            const disabled = state?.userAnswers[state?.questionIndex!]
              ? true
              : false;
            return (
              <button
                className={`answer ${
                  disabled
                    ? `${
                        answer ===
                        state?.userAnswers[state?.questionIndex!].correct_answer
                          ? 'right'
                          : 'wrong'
                      }`
                    : ''
                }`}
                key={index}
                value={answer}
                onClick={(e) => {
                  //@ts-ignore
                  checkAnswer(e);
                }}
                disabled={disabled}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: answer,
                  }}
                />
              </button>
            );
          }
        )}
      </div>

      {!state?.gameOver &&
        !isLoading &&
        state?.userAnswers.length! - 1 === state?.questionIndex &&
        state?.questionIndex !== state?.questions.length - 1 && (
          <div className="next">
            <button className="btn btn-lg" onClick={nextQuestion}>
              Next
            </button>
          </div>
        )}
    </div>
  );
};

export default QuestionCard;
