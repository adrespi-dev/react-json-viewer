import React, { useMemo, useState } from "react";
import normalizeJson from "../../core/normalizer";
import JsonViewerNode from "./JsonViewerNode";
import "./JsonViewerLayout.css";
import "./JsonViewer.css";
import { JsonPathContext } from "./JsonPathProvider";
import JsonFilePanel from "./JsonFilePanel";
import JsonPath from "./JsonPath";
import jsonPathMatcher from "../../core/jsonPathMatcher";

const jsonExample = {
  nombre: "Adrian",
  apellido: "Espinoza",
  edad: 27,
  fechaDeNacimiento: "2020-09-03",
  website: "https://adrianespi.dev",
  hijos: [
    {
      nombre: "Dylan",
      apellido: "Espinoza",
      edad: 3,
    },
  ],
  trabajo: {
    rol: "Frontend Dev",
    empresa: "Devsu",
  },
};

const JsonViewer: React.FC = () => {
  const [json, setJson] = useState(jsonExample);
  const [jsonPath, setJsonPath] = useState("");

  const handleNewJsonFile = (result: string) => {
    setJson(JSON.parse(result));
  };

  const handleJsonPathChanged = (newPath: string) => {
    setJsonPath(newPath);
  };

  const normalized = useMemo(() => normalizeJson(json), [json]);
  const pathThree = useMemo(() => jsonPathMatcher(jsonPath, json), [
    jsonPath,
    json,
  ]);

  return (
    <JsonPathContext.Provider value={pathThree}>
      <div className="json-viewer-container">
        <div className="json-left-panel">
          <JsonPath onSearchChanged={handleJsonPathChanged} />
          <div className="json-viewer">
            <JsonViewerNode node={normalized} />
          </div>
        </div>
        <div className="json-right-panel">
          <JsonFilePanel handleNewJsonFile={handleNewJsonFile} />
        </div>
      </div>
    </JsonPathContext.Provider>
  );
};

export default JsonViewer;
