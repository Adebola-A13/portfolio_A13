import type { Metadata } from "next";
import Image from "next/image";
import { Wordmark } from "@/components/Wordmark";
import { WorkIndex } from "@/components/WorkIndex";
import { LayerSwitcher } from "@/components/LayerSwitcher";
import { layers, person, projects, stages } from "@/lib/content";
import portrait from "@/images/photo.jpeg";
import atWork from "@/images/photo_2.jpeg";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ibrahim Adehan, développeur full-stack (version Studio)",
};

export default function StudioPage() {
  return (
    <div className="theme-studio">
      <a className="skip" href="#main">
        Aller au contenu
      </a>

      <header className="masthead">
        <nav className="nav container" aria-label="Navigation principale">
          <a className="nav__mark" href="#top" aria-label="Ibrahim Adehan, accueil">
            Ibrahim Adehan
          </a>
          <ul className="nav__links">
            <li>
              <a href="#projets">Projets</a>
            </li>
            <li>
              <a href="#parcours">Parcours</a>
            </li>
            <li>
              <a href="#outils">Outils</a>
            </li>
          </ul>
          <a className="btn btn--quiet nav__cta" href="#contact">
            Me contacter
          </a>
        </nav>

        <section className="hero container" id="top" aria-labelledby="hero-title">
          <Wordmark text={person.name} id="hero-title" />
          <div className="hero__foot">
            <p className="lead hero__lead">
              Développeur full-stack au Bénin, je livre des SaaS en production.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={`mailto:${person.email}`}>
                M&rsquo;écrire
              </a>
              <a className="btn" href="#projets">
                Voir les projets
              </a>
            </div>
          </div>
        </section>
      </header>

      <main id="main">
        <section className="section work-section" id="projets" aria-labelledby="projets-title">
          <div className="container">
            <h2 id="projets-title" className="section__head">
              Cinq projets, quatre démos en ligne.
            </h2>
            <WorkIndex projects={projects} />
          </div>
        </section>

        <section className="section about" aria-labelledby="about-title">
          <div className="container about__grid">
            <figure className="about__photo crop crop--sheet">
              <div className="frame" data-slot="portrait" data-alt="Portrait d'Ibrahim Adehan">
                <Image
                  src={portrait}
                  alt="Ibrahim Adehan en veste noire sur fond gris"
                  fill
                  sizes="(min-width: 60rem) 34vw, 100vw"
                  style={{ objectPosition: "50% 20%" }}
                />
              </div>
            </figure>
            <div className="about__text">
              <h2 id="about-title">Je construis le produit entier.</h2>
              <p className="lead">
                La base de données, l&rsquo;API, l&rsquo;interface, puis le déploiement. AviProfit, je l&rsquo;ai conçu
                et livré seul.
              </p>
              <dl className="facts">
                <div>
                  <dt>Basé à</dt>
                  <dd>{person.place}</dd>
                </div>
                <div>
                  <dt>Formation</dt>
                  <dd>Licence TIC, IMSP</dd>
                </div>
                <div>
                  <dt>Langues</dt>
                  <dd>Français, anglais professionnel</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section band" id="parcours" aria-labelledby="parcours-title">
          <div className="container">
            <h2 id="parcours-title" className="section__head">
              Du lycée technique à la production.
            </h2>
            <ol className="stages set">
              {stages.map((s, i) => (
                <li key={s.name} className={i === stages.length - 1 ? "stage stage--next" : "stage"}>
                  <h3 className="stage__name">{s.name}</h3>
                  <p className="stage__when">{s.when}</p>
                  <p className="stage__line">{s.line}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section tools" id="outils" aria-labelledby="outils-title">
          <div className="container">
            <h2 id="outils-title" className="section__head">
              Les outils, couche par couche.
            </h2>
            <LayerSwitcher layers={layers} />
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact__grid">
            <div className="contact__text">
              <h2 id="contact-title">Parlons de votre produit.</h2>
              <a className="contact__mail" href={`mailto:${person.email}`}>
                {person.email}
              </a>
              <dl className="facts">
                <div>
                  <dt>Téléphone</dt>
                  <dd>
                    <a className="link" href={person.phoneHref}>
                      {person.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>GitHub</dt>
                  <dd>
                    <a className="link" href={person.github} target="_blank" rel="noreferrer">
                      Adebola-A13
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>LinkedIn</dt>
                  <dd>
                    <a className="link" href={person.linkedin} target="_blank" rel="noreferrer">
                      adehan-ibrahim
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Disponibilité</dt>
                  <dd>Télétravail complet, horaires flexibles</dd>
                </div>
              </dl>
            </div>
            <figure className="contact__photo crop crop--sheet">
              <div className="frame" data-slot="at-work" data-alt="Ibrahim Adehan au travail">
                <Image
                  src={atWork}
                  alt="Ibrahim Adehan devant son ordinateur portable"
                  fill
                  sizes="(min-width: 60rem) 30vw, 100vw"
                  style={{ objectPosition: "50% 30%" }}
                />
              </div>
            </figure>
          </div>
        </section>
      </main>

      <footer className="colophon">
        <div className="container colophon__inner">
          <p className="colophon__text">
            {person.fullName}, développeur full-stack à {person.place}. Site construit avec Next.js, composé en
            Hedvig Letters Serif et Geist.
          </p>
          <p className="colophon__legal">
            <span className="num">2026</span>, Ibrahim Adehan
          </p>
        </div>
      </footer>
    </div>
  );
}
