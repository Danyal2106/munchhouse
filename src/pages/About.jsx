import { usePageTitle } from "../hours.js";

export default function About() {
  usePageTitle("Om oss");

  return (
    <section className="about" aria-labelledby="om-oss-tittel">
      <div className="wrap about-grid">
        <figure className="about-photo">
          <img src="/images/spisesal.jpg" alt="Spisesalen hos Munch House, med disk og menytavler" />
        </figure>
        <div>
          <p className="kicker">Folabruveien</p>
          <h1 id="om-oss-tittel">Om oss</h1>
          <p>
            Munch House er gatekjøkkenet i Folabruveien i Asker. Vi åpnet i 2025, med spisesal mot vinduene og
            kjøkkenet åpent mot disken.
          </p>
          <p>
            På tavla står smashburgere, kebab, grill og pizza. Maten lages når du bestiller, enten du spiser hos oss,
            tar med, eller får den levert.
          </p>
        </div>
      </div>
    </section>
  );
}
