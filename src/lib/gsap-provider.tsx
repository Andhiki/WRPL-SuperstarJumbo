// "use client";
//
// import { useEffect, useRef, useState, ReactNode } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/all";
//
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }
//
// interface GSAPProviderProps {
//   children: ReactNode;
// }
//
// export default function GSAPProvider({ children }: GSAPProviderProps) {
//   const main = useRef<HTMLDivElement | null>(null);
//   const [isClient, setIsClient] = useState(false);
//
//   useEffect(() => {
//     setIsClient(true);
//   }, []);
//
//   useEffect(() => {
//     if (!isClient || !main.current) return;
//
//     let ctx: gsap.Context | undefined;
//
//     const initGSAP = () => {
//       if (!main.current) return;
//
//       ctx = gsap.context(() => {
//         // Fix: Convert NodeList to Array and assert the type
//         const gsapSelectors = Array.from(main.current?.querySelectorAll("[data-gsap]") || []) as HTMLElement[];
//
//         gsapSelectors.forEach((selector, index) => {
//           const type = selector.getAttribute("data-gsap");
//
//           const scrollTriggerConfig = {
//             trigger: selector,
//             start: "top 90%",
//             end: "bottom 10%",
//             toggleActions: "play none none none",
//             markers: true,
//           };
//
//           // Special configuration for different indices
//           if (index === 1) {
//             scrollTriggerConfig.start = "top 230%";
//             scrollTriggerConfig.end = "top bottom";
//           }
//           else if (index === 3) {
//             scrollTriggerConfig.start = 'top 100%';
//             scrollTriggerConfig.end = "bottom 100%";
//           } else {
//             scrollTriggerConfig.start = `top ${150 + (index + 1) * 10}%`;
//             scrollTriggerConfig.end = `top bottom ${10 + (index + 1) * 9.5}%`;
//           }
//
//           const timeline = gsap.timeline({
//             scrollTrigger: scrollTriggerConfig,
//           });
//
//           switch (type) {
//             case "up":
//               timeline.from(selector, {
//                 y: 100,
//                 duration: 1,
//                 opacity: 0,
//                 ease: "power2.out",
//               });
//               break;
//
//             case "stagger-up":
//               const cards = Array.from(selector.querySelectorAll(".card-4")) as HTMLElement[];
//               timeline.from(cards, {
//                 y: 100,
//                 opacity: 0,
//                 duration: 1,
//                 ease: "power2.out",
//                 stagger: 0.2, // Delay between animations of each card
//               });
//               break;
//
//             case "down":
//               timeline.from(selector, {
//                 y: -100,
//                 duration: 1,
//                 opacity: 0,
//                 ease: "power2.out",
//               });
//               break;
//
//             case "left":
//               timeline.from(selector, {
//                 x: 100,
//                 duration: 1,
//                 opacity: 0,
//                 ease: "power2.out",
//               });
//               break;
//
//             case "right":
//               timeline.from(selector, {
//                 x: -100,
//                 duration: 1,
//                 opacity: 0,
//                 ease: "power2.out",
//               });
//               break;
//
//             case "right-brutal":
//               timeline.from(selector, {
//                 x: -200,
//                 duration: 3,
//                 opacity: 0,
//                 ease: "power3.out",
//               });
//               break;
//
//             case "flip":
//               timeline.from(selector, {
//                 rotateX: 90,
//                 duration: 1,
//                 opacity: 0,
//                 ease: "power3.out",
//                 delay: index * 0.3,
//               });
//               break;
//
//             case "flip-fast":
//               timeline.from(selector, {
//                 rotateX: 90,
//                 duration: 1,
//                 opacity: 0,
//                 ease: "power3.out",
//                 delay: index * 0.2,
//               });
//               break;
//
//             case "fade":
//               timeline.from(selector, {
//                 opacity: 0,
//                 duration: 1,
//                 ease: "power2.out",
//               });
//               break;
//
//             case "scale":
//               timeline.from(selector, {
//                 scale: 0,
//                 duration: 1,
//                 opacity: 0,
//                 ease: "back.out(1.7)",
//               });
//               break;
//
//             case "bounce":
//               timeline.from(selector, {
//                 y: -50,
//                 duration: 1,
//                 opacity: 0,
//                 ease: "bounce.out",
//               });
//               break;
//
//             default:
//               timeline.from(selector, {
//                 opacity: 0,
//                 duration: 1,
//                 ease: "power2.out",
//               });
//               break;
//           }
//         });
//
//         ScrollTrigger.refresh();
//       }, main);
//     };
//
//     const timer = setTimeout(initGSAP, 200);
//
//     return () => {
//       clearTimeout(timer);
//       ctx?.revert();
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, [isClient]);
//
//   return (
//     <div ref={main} className="w-full">
//       {children}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GSAPProviderProps {
  children: ReactNode;
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  const main = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const initGSAP = () => {
      if (!main.current) return;

      ctx = gsap.context(() => {
        const gsapSelectors = Array.from(
          main.current?.querySelectorAll("[data-gsap]") || []
        ) as HTMLElement[];

        gsapSelectors.forEach((selector, index) => {
          const type = selector.getAttribute("data-gsap");

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: selector,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none none",
              // markers: true,
            },
          });

          switch (type) {
            case "up":
              timeline.from(selector, { y: 150, duration: 0.5, opacity: 0 });
              break;
            case "up-4-card-1":
              timeline.from(selector, { y: 50, duration: 0.5, opacity: 0});
              break;
            case "up-4-card-2":
              timeline.from(selector, { y: 50, duration: 0.5, opacity: 0, delay: 0.2 });
              break;
            case "up-4-card-3":
              timeline.from(selector, { y: 50, duration: 0.5, opacity: 0, delay: 0.4 });
              break;
            case "up-4-card-4":
              timeline.from(selector, { y: 50, duration: 0.5, opacity: 0, delay: 0.6 });
              break;
            case "down":
              timeline.from(selector, { y: -200, duration: 1, opacity: 0 });
              break;
            case "left":
              timeline.from(selector, { x: 200, duration: 1, opacity: 0 });
              break;
            case "right":
              timeline.from(selector, { x: -200, duration: 1, opacity: 0 });
              break;
            case "right-brutal":
              timeline.from(selector, { x: -200, duration: 3, opacity: 0 });
              break;
            case "flip":
              timeline.from(selector, {
                rotateX: 90,
                duration: 1,
                opacity: 0,
                ease: "power3.out",
                delay: index * 0.3,
              });
              break;
            case "flip-fast":
              timeline.from(selector, {
                rotateX: 90,
                duration: 1,
                opacity: 0,
                ease: "power3.out",
                delay: index * 0.2,
              });
              break;
            default:
              break;
          }

          // if (index === 5) {
          //   timeline.scrollTrigger!.start = "top 230%";
          //   timeline.scrollTrigger!.end = "top bottom";
          // } else if (index > 5) {
          //   timeline.scrollTrigger!.start = `top ${150 + (index + 1) * 10}%`;
          //   timeline.scrollTrigger!.end = `top bottom ${10 + (index + 1) * 9.5}%`;
          // }
        });

        ScrollTrigger.refresh();
      }, main);
    };

    const timer = setTimeout(initGSAP, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isClient]);

  return <div ref={main}>{children}</div>;
}
