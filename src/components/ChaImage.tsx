import { Image, ImageProps } from "fumadocs-core/framework";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { cn } from "fumadocs-ui/utils/cn";

export type ChaImageDef =
  | string
  | { src: string; alt: string }
  | { light: string; dark: string; alt: string };

export interface ChaImageProps extends ImageProps {
  image: ChaImageDef;
  zoomable?: boolean;
}

export const ChaImage = ({
  image,
  zoomable = false,
  ...props
}: ChaImageProps) => {
  const ImageComponent = zoomable ? ImageZoom : Image;

  if (typeof image === "string") {
    return <ImageComponent src={image} alt="" {...props} />;
  }

  if ("src" in image) {
    return <ImageComponent src={image.src} alt={image.alt} {...props} />;
  }

  if ("light" in image && "dark" in image) {
    const { className, ...restProps } = props;
    return (
      <>
        <ImageComponent
          src={image.light}
          alt={image.alt}
          className={cn("block dark:hidden", className)}
          {...restProps}
        />
        <ImageComponent
          src={image.dark}
          alt={image.alt}
          className={cn("hidden dark:block", className)}
          {...restProps}
        />
      </>
    );
  }
};
