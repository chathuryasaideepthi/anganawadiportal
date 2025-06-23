import React, { useState } from "react";
import "../styles/PatientDetailsModal.css";

const PatientDetailsModal = ({ patient, onClose }) => {
  const [form, setForm] = useState({
    eatingProperly: "",
    pillsAvailable: "",
    awareOfDeficiencies: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const allAnswered =
      form.eatingProperly && form.pillsAvailable && form.awareOfDeficiencies;

    if (!allAnswered) {
      alert("Please answer all health questions before submitting.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Patient Health Assessment</h2>

        <div className="modal-header">
          <div className="profile-pic">👤</div>
          <div>
            <h3>{patient.name}</h3>
            <p className="status">
              {patient.stage === "Pregnant"
                ? `Pregnant – ${patient.pregnancyMonth} months`
                : `Not pregnant\nChild age: ${patient.childAgeMonths} years`}
            </p>
          </div>
        </div>

        <div className="section red-bg">
          <h4>⚠️ Nutrition Deficiencies</h4>
          {patient.concern ? (
            <div className="tags">
              {patient.concern.split(",").map((d, i) => (
                <span key={i} className="pill">{d.trim()}</span>
              ))}
            </div>
          ) : (
            <p>None</p>
          )}
        </div>

        {!submitted ? (
          <div className="section blue-bg">
            <h4>💙 Health Assessment Questions</h4>
            {[
              {
                key: "eatingProperly",
                label: "Are you eating food properly and regularly?",
              },
              {
                key: "pillsAvailable",
                label: "Are nutritional supplements/pills available to you?",
              },
              {
                key: "awareOfDeficiencies",
                label: "Are you aware of your nutritional deficiencies and their effects?",
              },
            ].map(({ key, label }) => (
              <div className="question" key={key}>
                <p>{label}</p>
                <label>
                  <input
                    type="radio"
                    name={key}
                    value="Yes"
                    checked={form[key] === "Yes"}
                    onChange={handleChange}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={key}
                    value="No"
                    checked={form[key] === "No"}
                    onChange={handleChange}
                  /> No
                </label>
              </div>
            ))}

            <div className="question">
              <p><b>Visit Notes:</b></p>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Add observations, suggestions, or follow-up recommendations..."
                rows={3}
              />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        ) : (
          <div className="section summary-bg">
            <h4>🧠 Health Summary</h4>
            <p>🍽 Eating Properly: <b>{form.eatingProperly}</b></p>
            <p>💊 Pills Available: <b>{form.pillsAvailable}</b></p>
            <p>🧠 Awareness: <b>{form.awareOfDeficiencies}</b></p>
            <p><b>📝 Visit Notes:</b> {form.notes || "None"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailsModal;
