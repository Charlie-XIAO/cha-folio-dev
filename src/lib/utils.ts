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
