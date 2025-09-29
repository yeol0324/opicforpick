import { Link, useLocation } from "react-router-dom";

export function TabBar() {
  const location = useLocation();
  const currentPathname = location.pathname;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
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
              className={`${currentPathname == "/myNotes" ? "active" : ""}`}
              to="/myNotes"
            >
              나의기록
            </Link>
          </li>
          <li className="nav-item">
            <Link
              prefetch="intent"
              className={`${currentPathname == "/sentences" ? "active" : ""}`}
              to="/sentences"
            >
              문장노트
            </Link>
          </li>
          <li>모의고사</li>
        </ul>
      </div>
    </nav>
  );
}
