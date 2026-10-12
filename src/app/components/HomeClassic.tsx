"use client";

import Image from "@/app/components/OptimizedImage";
import { useEffect, useState } from "react";
import { awards, contactLinks, featuredAward, heroSlides, products } from "@/app/data/site";

const productDescriptions: Record<string, string> = {
  Washed:
    "Washed coffee is known for clean clarity, floral aroma, citrus brightness, and a refined cup profile from careful fermentation and drying.",
  Natural:
    "Natural coffee is dried with the fruit intact, creating a sweet, smooth, full-bodied cup with fruit-forward character.",
  Honey:
    "Honey coffee balances sweetness and body by drying selected cherries with part of the mucilage still attached.",
  Anaerobic:
    "Anaerobic coffee is fermented in sealed, oxygen-limited tanks to develop intense fruit character, layered sweetness, and a distinctive aromatic cup.",
  Experimental: "This information is only provided for buyers!",
};

export default function HomeClassic() {
  const [{ active: activeSlide, previous: previousSlide }, setHeroState] = useState<{
    active: number;
    previous: number | null;
  }>({ active: 0, previous: null });
  const [loadedSlides, setLoadedSlides] = useState<boolean[]>([]);
  const [requestedSlide, setRequestedSlide] = useState<number | null>(null);
  const nextSlide = (activeSlide + 1) % heroSlides.length;
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedAward, setSelectedAward] = useState<number | null>(null);
  const [selectedFeaturedImage, setSelectedFeaturedImage] = useState<number | null>(null);

  useEffect(() => {
    if (!loadedSlides[activeSlide] || !loadedSlides[nextSlide] || requestedSlide !== null) return;
    const timer = window.setTimeout(() => {
      setHeroState((current) => ({
        active: (current.active + 1) % heroSlides.length,
        previous: current.active,
      }));
    }, 4800);

    return () => window.clearTimeout(timer);
  }, [activeSlide, nextSlide, loadedSlides, requestedSlide]);

  useEffect(() => {
    if (
      selectedProduct === null &&
      selectedAward === null &&
      selectedFeaturedImage === null
    ) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProduct(null);
        setSelectedAward(null);
        setSelectedFeaturedImage(null);
      }

      if (selectedFeaturedImage !== null) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          setSelectedFeaturedImage((current) =>
            current === null
              ? null
              : (current + (event.key === "ArrowLeft" ? -1 : 1) + featuredAward.images.length) %
                featuredAward.images.length,
          );
        }
        return;
      }

      if (event.key === "ArrowLeft") {
        setSelectedAward((current) =>
          current === null ? null : (current - 1 + awards.length) % awards.length,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedAward((current) =>
          current === null ? null : (current + 1) % awards.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct, selectedAward, selectedFeaturedImage]);

  function recordSlideLoaded(index: number) {
    setLoadedSlides((current) => {
      if (current[index]) return current;
      const next = [...current];
      next[index] = true;
      return next;
    });
    if (requestedSlide === index) {
      setHeroState((current) => ({ active: index, previous: current.active }));
      setRequestedSlide(null);
    }
  }

  function selectHeroSlide(index: number) {
    if (index === activeSlide) {
      setRequestedSlide(null);
      return;
    }
    if (!loadedSlides[index]) {
      setRequestedSlide(index);
      return;
    }
    setRequestedSlide(null);
    setHeroState((current) => ({ active: index, previous: current.active }));
  }

  const activeAward = selectedAward === null ? null : awards[selectedAward];
  const activeFeaturedImage =
    selectedFeaturedImage === null ? null : featuredAward.images[selectedFeaturedImage];

  return (
    <>
      <section id="home" className="home">
        {heroSlides.map((slide, index) => (
          (index === 0 || index === activeSlide || index === previousSlide || index === requestedSlide || (loadedSlides[activeSlide] && index === nextSlide)) && <Image
            key={slide}
            src={slide}
            alt={index === activeSlide ? "Ethiopian coffee highlands" : ""}
            aria-hidden={index !== activeSlide}
            fill
            priority={index === 0}
            loading="eager"
            fetchPriority={index === activeSlide ? "high" : "low"}
            onLoad={() => recordSlideLoaded(index)}
            ref={(image) => {
              if (image?.complete && image.naturalWidth > 0) recordSlideLoaded(index);
            }}
            sizes="100vw"
            className={
              "home-slide" +
              (index === activeSlide
                ? " is-active" + (previousSlide === null ? " is-initial" : "")
                : index === previousSlide
                  ? " is-exiting"
                  : "")
            }
          />
        ))}
        <div className="home-content">
          <h1>Traceable Ethiopian Specialty Coffee for International Buyers</h1>
          <p>From the highlands of Ethiopia to roasters around the world.</p>
          <a href="#products" className="btn">
            Explore Products
          </a>
        </div>

        <div className="home-pagination" aria-label="Homepage background images">
          {heroSlides.map((slide, index) => (
            <button
              key={slide}
              type="button"
              className={index === activeSlide ? "is-active" : ""}
              onClick={() => selectHeroSlide(index)}
              aria-label={"Show background image " + (index + 1)}
              aria-current={index === activeSlide ? "true" : undefined}
            >
              <span />
            </button>
          ))}
        </div>
      </section>

      <section className="products-section" id="products" aria-labelledby="products-title">
        <div className="products-orbit products-orbit-one" aria-hidden="true" />
        <div className="products-orbit products-orbit-two" aria-hidden="true" />

        <div className="products-shell">
          <div className="products-heading">
            <div>
              <p className="products-kicker">Our processing range</p>
              <h2 id="products-title">Coffee, expressed five ways.</h2>
            </div>
            <p>
              From classic washed and natural lots to honey, anaerobic, and experimental work,
              each process reveals a distinct expression of Ethiopian coffee.
            </p>
          </div>

          <div className="products-grid">
            {products.map((product, index) => (
              <button
                key={product.name}
                type="button"
                className="product-card"
                onClick={() => setSelectedProduct(product.name)}
                aria-label={"Open " + product.name + " product profile"}
              >
                <span className="product-image-wrap">
                  <Image
                    src={product.image}
                    alt={product.name + " coffee process"}
                    fill
                    sizes="(max-width: 700px) 92vw, (max-width: 968px) 31vw, 390px"
                    className="product-image"
                  />
                  <span className="product-image-shade" />
                  <span className="product-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="product-process-label">Process</span>
                </span>

                <span className="product-content">
                  <h3>{product.name}</h3>
                  <p className="product-notes">
                    <span>Cup notes</span>
                    {product.notes}
                  </p>
                  <p className="product-description">{product.description}</p>
                  <span className="learn-more">
                    Explore profile <span aria-hidden="true">&#8594;</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct ? (
        <div
          className="modal modal-open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-content">
            <p className="product-modal-kicker">Product profile</p>
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="close-btn"
              aria-label="Close modal"
              autoFocus
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
        <div className="awards-glow awards-glow-left" aria-hidden="true" />
        <div className="awards-glow awards-glow-right" aria-hidden="true" />
        <div className="awards-shell">
          <div className="awards-heading">
            <p className="awards-eyebrow">
              <span aria-hidden="true" />
              Our recognition archive
              <span aria-hidden="true" />
            </p>
            <h2>Recognition, earned.</h2>
            <p className="awards-intro">
              A collection of honors celebrating Yihonal Coffee&apos;s commitment to quality,
              craft, and exceptional Ethiopian coffee.
            </p>
            <div className="awards-count">
              <strong>{awards.length + 1}</strong>
              <span>recognitions in total</span>
            </div>
          </div>

          <article className="awards-featured" aria-labelledby="featured-award-title">
            <div className="featured-award-copy">
              <p className="featured-award-kicker">
                <span aria-hidden="true">&#10022;</span>
                Highest recognition
              </p>
              <h3 id="featured-award-title">{featuredAward.title}</h3>
              <strong>{featuredAward.result}</strong>
              <p>{featuredAward.description}</p>
              <div className="featured-award-meta" aria-label="Award details">
                <span>Africa Finals</span>
                <span>2025</span>
              </div>
            </div>

            <div className="featured-award-gallery" aria-label="Two views of one featured award">
              {featuredAward.images.map((image, index) => (
                <button
                  key={image.image}
                  type="button"
                  className={"featured-award-photo featured-award-photo-" + (index + 1)}
                  onClick={() => setSelectedFeaturedImage(index)}
                  aria-label={"Open " + image.alt}
                >
                  <Image
                    src={image.image}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 33vw"
                  />
                  <span className="featured-award-photo-shade" />
                  <span className="featured-award-photo-label">
                    {index === 0 ? "The honor" : "The moment"}
                    <i aria-hidden="true">&#8599;</i>
                  </span>
                </button>
              ))}
            </div>
          </article>

          <div className="awards-archive-heading">
            <p>Certificate archive</p>
            <span>{awards.length} additional recognitions</span>
          </div>

          <div className="awards-grid">
            {awards.map((award, index) => (
              <button
                key={award.image}
                type="button"
                className="award-card"
                onClick={() => setSelectedAward(index)}
                aria-label={"Open " + award.title}
              >
                <span className="award-card-topline">
                  <span>Recognition {String(index + 1).padStart(2, "0")}</span>
                  <span className="award-open-icon" aria-hidden="true">
                    &#8599;
                  </span>
                </span>
                <span className="award-document">
                  <Image
                    src={award.image}
                    alt={"Yihonal Coffee " + award.title}
                    width={award.width}
                    height={award.height}
                    sizes="(max-width: 760px) 92vw, (max-width: 1300px) 46vw, 590px"
                    className="award-image"
                  />
                </span>
                <span className="award-card-caption">
                  <strong>{award.title}</strong>
                  <span>View full certificate</span>
                </span>
              </button>
            ))}
          </div>

          <p className="awards-view-note">
            <span aria-hidden="true">&#10022;</span>
            Select any award image or certificate to view it in full
          </p>
        </div>
      </section>

      {activeFeaturedImage && selectedFeaturedImage !== null ? (
        <div
          className="award-lightbox featured-award-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={featuredAward.title + " image viewer"}
        >
          <button
            type="button"
            className="award-lightbox-close"
            onClick={() => setSelectedFeaturedImage(null)}
            aria-label="Close featured award viewer"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <button
            type="button"
            className="award-lightbox-nav award-lightbox-prev"
            onClick={() =>
              setSelectedFeaturedImage(
                (selectedFeaturedImage - 1 + featuredAward.images.length) %
                  featuredAward.images.length,
              )
            }
            aria-label="View previous featured award image"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>

          <figure className="award-lightbox-content">
            <div className="award-lightbox-image">
              <Image
                src={activeFeaturedImage.image}
                alt={activeFeaturedImage.alt}
                fill
                sizes="96vw"
                className="award-lightbox-document featured-award-lightbox-image"
                priority
              />
            </div>
            <figcaption>
              <strong>{featuredAward.title} · {featuredAward.result}</strong>
              <span>
                Image {String(selectedFeaturedImage + 1).padStart(2, "0")} /{" "}
                {String(featuredAward.images.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="award-lightbox-nav award-lightbox-next"
            onClick={() =>
              setSelectedFeaturedImage(
                (selectedFeaturedImage + 1) % featuredAward.images.length,
              )
            }
            aria-label="View next featured award image"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      ) : null}

      {activeAward && selectedAward !== null ? (
        <div
          className="award-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeAward.title + " image viewer"}
        >
          <button
            type="button"
            className="award-lightbox-close"
            onClick={() => setSelectedAward(null)}
            aria-label="Close award viewer"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <button
            type="button"
            className="award-lightbox-nav award-lightbox-prev"
            onClick={() =>
              setSelectedAward((selectedAward - 1 + awards.length) % awards.length)
            }
            aria-label="View previous award"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>

          <figure className="award-lightbox-content">
            <div className="award-lightbox-image">
              <Image
                src={activeAward.image}
                alt={"Yihonal Coffee " + activeAward.title}
                fill
                sizes="96vw"
                className="award-lightbox-document"
                priority
              />
            </div>
            <figcaption>
              <strong>{activeAward.title}</strong>
              <span>
                {String(selectedAward + 1).padStart(2, "0")} /{" "}
                {String(awards.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="award-lightbox-nav award-lightbox-next"
            onClick={() => setSelectedAward((selectedAward + 1) % awards.length)}
            aria-label="View next award"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      ) : null}

      <section className="contact" id="contact">
        <div className="contact-container">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps?q=9.0054781%2C38.8120751&z=17&output=embed"
              title="Addis Ababa, Bole"
              className="contact-map"
              loading="lazy"
            />
            <a
              className="map-note"
              href="https://maps.app.goo.gl/WtqKMGCMbYB24QYz6?g_st=it"
              target="_blank"
              rel="noreferrer"
            >
              Addis Ababa, Bole
            </a>
          </div>
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              We&apos;d love to hear from you &mdash; roasters, caf&eacute;s, or coffee lovers.
            </p>
            <ul className="contact-list">
              {contactLinks.map((item) => (
                <li key={item.label}>
                  <strong className="contact-label">{item.label}</strong>
                  <br />
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="contact-link"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="contact-value">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/251916823355"
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
