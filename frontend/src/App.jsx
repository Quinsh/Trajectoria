import React from "react";
import ReactDOM from "react-dom";
import { analyzeResume } from "../api";

function App() {
  const handleClick = async () => {
    alert(analyzeResume("asdfad"))
  };

  return (
    <div>
      <h1>Career Path Finder</h1>
      <p>Your career recommendations will appear here.</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;