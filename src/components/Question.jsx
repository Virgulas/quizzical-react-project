import "./Question.css";
import { nanoid } from "nanoid";

function Question({
  choices,
  question,
  done,
  index,
  correct_answer,
  questionHandler,
  selectedChoice
}) {

  function buttonHandler (currentChoice) {
    if (done) return;
    questionHandler(index, {correct_answer: correct_answer, current_choice: currentChoice})  
  }

  function choiceStyle (choice) {
    if (done) {
      if (choice === correct_answer) {
        return "Right-answer";
      }
      else if(choice === selectedChoice) {
        return "Wrong-answer";
      }
    }
    else if (selectedChoice == choice) {
      return "Selected";
    }
    return "";
  }

  let choicesButtons = choices.map((choice) => {
    return (
      <button
        disabled={done&&choice!==correct_answer}
        key={nanoid()}
        onClick={() => buttonHandler(choice)}
        className={`Choice-button ${choiceStyle(choice)}`}
        dangerouslySetInnerHTML={{ __html: choice }}
      />
  
    );
  });


  return (
    <div className="Question-container">
      <h3 className="Question-title" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="Choices-container">{choicesButtons}</div>
    </div>
  );
}

export default Question;
