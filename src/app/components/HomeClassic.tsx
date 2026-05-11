"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { awards, contactLinks, heroSlides, products } from "@/app/data/site";

const productDescriptions: Record<string, string> = {
  Washed:
    "Washed coffee is known for clean clarity, floral aroma, citrus brightness, and a refined cup profile from careful fermentation and drying.",
  Natural:
    "Natural coffee is dried with the fruit intact, creating a sweet, smooth, full-bodied cup with fruit-forward character.",
  Honey:
    "Honey coffee balances sweetness and body by drying selected cherries with part of the mucilage still attached.",
};

export default function HomeClassic() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section id="home" className="home">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide}
            src={slide}
            alt="Yihonal Coffee farm slideshow"
            fill
            priority={index === 0}
            className={`home-slide ${
              index === activeSlide ? "opacity-100 classic-slide-active" : "opacity-0"
            }`}
          />
        ))}
        <div className="home-content">
          <h2>Premium Ethiopian Coffee</h2>
          <p>From the highlands of Ethiopia to roasters around the world.</p>
          <a href="#products" className="btn">
            Explore Products
          </a>
        </div>
      </section>

      <div className="container" id="products">
        <h2>Our Products</h2>
        <div className="products-grid">
            {products.map((product) => (
              <article
                key={product.name}
                className="product-card"
              >
                <div className="product-image-wrap">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="product-image"
                  />
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>Notes: {product.notes}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product.name)}
                    className="learn-more"
                  >
                    Learn More
                  </button>
                </div>
              </article>
            ))}
        </div>
      </div>

      {selectedProduct ? (
        <div className="modal modal-open">
          <div className="modal-content">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="close-btn"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 id="modal-title">{selectedProduct}</h2>
            <div id="modal-text">
              <p>{productDescriptions[selectedProduct]}</p>
            </div>
          </div>
        </div>
      ) : null}

      <section className="awards" id="awards">
        <div className="container">
          <h2>Awards &amp; Recognition</h2>
          <div className="awards-grid">
            {awards.map((award) => (
              <article
                key={`${award.year}-${award.title}`}
                className="award-card"
              >
                <div className="award-year">{award.year}</div>
                <h3>{award.title}</h3>
                <p>{award.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-container">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.927!2d38.7654!3d6.2345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMDQuMiJOIDM4wrA0NSc1NS4wIkU!5e0!3m2!1sen!2s!4v1234567890"
              title="Gedeb Woreda, Yirgacheffe, Ethiopia"
              className="contact-map"
              loading="lazy"
            />
            <p className="map-note">Gedeb Woreda, Yirgacheffe, Ethiopia</p>
          </div>
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              We&apos;d love to hear from you &mdash; roasters, caf&eacute;s, or coffee lovers.
            </p>
            <ul className="contact-list">
              {contactLinks.map((item) => (
                <li key={item.label}>
                  <strong className="text-white">{item.label}</strong>
                  <br />
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-[#00cc00] hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-stone-300">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/251911234567"
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
