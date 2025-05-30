import { ChaImageDef } from "@/types";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { cn } from "fumadocs-ui/utils/cn";
import Image, { ImageProps } from "next/image";

export interface ChaImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: ChaImageDef;
  zoomable?: boolean;
}

export function ChaImage({ image, zoomable = false, ...props }: ChaImageProps) {
  const ImageComponent = zoomable ? ImageZoom : Image;

  if (typeof image === "string") {
    return <ImageComponent src={image} alt="" {...props} />;
  }

  if ("src" in image) {
    return <ImageComponent src={image.src} alt={image.alt ?? ""} {...props} />;
  }

  if ("light" in image && "dark" in image) {
    const { className, ...restProps } = props;
    return (
      <>
        <ImageComponent
          src={image.light}
          alt={image.alt ?? ""}
          className={cn("block dark:hidden", className)}
          {...restProps}
        />
        <ImageComponent
          src={image.dark}
          alt={image.alt ?? ""}
          className={cn("hidden dark:block", className)}
          {...restProps}
        />
      </>
    );
  }
}
