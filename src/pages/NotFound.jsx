import { Link } from "react-router-dom";
import { usePageTitle } from "../hours.js";

export default function NotFound() {
  usePageTitle("Finner ikke siden");

  return (
    <section className="wrap page">
      <h1>Siden finnes ikke</h1>
      <p className="lead">Lenken stemmer ikke. Gå tilbake til forsiden eller menyen.</p>
      <div className="actions">
        <Link className="btn" to="/">
          Forside
        </Link>
        <Link className="btn btn-ghost" to="/meny">
          Meny
        </Link>
      </div>
    </section>
  );
}
