import { Link } from "react-router-dom";
import Status from "../components/Status.jsx";
import { formatPrice, menu, photos, place, ticker } from "../data.js";
import { useOsloStatus, usePageTitle } from "../hours.js";

export default function Home() {
  const status = useOsloStatus();
  usePageTitle("");
  const dish = menu.find((item) => item.id === "cheesy-smash");
  const items = [...ticker, ...ticker];

  return (
    <>
      <section className="hero">
        <div className="wrap hero-copy">
          <p className="hero-kicker">Henting eller levering</p>
          <h1>
            Munch
            <br />
            House
          </h1>
          <div className="hero-actions">
            <Link className="btn btn-hot" to="/bestill">
              Bestill
            </Link>
            <Link className="btn btn-line" to="/meny">
              Se menyen
            </Link>
          </div>
          <div className="hero-meta">
            <Status status={status} />
            <Link to="/besok">
              {place.street}, Asker
            </Link>
            <span>Alle dager 11–23</span>
          </div>
        </div>
      </section>
      <section className="spotlight pattern" aria-labelledby="husrett">
        <div className="wrap">
          <article className="spot-card">
            <img src="/images/disk.jpg" alt="Disken hos Munch House" />
            <div>
              <p className="spot-kicker">Husets smash</p>
              <h2 id="husrett">{dish.name}</h2>
              <p>{dish.description}</p>
              <p className="spot-price">{formatPrice(dish)}</p>
              <Link className="btn btn-hot" to="/bestill">
                Bestill
              </Link>
            </div>
            <p className="badge">
              Asker
              <span>11–23</span>
            </p>
          </article>
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {items.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
      <section className="film" aria-label="Bilder fra restauranten">
        {photos.map((photo) => (
          <figure key={photo.src}>
            <img src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position }} />
          </figure>
        ))}
      </section>
    </>
  );
}
