"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type Stratum = { id: string; name: string; tools: string[]; line: string };

/**
 * One SaaS taken apart like a watch movement. The plates sit stacked while the
 * hero is on screen, separate as it scrolls away, then each lights in turn
 * while its panel crosses the middle of the viewport.
 *
 * The scroll position is eased toward (never hijacked): the page scrolls
 * natively, the drawing follows it with a short, exponential lag.
 * Without script, or under reduced motion, the view rests fully exploded.
 */
export function Anatomy({
  strata,
  face,
  faceAlt,
  hero,
  intro,
}: {
  strata: Stratum[];
  face: StaticImageData;
  faceAlt: string;
  hero: React.ReactNode;
  intro: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(-1);

  // Scroll-linked separation, eased.
  useEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    const heroEl = heroRef.current;
    if (!root || !scene || !heroEl) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = 0;
    let explode = 0;
    let spin = 0;
    let targetSpin = 0;
    let raf = 0;

    const read = () => {
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight;
      // Fully apart once the hero has scrolled 70% of its height away.
      const h = heroEl.offsetHeight || vh;
      target = Math.min(1, Math.max(0, -r.top / (h * 0.7)));
      // A slow turn across the whole chapter.
      const span = Math.max(1, r.height - vh);
      targetSpin = Math.min(1, Math.max(0, -r.top / span));
    };

    const tick = () => {
      explode += (target - explode) * 0.1;
      spin += (targetSpin - spin) * 0.08;
      if (Math.abs(target - explode) < 0.0005) explode = target;
      if (Math.abs(targetSpin - spin) < 0.0005) spin = targetSpin;
      scene.style.setProperty("--explode", explode.toFixed(4));
      scene.style.setProperty("--turn", spin.toFixed(4));
      raf = explode === target && spin === targetSpin ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    read();
    explode = target;
    spin = targetSpin;
    scene.style.setProperty("--explode", explode.toFixed(4));
    scene.style.setProperty("--turn", spin.toFixed(4));
    scene.dataset.live = "true";

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // The lit plate belongs to the panel whose text sits nearest the reading
  // line. On narrow screens the drawing is pinned over the top half, so the
  // line sits lower, where the panels show.
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    let raf = 0;
    const pick = () => {
      raf = 0;
      const narrow = matchMedia("(max-width: 60rem)").matches;
      const line = window.innerHeight * (narrow ? 0.72 : 0.5);
      const items: HTMLElement[] = [heroEl, ...(panelRefs.current.filter(Boolean) as HTMLElement[])];
      let best = -1;
      let bestDist = Infinity;
      items.forEach((el, n) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - line);
        if (d < bestDist) {
          bestDist = d;
          best = n - 1;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label = `Vue éclatée d'un SaaS en ${strata.length} couches : ${strata.map((s) => s.name).join(", ")}.`;

  return (
    <div ref={rootRef} className="anatomy">
      <div className="container anatomy__grid">
        <div className="anatomy__scene">
          <div
            ref={sceneRef}
            className="scene"
            role="img"
            aria-label={label}
            data-active={active}
          >
            <div className="scene__lift">
              <div className="stack">
                {strata.map((s, i) => (
                  <div
                    key={s.id}
                    className="plate"
                    data-on={active === i ? "true" : active >= 0 ? "false" : undefined}
                    style={{ "--k": strata.length - 1 - i, "--i": i } as React.CSSProperties}
                  >
                    <div className="plate__inner">
                      <div className="plate__edge" />
                      <div className="plate__face">
                        {i === 0 ? (
                          <Image src={face} alt={faceAlt} fill sizes="22rem" className="plate__shot" priority />
                        ) : (
                          <span className="plate__engrave">{s.name}</span>
                        )}
                      </div>
                      <div className="plate__label">
                        <span className="plate__leader" />
                        <span className="plate__text">
                          <span className="plate__name">{s.name}</span>
                          <span className="plate__tools">{s.tools.join(", ")}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="anatomy__flow">
          <section ref={heroRef} className="anatomy__hero" aria-labelledby="hero-title">
            {hero}
          </section>
          <section className="anatomy__chapter" aria-labelledby="anatomy-title">
          <div className="anatomy__intro">{intro}</div>
          {strata.map((s, i) => (
            <article key={s.id} className="stratum" data-on={active === i ? "true" : undefined}>
              <div
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                data-index={i}
                className="stratum__body"
              >
                <h3 className="stratum__name">{s.name}</h3>
                <p className="stratum__line">{s.line}</p>
                <ul className="stratum__tools">
                  {s.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          </section>
        </div>
      </div>
    </div>
  );
}
