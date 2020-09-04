import { NodeType, PropType } from "../core/nodeTypes";
import { isObject } from "util";

export function getNodeType(candidate: any): NodeType {
  if (Array.isArray(candidate)) return NodeType.Array;

  if (isObject(candidate)) return NodeType.Object;

  return NodeType.Prop;
}

export function getPropType(prop: any): PropType {
  if (typeof prop == "number") {
    return PropType.Number;
  }

  if (isURL(prop)) {
    return PropType.Url;
  }

  return PropType.String;
}

const isURL = (str: string) => {
  const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return pattern.test(str);
};
