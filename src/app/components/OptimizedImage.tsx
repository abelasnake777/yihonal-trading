import { getImageProps, type ImageProps } from "next/image";
import manifest from "@/app/data/optimized-images.json";

type Variant = { src: string; width: number; bytes: number };
const images: Record<string, Variant[]> = manifest;

/** Responsive files are produced at build time; no image server is needed. */
export default function OptimizedImage(props: ImageProps) {
  const { props: image } = getImageProps({ ...props, unoptimized: true });
  const variants = typeof props.src === "string" ? images[decodeURI(props.src)] : undefined;
  const eager = props.priority || props.preload || props.loading === "eager";
  const sizes = props.sizes || (props.fill ? "100vw" : `${props.width}px`);

  return (
    // Static srcSet replaces Next.js server optimization for shared hosting.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...image}
      alt={props.alt}
      src={variants?.at(-1)?.src || image.src}
      srcSet={variants?.map((variant) => `${variant.src} ${variant.width}w`).join(", ")}
      sizes={variants ? sizes : image.sizes}
      loading={eager ? "eager" : (props.loading || "lazy")}
      fetchPriority={eager ? "high" : props.fetchPriority}
    />
  );
}
