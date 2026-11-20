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
      anchors: true,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9
    });

    const ticker = time => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(ticker);

    const context = gsap.context(() => {
      const heroLines = root.querySelectorAll("[data-hero-line]");
      if (heroLines.length) {
        gsap.from(heroLines, {
          yPercent: 108,
          rotateX: -42,
          transformOrigin: "50% 100%",
          duration: 1.05,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.12
        });
      }

      const workbench = root.querySelector("[data-hero-panel]");
      if (workbench) {
        gsap.from(workbench, {
          y: 24,
          rotate: 1.2,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.32
        });
      }

      root.querySelectorAll("[data-reveal]").forEach(element => {
        gsap.from(element, {
          y: 18,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true
          }
        });
      });

      root.querySelectorAll("[data-image-reveal]").forEach(element => {
        const image = element.querySelector("img, .integration-visual");
        if (!image) return;
        gsap.fromTo(image,
          { clipPath: "inset(0 0 12% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true
            }
          }
        );
      });
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
