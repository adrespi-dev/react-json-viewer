import React, { useState } from "react";
import "./JsonPath.css";

type props = {
  onSearchChanged: (val: string) => void;
};

const JsonPath: React.FC<props> = ({ onSearchChanged }) => {
  const [value, setValue] = useState();

  const setNewValue = (val: string) => {
    setValue(val);
    onSearchChanged(val);
  };

  return (
    <div className="json-path">
      <input
        placeholder="Type your json path here..."
        value={value}
        onChange={(e) => setNewValue(e.target.value)}
      />
    </div>
  );
};

export default JsonPath;
