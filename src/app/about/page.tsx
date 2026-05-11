import Image from "next/image";
import Header from "@/app/components/Header";

const processImages = [
  { src: "/images/back_image2.jpg", alt: "Picking cherries" },
  { src: "/images/back_image.jpg", alt: "Sorting cherries" },
  { src: "/images/sample.jpg", alt: "Drying on raised beds" },
  { src: "/images/sample2.jpg", alt: "More drying beds" },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <Header />
      <section className="hero">
        <Image src="/images/back_image.jpg" alt="Yihonal Coffee" fill className="hero-bg" priority />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Yihonal Coffee</h1>
          <p className="tagline">Handpicked in Ethiopia, Roasted with Care</p>
        </div>
      </section>

      <section className="process-strip">
        {processImages.map((image) => (
          <div key={image.src} className="process-strip-image">
            <Image src={image.src} alt={image.alt} fill />
          </div>
        ))}
      </section>

      <section className="about-text">
        <div className="container">
          <h2>About Yihonal Coffee</h2>
          <p>Our family&apos;s heritage runs deep in Gedeb woreda, Yirgacheffe &mdash; the birthplace of coffee...</p>
          <p className="closing">Selamta &mdash; welcome to our table.</p>
        </div>
      </section>

      <section className="beans-footer">
        <Image src="/images/sample.jpg" alt="Roasted beans" fill className="beans-bg" />
      </section>
    </main>
  );
}
