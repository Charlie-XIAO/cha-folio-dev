"use client";

import Giscus from "@giscus/react";
import config from "@/cha-folio.config";
import { HTMLAttributes } from "react";

export interface ChaGiscusProps extends HTMLAttributes<HTMLDivElement> {}

export function ChaGiscus({ ...props }: ChaGiscusProps) {
  if (config.giscus === undefined) {
    return null;
  }

  return (
    <div {...props}>
      <Giscus {...config.giscus} />
    </div>
  );
}
