// src/App.js
import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleLoginSuccess = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  const isAdmin = user.awwId === "admin" && user.name.toLowerCase() === "admin";

  return isAdmin ? (
    <AdminDashboard user={user} onLogout={handleLogout} />
  ) : (
    <DashboardPage user={user} onLogout={handleLogout} />
  );
}

export default App;
