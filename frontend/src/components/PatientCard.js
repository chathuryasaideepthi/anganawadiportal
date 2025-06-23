// src/components/PatientCard.js
import React from "react";
import "../styles/PatientCard.css";

const PatientCard = ({ patient, onMarkVisited, isVisited, onViewDetails }) => {
  const deficiencies = ["Iodine", "Zinc", "Calcium", "Iron", "Omega-3", "Vit B"];
  const hasDeficiency = deficiencies.some((item) => patient.concern?.includes(item));

  return (
    <div className="patient-card">
      <div className="card-header">
        <h4>{patient.name}</h4>
        {patient.concern && (
          <span className="badge red">1 Severe</span>
        )}
      </div>

      <p className="stage">
        {patient.stage === "Pregnant"
          ? `Pregnant: ${patient.pregnancyMonth} months`
          : `Child age: ${patient.childAgeMonths} years`}
      </p>

      {hasDeficiency && (
        <div className="deficiencies">
          <p>⚠️ <b>Deficiencies:</b></p>
          <div className="tags">
            {deficiencies.map((item) =>
              patient.concern.includes(item) ? (
                <span className="pill red" key={item}>{item}</span>
              ) : null
            )}
          </div>
        </div>
      )}

      <p>
        Eating Properly:{" "}
        <span className={isVisited ? "boolean-yes" : "boolean-no"}>
          {isVisited ? "Yes" : "No"}
        </span>
      </p>
      <p>
        Pills Available: <span className="boolean-yes">Yes</span>
      </p>

      <div className="button-group">
        <button onClick={onViewDetails} className="view-btn">
          👁️ View Details
        </button>
        <button
          onClick={onMarkVisited}
          className="visit-btn"
          disabled={isVisited}
        >
          {isVisited ? "Visited" : "Mark Visited"}
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
