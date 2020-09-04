import React, { useState, useContext } from "react";
import { JsonIterable } from "../../core/nodeTypes";
import JsonViewerNode from "./JsonViewerNode";
import { ChevronDown } from "react-feather";
import { JsonPathContext } from "./JsonPathProvider";

type props = {
  node: JsonIterable;
};

const JsonViewerNodeIterable: React.FC<props> = ({ node }) => {
  const {
    label: nodeLabel,
    iterableType,
    children: _jsonChildren,
    path,
  } = node;
  const selectedPaths = useContext(JsonPathContext);
  const [isCollapsed, setCollapsed] = useState(false);
  const isArray = iterableType === "array";

  const isSelected = selectedPaths.includes(path);

  const expandIcon = (
    <>
      <button
        onClick={() => setCollapsed(!isCollapsed)}
        className="btn-toggle-collapse"
      >
        <ChevronDown />
      </button>
    </>
  );

  const label = (
    <span className="json-prop-name">
      {isArray ? `"${nodeLabel}"` : nodeLabel} :
    </span>
  );

  const closures = {
    start: isArray ? "[" : "{",
    end: isArray ? "]" : "}",
  };

  const childrenCount = (
    <span className="json-child-count">{_jsonChildren?.length} items</span>
  );

  const jsonChildren = _jsonChildren?.map((r) => {
    return <JsonViewerNode key={r.path} node={r} />;
  });

  return (
    <div
      className={
        `json-node json-node-iterable` +
        (isCollapsed ? " collapsed" : "") +
        (isSelected ? " selected" : "")
      }
    >
      <div className="json-node__start">
        {expandIcon}
        {nodeLabel !== "__root__" && label}
        {closures.start}
        {childrenCount}
      </div>
      <div className="json-node__children">{jsonChildren}</div>
      <div className="json-node__end">{closures.end}</div>
    </div>
  );
};

export default JsonViewerNodeIterable;
