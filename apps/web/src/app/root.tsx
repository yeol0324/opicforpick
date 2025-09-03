import { Link, Route, Routes } from "react-router-dom";
import HomePage from "@pages/Home";
import AboutPage from "@pages/About";

export function App() {
  return (
    <>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main style={{ padding: 24 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </>
  );
}
