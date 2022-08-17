import "./Starting.css";

function Starting(props) {
  return (
    <div className="Starting-screen">
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={props.startHandler} className="Start-button">
        Start quiz
      </button>
    </div>
  );
}

export default Starting;
