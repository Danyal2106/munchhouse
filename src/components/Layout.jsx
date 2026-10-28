import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { place } from "../data.js";

const NAV = [
  { to: "/om-oss", label: "Om oss" },
  { to: "/meny", label: "Meny" },
  { to: "/besok", label: "Besøk" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <a className="skip" href="#innhold">
        Hopp til innhold
      </a>
      <header className={`site-header${open ? " is-open" : ""}`}>
        <div className="wrap header-bar">
          <Link className="logo" to="/" aria-label="Munch House" onClick={close}>
            <img src="/logo.png" alt="" />
          </Link>
          <div className="header-actions">
            <nav id="hovedmeny" className="nav-links" aria-label="Hovedmeny">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={close}>
                  {item.label}
                </NavLink>
              ))}
              <a href={place.phoneHref} onClick={close}>
                {place.phone}
              </a>
            </nav>
            <Link className="btn btn-hot" to="/bestill" onClick={close}>
              Bestill
            </Link>
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
      <main id="innhold">
        <Outlet />
      </main>
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
          <p className="footer-links">
            <Link to="/om-oss">Om oss</Link>
            <Link to="/meny">Meny</Link>
            <Link to="/besok">Besøk</Link>
            <Link to="/bestill">Bestill</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
