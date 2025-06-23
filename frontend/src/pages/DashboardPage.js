import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientCard from "../components/PatientCard";
import PatientDetailsModal from "../components/PatientDetailsModal";
import "../styles/Dashboard.css";

const DashboardPage = ({ user, onLogout }) => {
  const [patients, setPatients] = useState([]);
  const [visited, setVisited] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fetch patients on mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/clients/${user.awwId}`);
        if (res.data.success) {
          setPatients(res.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch patients", err);
      }
    };

    if (user?.awwId) {
      fetchPatients();
    }
  }, [user]);

  // Mark a patient as visited
  const markVisited = async (client) => {
    if (visited.includes(client.name)) return;

    try {
      await axios.post("http://localhost:5000/api/logs", {
        awwId: user.awwId,
        clientName: client.name,
        topics: ["Routine Visit"],
        notes: `Visited ${client.name}`,
      });

      setVisited((prev) => [...prev, client.name]);
    } catch (err) {
      console.error("Failed to mark visited");
    }
  };

  const progress = patients.length ? (visited.length / patients.length) * 100 : 0;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>👥 Patient Dashboard</h2>
        <div>
          Welcome, {user.name}
          <b className="dashboard-logout" onClick={onLogout}>Logout</b>
        </div>
      </header>

      <div className="dashboard-cards">
        <div className="card">
          <h4>📅 Today's Date</h4>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
        <div className="card">
          <h4>👥 Assigned Patients</h4>
          <p>{patients.length}</p>
        </div>
        <div className="card">
          <h4>✅ Visited Today</h4>
          <p>{visited.length}/{patients.length}</p>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
        <span>{Math.round(progress)}% Complete</span>
      </div>

      <h3>Today's Patients</h3>
      <p className="subtext">Maternal and child nutrition assessments</p>

      <div className="patient-list">
        {patients.map((p) => (
          <PatientCard
            key={p._id}
            patient={p}
            onMarkVisited={() => markVisited(p)}
            onViewDetails={() => setSelectedPatient(p)}
            isVisited={visited.includes(p.name)}
          />
        ))}
      </div>

      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onMarkVisited={() => markVisited(selectedPatient)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
