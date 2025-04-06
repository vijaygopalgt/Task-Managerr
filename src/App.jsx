import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./pages/taskmanager";
import Login from "./pages/Loginpage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<TaskManager />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
