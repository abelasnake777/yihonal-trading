import Image from "next/image";
import AnimatedSection from "@/app/components/AnimatedSection";
import Header from "@/app/components/Header";

export default function AboutPage() {
  return (
    <main className="bg-stone-100 text-stone-950">
      <Header />
      <section className="relative flex min-h-[58vh] items-end overflow-hidden">
        <Image src="/images/back_image2.jpg" alt="Coffee harvest in Ethiopia" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-950/55" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <h1 className="text-5xl font-semibold text-white">About Yihonal Coffee</h1>
            <p className="mt-5 text-lg leading-8 text-stone-100">
              Handpicked in Ethiopia, prepared with care, and shared with partners who respect origin and craft.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            {["/images/back_image.jpg", "/images/sample.jpg", "/images/sample2.jpg", "/images/farm.jpg"].map(
              (image) => (
                <div key={image} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image src={image} alt="Yihonal coffee process" fill className="object-cover" />
                </div>
              ),
            )}
          </div>
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Our Story</p>
            <h2 className="mt-2 text-4xl font-semibold">Rooted in Gedeb and Yirgacheffe</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-stone-700">
              <p>
                Yihonal Trading builds on a family connection to Ethiopia&apos;s coffee-growing communities and focuses on
                careful preparation from cherry selection through export readiness.
              </p>
              <p>
                The work centers on clean lots, transparent communication, and reliable partnerships with roasters and
                buyers looking for distinctive Ethiopian coffee.
              </p>
              <p className="font-semibold text-stone-950">Selamta - welcome to our table.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
