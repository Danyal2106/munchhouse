import { photos } from "../data.js";
import { usePageTitle } from "../hours.js";

export default function Restaurant() {
  usePageTitle("Restauranten");

  return (
    <section className="wrap page">
      <figure className="about-photo">
        <img src="/images/spisesal.jpg" alt="Spisesalen og disken hos Munch House" />
      </figure>
      <h1>Restauranten</h1>
      <p className="lead">
        Munch House ligger i Folabruveien 6 i Asker. Det er plass til å spise inne, og du kan ta med eller få maten
        levert. Kjøkkenet er åpent mot disken.
      </p>
      <div className="shots">
        {photos.map((photo) => (
          <figure key={photo.src}>
            <img src={photo.src} alt={photo.alt} />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
