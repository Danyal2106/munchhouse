import { useEffect, useMemo, useState } from "react";
import {
  WEEKDAYS,
  categories,
  formatPrice,
  menu,
  photos,
  place,
  ticker,
} from "./data.js";

const OPEN = place.openHour * 60;
const CLOSE = place.closeHour * 60;

function osloNow(date = new Date()) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Oslo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(time.find((part) => part.type === "hour").value);
  const minute = Number(time.find((part) => part.type === "minute").value);
  const weekday = new Intl.DateTimeFormat("nb-NO", {
    timeZone: "Europe/Oslo",
    weekday: "long",
  })
    .format(date)
    .toLocaleLowerCase("nb-NO");

  return { minutes: hour * 60 + minute, weekday };
}

function statusLabel(minutes) {
  const open = minutes >= OPEN && minutes < CLOSE;
  const soon = open && CLOSE - minutes <= 45;
  if (soon) return { open: true, soon: true, text: "Stenger snart · 23:00" };
  if (open) return { open: true, soon: false, text: "Åpent nå · til 23:00" };
  return { open: false, soon: false, text: "Stengt · åpner 11:00" };
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Status({ status }) {
  const tone = status.soon ? "is-soon" : status.open ? "is-open" : "";
  return (
    <p className="status" role="status">
      <span className={`dot ${tone}`} />
      {status.text}
    </p>
  );
}

export default function App() {
  const [now, setNow] = useState(() => osloNow());
  const [category, setCategory] = useState("alle");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => setNow(osloNow()), 30000);
    return () => window.clearInterval(id);
  }, []);

  const status = statusLabel(now.minutes);

  return (
    <>
      <a className="skip" href="#innhold">
        Hopp til innhold
      </a>
      <Header />
      <main id="innhold">
        <Hero status={status} />
        <Spotlight />
        <Ticker />
        <Film />
        <About />
        <Menu
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
        />
        <Visit status={status} today={now.weekday} />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event) => {
      if (!event.target.closest(".site-header")) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${solid || open ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <div className="wrap header-bar">
        <a className="logo" href="#top" aria-label="Munch House" onClick={close}>
          <img src="/logo.png" alt="" />
        </a>
        <div className="header-actions">
          <nav id="hovedmeny" className="nav-links" aria-label="Hovedmeny">
            <a href="#om-oss" onClick={close}>
              Om oss
            </a>
            <a href="#meny" onClick={close}>
              Meny
            </a>
            <a href="#besok" onClick={close}>
              Besøk
            </a>
            <a href={place.phoneHref} onClick={close}>
              {place.phone}
            </a>
          </nav>
          <a className="btn btn-hot" href="#bestill" onClick={close}>
            Bestill
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="hovedmeny"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Lukk meny" : "Åpne meny"}</span>
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ status }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-copy">
        <p className="hero-kicker">Henting eller levering</p>
        <h1>
          Munch
          <br />
          House
        </h1>
        <div className="hero-actions">
          <a className="btn btn-hot" href={place.foodora} target="_blank" rel="noopener noreferrer">
            Bestill
          </a>
          <a className="btn btn-line" href="#meny">
            Se menyen
          </a>
        </div>
        <div className="hero-meta">
          <Status status={status} />
          <a href={place.maps}>{place.street}, Asker</a>
          <span>Alle dager 11–23</span>
        </div>
      </div>
    </section>
  );
}

function Spotlight() {
  const dish = menu.find((item) => item.id === "cheesy-smash");

  return (
    <section className="spotlight pattern" aria-labelledby="husrett">
      <div className="wrap">
        <article className="spot-card">
          <img src="/images/disk.jpg" alt="Disken hos Munch House" />
          <div>
            <p className="spot-kicker">Husets smash</p>
            <h2 id="husrett">{dish.name}</h2>
            <p>{dish.description}</p>
            <p className="spot-price">{formatPrice(dish)}</p>
            <a className="btn btn-hot" href={place.foodora} target="_blank" rel="noopener noreferrer">
              Bestill
            </a>
          </div>
          <p className="badge">
            Asker
            <span>11–23</span>
          </p>
        </article>
      </div>
    </section>
  );
}

function Film() {
  return (
    <section className="film" aria-label="Bilder fra restauranten">
      {photos.map((photo) => (
        <figure key={photo.src}>
          <img src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position }} />
        </figure>
      ))}
    </section>
  );
}

