"use client";

import DOMPurify from "dompurify";
import { HTMLAttributes, useEffect, useState } from "react";

interface ChaSafeHtmlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "dangerouslySetInnerHTML"> {
  html: string;
}

export const ChaSafeHtml = ({ html, ...props }: ChaSafeHtmlProps) => {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    setSafeHtml(DOMPurify.sanitize(html));
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} {...props} />;
};
