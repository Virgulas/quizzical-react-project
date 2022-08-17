import "./Questions.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

function Questions() {
  const quizStartValues = {
    results: {
      checked: false,
      points: 0
    },
    answers: {},
    questionsData: []
  }
  const [quizData, getQuizData] = useState(quizStartValues);
  const [playCount, playUpdate] = useState(0);


  useEffect(() => {

    const getData = async () => {
      const request = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await request.json();
      return data["results"];
    };

    const randomizeArray = (values) => {
      let randomizedArray = [];
      while (values[0]) {
        const randomPosition = Math.floor(Math.random() * values.length);
        randomizedArray.push(values[randomPosition]);
        values = values.filter((v) => v !== values[randomPosition]);
      }
      return randomizedArray;
    };

    const organizeData = async () => {
      const data = await getData();
      let organizedData = [];
      for (let question of data) {
        organizedData.push({
          question: question["question"],
          correct_answer: question["correct_answer"],
          choices: randomizeArray([
            question["correct_answer"],
            ...question["incorrect_answers"],
          ]),
        });
      }
      return organizedData;
    };

    organizeData().then((data) => {getQuizData(oldData => ({...oldData, questionsData: data}))});
  }, [playCount]);

  function playAgain() {
    getQuizData(quizStartValues);
    playUpdate(v => v + 1);
  }

  const resultsCheck = () => {
    if (quizData.results.checked) { playAgain(); return; }
    const values = Object.values(quizData.answers);
    if (values.length != quizData.questionsData.length) return;
    let points = 0;
    for (let value of values) {

      if (value["current_choice"] == value["correct_answer"]) points++;
    }
    
    getQuizData(
      oldData => ({...oldData, results: {
        checked: true,
        points: points
      }})
    )
  }

  const questionHandler = (index, values) => {
    getQuizData(
      oldData => ({
        ...oldData, answers: {...oldData["answers"], [index]: {
          correct_answer: values["correct_answer"],
          current_choice: values["current_choice"],
        }}
      }))
};

  const questions = quizData.questionsData.map((question, index) => {
    return (
      <Question
        {...question}
        done={quizData.results.checked}
        answers={quizData.answers}
        questionHandler={questionHandler}
        index={index}
        key={nanoid()}
        selectedChoice={quizData.answers[index]?.current_choice}
      />
    );
  });
  return (
    <>
      {quizData.questionsData[0] ? (
        <div className="Questions-container">
          <div className="Questions">{questions}</div>
          <div>
          {quizData.results.checked&&<p className="Score">You scored {`${quizData.results.points}/${quizData.questionsData.length}`} correct answers</p>}
          <button className="Answers-check" onClick={resultsCheck}>{quizData.results.checked?  "Play Again" : "Check answers"}</button>
          </div>
        </div>
      ) : (
        <div className="Spinner">
          <div className="Spinner-circle"></div>
        </div>
      )}
    </>
  );
}

export default Questions;
