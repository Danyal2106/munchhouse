import { Link } from "react-router-dom";
import { categories, menu } from "../data.js";
import { usePageTitle } from "../hours.js";

const BLURB = {
  burger: "Burgere og burgertallerkener, også vegetar.",
  smash: "Smashburgere, med eller uten pommes frites.",
  kebab: "Pita, rull og tallerken.",
  grill: "Løvstek, biffsnadder og fish & chips.",
  pizza: "Fra margherita til kebabpizza.",
};

export default function Menu() {
  usePageTitle("Meny");
  const groups = categories.filter((item) => item.id !== "alle");

  return (
    <section className="wrap page">
      <h1>Meny</h1>
      <p className="lead">Velg en kategori, eller se alle rettene på én side.</p>
      <ul className="link-list">
        <li>
          <Link to="/meny/alle">
            <span>
              <strong>Hele menyen</strong>
              <small>{menu.length} retter</small>
            </span>
          </Link>
        </li>
        {groups.map((group) => {
          const count = menu.filter((item) => item.category === group.id).length;
          return (
            <li key={group.id}>
              <Link to={`/meny/${group.id}`}>
                <span>
                  <strong>{group.label}</strong>
                  <small>{BLURB[group.id]}</small>
                </span>
                <em>{count}</em>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
