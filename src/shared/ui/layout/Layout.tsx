import { Link, Outlet } from "react-router-dom";
import { useThemeSwitcher } from "../../lib/hooks/useThemeSwitcher";

// export function Layout({ siblingPages, headings }) {
export function Layout() {
  const [theme, toggleTheme] = useThemeSwitcher();

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/docs">Docs</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
        <button onClick={toggleTheme}>{theme}</button>
      </header>
      <main>
        <h1>SiblingPageSidebar</h1>
        <Outlet />
        <h1>HeadingsSidebar</h1>
      </main>
      <footer>
        <ul>
          <li>GitHub</li>
          <li>Twitter</li>
        </ul>
      </footer>
    </div>
  );
}
