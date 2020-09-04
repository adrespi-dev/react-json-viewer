export enum NodeType {
  Array,
  Object,
  Prop,
}

// export type JsonNode = JsonArray | JsonObject | JsonProp;
export type JsonNode = JsonIterable | JsonProp;

export type JsonIterable = {
  label: string;
  path: string;
  iterableType?: "array" | "object";
  children?: JsonNode[];
};

export enum PropType {
  String,
  Url,
  Number,
}

export type JsonProp = {
  label: string;
  path: string;
  type?: PropType;
  value?: string;
};
