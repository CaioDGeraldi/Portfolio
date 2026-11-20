import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function useSiteMotion() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || reduceMotion.matches) return undefined;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = time => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const heroLines = root.querySelectorAll("[data-hero-line]");
      if (heroLines.length) {
        gsap.from(heroLines, {
          yPercent: 115,
          opacity: 0,
          rotate: 1.5,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.12
        });
      }

      gsap.fromTo("[data-hero-aside]",
        { y: 28, opacity: 0, rotate: 1.2 },
        { y: 0, opacity: 1, rotate: 0, duration: 1.05, ease: "power3.out", delay: 0.42 }
      );

      gsap.fromTo(".hero-spark",
        { scale: 0.35, rotate: -24, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.55)", delay: 0.78 }
      );

      root.querySelectorAll("[data-reveal]").forEach(element => {
        gsap.fromTo(element,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true
            }
          }
        );
      });

      const marquee = root.querySelector(".marquee-track");
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          duration: 30,
          repeat: -1,
          ease: "none"
        });
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    requestAnimationFrame(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      context.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return rootRef;
}
