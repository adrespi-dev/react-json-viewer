import React, { useContext } from "react";
import { JsonProp, PropType } from "../../core/nodeTypes";
import { JsonPathContext } from "./JsonPathProvider";

type props = {
  jsonProp: JsonProp;
};

const JsonViewerNodeProp: React.FC<props> = ({ jsonProp }) => {
  const { type, value, label, path } = jsonProp;

  const selectedPaths = useContext(JsonPathContext);
  const isSelected = selectedPaths.includes(path);

  let valueContent;
  if (type === PropType.Number) {
    valueContent = <span className="json-node-prop__number">{value}</span>;
  } else if (type === PropType.Url) {
    valueContent = (
      <a href={value} target="_blank" rel="noopener noreferrer">
        "{value}"
      </a>
    );
  } else {
    valueContent = <span>"{value}"</span>;
  }

  return (
    <div
      className={"json-node json-node-prop" + (isSelected ? " selected" : "")}
    >
      <div className="json-node-prop__label">{label}:</div>
      <div className="json-node-prop__value">{valueContent}</div>
    </div>
  );
};

export default JsonViewerNodeProp;
