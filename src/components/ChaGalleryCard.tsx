import { ChaImage } from "./ChaImage";
import { LuExternalLink } from "react-icons/lu";
import Link from "fumadocs-core/link";
import { ProjectData } from "@/lib/projects.data";

export interface ChaGalleryCardProps extends ProjectData {}

export function ChaGalleryCard({
  image,
  title,
  description,
  href,
  url,
}: ChaGalleryCardProps) {
  return (
    <div className="h-full w-full p-2">
      <Link
        href={href ?? url}
        className="block h-full w-full rounded-md border bg-fd-background/80 shadow-md transition-colors hover:bg-fd-accent/80 overflow-hidden"
      >
        {image && (
          <div className="w-full h-36">
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
