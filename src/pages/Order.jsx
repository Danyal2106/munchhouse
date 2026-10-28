import { place } from "../data.js";
import { usePageTitle } from "../hours.js";

export default function Order() {
  usePageTitle("Bestill");

  return (
    <section className="wrap page">
      <h1>Bestill</h1>
      <p className="lead">Levering skjer på Foodora. Henting bestiller du på telefon.</p>
      <div className="split order-split">
        <article className="choice">
          <h2>Levering</h2>
          <p>Bestill på Foodora. De kjører maten hjem til deg.</p>
          <a className="btn btn-hot" href={place.foodora} target="_blank" rel="noopener noreferrer">
            Bestill på Foodora
          </a>
        </article>
        <article className="choice">
          <h2>Henting</h2>
          <p>Ring oss, så gjør vi maten klar til du kommer.</p>
          <a className="btn btn-ghost" href={place.phoneHref}>
            Ring {place.phone}
          </a>
        </article>
      </div>
    </section>
  );
}
