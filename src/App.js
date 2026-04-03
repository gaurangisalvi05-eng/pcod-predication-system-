import { useState } from "react";

const STEPS = ["Personal", "Symptoms", "Lifestyle", "Diet", "Results"];

const initialData = {
  age: "", weight: "", height: "", cycleLength: "", cycleDuration: "",
  irregularPeriods: "", skippedPeriods: "", acne: "", hairLoss: "",
  excessHairGrowth: "", darkPatches: "", weightGain: "", moodSwings: "",
  fatigue: "", sleep: "", exercise: "", stressLevel: "", screenTime: "",
  waterIntake: "", junkFood: "", sugarIntake: "", vegetables: "", dairy: "",
};

function calcBMI(w, h) {
  if (!w || !h) return null;
  const hm = parseFloat(h) / 100;
  return (parseFloat(w) / (hm * hm)).toFixed(1);
}

function predictRisk(data) {
  let score = 0;
    const bmi = parseFloat(calcBMI(data.weight, data.height));
  const cycleLen = parseInt(data.cycleLength);

  if (bmi >= 25 && bmi < 30) score += 10;
  if (bmi >= 30) score += 20;
  if (cycleLen > 35 || cycleLen < 21) score += 20;
  if (data.irregularPeriods === "yes") score += 20;
  if (data.skippedPeriods === "yes") score += 15;
  if (data.acne === "severe") score += 10;
  else if (data.acne === "moderate") score += 5;
  if (data.hairLoss === "yes") score += 10;
  if (data.excessHairGrowth === "yes") score += 15;
  if (data.darkPatches === "yes") score += 10;
  if (data.weightGain === "yes") score += 10;
  if (data.fatigue === "always") score += 8;
  if (data.exercise === "none") score += 10;
  if (parseInt(data.stressLevel) >= 7) score += 10;
  if (data.sleep === "poor") score += 8;
  if (data.junkFood === "daily") score += 8;
  if (data.sugarIntake === "high") score += 8;
  if (parseInt(data.waterIntake) < 6) score += 5;

  let level, color, label;
  if (score >= 80) { level = "High"; color = "#e05252"; label = "⚠️ High Risk" }
  else if (score >= 45) { level = "Moderate"; color = "#e0943a"; label = "⚡ Moderate Risk" }
  else { level = "Low"; color = "#52b788"; label = "✅ Low Risk" }

  return { score: Math.min(score, 100), level, color, label };
}

