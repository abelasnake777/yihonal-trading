"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/app/components/Header";
import { galleryImages } from "@/app/data/site";

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <main className="gallery-page">
      <Header />

      <section className="gallery-hero">
        <h2>Moments from Farm</h2>
        <p>Real life, unfiltered glimpses of where your coffee is born</p>
      </section>

      <section className="gallery-grid">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className="gallery-item"
          >
            <span className="gallery-image-wrap" style={{ height: `${130 + ((index * 37) % 150)}px` }}>
              <Image src={image} alt={`Yihonal gallery image ${index + 1}`} fill />
            </span>
          </button>
        ))}
      </section>

      {activeImage ? (
        <button
          type="button"
          aria-label="Close lightbox"
          onClick={() => setActiveImage(null)}
          className="lightbox"
        >
          <span className="close-lightbox">&times;</span>
          <span className="lightbox-image">
            <Image src={activeImage} alt="Selected gallery image" fill />
          </span>
        </button>
      ) : null}
    </main>
  );
}
