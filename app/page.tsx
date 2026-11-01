import Image from "next/image";
import { Anatomy } from "@/components/Anatomy";
import { person, projects, strata, trail } from "@/lib/content";
import portrait from "@/images/portrait.png";
import proofify from "@/images/work/proofify.png";
import "@/styles/console/console.css";

export default function Home() {
  return (
    <div className="theme-console">
      <a className="skip" href="#main">
        Aller au contenu
      </a>

      <header className="bar-wrap">
        <nav className="bar" aria-label="Navigation principale">
          <a className="bar__mark" href="#top" aria-label="Ibrahim Adehan, accueil">
            Ibrahim Adehan
          </a>
          <ul className="bar__links">
            <li>
              <a href="#projets">Projets</a>
            </li>
            <li>
              <a href="#registre">Parcours</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <a className="btn bar__cta" href={`mailto:${person.email}`}>
            M&rsquo;écrire
          </a>
        </nav>
      </header>

      <main id="main">
        <div id="top" />
        <Anatomy
          strata={strata}
          face={proofify}
          faceAlt="Proofify Africa, l'interface posée sur la plaque du haut"
          hero={
            <>
              <h1 id="hero-title">De la base de données à l&rsquo;écran.</h1>
              <p className="lead hero__lead">
                Développeur full-stack au Bénin : Laravel, Next.js, Vue.js et PostgreSQL en production.
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary" href={`mailto:${person.email}`}>
                  Me confier un projet
                </a>
                <a className="btn" href="#projets">
                  Voir les projets
                </a>
              </div>
            </>
          }
          intro={
            <h2 id="anatomy-title" className="anatomy__title">
              Un SaaS, démonté pièce par pièce.
            </h2>
          }
        />

        <section className="section projects" id="projets" aria-labelledby="projets-title">
          <div className="container">
            <div className="head">
              <h2 id="projets-title">Cinq projets, quatre démos en ligne.</h2>
              <p className="lead head__lead">Chaque capture vient de la version en ligne.</p>
            </div>
            <ul className="panels projects__grid">
              {projects.map((p, i) => (
                <li key={p.slug} className={i === 0 ? "project project--lead" : "project"}>
                  <div className="project__shot" data-slot={`work-${p.slug}`} data-kind="product" data-alt={`Capture de ${p.name}`}>
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes={i === 0 ? "(min-width: 60rem) 56vw, 100vw" : "(min-width: 60rem) 30vw, 100vw"}
                      style={{ objectPosition: "50% 0%" }}
                    />
                  </div>
                  <div className="project__body">
                    <div className="project__top">
                      <h3>{p.name}</h3>
                      <span className="measured project__year">{p.year}</span>
                    </div>
                    <p className="project__kind">{p.kind}</p>
                    {i === 0 && <p className="project__line">{p.line}</p>}
                    <p className="project__stack">{p.stack.join(", ")}</p>
                    <p className="project__links">
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="reading-band" aria-labelledby="reading-title">
          <div className="container reading">
            <h2 id="reading-title" className="visually-hidden">
              Plus de 500 votes sur Miss Prépa
            </h2>
            <p className="reading__value measured">
              500+<span className="reading__unit">votes</span>
            </p>
            <dl className="reading__record">
              <div>
                <dt>Projet</dt>
                <dd className="is-person">Miss Prépa, conçu et livré par Ibrahim</dd>
              </div>
              <div>
                <dt>Quand</dt>
                <dd className="measured is-instrument">2025</dd>
              </div>
              <div>
                <dt>Quoi</dt>
                <dd>L&rsquo;élection de l&rsquo;IMSP, votée en ligne, résultats affichés en direct.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section registry" id="registre" aria-labelledby="registre-title">
          <div className="container registry__grid">
            <div className="registry__head">
              <h2 id="registre-title">Le registre, depuis 2020.</h2>
              <p className="lead">Du lycée technique au code en production.</p>
            </div>
            <ol className="trail">
              {trail.map((t) => (
                <li key={t.when} className={t.next ? "trail__row trail__row--next" : "trail__row"}>
                  <span className="trail__when measured">{t.when}</span>
                  <span className="trail__what">{t.what}</span>
                  <span className="trail__where">{t.where}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="container">
            <div className="panels contact__panels">
              <div className="contact__main">
                <h2 id="contact-title">Parlons de votre produit.</h2>
                <a className="contact__mail" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
                <dl className="contact__facts">
                  <div>
                    <dt>Téléphone</dt>
                    <dd>
                      <a className="link measured" href={person.phoneHref}>
                        {person.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>Basé à</dt>
                    <dd>{person.place}</dd>
                  </div>
                  <div>
                    <dt>Disponibilité</dt>
                    <dd>Télétravail complet, horaires flexibles</dd>
                  </div>
                  <div>
                    <dt>Langues</dt>
                    <dd>Français, anglais professionnel</dd>
                  </div>
                </dl>
              </div>
              <figure className="contact__portrait">
                <div className="contact__photo" data-slot="portrait" data-alt="Portrait d'Ibrahim Adehan">
                  <Image
                    src={portrait}
                    alt="Ibrahim Adehan en costume, la main au menton"
                    fill
                    sizes="(min-width: 60rem) 28vw, 100vw"
                    style={{ objectPosition: "50% 8%" }}
                  />
                </div>
                <figcaption>Ibrahim Adehan, Abomey-Calavi</figcaption>
              </figure>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="container">
          <div className="foot__cols">
            <div>
              <p className="foot__title">Pages</p>
              <ul>
                <li><a href="#projets">Projets</a></li>
                <li><a href="#registre">Parcours</a></li>
                <li><a href="/studio">Version Studio</a></li>
              </ul>
            </div>
            <div>
              <p className="foot__title">Code et profil</p>
              <ul>
                <li><a href={person.github} target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <p className="foot__title">Contact</p>
              <ul>
                <li><a href={`mailto:${person.email}`}>{person.email}</a></li>
                <li><a href={person.phoneHref}>{person.phone}</a></li>
              </ul>
            </div>
          </div>
          <p className="foot__legal">
            {person.fullName}, développeur full-stack. <span className="measured">2026</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
