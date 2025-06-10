import { BASE_PATH } from "@/consts";
import { ChaImageDef } from "@/types";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { cn } from "fumadocs-ui/utils/cn";
import Image, { ImageProps } from "next/image";

export interface ChaImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: ChaImageDef;
  zoomable?: boolean;
}

function getImageSrc(src: string) {
  return src.startsWith("/") ? `${BASE_PATH}${src}` : src;
}

export function ChaImage({ image, zoomable = false, ...props }: ChaImageProps) {
  const ImageComponent = zoomable ? ImageZoom : Image;

  if (typeof image === "string") {
    return <ImageComponent src={getImageSrc(image)} alt="" {...props} />;
  }

  if ("src" in image) {
    return (
      <ImageComponent
        src={getImageSrc(image.src)}
        alt={image.alt ?? ""}
        {...props}
      />
    );
  }

  if ("light" in image && "dark" in image) {
    const { className, ...restProps } = props;
    return (
      <>
        <ImageComponent
          src={getImageSrc(image.light)}
          alt={image.alt ?? ""}
          className={cn("block dark:hidden", className)}
          {...restProps}
        />
        <ImageComponent
          src={getImageSrc(image.dark)}
          alt={image.alt ?? ""}
          className={cn("hidden dark:block", className)}
          {...restProps}
        />
      </>
    );
  }
}
