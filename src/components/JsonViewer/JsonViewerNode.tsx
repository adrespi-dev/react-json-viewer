import React from "react";
import { JsonNode } from "../../core/nodeTypes";
import JsonViewerNodeIterable from "./JsonViewerNodeIterable";
import JsonViewerNodeProp from "./JsonViewerNodeProp";

type props = {
  node: JsonNode;
};

const JsonViewerNode: React.FC<props> = React.memo(({ node }) => {
  let content;
  if ("children" in node) {
    content = <JsonViewerNodeIterable node={node} />;
  } else {
    content = <JsonViewerNodeProp jsonProp={node} />;
  }
  return content;
});

export default JsonViewerNode;