function getRecommendations(data, risk) {
  const recs = [];
  const bmi = parseFloat(calcBMI(data.weight, data.height));

  const diet = [];
  if (data.sugarIntake === "high") diet.push("Cut refined sugars — swap sweets for berries, dates, or dark chocolate");
  if (data.junkFood === "daily" || data.junkFood === "often") diet.push("Reduce processed/junk food to max 1x/week; focus on whole foods");
  if (data.vegetables !== "daily") diet.push("Add leafy greens (spinach, broccoli, kale) to every meal — they reduce inflammation");
  if (parseInt(data.waterIntake) < 8) diet.push("Drink at least 8 glasses of water daily to support hormonal balance");
  diet.push("Eat low-glycemic foods: oats, quinoa, lentils, legumes to stabilize insulin levels");
  if (data.dairy === "high") diet.push("Consider reducing dairy — some studies link it to increased androgens in PCOD");
  diet.push("Include anti-inflammatory foods: turmeric, flaxseeds, omega-3 rich fish (salmon, sardines)");
  recs.push({ icon: "🥗", title: "Diet & Nutrition", items: diet });

  const exercise = [];
  if (data.exercise === "none") exercise.push("Start with 20–30 mins of walking daily — even gentle movement helps regulate insulin");
  else if (data.exercise === "rarely") exercise.push("Aim for 4–5 days/week of moderate exercise: walking, cycling, or swimming");
  exercise.push("Include strength training 2–3x/week — it improves insulin sensitivity significantly");
  exercise.push("Try yoga poses like Supta Baddha Konasana & Viparita Karani — specifically beneficial for PCOD");
  if (bmi >= 25) exercise.push("Weight management via exercise can restore ovulation in many PCOD cases");
  recs.push({ icon: "🏃‍♀️", title: "Exercise & Movement", items: exercise });

  const stress = [];
  if (parseInt(data.stressLevel) >= 6) stress.push("High stress spikes cortisol which worsens PCOD — practice 10 min daily meditation");
  stress.push("Try breathwork: 4-7-8 breathing technique helps lower cortisol within minutes");
  if (data.screenTime === "high") stress.push("Limit screens to 2hrs before bed — blue light disrupts melatonin & hormones");
  if (data.sleep === "poor" || data.sleep === "average") stress.push("Prioritize 7–9 hours of quality sleep — poor sleep directly worsens insulin resistance");
  stress.push("Journaling for 5 mins nightly can reduce anxiety and improve emotional regulation");
  recs.push({ icon: "🧘‍♀️", title: "Stress & Mental Wellness", items: stress });

  const medical = [];
  if (risk.level === "High") medical.push("Strongly recommend consulting a gynecologist or endocrinologist immediately");
  if (data.irregularPeriods === "yes" || data.skippedPeriods === "yes") medical.push("Get an ultrasound + hormonal panel: LH, FSH, AMH, Testosterone, Insulin fasting");
  if (data.darkPatches === "yes") medical.push("Dark patches (acanthosis nigricans) may indicate insulin resistance — get fasting insulin tested");
  if (data.excessHairGrowth === "yes") medical.push("Excess hair growth (hirsutism) indicates elevated androgens — seek hormonal evaluation");
  medical.push("Track your menstrual cycle using apps like Clue or Flo — bring data to your doctor");
  medical.push("Regular checkups every 6 months help monitor PCOD progression and treatment efficacy");
  recs.push({ icon: "🩺", title: "Medical Guidance", items: medical });

  const supplements = [];
  supplements.push("Inositol (Myo-inositol + D-chiro-inositol 40:1 ratio) — shown to improve ovulation");
  supplements.push("Vitamin D3 — most women with PCOD are deficient; get blood levels tested");
  supplements.push("Magnesium glycinate — reduces insulin resistance and helps with sleep");
  supplements.push("Spearmint tea — 2 cups daily shown to reduce androgen levels in studies");
  if (data.acne === "moderate" || data.acne === "severe") supplements.push("Zinc supplementation (30–40mg/day) can reduce acne and androgen activity");
  recs.push({ icon: "💊", title: "Supplements to Consider", items: supplements });

  return recs;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #fdf8f4;
    color: #2d1f1f;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #fdf8f4 0%, #f5ece3 50%, #ede0d4 100%);
  }

  .hero {
    text-align: center;
    padding: 60px 20px 40px;
    position: relative;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(196,130,100,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .badge {
    display: inline-block;
    background: rgba(196,130,100,0.15);
    border: 1px solid rgba(196,130,100,0.3);
    color: #8b4a3c;
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 700;
    line-height: 1.15;
    color: #2d1f1f;
    margin-bottom: 16px;
  }

  .hero h1 span { color: #c48264; }

  .hero p {
    font-size: 16px;
    color: #6b4c42;
    max-width: 520px;
    margin: 0 auto 40px;
    line-height: 1.7;
    font-weight: 300;
  }

  .progress-bar {
    display: flex;
    justify-content: center;
    gap: 0;
    margin-bottom: 40px;
    position: relative;
  }

  .step-dot {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .step-dot::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    width: 100px;
    height: 2px;
    background: #e0c8bc;
    z-index: -1;
  }

  .step-dot:last-child::after { display: none; }

  .dot {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 2px solid #e0c8bc;
    background: #fdf8f4;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    color: #b0897c;
    transition: all 0.3s ease;
    margin: 0 50px 8px;
  }

  .dot.active {
    background: #c48264;
    border-color: #c48264;
    color: white;
    box-shadow: 0 0 0 4px rgba(196,130,100,0.2);
  }

  .dot.done {
    background: #52b788;
    border-color: #52b788;
    color: white;
  }

  .step-label {
    font-size: 11px;
    font-weight: 500;
    color: #b0897c;
    letter-spacing: 0.5px;
  }

  .step-label.active { color: #c48264; font-weight: 600; }

  .card {
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(196,130,100,0.15);
    border-radius: 24px;
    padding: 40px;
    max-width: 700px;
    margin: 0 auto 40px;
    box-shadow: 0 8px 40px rgba(196,130,100,0.12);
  }

  .card h2 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    color: #2d1f1f;
    margin-bottom: 8px;
  }

  .card > p {
    color: #8b6b60;
    font-size: 14px;
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .form-grid.single { grid-template-columns: 1fr; }

  @media (max-width: 600px) {
    .form-grid { grid-template-columns: 1fr; }
    .card { padding: 24px 20px; }
    .dot { margin: 0 30px 8px; }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field.full { grid-column: 1 / -1; }

  label {
    font-size: 13px;
    font-weight: 600;
    color: #5c3a30;
    letter-spacing: 0.3px;
  }

  input[type="number"], input[type="text"], select {
    padding: 12px 16px;
    border: 1.5px solid #e0c8bc;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: #2d1f1f;
    background: rgba(253,248,244,0.8);
    outline: none;
    transition: all 0.2s ease;
    width: 100%;
    -webkit-appearance: none;
  }

  input:focus, select:focus {
    border-color: #c48264;
    background: white;
    box-shadow: 0 0 0 3px rgba(196,130,100,0.1);
  }

  .radio-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .radio-btn {
    flex: 1;
    min-width: 70px;
    padding: 10px 14px;
    border: 1.5px solid #e0c8bc;
    border-radius: 10px;
    background: rgba(253,248,244,0.8);
    cursor: pointer;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    color: #6b4c42;
    transition: all 0.2s ease;
    user-select: none;
  }

  .radio-btn:hover { border-color: #c48264; background: rgba(196,130,100,0.05); }

  .radio-btn.selected {
    background: #c48264;
    border-color: #c48264;
    color: white;
    font-weight: 600;
  }

  .range-field { display: flex; flex-direction: column; gap: 8px; }

  input[type="range"] {
    -webkit-appearance: none;
    height: 6px;
    background: linear-gradient(to right, #c48264 0%, #c48264 var(--val, 50%), #e0c8bc var(--val, 50%));
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px; height: 20px;
    background: white;
    border: 3px solid #c48264;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(196,130,100,0.3);
  }

  .range-labels {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #b0897c;
  }

  .range-value {
    font-size: 22px;
    font-weight: 700;
    color: #c48264;
    font-family: 'Playfair Display', serif;
  }

  .nav-btns {
    display: flex;
    gap: 12px;
    margin-top: 32px;
  }

  .btn {
    padding: 14px 28px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.25s ease;
    flex: 1;
  }

  .btn-primary {
    background: #c48264;
    color: white;
    box-shadow: 0 4px 20px rgba(196,130,100,0.35);
  }

  .btn-primary:hover {
    background: #b06e50;
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(196,130,100,0.45);
  }

  .btn-secondary {
    background: rgba(196,130,100,0.1);
    color: #8b4a3c;
    border: 1.5px solid rgba(196,130,100,0.25);
  }

  .btn-secondary:hover { background: rgba(196,130,100,0.18); }

  /* RESULTS */
  .results-card {
    background: rgba(255,255,255,0.9);
    border-radius: 24px;
    padding: 40px;
    max-width: 780px;
    margin: 0 auto 60px;
    box-shadow: 0 8px 40px rgba(196,130,100,0.15);
    border: 1px solid rgba(196,130,100,0.15);
  }

  .risk-gauge {
    text-align: center;
    padding: 32px 20px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(253,248,244,1), rgba(240,225,215,0.8));
    margin-bottom: 40px;
    border: 1px solid rgba(196,130,100,0.15);
  }

  .risk-label {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #8b6b60;
    margin-bottom: 16px;
  }

  .risk-score {
    font-family: 'Playfair Display', serif;
    font-size: 72px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 8px;
  }

  .risk-indicator {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .risk-bar-wrap {
    background: #e8d5c8;
    border-radius: 100px;
    height: 12px;
    max-width: 400px;
    margin: 0 auto 16px;
    overflow: hidden;
  }

  .risk-bar-fill {
    height: 100%;
    border-radius: 100px;
    transition: width 1s ease;
  }

  .risk-note {
    font-size: 13px;
    color: #8b6b60;
    max-width: 380px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .bmi-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(196,130,100,0.12);
    border-radius: 100px;
    padding: 8px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #8b4a3c;
    margin-top: 16px;
  }

  .rec-section h3 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #2d1f1f;
    margin-bottom: 20px;
  }

  .rec-card {
    background: #fdf8f4;
    border: 1px solid rgba(196,130,100,0.2);
    border-radius: 18px;
    padding: 24px;
    margin-bottom: 18px;
  }

  .rec-card-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    color: #2d1f1f;
    margin-bottom: 16px;
  }

  .rec-card-title span.icon {
    font-size: 22px;
    background: rgba(196,130,100,0.15);
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
  }

  .rec-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .rec-list li {
    display: flex;
    gap: 10px;
    font-size: 14px;
    line-height: 1.6;
    color: #4a3028;
  }

  .rec-list li::before {
    content: '→';
    color: #c48264;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .disclaimer {
    background: rgba(82,183,136,0.1);
    border: 1px solid rgba(82,183,136,0.3);
    border-radius: 14px;
    padding: 18px 22px;
    font-size: 13px;
    color: #2d6a4f;
    line-height: 1.7;
    margin-top: 32px;
  }

  .restart-btn {
    display: block;
    width: 100%;
    margin-top: 24px;
    text-align: center;
  }
`;

function RadioField({ label, name, options, value, onChange, full }) {
  return (
    <div className={`field${full ? " full" : ""}`}>
      <label>{label}</label>
      <div className="radio-group">
        {options.map(opt => (
          <div
            key={opt.value}
            className={`radio-btn${value === opt.value ? " selected" : ""}`}
            onClick={() => onChange(name, opt.value)}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function RangeField({ label, name, min, max, value, onChange, minLabel, maxLabel }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="field">
      <label>{label}</label>
      <div className="range-value">{value}</div>
      <input
        type="range" min={min} max={max} value={value}
        style={{ "--val": `${pct}%` }}
        onChange={e => onChange(name, e.target.value)}
      />
      <div className="range-labels"><span>{minLabel}</span><span>{maxLabel}</span></div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ ...initialData, stressLevel: "5", waterIntake: "6" });
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const setE = e => set(e.target.name, e.target.value);

  const risk = submitted ? predictRisk(data) : null;
  const recs = submitted ? getRecommendations(data, risk) : null;
  const bmi = calcBMI(data.weight, data.height);

  const steps = [
    // Step 0: Personal Info
    <div key={0} className="card">
      <h2>Personal Information</h2>
      <p>Let's start with some basic details to understand your profile.</p>
      <div className="form-grid">
        <div className="field">
          <label>Age (years)</label>
         <input
type="number"
name="age"
placeholder="Enter Age"
min="12"
max="60"
value={data.age}
onChange={setE}
required
/>

        </div>
        <div className="field">
          <label>Weight (kg)</label>
          <input
 type="number"
 name="weight"
 placeholder="Weight (kg)"
 min="30"
 max="150"
 value={data.weight}
 onChange={setE}
 required
/>
        </div>
        <div className="field">
          <label>Height (cm)</label>
          <input
 type="number"
 name="height"
 placeholder="Height (cm)"
 min="120"
 max="200"
 value={data.height}
 onChange={setE}
 required
/>
        </div>
        <div className="field">
          <label>Menstrual Cycle Length (days)</label>
          <input
 type="number"
 name="cycleLength"
 placeholder="Cycle Length (days)"
 min="20"
 max="45"
 value={data.cycleLength}
 onChange={setE}
 required
/>
        </div>
        <div className="field">
          <label>Period Duration (days)</label>
          <input
type="number"
name="cycleDuration"
min="2"
max="10"
value={data.cycleDuration}
onChange={setE}
placeholder="e.g. 5"
/>
        </div>
      </div>
      {bmi && (
        <div style={{ marginTop: 20 }}>
          <div className="bmi-badge">BMI: {bmi} — {bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese"}</div>
        </div>
      )}
    </div>,

    <div key={1} className="card">
      <h2>PCOD Symptoms</h2>
      <p>Tell us about any symptoms you've been experiencing. Be as honest as possible for accurate results.</p>
      <div className="form-grid">
        <RadioField label="Irregular periods?" name="irregularPeriods" value={data.irregularPeriods}
          options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} onChange={set} />
        <RadioField label="Have you skipped periods?" name="skippedPeriods" value={data.skippedPeriods}
          options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} onChange={set} />
        <RadioField label="Acne severity" name="acne" value={data.acne}
          options={[{ label: "None", value: "none" }, { label: "Mild", value: "mild" }, { label: "Moderate", value: "moderate" }, { label: "Severe", value: "severe" }]} onChange={set} full />
        <RadioField label="Hair thinning / hair loss?" name="hairLoss" value={data.hairLoss}
          options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} onChange={set} />
        <RadioField label="Excess hair growth (face/body)?" name="excessHairGrowth" value={data.excessHairGrowth}
          options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} onChange={set} />
        <RadioField label="Dark patches on skin (neck/armpits)?" name="darkPatches" value={data.darkPatches}
          options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} onChange={set} full />
        <RadioField label="Unexplained weight gain?" name="weightGain" value={data.weightGain}
          options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} onChange={set} />
        <RadioField label="Mood swings / anxiety?" name="moodSwings" value={data.moodSwings}
          options={[{ label: "Rarely", value: "rarely" }, { label: "Sometimes", value: "sometimes" }, { label: "Often", value: "often" }]} onChange={set} />
      </div>
    </div>,

 
    <div key={2} className="card">
      <h2>Lifestyle Habits</h2>
      <p>Your daily habits significantly impact hormonal health. Answer honestly for better recommendations.</p>
      <div className="form-grid">
        <RadioField label="How often do you exercise?" name="exercise" value={data.exercise}
          options={[{ label: "None", value: "none" }, { label: "Rarely", value: "rarely" }, { label: "Weekly", value: "weekly" }, { label: "Daily", value: "daily" }]} onChange={set} full />
        <RadioField label="Sleep quality?" name="sleep" value={data.sleep}
          options={[{ label: "Poor", value: "poor" }, { label: "Average", value: "average" }, { label: "Good", value: "good" }]} onChange={set} />
        <RadioField label="Fatigue / tiredness?" name="fatigue" value={data.fatigue}
          options={[{ label: "Rarely", value: "rarely" }, { label: "Sometimes", value: "sometimes" }, { label: "Always", value: "always" }]} onChange={set} />
        <RadioField label="Daily screen time?" name="screenTime" value={data.screenTime}
          options={[{ label: "< 4 hrs", value: "low" }, { label: "4–8 hrs", value: "medium" }, { label: "> 8 hrs", value: "high" }]} onChange={set} />
        <div className="field full">
          <RangeField label="Stress Level (1–10)" name="stressLevel" min={1} max={10}
            value={data.stressLevel} onChange={set} minLabel="Very Low" maxLabel="Extreme" />
        </div>
        <div className="field full">
          <RangeField label="Daily Water Intake (glasses)" name="waterIntake" min={1} max={15}
            value={data.waterIntake} onChange={set} minLabel="1 glass" maxLabel="15 glasses" />
        </div>
      </div>
    </div>,


    <div key={3} className="card">
      <h2>Diet & Nutrition</h2>
      <p>What you eat directly influences your hormone levels and PCOD risk.</p>
      <div className="form-grid">
        <RadioField label="Junk / processed food consumption" name="junkFood" value={data.junkFood}
          options={[{ label: "Rarely", value: "rarely" }, { label: "Weekly", value: "weekly" }, { label: "Often", value: "often" }, { label: "Daily", value: "daily" }]} onChange={set} full />
        <RadioField label="Sugar intake level" name="sugarIntake" value={data.sugarIntake}
          options={[{ label: "Low", value: "low" }, { label: "Moderate", value: "moderate" }, { label: "High", value: "high" }]} onChange={set} />
        <RadioField label="Dairy consumption" name="dairy" value={data.dairy}
          options={[{ label: "Low", value: "low" }, { label: "Moderate", value: "moderate" }, { label: "High", value: "high" }]} onChange={set} />
        <RadioField label="Vegetables / fruits daily?" name="vegetables" value={data.vegetables}
          options={[{ label: "Rarely", value: "rarely" }, { label: "Sometimes", value: "sometimes" }, { label: "Daily", value: "daily" }]} onChange={set} full />
      </div>
    </div>
  ];

  if (submitted && risk && recs) {
    return (
      <div className="app">
        <style>{styles}</style>
        <div className="hero">
          <div className="badge">Your Results</div>
          <h1>Your PCOD <span>Health Report</span></h1>
          <p>Based on your inputs, here's a personalized analysis and action plan.</p>
        </div>
        <div className="results-card">
          <div className="risk-gauge">
            <div className="risk-label">PCOD Risk Score</div>
            <div className="risk-score" style={{ color: risk.color }}>{risk.score}</div>
            <div className="risk-indicator" style={{ color: risk.color }}>{risk.label}</div>
            <div className="risk-bar-wrap">
              <div className="risk-bar-fill" style={{ width: `${risk.score}%`, background: risk.color }} />
            </div>
            <div className="risk-note">
              {risk.level === "High" && "Your responses indicate several significant risk factors. Please consult a doctor soon."}
              {risk.level === "Moderate" && "You show some concerning signs. Lifestyle changes now can significantly reduce progression."}
              {risk.level === "Low" && "You show few risk factors. Maintain your healthy habits and monitor regularly."}
            </div>
            {bmi && <div className="bmi-badge">Your BMI: {bmi}</div>}
          </div>

          <div className="rec-section">
            <h3>Your Personalized Recommendations</h3>
            {recs.map(r => (
              <div key={r.title} className="rec-card">
                <div className="rec-card-title">
                  <span className="icon">{r.icon}</span>
                  {r.title}
                </div>
                <ul className="rec-list">
                  {r.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="disclaimer">
            ⚕️ <strong>Medical Disclaimer:</strong> This tool is for educational purposes only and is not a medical diagnosis. PCOD can only be confirmed through clinical tests (ultrasound + hormonal blood panel). Please consult a qualified gynecologist or endocrinologist for professional evaluation and treatment.
          </div>

          <button className="btn btn-primary restart-btn" onClick={() => { setSubmitted(false); setStep(0); setData({ ...initialData, stressLevel: "5", waterIntake: "6" }); }}>
            ← Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <style>{styles}</style>
      <div className="hero">
    
        <h1>PCOD Risk <span>Predictor</span> &<br />Lifestyle Guide</h1>
        <p>Answer a few questions about your health and lifestyle. We'll assess your PCOD risk and give personalized recommendations.</p>

        <div className="progress-bar">
          {STEPS.slice(0, 4).map((s, i) => (
            <div key={s} className="step-dot">
              <div className={`dot ${i === step ? "active" : i < step ? "done" : ""}`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`step-label ${i === step ? "active" : ""}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {steps[step]}

      <div style={{ maxWidth: 700, margin: "0 auto 60px", padding: "0 20px" }}>
        <div className="nav-btns">
          {step > 0 && (
            <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>
          )}
          {step < 3 ? (

<button
className="btn btn-primary"
onClick={() => {

if(step === 0 && (!data.age || !data.weight || !data.height || !data.cycleLength)){
alert("Please fill all personal details")
return
}

if(step === 1 && (!data.irregularPeriods || !data.skippedPeriods)){
alert("Please answer symptoms questions")
return
}

if(step === 2 && (!data.exercise || !data.sleep)){
alert("Please answer lifestyle questions")
return
}

if(step === 3 && (!data.junkFood || !data.sugarIntake)){
alert("Please answer diet questions")
return
}

setStep(s => s + 1)

}}
>
Continue →
</button>

) : (

<button
className="btn btn-primary"
onClick={() => setSubmitted(true)}
>
View My Results 🔍
</button>

)}
