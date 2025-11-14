import "../App.css";
import { Questions } from "../helpers/Questions";
import { useState } from "react";

import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const { score, setScore, gameState, setGameState, userName } = useContext(
    GameStateContext
  );

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  // Determine correct answer dynamically for Q1
  let correctAnswer = Questions[currentQuestion].asnwer;
  if (currentQuestion === 0 && userName) {
    correctAnswer = "optionA";
  }

  const nextQuestion = () => {
    if (correctAnswer === optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const finishQuiz = () => {
    if (correctAnswer === optionChosen) {
      setScore(score + 1);
    }
    setGameState("finished");
  };

  // Dynamically replace one of the first question's options with the user's name
  let displayOptions = { ...Questions[currentQuestion] };
  if (currentQuestion === 0 && userName) {
    displayOptions = { ...displayOptions, optionA: userName };
  }

  return (
    <div className="Quiz">
      <h1>{Questions[currentQuestion].prompt}</h1>
      <div className="questions">
        <button
          className={optionChosen === "optionA" ? "option-btn selected" : "option-btn"}
          onClick={() => {
            chooseOption("optionA");
          }}
        >
          {displayOptions.optionA}
        </button>
        <button
          className={optionChosen === "optionB" ? "option-btn selected" : "option-btn"}
          onClick={() => {
            chooseOption("optionB");
          }}
        >
          {displayOptions.optionB}
        </button>
        <button
          className={optionChosen === "optionC" ? "option-btn selected" : "option-btn"}
          onClick={() => {
            chooseOption("optionC");
          }}
        >
          {displayOptions.optionC}
        </button>
        <button
          className={optionChosen === "optionD" ? "option-btn selected" : "option-btn"}
          onClick={() => {
            chooseOption("optionD");
          }}
        >
          {displayOptions.optionD}
        </button>
      </div>

      {currentQuestion == Questions.length - 1 ? (
        <button onClick={finishQuiz} id="nextQuestion">
          Finish Quiz
        </button>
      ) : (
        <button onClick={nextQuestion} id="nextQuestion">
          Next Question
        </button>
      )}
    </div>
  );
}

export default Quiz;
