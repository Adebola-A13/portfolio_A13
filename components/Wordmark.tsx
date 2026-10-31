"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Guide = { key: string; label: string; y: number; units: number; place: "above" | "below" };
type Metrics = { guides: Guide[]; top: number; bottom: number; fontSize: number };
type Letter = { x: number; w: number; ch: string; units: number };

const SAMPLES = {
  ascender: "bdfhkl",
  cap: "HIEN",
  xHeight: "xvwz",
  descender: "gjpqy",
};

/**
 * The name set in Hedvig Letters Serif with its construction drawn over it.
 * Every guide is measured from the loaded font at render time (canvas glyph
 * bounds and the real baseline of the first line), never typed in by hand.
 */
export function Wordmark({ text, id }: { text: string; id: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [letter, setLetter] = useState<Letter | null>(null);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const head = headRef.current;
    const probe = probeRef.current;
    if (!wrap || !head || !probe) return;
    const cs = getComputedStyle(head);
    const fontSize = parseFloat(cs.fontSize);
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return;
    ctx.font = `${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
    const up = (s: string) => ctx.measureText(s).actualBoundingBoxAscent;
    const down = (s: string) => ctx.measureText(s).actualBoundingBoxDescent;
    const asc = up(SAMPLES.ascender);
    const cap = up(SAMPLES.cap);
    const xh = up(SAMPLES.xHeight);
    const desc = down(SAMPLES.descender);
    const base = probe.getBoundingClientRect().bottom - wrap.getBoundingClientRect().top;
    const u = (v: number) => Math.round((v / fontSize) * 1000);
    setMetrics({
      fontSize,
      top: base - asc,
      bottom: base + desc,
      guides: [
        { key: "asc", label: "Ascendante", y: base - asc, units: u(asc), place: "above" },
        { key: "cap", label: "Capitale", y: base - cap, units: u(cap), place: "below" },
        { key: "x", label: "Hauteur d'x", y: base - xh, units: u(xh), place: "below" },
        { key: "base", label: "Ligne de base", y: base, units: 0, place: "below" },
        { key: "desc", label: "Descendante", y: base + desc, units: -u(desc), place: "above" },
      ],
    });
  }, []);

  useEffect(() => {
    let alive = true;
    document.fonts.ready.then(() => alive && measure());
    const ro = new ResizeObserver(() => measure());
    if (headRef.current) ro.observe(headRef.current);
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [measure]);

  const onPointerMove = (e: React.PointerEvent) => {
    const node = textRef.current?.firstChild;
    const wrap = wrapRef.current;
    if (!node || !wrap || !metrics || e.pointerType === "touch") return;
    const origin = wrap.getBoundingClientRect();
    const range = document.createRange();
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") continue;
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const r = range.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        if (letter?.x !== r.left - origin.left) {
          setLetter({
            x: r.left - origin.left,
            w: r.width,
            ch: text[i],
            units: Math.round((r.width / metrics.fontSize) * 1000),
          });
        }
        return;
      }
    }
    if (letter) setLetter(null);
  };

  return (
    <div
      ref={wrapRef}
      className="wordmark"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setLetter(null)}
    >
      <h1 ref={headRef} id={id} className="wordmark__name">
        <span ref={probeRef} className="wordmark__probe" aria-hidden="true" />
        <span ref={textRef}>{text}</span>
      </h1>

      {metrics && (
        <div className="wordmark__guides" aria-hidden="true">
          {metrics.guides.map((g, i) => (
            <div
              key={g.key}
              className={`guide guide--${g.place}`}
              style={{ transform: `translateY(${g.y}px)`, "--i": i } as React.CSSProperties}
            >
              <span className="guide__line" />
              <span className="guide__readout">
                {g.label} <span className="num">{g.units}</span>
              </span>
            </div>
          ))}
          {letter && (
            <div
              className="measure"
              style={{
                transform: `translate(${letter.x}px, ${metrics.top}px)`,
                width: `${letter.w}px`,
                height: `${metrics.bottom - metrics.top}px`,
              }}
            >
              <span className="measure__readout">
                {letter.ch}, chasse <span className="num">{letter.units}</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
