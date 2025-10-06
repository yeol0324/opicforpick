import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../logo.png";

const BRAND = "#32B6BF";

export function NavBar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to: string) => pathname === to;

  return (
    <nav
      className="mx-auto max-w-6xl px-4 sm:px-6"
      style={{ ["--brand" as string]: BRAND }}
    >
      <div className="flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="OPIC FORPIC" className="h-8 w-8 rounded-xl" />
          <span className="font-semibold tracking-tight text-gray-900">
            OPIC&nbsp;
            <span className="text-[color:var(--brand)]">FORPIC</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/myNotes"
              className={`nav-link ${isActive("/myNotes") ? "active" : ""}`}
            >
              나의기록
            </Link>
          </li>
          <li>
            <Link
              to="/sentences"
              className={`nav-link ${isActive("/sentences") ? "active" : ""}`}
            >
              문장노트
            </Link>
          </li>
          <li>
            {/* <Link to="/" className="nav-link">
              모의고사
            </Link> */}
          </li>
        </ul>

        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border text-gray-700"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <ul className="py-2 border-t">
          <li>
            <Link
              to="/"
              className={`mobile-link ${isActive("/") ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/myNotes"
              className={`mobile-link ${isActive("/myNotes") ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              나의기록
            </Link>
          </li>
          <li>
            <Link
              to="/sentences"
              className={`mobile-link ${
                isActive("/sentences") ? "active" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              문장노트
            </Link>
          </li>
          <li>
            <Link
              to="/mock"
              className="mobile-link"
              onClick={() => setOpen(false)}
            >
              모의고사
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
