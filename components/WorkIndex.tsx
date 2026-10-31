"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/content";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <div className="work">
      <ol className="work__list set">
        {projects.map((item, i) => (
          <li key={item.slug}>
            <button
              type="button"
              className="work__row"
              aria-pressed={i === active}
              aria-controls="work-panel"
              onClick={() => setActive(i)}
            >
              <span className="work__name">{item.name}</span>
              <span className="work__kind">{item.kind}</span>
              <span className="work__year num">{item.year}</span>
            </button>
          </li>
        ))}
      </ol>

      <figure className="work__panel" id="work-panel" aria-live="polite">
        <div className="work__sheet crop crop--sheet">
          <div
            className="work__frame frame"
            data-slot={`work-${p.slug}`}
            data-kind="product"
            data-alt={`Capture de ${p.name}`}
          >
            <Image
              key={p.slug}
              src={p.image}
              alt={p.alt}
              fill
              sizes="(min-width: 60rem) 52vw, 100vw"
              style={{ objectPosition: "50% 0%" }}
            />
          </div>
          <span className="ratio" aria-hidden="true">
            <span className="ratio__line" />
            <span className="ratio__readout">16:10</span>
          </span>
        </div>
        <figcaption className="work__caption">
          <p className="work__line">{p.line}</p>
          <dl className="work__meta">
            <div>
              <dt>Stack</dt>
              <dd>{p.stack.join(", ")}</dd>
            </div>
          </dl>
          <p className="work__links">
            {p.demo && (
              <a className="link" href={p.demo} target="_blank" rel="noreferrer">
                Ouvrir la démo
              </a>
            )}
            {p.code && (
              <a className="link" href={p.code} target="_blank" rel="noreferrer">
                Lire le code
              </a>
            )}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
