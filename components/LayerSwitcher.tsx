"use client";

import { useEffect, useRef, useState } from "react";

type Layer = { id: string; label: string; tools: string[]; note: string };

export function LayerSwitcher({ layers }: { layers: Layer[] }) {
  const [active, setActive] = useState(0);
  // Without script every panel stays visible, in order.
  const [ready, setReady] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => setReady(true), []);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = layers.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="layers">
      <div className="seg" role="tablist" aria-label="Couches de la stack">
        {layers.map((l, i) => (
          <button
            key={l.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${l.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${l.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {l.label}
          </button>
        ))}
      </div>

      {layers.map((l, i) => (
        <section
          key={l.id}
          role="tabpanel"
          id={`panel-${l.id}`}
          aria-labelledby={`tab-${l.id}`}
          hidden={ready && i !== active}
          className="layer crop crop--sheet"
        >
          <ul className="layer__tools">
            {l.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="layer__note">{l.note}</p>
        </section>
      ))}
    </div>
  );
}
