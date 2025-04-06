import React from "react";
import ReactDOM from "react-dom/client"; // For React 18 and later
import App from "./App.jsx";
import './index.css'; // or your actual path
 // Assuming your App component is in the same directory

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
