import { Link } from "react-router-dom";
import logo from "@shared/logo.png";
import { THEME } from "@shared/lib";

export function AppHeader() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 bg-white/95 backdrop-blur"
      style={{ ["--brand" as string]: THEME.BRAND }}
    >
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="OPIC FORPIC" className="h-8 w-8 rounded-xl" />
          <span className="font-semibold tracking-tight text-gray-900">
            OPIC&nbsp;
            <span className="text-[color:var(--brand)]">FORPICK</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
