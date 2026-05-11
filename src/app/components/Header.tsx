"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/app/data/site";

export default function Header() {
  const [slideUp, setSlideUp] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScroll = 0;

    function handleScroll() {
      setSlideUp(window.scrollY > lastScroll && window.scrollY > 100);
      lastScroll = window.scrollY;
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="pageHeader" className={slideUp ? "slide-up" : ""}>
      <div className="brand-wrap">
        <Link href="/">
          <Image
            src="/images/yihonal logo.PNG"
            alt="Yihonal Coffee"
            width={90}
            height={90}
            className="logo"
            priority
          />
        </Link>
        <h1>Yihonal Coffee</h1>
      </div>

      <nav>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              (pathname === "/" && item.href === "/") ||
              (pathname === "/about" && item.href === "/about") ||
              (pathname === "/gallery" && item.href === "/gallery")
                ? "active"
                : ""
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
