"use client";

import DOMPurify from "dompurify";
import { HTMLAttributes, useEffect, useState } from "react";

export interface ChaSafeHtmlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "dangerouslySetInnerHTML"> {
  html: string;
}

export function ChaSafeHtml({ html, ...props }: ChaSafeHtmlProps) {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    setSafeHtml(DOMPurify.sanitize(html));
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} {...props} />;
}
