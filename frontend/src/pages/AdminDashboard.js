// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = ({ onLogout }) => {
  const [awws, setAwws] = useState([]);
  const [clientsCount, setClientsCount] = useState(0);
  const [clients, setClients] = useState([]);

  const [showClientForm, setShowClientForm] = useState(false);
  const [showAwwForm, setShowAwwForm] = useState(false);

  const [clientForm, setClientForm] = useState({
    name: "",
    stage: "Pregnant",
    pregnancyMonth: "",
    childAgeMonths: "",
    concern: "",
    assignedAwwId: "",
  });

  const [awwForm, setAwwForm] = useState({
    name: "",
    awwId: "",
  });

  useEffect(() => {
    fetchAWWs();
  }, []);

  useEffect(() => {
    if (awws.length > 0) {
      fetchClients();
    }
  }, [awws]);

  const fetchAWWs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/awws");
      if (res.data.success) {
        setAwws(res.data.message);
      }
    } catch (err) {
      console.error("Failed to fetch AWWs", err);
    }
  };

  const fetchClients = async () => {
    let allClients = [];
    for (const aww of awws) {
      try {
        const res = await axios.get(`http://localhost:5000/api/clients/${aww.awwId}`);
        if (res.data.success) {
          allClients = [...allClients, ...res.data.message];
        }
      } catch (err) {
        console.error(`Failed to fetch clients for ${aww.awwId}`, err);
      }
    }
    setClients(allClients);
    setClientsCount(allClients.length);
  };

  const handleClientInputChange = (e) => {
    const { name, value } = e.target;
    setClientForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAwwInputChange = (e) => {
    const { name, value } = e.target;
    setAwwForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClient = async () => {
    const { name, stage, pregnancyMonth, childAgeMonths, assignedAwwId } = clientForm;

    if (!name || !assignedAwwId || (stage === "Pregnant" && !pregnancyMonth) || (stage !== "Pregnant" && !childAgeMonths)) {
      alert("Please fill all required fields.");
      return;
    }

    const formToSubmit = {
      ...clientForm,
      pregnancyMonth: stage === "Pregnant" ? pregnancyMonth : null,
      childAgeMonths: stage !== "Pregnant" ? childAgeMonths : null,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/clients", formToSubmit);
      if (res.data.success) {
        alert("Client added successfully!");
        fetchClients();
        setShowClientForm(false);
        setClientForm({
          name: "",
          stage: "Pregnant",
          pregnancyMonth: "",
          childAgeMonths: "",
          concern: "",
          assignedAwwId: "",
        });
      } else {
        alert("Failed to add client: " + res.data.message);
      }
    } catch (err) {
      alert("Error while adding client.");
      console.error(err);
    }
  };

  const handleAddAww = async () => {
    if (!awwForm.name || !awwForm.awwId) {
      alert("Please enter both name and AWW ID.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/awws", awwForm);
      if (res.data.success) {
        alert("AWW added successfully!");
        fetchAWWs();
        setShowAwwForm(false);
        setAwwForm({ name: "", awwId: "" });
      } else {
        alert("Failed to add AWW: " + res.data.message);
      }
    } catch (err) {
      alert("Error while adding AWW.");
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>⚙️ Admin Dashboard</h1>
        <div className="user-bar">
          Welcome, Admin
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="stats-cards">
        <div className="card blue">
          <h4>Total AWWs</h4>
          <p>{awws.length}</p>
        </div>
        <div className="card green">
          <h4>Total Clients</h4>
          <p>{clientsCount}</p>
        </div>
        <div className="card purple">
          <h4>System Status</h4>
          <p>Online ✅</p>
        </div>
      </div>

      <div className="aww-management section">
        <div className="section-header">
          <h3>Anganwadi Workers (AWWs)</h3>
          <button className="primary" onClick={() => setShowAwwForm(!showAwwForm)}>
            {showAwwForm ? "Cancel" : "➕ Add AWW"}
          </button>
        </div>

        {showAwwForm && (
          <div className="add-aww-form">
            <input name="name" placeholder="AWW Name" value={awwForm.name} onChange={handleAwwInputChange} />
            <input name="awwId" placeholder="AWW ID" value={awwForm.awwId} onChange={handleAwwInputChange} />
            <button className="primary" onClick={handleAddAww}>Submit</button>
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>AWW ID</th>
              <th>Assigned Clients</th>
            </tr>
          </thead>
          <tbody>
            {awws.map((aww, i) => {
              const assignedCount = clients.filter(c => c.assignedAwwId === aww.awwId).length;
              return (
                <tr key={i}>
                  <td>{aww.name}</td>
                  <td>{aww.awwId}</td>
                  <td>{assignedCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="client-management section">
        <div className="section-header">
          <h3>Client Management</h3>
          <button className="primary" onClick={() => setShowClientForm(!showClientForm)}>
            {showClientForm ? "Cancel" : "➕ Add Client"}
          </button>
        </div>

        {showClientForm && (
          <div className="add-client-form">
            <input name="name" placeholder="Client Name" value={clientForm.name} onChange={handleClientInputChange} />
            <select name="stage" value={clientForm.stage} onChange={handleClientInputChange}>
              <option value="Pregnant">Pregnant</option>
              <option value="0-6 months">0–6 months</option>
              <option value="6-24 months">6–24 months</option>
            </select>
            {clientForm.stage === "Pregnant" ? (
              <input
                name="pregnancyMonth"
                type="number"
                placeholder="Pregnancy Month"
                value={clientForm.pregnancyMonth}
                onChange={handleClientInputChange}
              />
            ) : (
              <input
                name="childAgeMonths"
                type="number"
                placeholder="Child Age (months)"
                value={clientForm.childAgeMonths}
                onChange={handleClientInputChange}
              />
            )}
            <input
              name="concern"
              placeholder="Deficiencies (comma separated)"
              value={clientForm.concern}
              onChange={handleClientInputChange}
            />
            <select name="assignedAwwId" value={clientForm.assignedAwwId} onChange={handleClientInputChange}>
              <option value="">-- Assign to AWW --</option>
              {awws.map((aww) => (
                <option key={aww.awwId} value={aww.awwId}>
                  {aww.name} ({aww.awwId})
                </option>
              ))}
            </select>
            <button className="primary" onClick={handleAddClient}>Submit</button>
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Stage</th>
              <th>Pregnancy Month / Child Age</th>
              <th>Concern</th>
              <th>Assigned AWW</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td>{c.stage}</td>
                <td>
                  {c.stage === "Pregnant"
                    ? c.pregnancyMonth
                      ? `${c.pregnancyMonth} month`
                      : "N/A"
                    : c.childAgeMonths
                    ? `${c.childAgeMonths} month`
                    : "N/A"}
                </td>
                <td>{c.concern}</td>
                <td>{c.assignedAwwId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
