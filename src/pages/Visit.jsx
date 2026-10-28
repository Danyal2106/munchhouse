import { place, WEEKDAYS } from "../data.js";
import { useOsloStatus, usePageTitle } from "../hours.js";

export default function Visit() {
  const status = useOsloStatus();
  usePageTitle("Besøk");

  return (
    <section className="wrap page">
      <h1>Besøk</h1>
      <div className="split">
        <div>
          <p className="lead">
            {place.street}, {place.postal}
          </p>
          <p className="status-line">
            <span className={status.open ? "dot is-open" : "dot"} />
            {status.text}
          </p>
          <p className="phone">
            <a href={place.phoneHref}>{place.phone}</a>
          </p>
          <h2>Åpningstider</h2>
          <ul className="hours">
            {WEEKDAYS.map((day) => (
              <li key={day} className={day === status.weekday ? "is-today" : undefined}>
                <span>{day}</span>
                <span>11:00–23:00</span>
              </li>
            ))}
          </ul>
          <p className="note">Helligdager og fellesferie kan avvike. Ring hvis du er usikker. Siste bestilling kan være litt før stengetid.</p>
          <p>
            <a href={place.maps}>Åpne i Google Maps</a>
          </p>
        </div>
        <div className="map-frame">
          <iframe
            title="Kart til Munch House, Folabruveien 6 i Asker"
            src={place.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
