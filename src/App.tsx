import React from "react";
import "./App.css";
import JsonViewer from "./components/JsonViewer/JsonViewer";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <JsonViewer />
    </div>
  );
};

export default App;
