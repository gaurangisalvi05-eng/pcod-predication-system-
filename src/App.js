import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    age: "",
    bmi: "",
    sleep: "",
    stress: "",
    cycle: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const calculateRisk = () => {
    let score = 0;

    if (data.bmi > 25) score += 20;
    if (data.sleep < 6) score += 20;
    if (data.stress > 7) score += 20;
    if (data.cycle === "irregular") score += 20;

    let risk = Math.min(score, 100);

    let level =
      risk < 30 ? "Low" : risk < 60 ? "Medium" : "High";

    setResult(`PCOD Risk: ${risk}% (${level})`);
  };

  return (
    <div className="App">
      <h1>PCOD Prediction & Lifestyle Recommendation System</h1>

      <input
        type="number"
        name="age"
        placeholder="Enter Age"
        value={data.age}
        onChange={handleChange}
      />

      <input
        type="number"
        name="bmi"
        placeholder="Enter BMI"
        value={data.bmi}
        onChange={handleChange}
      />

      <input
        type="number"
        name="sleep"
        placeholder="Sleep Hours"
        value={data.sleep}
        onChange={handleChange}
      />

      <input
        type="number"
        name="stress"
        placeholder="Stress Level (1-10)"
        value={data.stress}
        onChange={handleChange}
      />

      <select name="cycle" onChange={handleChange}>
        <option value="">Menstrual Cycle</option>
        <option value="regular">Regular</option>
        <option value="irregular">Irregular</option>
      </select>

      <br /><br />

      <button onClick={calculateRisk}>
        Predict
      </button>

      <h2>{result}</h2>

      {result && (
        <div>
          <h3>Recommendations</h3>
          <p>✔ Eat healthy diet (low sugar, high fiber)</p>
          <p>✔ Exercise 30 mins daily</p>
          <p>✔ Sleep 7-8 hours</p>
          <p>✔ Reduce stress (yoga/meditation)</p>
        </div>
      )}
    </div>
  );
}

export default App;