"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/app/components/Header";
import { galleryImages } from "@/app/data/site";

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <Header />
      <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Gallery</p>
        <h1 className="mt-2 text-5xl font-semibold">Moments from Farm</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone-600">
          Real glimpses from harvest, drying, sorting, and the land where the coffee begins.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 pb-20 sm:px-6 md:grid-cols-3 lg:grid-cols-4 lg:px-8">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImage(image)}
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-200 text-left shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Image src={image} alt={`Yihonal gallery image ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </section>

      {activeImage ? (
        <button
          type="button"
          aria-label="Close gallery preview"
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
        >
          <span className="relative h-[86vh] w-full max-w-6xl">
            <Image src={activeImage} alt="Selected gallery image" fill className="object-contain" />
          </span>
        </button>
      ) : null}
    </main>
  );
}
