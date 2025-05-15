import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import AuditDashboard from "./pages/AuditDashboard";
// ...
<Route path="/audit" element={<AuditDashboard />} />

import Messages from "./pages/Messages";
// ...
<Route path="/messages" element={<Messages />} />

import AdminDashboard from "./pages/AdminDashboard";
// ...
<Route path="/admin" element={<AdminDashboard />} />
