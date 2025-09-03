import { Link } from "react-router-dom";

export function Header() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/" prefetch="intent">
          home
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link
              prefetch="intent"
              //   className={`${pathname == "/" ? "active" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              prefetch="intent"
              //   className={`${pathname == "/about" ? "active" : ""}`}
              to="/about"
            >
              about
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
