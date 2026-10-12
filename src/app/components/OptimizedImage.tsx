import { getImageProps, type ImageProps } from "next/image";
import type { Ref } from "react";
import manifest from "@/app/data/optimized-images.json";

type Variant = { src: string; width: number; bytes: number; avifSrc?: string; avifBytes?: number };
const images: Record<string, Variant[]> = manifest;

/** Responsive files are produced at build time; no image server is needed. */
export default function OptimizedImage(props: ImageProps & { ref?: Ref<HTMLImageElement> }) {
  const { ref, ...imageProps } = props;
  const { props: image } = getImageProps({ ...imageProps, unoptimized: true });
  const variants = typeof props.src === "string" ? images[decodeURI(props.src)] : undefined;
  const eager = props.priority || props.preload || props.loading === "eager";
  const sizes = props.sizes || (props.fill ? "100vw" : `${props.width}px`);

  const element = (
    // Static srcSet replaces Next.js server optimization for shared hosting.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...image}
      ref={ref}
      alt={props.alt}
      src={variants?.at(-1)?.src || image.src}
      srcSet={variants?.map((variant) => `${variant.src} ${variant.width}w`).join(", ")}
      sizes={variants ? sizes : image.sizes}
      loading={eager ? "eager" : (props.loading || "lazy")}
      fetchPriority={props.fetchPriority || (eager ? "high" : undefined)}
    />
  );
  if (!variants?.every((variant) => variant.avifSrc)) return element;
  return (
    <picture style={{ display: "contents" }}>
      <source type="image/avif" srcSet={variants.map((variant) => `${variant.avifSrc} ${variant.width}w`).join(", ")} sizes={sizes} />
      {element}
    </picture>
  );
}
