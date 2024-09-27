import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputData, setInputData] = useState({
    input1: "",
    input2: "",
  });
  const [output, setOutput] = useState(null);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });
      const result = await response.json();
      setOutput(result.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>AI Prediction App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="input1"
          value={inputData.input1}
          onChange={handleChange}
          placeholder="Input 1"
        />
        <input
          type="text"
          name="input2"
          value={inputData.input2}
          onChange={handleChange}
          placeholder="Input 2"
        />
        <button type="submit">Submit</button>
      </form>
      {output && <div className="output">Prediction: {output}</div>}
    </div>
  );
}

export default App;
