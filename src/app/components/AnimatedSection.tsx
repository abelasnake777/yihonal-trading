"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const animation = gsap.fromTo(
      element,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: undefined,
      },
    );

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
