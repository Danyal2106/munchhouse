import { Link, useParams } from "react-router-dom";
import { categories, formatPrice, menu } from "../data.js";
import { usePageTitle } from "../hours.js";
import NotFound from "./NotFound.jsx";

export default function MenuCategory() {
  const { category: slug } = useParams();
  const group = categories.find((item) => item.id === slug);
  const isAll = slug === "alle";
  usePageTitle(isAll ? "Hele menyen" : group?.label ?? "Meny");

  if (!isAll && !group) return <NotFound />;

  const groups = isAll ? categories.filter((item) => item.id !== "alle") : [group];

  return (
    <section className="wrap page">
      <p className="crumb">
        <Link to="/meny">Meny</Link>
        <span aria-hidden="true"> / </span>
        {isAll ? "Hele menyen" : group.label}
      </p>
      <h1>{isAll ? "Hele menyen" : group.label}</h1>
      {groups.map((item) => {
        const dishes = menu.filter((dish) => dish.category === item.id);
        return (
          <section key={item.id} className="menu-group" aria-labelledby={`kat-${item.id}`}>
            {isAll ? <h2 id={`kat-${item.id}`}>{item.label}</h2> : null}
            <ul className="dishes">
              {dishes.map((dish) => (
                <li key={dish.id}>
                  <div>
                    <h3>{dish.name}</h3>
                    <p>
                      {dish.veggie ? "Vegetar. " : ""}
                      {dish.description}
                    </p>
                  </div>
                  <strong>{formatPrice(dish)}</strong>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <p className="note">
        Priser fra Foodora-menyen. «Fra» betyr at størrelse og tilvalg kan endre prisen. Spør i skranken om
        allergener.
      </p>
    </section>
  );
}
