import { Link } from "react-router-dom";

import { Style } from "@shared/lib";
import logo from "@shared/logo.png";

/**
 * Renders the application's fixed top header containing the brand logo and name.
 *
 * The header applies a semi-transparent white background with backdrop blur and exposes a CSS
 * custom property `--brand` set from `Style.BRAND` for the brand accent color.
 *
 * @returns The header JSX element with a link to the root, the logo image, and the brand text.
 */
export function AppHeader() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 bg-white/95 backdrop-blur"
      style={{ ["--brand" as string]: Style.BRAND }}
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