import { ChaRegexPattern } from "@/types";
import { ReactNode } from "react";

export function nodeInnerText(node: ReactNode): string {
  if (
    node === null ||
    typeof node === "boolean" ||
    typeof node === "undefined"
  ) {
    return "";
  }

  if (typeof node === "number") {
    return node.toString();
  }
  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.reduce<string>((acc, child) => acc + nodeInnerText(child), "");
  }

  if (
    Object.prototype.hasOwnProperty.call(node, "props") &&
    Object.prototype.hasOwnProperty.call(
      (node as { props: unknown }).props,
      "children",
    )
  ) {
    const assertedNode = node as { props: { children: ReactNode } };
    return nodeInnerText(assertedNode.props.children);
  }

  return "";
}

export function matchesAnyPattern(
  value: string,
  pattern?: ChaRegexPattern,
): boolean {
  if (pattern === undefined) {
    return false;
  }
  if (Array.isArray(pattern)) {
    return pattern.some((p) => matchesAnyPattern(value, p));
  }
  if (typeof pattern === "string") {
    return value === pattern;
  }
  if (pattern instanceof RegExp) {
    return pattern.test(value);
  }
  throw new TypeError(
    `Invalid pattern type: ${typeof pattern}; expected string, RegExp, or array of strings/RegExps`,
  );
}
