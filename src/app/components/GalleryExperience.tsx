"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type GalleryImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type GalleryExperienceProps = {
  images: GalleryImageData[];
};

type GalleryRowItem = GalleryImageData & {
  displayRatio: number;
  imageIndex: number;
};

type GalleryRow = {
  height: number;
  items: GalleryRowItem[];
};

type TileStyle = CSSProperties & {
  "--gallery-delay": string;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function createRows(images: GalleryImageData[], containerWidth: number): GalleryRow[] {
  if (!images.length || containerWidth <= 0) return [];

  const compact = containerWidth < 520;
  const tablet = containerWidth >= 520 && containerWidth < 900;
  const baseHeight = compact ? 178 : tablet ? 218 : 272;
  const gap = compact ? 7 : 11;
  const maximumItems = compact ? 3 : tablet ? 4 : 5;
  const heightPattern = [0.9, 1.08, 0.96, 1.14, 1];
  const rows: GalleryRow[] = [];
  let pending: GalleryRowItem[] = [];
  let ratioTotal = 0;

  function completeRow() {
    if (!pending.length) return;

    const availableWidth = containerWidth - gap * (pending.length - 1);
    const naturalHeight = availableWidth / ratioTotal;
    const minimumHeight = compact ? 142 : tablet ? 170 : 205;
    const maximumHeight = compact ? 236 : tablet ? 300 : 365;

    rows.push({
      height: Math.round(clamp(naturalHeight, minimumHeight, maximumHeight)),
      items: pending,
    });

    pending = [];
    ratioTotal = 0;
  }

  images.forEach((image, imageIndex) => {
    const displayRatio = clamp(image.width / image.height, compact ? 0.72 : 0.62, 2.15);
    pending.push({ ...image, displayRatio, imageIndex });
    ratioTotal += displayRatio;

    const rowHeight = baseHeight * heightPattern[rows.length % heightPattern.length];
    const targetRatio = containerWidth / rowHeight;

    if (
      (pending.length >= 2 && ratioTotal >= targetRatio) ||
      pending.length >= maximumItems
    ) {
      completeRow();
    }
  });

  completeRow();
  return rows;
}

export default function GalleryExperience({ images }: GalleryExperienceProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mosaicWidth, setMosaicWidth] = useState(1200);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const rows = useMemo(() => createRows(images, mosaicWidth), [images, mosaicWidth]);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const heroImages = images.slice(0, 3);

  useEffect(() => {
    const mosaic = mosaicRef.current;
    if (!mosaic || !("ResizeObserver" in window)) return;

    const observer = new ResizeObserver(([entry]) => {
      setMosaicWidth(Math.round(entry.contentRect.width));
    });

    observer.observe(mosaic);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mosaic = mosaicRef.current;
    if (!mosaic) return;

    const tiles = Array.from(mosaic.querySelectorAll<HTMLElement>(".gallery-tile"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      tiles.forEach((tile) => tile.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    tiles.forEach((tile) => observer.observe(tile));
    return () => observer.disconnect();
  }, [mosaicWidth, rows.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + images.length) % images.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % images.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  function showPrevious() {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  }

  function finishSwipe(endX: number) {
    if (touchStartX.current === null) return;

    const distance = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 48) return;
    if (distance > 0) showPrevious();
    else showNext();
  }

  if (!images.length) {
    return (
      <section className="gallery-empty">
        <p className="gallery-kicker">Visual archive</p>
        <h2>New moments are on their way.</h2>
        <p>Add images to public/images/gallery and rebuild the site to publish them here.</p>
      </section>
    );
  }

  return (
    <>
      <section className="gallery-hero">
        <div className="gallery-hero-orbit gallery-orbit-one" aria-hidden="true" />
        <div className="gallery-hero-orbit gallery-orbit-two" aria-hidden="true" />
        <div className="gallery-hero-inner">
          <div className="gallery-hero-copy">
            <p className="gallery-kicker">Field notes · Ethiopia</p>
            <h1>Stories from origin.</h1>
            <p>
              Real life, unfiltered glimpses of where your coffee is born—from highland farms
              and drying beds to the people and craft behind every lot.
            </p>
            <div className="gallery-hero-meta">
              <span><strong>{images.length}</strong> moments</span>
              <span>One living archive</span>
            </div>
          </div>

          <div className="gallery-hero-collage" aria-hidden="true">
            {heroImages.map((image, index) => (
              <div
                key={image.src}
                className={"gallery-hero-frame gallery-hero-frame-" + (index + 1)}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 70vw, 36vw"
                  priority={index === 0}
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
            <svg className="gallery-focus-graphic" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="35" />
              <path d="M100 5v34M100 161v34M5 100h34M161 100h34" />
            </svg>
          </div>
        </div>
      </section>

      <section className="gallery-archive" aria-labelledby="gallery-archive-title">
        <div className="gallery-archive-heading">
          <div>
            <p className="gallery-kicker">The visual archive</p>
            <h2 id="gallery-archive-title">Coffee, community, and craft.</h2>
          </div>
          <p>
            Every frame is part of the story. Select an image to explore it in full.
          </p>
        </div>

        <div className="gallery-mosaic" ref={mosaicRef}>
          {rows.map((row, rowIndex) => (
            <div
              className="gallery-mosaic-row"
              key={"row-" + rowIndex}
              style={{ height: row.height }}
            >
              {row.items.map((image) => {
                const tileStyle: TileStyle = {
                  flexGrow: image.displayRatio,
                  "--gallery-delay": String((image.imageIndex % 6) * 55) + "ms",
                };

                return (
                  <button
                    key={image.src}
                    type="button"
                    className={
                      "gallery-tile gallery-tile-shape-" + (image.imageIndex % 5)
                    }
                    style={tileStyle}
                    onClick={() => setActiveIndex(image.imageIndex)}
                    aria-label={"Open " + image.alt}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 520px) 70vw, (max-width: 900px) 48vw, 32vw"
                    />
                    <span className="gallery-tile-shade" />
                    <span className="gallery-tile-index">
                      {String(image.imageIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="gallery-tile-open" aria-hidden="true">&#8599;</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="gallery-archive-end">
          <span aria-hidden="true" />
          <p>More moments are always being added</p>
          <span aria-hidden="true" />
        </div>
      </section>

      {activeImage && activeIndex !== null ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setActiveIndex(null)}
            aria-label="Close gallery viewer"
            autoFocus
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-prev"
            onClick={showPrevious}
            aria-label="View previous image"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>

          <figure
            className="gallery-lightbox-content"
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const endX = event.changedTouches[0]?.clientX;
              if (endX !== undefined) finishSwipe(endX);
            }}
          >
            <div className="gallery-lightbox-image">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="96vw"
                className="gallery-lightbox-photo"
                priority
              />
            </div>
            <figcaption>
              <div>
                <span>Visual archive</span>
                <strong>{activeImage.alt.replace("Yihonal Coffee — ", "")}</strong>
              </div>
              <p>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-next"
            onClick={showNext}
            aria-label="View next image"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
