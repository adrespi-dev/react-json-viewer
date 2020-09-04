import { getNodeType, getPropType } from "../utils/utils";
import { NodeType, JsonProp, JsonNode, JsonIterable } from "./nodeTypes";

export default function normalizeJson(json: any): JsonNode {
  const normalized = populate("__root__", json);

  return normalized;
}

const populate = (
  label: string,
  candidate: any,
  path: string = ""
): JsonNode => {
  const type = getNodeType(candidate);

  if (path) {
    path = `${path}->${label}`;
  } else {
    path = label;
  }

  let content: Partial<JsonNode>;
  if (type === NodeType.Array) {
    content = normalizeArray(path, candidate);
  } else if (type === NodeType.Object) {
    content = normalizeObject(path, candidate);
  } else {
    content = normalizeProp(candidate);
  }

  const parsedLabel = isNaN(parseFloat(label)) ? `"${label}"` : label;

  let result: JsonNode = {
    label: parsedLabel,
    path: path,
    ...content,
  };

  return result;
};

const normalizeArray = (path: string, array: any[]): Partial<JsonIterable> => {
  const children: JsonNode[] = [];
  array.forEach((value, idx) => {
    children.push(populate(idx.toString(), value, path));
  });

  return {
    iterableType: "array",
    children,
  };
};

const normalizeObject = (path: string, obj: any): Partial<JsonIterable> => {
  const children: JsonNode[] = [];
  Object.keys(obj).forEach((key) => {
    children.push(populate(key, obj[key], path));
  });

  return {
    iterableType: "object",
    children,
  };
};

const normalizeProp = (value: any): Partial<JsonProp> => {
  const type = getPropType(value);
  return {
    type,
    value,
  };
};
