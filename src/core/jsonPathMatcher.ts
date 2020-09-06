import evaluateJsonPath from "./jsonPatch";

export default function jsonPathMatcher(jsonPath: String, json: any): string[] {
  try {
    const result =
      evaluateJsonPath(json, jsonPath, { resultType: "PATH" }) || [];
    return result;
  } catch {
    return [];
  }
}
