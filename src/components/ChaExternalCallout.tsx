import { Callout } from "fumadocs-ui/components/callout";
import Link from "fumadocs-core/link";

export interface ChaExternalCalloutProps {
  pageType: "post" | "project";
  href: string;
}

export function ChaExternalCallout({
  pageType,
  href,
}: ChaExternalCalloutProps) {
  return (
    <Callout>
      <p>Please visit the following link for this {pageType}:</p>
      <p>
        <Link href={href}>{href}</Link>
      </p>
    </Callout>
  );
}
