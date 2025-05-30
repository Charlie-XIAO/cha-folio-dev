import { ChaImage } from "./ChaImage";
import { LuExternalLink } from "react-icons/lu";
import Link from "fumadocs-core/link";
import { ChaImageDef } from "@/types";

export interface ChaGalleryCardProps {
  title: string;
  description?: string;
  image?: ChaImageDef;
  href?: string;
  url: string;
}

export function ChaGalleryCard({
  image,
  title,
  description,
  href,
  url,
}: ChaGalleryCardProps) {
  return (
    <div className="rounded-md border bg-fd-background/80 shadow-md transition-colors hover:bg-fd-accent/80 overflow-hidden">
      <Link href={href ?? url} className="block w-full">
        {image && (
          <div className="w-full h-36 bg-gray-100">
            <ChaImage
              image={image}
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>
        )}

        <div className="relative px-4 py-6">
          <h3 className="text-lg/6 font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-fd-muted-foreground">{description}</p>
          )}
          {href !== undefined && (
            <div className="absolute top-2 right-2 text-fd-muted-foreground">
              <LuExternalLink />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
