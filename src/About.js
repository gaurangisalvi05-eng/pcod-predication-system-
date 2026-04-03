import React from "react";

function About() {
  return (
    <div className="card">

      <h2>About PCOD</h2>

      <p>
        Polycystic Ovarian Disease (PCOD) is a hormonal disorder that affects many women.
        It happens when ovaries produce excess male hormones (androgens).
      </p>

      <h3>Common Symptoms</h3>

      <ul>
        <li>Irregular periods</li>
        <li>Weight gain</li>
        <li>Acne</li>
        <li>Hair fall</li>
        <li>Excess facial hair</li>
        <li>Mood swings</li>
      </ul>

      <h3>Why this project?</h3>

      <p>
        This website predicts PCOD risk percentage using health details,
        lifestyle habits and diet information.
      </p>

      <p>
        It helps users understand early warning signs and take preventive steps.
      </p>

      <p style={{fontSize:"14px", marginTop:"20px"}}>
        Note: This is only prediction tool, not medical diagnosis.
      </p>

    </div>
  );
}

export default About;