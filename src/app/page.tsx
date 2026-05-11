import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/app/components/AnimatedSection";
import Header from "@/app/components/Header";
import { awards, products } from "@/app/data/site";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="relative flex min-h-[86vh] items-center overflow-hidden">
        <Image
          src="/images/coffeeback.png"
          alt="Coffee beans and Ethiopian coffee background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/55 to-stone-950/20" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
              Gedeb, Yirgacheffe, Ethiopia
            </p>
            <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Yihonal Trading
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-100">
              Premium Ethiopian coffee prepared for roasters, cafes, and partners who value traceable lots,
              careful processing, and a clean export workflow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#products"
                className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-300"
              >
                Explore Products
              </Link>
              <Link
                href="/gallery"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Gallery
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="products" className="bg-stone-100 py-20 text-stone-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Products</p>
              <h2 className="mt-2 text-4xl font-semibold">Coffee Lots</h2>
            </div>
            <p className="max-w-2xl text-stone-600">
              Washed, natural, and honey processed coffees sourced from Ethiopia&apos;s highland coffee regions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <AnimatedSection
                key={product.name}
                className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-stone-200"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                  <p className="mt-2 text-sm font-medium text-emerald-700">Notes: {product.notes}</p>
                  <p className="mt-4 leading-7 text-stone-600">{product.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="awards" className="bg-stone-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Recognition
          </p>
          <h2 className="mt-2 text-4xl font-semibold text-white">Awards and Quality Signals</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {awards.map((award) => (
              <AnimatedSection key={`${award.year}-${award.title}`} className="rounded-lg border border-white/10 p-6">
                <p className="text-3xl font-semibold text-emerald-300">{award.year}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{award.title}</h3>
                <p className="mt-3 leading-7 text-stone-300">{award.detail}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-20 text-stone-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="overflow-hidden rounded-lg ring-1 ring-stone-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.927!2d38.7654!3d6.2345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMDQuMiJOIDM4wrA0NSc1NS4wIkU!5e0!3m2!1sen!2s!4v1234567890"
              title="Yihonal Trading location"
              className="h-[420px] w-full border-0"
              loading="lazy"
            />
          </div>
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Contact</p>
            <h2 className="mt-2 text-4xl font-semibold">Get in Touch</h2>
            <p className="mt-5 leading-8 text-stone-600">
              We work with roasters, cafes, importers, and coffee lovers looking for Ethiopian coffee with a clear origin story.
            </p>
            <div className="mt-8 space-y-4 text-stone-700">
              <p>
                <strong className="text-stone-950">Phone / WhatsApp:</strong>{" "}
                <a href="tel:+251911234567" className="text-emerald-700 hover:text-emerald-800">
                  +251 911 234 567
                </a>
              </p>
              <p>
                <strong className="text-stone-950">Email:</strong>{" "}
                <a href="mailto:hello@yihonalcoffee.com" className="text-emerald-700 hover:text-emerald-800">
                  hello@yihonalcoffee.com
                </a>
              </p>
              <p>
                <strong className="text-stone-950">Location:</strong> Gedeb Woreda, Yirgacheffe, Ethiopia
              </p>
            </div>
            <a
              href="https://wa.me/251911234567"
              className="mt-8 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Message on WhatsApp
            </a>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
