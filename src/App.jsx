import "./App.css";
import { useState } from "react";
import Starting from "./components/Starting";
import Questions from "./components/Questions";

function App() {
  const [start, getStart] = useState(false);

  function startHandler() {
    getStart(true);
  }

  return (
    <div className="App">
      {start ? <Questions /> : <Starting startHandler={startHandler} />}
      <div className="Decoration Yellow"></div>
      <div className="Decoration Blue"></div>
    </div>
  );
}

export default App;