function About() {
  return (
    <section className="about" id="om-oss" aria-labelledby="om-oss-tittel">
      <div className="wrap about-grid">
        <figure className="about-photo">
          <img src="/images/spisesal.jpg" alt="Spisesalen hos Munch House, med disk og menytavler" />
        </figure>
        <div>
          <p className="kicker">Folabruveien</p>
          <h2 id="om-oss-tittel">Om oss</h2>
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

function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function Menu({ category, setCategory, query, setQuery }) {
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const visible = menu.filter((item) => {
      const inCategory = category === "alle" || item.category === category;
      const matches =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return inCategory && matches;
    });
    const active =
      category === "alle" ? categories.filter((item) => item.id !== "alle") : categories.filter((item) => item.id === category);

    return active
      .map((item) => ({
        ...item,
        items: visible.filter((dish) => dish.category === item.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [category, query]);

  const count = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section className="menu-section" id="meny" aria-labelledby="meny-tittel">
      <div className="wrap">
        <div className="menu-top">
          <div>
            <p className="kicker">Menyen</p>
            <h2 id="meny-tittel">Det som står på tavla.</h2>
          </div>
          <label className="search">
            <span className="sr-only">Søk i menyen</span>
            <input
              type="search"
              value={query}
              placeholder="Søk etter smash, kebab, pizza…"
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? (
              <button type="button" className="clear" onClick={() => setQuery("")} aria-label="Tøm søk">
                ×
              </button>
            ) : null}
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {count} {count === 1 ? "rett" : "retter"}
        </p>
        <div className="menu-layout">
          <div className="cat-nav" role="group" aria-label="Menykategorier">
            {categories.map((item) => {
              const total = item.id === "alle" ? menu.length : menu.filter((dish) => dish.category === item.id).length;
              return (
                <button
                  key={item.id}
                  type="button"
                  className="cat-btn"
                  aria-pressed={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                  <span>{total}</span>
                </button>
              );
            })}
          </div>
          <div>
            {groups.length === 0 ? (
              <p className="empty">Ingen retter matcher «{query}».</p>
            ) : (
              groups.map((group) => (
                <section key={group.id} aria-labelledby={`gruppe-${group.id}`}>
                  <h3 id={`gruppe-${group.id}`} className="group-title">
                    {group.label}
                  </h3>
                  {group.items.map((item) => (
                    <article key={item.id} className="dish">
                      <div className="dish-row">
                        <h4>
                          {item.name}
                          {item.veggie ? <span className="tag">Vegetar</span> : null}
                        </h4>
                        <span className="leader" aria-hidden="true" />
                        <p className="dish-price">{formatPrice(item)}</p>
                      </div>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </section>
              ))
            )}
            <p className="menu-note">
              Priser fra Foodora-menyen. «Fra» betyr at størrelse og tilvalg kan endre prisen. Spør i skranken om
              allergener. Siste bestilling kan være litt før stengetid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit({ status, today }) {
  return (
    <section className="visit" id="besok" aria-labelledby="besok-tittel">
      <div className="red-band">
        <div className="wrap red-grid">
          <div>
            <p className="kicker">Asker</p>
            <h2 id="besok-tittel">Kom innom.</h2>
            <p className="visit-lead">
              Smash, kebab, grill og pizza. Spis hos oss, ta med, eller få det levert.
            </p>
            <a className="phone" href={place.phoneHref}>
              {place.phone}
            </a>
            <Status status={status} />
            <div className="order-actions" id="bestill">
              <a className="btn btn-dark" href={place.foodora} target="_blank" rel="noopener noreferrer">
                Bestill på Foodora
              </a>
              <a className="btn btn-line btn-line-light" href={place.phoneHref}>
                Ring og hent
              </a>
            </div>
          </div>
          <figure className="tilt">
            <img src="/images/spisesal.jpg" alt="Spisesalen og disken hos Munch House" />
          </figure>
        </div>
      </div>
      <div className="wrap find">
        <h2>Finn oss der du er.</h2>
        <div className="find-grid">
          <article className="loc-card">
            <p className="loc-city">Asker</p>
            <h3>{place.street}</h3>
            <p>{place.postal}</p>
            <ul className="hours">
              {WEEKDAYS.map((day) => (
                <li key={day} className={day === today ? "is-today" : undefined}>
                  <span>{day}</span>
                  <span>11:00–23:00</span>
                </li>
              ))}
            </ul>
            <p className="fine">Helligdager og fellesferie kan avvike. Ring hvis du er usikker.</p>
            <a className="map-link" href={place.maps} target="_blank" rel="noopener noreferrer">
              Åpne i Google Maps
              <Arrow />
            </a>
          </article>
          <div className="map-frame">
            <iframe
              title="Kart til Munch House, Folabruveien 6 i Asker"
              src={place.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <strong>Munch House AS</strong>
          <p>
            {place.street}, {place.postal}
            <br />
            Org.nr. {place.org}
          </p>
        </div>
        <p>Spis hos oss, ta med, eller bestill levering.</p>
      </div>
    </footer>
  );
}
