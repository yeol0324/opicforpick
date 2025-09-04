import { Link, useLocation } from "react-router-dom";

export function TabBar() {
  const location = useLocation();
  const currentPathname = location.pathname;
  console.log(currentPathname);

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
              className={`${currentPathname == "/" ? "active" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              prefetch="intent"
              className={`${currentPathname == "/about" ? "active" : ""}`}
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
